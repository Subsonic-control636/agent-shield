import { collectFiles, totalLines } from "./files.js";
import { rules } from "../rules/index.js";
import { computeScore, computeScoreV2 } from "../score.js";
import { loadConfig, loadIgnorePatterns, isIgnored } from "../config.js";
import type { ScanResult, Finding, ScanConfig, ScannedFile, ProjectMeta } from "../types.js";
import type { LlmProvider } from "../llm/types.js";

/** Context types where findings are likely false positives */
const FP_CONTEXTS: Record<string, string> = {
  test: "Test file — assertions and mocks commonly trigger security patterns",
  deploy: "Deploy/CI script — HTTP requests and credential access are expected",
  docs: "Documentation file — code examples and descriptions commonly trigger patterns",
  config: "Config file — expected to contain URLs, paths, and credential references",
};

/** Rules most likely to false-positive in specific contexts */
const CONTEXT_FP_RULES: Record<string, Set<string>> = {
  test: new Set(["data-exfil", "env-leak", "backdoor", "network-ssrf", "sensitive-read", "phone-home", "obfuscation", "crypto-mining", "reverse-shell", "credential-hardcode", "skill-risks"]),
  deploy: new Set(["data-exfil", "env-leak", "backdoor", "network-ssrf", "credential-hardcode", "sensitive-read", "skill-risks"]),
  docs: new Set(["data-exfil", "env-leak", "backdoor", "network-ssrf", "sensitive-read", "obfuscation", "crypto-mining", "reverse-shell", "credential-hardcode", "skill-risks"]),
  config: new Set(["data-exfil", "env-leak", "credential-hardcode", "network-ssrf"]),
};

/** Build ProjectMeta from scanned files for bonus scoring */
function buildProjectMeta(files: ScannedFile[], findings: Finding[]): ProjectMeta {
  const fileList = files.map((f) => f.filePath);
  const tLines = totalLines(files);
  const hasNetworkCalls = findings.some(
    (f) => !f.possibleFalsePositive && (
      f.rule === "data-exfil" ||
      f.rule === "phone-home" ||
      f.rule === "network-ssrf"
    ),
  );
  return {
    fileList,
    totalLines: tLines,
    totalFiles: files.length,
    hasNetworkCalls,
  };
}

/** Run all rules against a target directory */
export function scan(targetDir: string, configOverride?: Partial<ScanConfig>): ScanResult {
  const start = Date.now();

  // Load config
  const fileConfig = loadConfig(targetDir);
  const config: ScanConfig = { ...fileConfig, ...configOverride };

  // Load ignore patterns
  const ignorePatterns = loadIgnorePatterns(targetDir);
  if (config.ignore) {
    ignorePatterns.push(...config.ignore);
  }

  // Collect and filter files
  let files = collectFiles(targetDir);
  if (ignorePatterns.length > 0) {
    files = files.filter((f) => !isIgnored(f.relativePath, ignorePatterns));
  }

  // Filter rules based on config
  let activeRules = [...rules];
  if (config.rules?.enable) {
    activeRules = activeRules.filter((r) => config.rules!.enable!.includes(r.id));
  }
  if (config.rules?.disable) {
    activeRules = activeRules.filter((r) => !config.rules!.disable!.includes(r.id));
  }

  // Run rules
  const findings: Finding[] = [];
  for (const rule of activeRules) {
    findings.push(...rule.run(files));
  }

  // Post-process: false positive detection, severity overrides, sorting
  postProcess(findings, files, config);

  const projectMeta = buildProjectMeta(files, findings);
  const scoreResult = computeScoreV2(findings, projectMeta);

  return {
    target: targetDir,
    filesScanned: files.length,
    linesScanned: totalLines(files),
    findings,
    score: computeScore(findings),
    scoreResult,
    duration: Date.now() - start,
  };
}

/** Common post-processing: false positive detection, severity overrides, sorting */
function postProcess(findings: Finding[], files: ScannedFile[], config: ScanConfig): void {
  for (const finding of findings) {
    const file = files.find(
      (f) => f.relativePath === finding.file || f.filePath === finding.file
    );

    // Context-based FP detection
    if (file && FP_CONTEXTS[file.context]) {
      const fpRules = CONTEXT_FP_RULES[file.context];
      if (fpRules?.has(finding.rule)) {
        finding.possibleFalsePositive = true;
        finding.falsePositiveReason = FP_CONTEXTS[file.context]!;
        if (finding.severity === "high") {
          finding.severity = "medium";
        } else if (finding.severity === "medium") {
          finding.severity = "low";
        }
      }
    }

    // Security tool self-reference detection:
    // If a file is a rule definition (contains regex patterns as data),
    // its matches on code-analysis rules are likely false positives
    if (file) {
      const isRuleFile = file.relativePath.includes("rules/") && file.ext === ".ts";
      const isSecurityToolCode = file.relativePath.includes("llm/") ||
        file.relativePath.includes("llm-analyzer") ||
        file.relativePath.includes("scanner/") ||
        file.relativePath.includes("reporter/") ||
        file.relativePath.includes("score.");
      if (isRuleFile || isSecurityToolCode) {
        const codeAnalysisRules = new Set([
          "data-exfil", "backdoor", "obfuscation", "env-leak",
          "crypto-mining", "reverse-shell", "sensitive-read",
          "network-ssrf", "credential-hardcode", "mcp-manifest",
          "skill-risks",
        ]);
        if (codeAnalysisRules.has(finding.rule)) {
          finding.possibleFalsePositive = true;
          finding.falsePositiveReason = "Security tool source code — pattern definitions are not actual vulnerabilities";
          if (finding.severity === "high") {
            finding.severity = "low";
          } else if (finding.severity === "medium") {
            finding.severity = "low";
          }
        }
      }
    }

    // Evidence-based FP: regex pattern strings (common in security tools)
    if (finding.evidence) {
      const isRegexDef = /(?:pattern|RegExp|\/[^/]+\/[gimsuy]*|new RegExp)\s*[:=(]/.test(finding.evidence);
      const isStringDef = /(?:const|let|var)\s+\w+\s*=\s*["'`]/.test(finding.evidence);
      if (isRegexDef && !finding.possibleFalsePositive) {
        finding.possibleFalsePositive = true;
        finding.falsePositiveReason = "Pattern definition — regex/string constant, not executable code";
        if (finding.severity !== "low") finding.severity = "low";
      }
    }
  }

  if (config.severity) {
    for (const finding of findings) {
      if (config.severity[finding.rule]) {
        finding.severity = config.severity[finding.rule]!;
      }
    }
  }

  // === Core principle: 宁可漏报，不要误报 ===
  // Assign confidence levels and enforce strict severity rules:
  // - Only high-confidence findings keep critical/warning
  // - Medium-confidence → downgrade to warning at most
  // - Low-confidence / FP → info only, does not affect score
  for (const finding of findings) {
    // Assign confidence if not already set by rule
    if (!finding.confidence) {
      finding.confidence = classifyConfidence(finding, files);
    }

    // Enforce: low confidence → info (does not affect score)
    if (finding.confidence === "low") {
      finding.severity = "low";
    }
    // Medium confidence → warning at most (never critical)
    if (finding.confidence === "medium" && finding.severity === "high") {
      finding.severity = "medium";
    }
    // FP → always info
    if (finding.possibleFalsePositive) {
      finding.severity = "low";
    }
  }

  const severityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };
  findings.sort((a, b) => (severityOrder[a.severity] ?? 3) - (severityOrder[b.severity] ?? 3));
}

/** Classify finding confidence based on evidence quality and context */
function classifyConfidence(finding: Finding, files: ScannedFile[]): "high" | "medium" | "low" {
  const file = files.find(f => f.relativePath === finding.file || f.filePath === finding.file);

  // High confidence: supply-chain CVEs, explicit injection patterns in SKILL.md
  if (finding.rule === "supply-chain") return "high";

  // High confidence: prompt injection in SKILL.md or MCP tool descriptions
  if (finding.rule === "prompt-injection") {
    const isSkillMd = file?.relativePath.toLowerCase().includes("skill.md");
    const isMcpConfig = file?.ext === ".json" && file.content.includes("mcpServers");
    const isPythonMcpServer = file?.ext === ".py" && file.content.includes("@mcp") || file?.content?.includes("McpServer");
    if (isSkillMd || isMcpConfig || isPythonMcpServer) return "high";
    // In README/docs, prompt injection patterns are usually examples, not real attacks
    if (file?.context === "docs") return "low";
    return "medium";
  }

  // High confidence: toxic-flow (structural analysis, not pattern matching)
  if (finding.rule === "toxic-flow") return "high";

  // High confidence: tool-shadowing cross-server conflicts
  if (finding.rule === "tool-shadowing" && finding.message.includes("conflict")) return "high";

  // Medium confidence: code-level pattern matches (could be legitimate)
  const codePatternRules = new Set([
    "data-exfil", "backdoor", "env-leak", "network-ssrf",
    "sensitive-read", "phone-home", "credential-hardcode",
  ]);
  if (codePatternRules.has(finding.rule)) {
    // Multi-signal = high confidence (e.g., "reads sensitive data AND sends HTTP request")
    if (finding.message.includes(" and ") || finding.message.includes(" AND ")) return "high";
    // Pipe-to-shell, eval with dynamic input = high confidence
    if (finding.message.includes("pipe-to-shell") || finding.message.includes("eval()") || finding.message.includes("exec()")) return "high";
    // Single signal in source code = medium
    if (file?.context === "source") return "medium";
    // In test/deploy/docs context → low
    return "low";
  }

  // Medium confidence: skill-risks patterns
  if (finding.rule === "skill-risks") {
    const isSkillMd = file?.relativePath.toLowerCase().includes("skill.md");
    if (isSkillMd) return "high";
    return "medium";
  }

  // Default: medium
  return "medium";
}

/** LLM-capable file extensions for deep analysis */
const LLM_SCAN_EXTS = new Set([".md", ".json", ".yaml", ".yml", ".py"]);

/** Run all rules + optional LLM deep analysis */
export async function scanWithLlm(
  targetDir: string,
  llmProvider: LlmProvider,
  configOverride?: Partial<ScanConfig>,
): Promise<ScanResult> {
  const start = Date.now();

  const fileConfig = loadConfig(targetDir);
  const config: ScanConfig = { ...fileConfig, ...configOverride };
  const ignorePatterns = loadIgnorePatterns(targetDir);
  if (config.ignore) ignorePatterns.push(...config.ignore);

  let files = collectFiles(targetDir);
  if (ignorePatterns.length > 0) {
    files = files.filter((f) => !isIgnored(f.relativePath, ignorePatterns));
  }

  let activeRules = [...rules];
  if (config.rules?.enable) {
    activeRules = activeRules.filter((r) => config.rules!.enable!.includes(r.id));
  }
  if (config.rules?.disable) {
    activeRules = activeRules.filter((r) => !config.rules!.disable!.includes(r.id));
  }

  // Phase 1: static regex rules
  const findings: Finding[] = [];
  for (const rule of activeRules) {
    findings.push(...rule.run(files));
  }

  // Phase 2: LLM deep analysis on markdown, config, and Python files
  const llmTargets = files.filter((f) => LLM_SCAN_EXTS.has(f.ext));
  let totalTokens = 0;

  for (const file of llmTargets) {
    try {
      const result = await llmProvider.analyze(file.content, file.relativePath);
      totalTokens += result.tokensUsed || 0;

      for (const llmFinding of result.findings) {
        // Deduplicate: skip if regex already found a similar issue on the same line
        const isDuplicate = findings.some(
          (f) =>
            f.file === file.relativePath &&
            f.line === llmFinding.line &&
            f.rule === "prompt-injection",
        );
        if (!isDuplicate) {
          findings.push({
            rule: "prompt-injection-llm",
            severity: llmFinding.severity,
            file: file.relativePath,
            line: llmFinding.line,
            message: `[LLM] ${llmFinding.description}`,
            evidence: llmFinding.evidence,
          });
        }
      }
    } catch (err) {
      // LLM failure is non-fatal — fallback to regex-only
      findings.push({
        rule: "prompt-injection-llm",
        severity: "low",
        file: file.relativePath,
        message: `LLM analysis skipped: ${(err as Error).message?.slice(0, 80) || "unknown error"}`,
      });
    }
  }

  postProcess(findings, files, config);

  const projectMeta = buildProjectMeta(files, findings);
  const scoreResult = computeScoreV2(findings, projectMeta);

  return {
    target: targetDir,
    filesScanned: files.length,
    linesScanned: totalLines(files),
    findings,
    score: computeScore(findings),
    scoreResult,
    duration: Date.now() - start,
  };
}
