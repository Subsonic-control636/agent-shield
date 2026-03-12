import type { Rule, Finding, ScannedFile } from "../types.js";

/**
 * Rule: prompt-injection
 * Detects prompt injection patterns in SKILL.md, MCP tool descriptions,
 * and other markdown/text files that could hijack agent behavior.
 */

// Patterns that indicate prompt injection attempts
const INJECTION_PATTERNS: Array<{ pattern: RegExp; description: string; severity: "critical" | "warning" }> = [
  // Direct instruction override
  { pattern: /ignore\s+(all\s+)?(previous|prior|above|earlier)\s+(instructions|rules|guidelines|prompts)/i, description: "Attempts to override previous instructions", severity: "critical" },
  { pattern: /disregard\s+(all\s+)?(previous|prior|above|your)\s+(instructions|rules|guidelines|safety)/i, description: "Attempts to disregard safety guidelines", severity: "critical" },
  { pattern: /forget\s+(everything|all|your)\s+(you|instructions|rules|about)/i, description: "Attempts to make agent forget instructions", severity: "critical" },
  { pattern: /new\s+instructions?\s*:/i, description: "Injects new instructions", severity: "critical" },
  { pattern: /override\s+(your|the|all|previous)\s+(instructions|rules|behavior|guidelines)/i, description: "Attempts to override agent behavior", severity: "critical" },

  // Identity manipulation
  { pattern: /you\s+are\s+now\s+(a|an|acting\s+as)/i, description: "Attempts to change agent identity", severity: "critical" },
  { pattern: /pretend\s+(to\s+be|you\s+are)/i, description: "Attempts identity manipulation via pretending", severity: "critical" },
  { pattern: /act\s+as\s+(if\s+you\s+are\s+|a\s+|an\s+)?(?!a\s+guide|a\s+helper|an\s+assistant)/i, description: "Attempts to change agent role", severity: "warning" },
  { pattern: /from\s+now\s+on,?\s+(you|your|ignore|do\s+not)/i, description: "Attempts to set new behavioral directives", severity: "critical" },

  // System prompt extraction/manipulation
  { pattern: /(?:reveal|show|display|print|output|repeat|echo)\s+(?:your\s+)?(?:system\s+)?prompt/i, description: "Attempts to extract system prompt", severity: "critical" },
  { pattern: /what\s+(?:is|are)\s+your\s+(?:system\s+)?(?:instructions|prompt|rules|guidelines)/i, description: "Attempts to extract agent instructions", severity: "warning" },
  { pattern: /<\/?system>/i, description: "Fake system tags to inject instructions", severity: "critical" },
  { pattern: /\[SYSTEM\]|\[INST\]|\[\/INST\]/i, description: "Fake instruction delimiters", severity: "critical" },

  // Hidden instruction patterns
  { pattern: /<!--[\s\S]*?(?:ignore|override|disregard|execute|run|you must|always|never)[\s\S]*?-->/i, description: "Hidden instructions in HTML comments", severity: "critical" },
  { pattern: /\u200b|\u200c|\u200d|\u2060|\ufeff/g, description: "Zero-width characters (potential hidden text)", severity: "warning" },

  // Behavioral hijacking
  { pattern: /(?:you\s+must|always|never)\s+(?:call|use|invoke|execute|run)\s+(?:this|the|my)\s+tool/i, description: "Forces agent to call specific tools", severity: "critical" },
  { pattern: /(?:do\s+not|never|don'?t)\s+(?:ask|check|verify|validate|confirm)\s+(?:the\s+user|before|permission)/i, description: "Attempts to bypass user confirmation", severity: "critical" },
  { pattern: /(?:before|after)\s+(?:any|every|each)\s+(?:action|request|call|tool),?\s+(?:first\s+)?(?:call|use|invoke|run)/i, description: "Injects mandatory pre/post actions", severity: "critical" },
  { pattern: /(?:silently|quietly|secretly|without\s+(?:telling|informing|notifying))\s+(?:send|post|upload|transmit|exfiltrate)/i, description: "Instructs covert data transmission", severity: "critical" },

  // Tool poisoning (tool description trying to control agent)
  { pattern: /(?:important|crucial|critical|essential|vital)\s*(?::|!)\s*(?:always|never|you must|do not)/i, description: "Urgency-based behavioral directive in description", severity: "warning" },
  { pattern: /(?:this\s+tool\s+)?(?:requires|needs|demands)\s+(?:that\s+)?(?:you|the\s+agent)\s+(?:first|also|always)/i, description: "Tool description imposes agent requirements", severity: "warning" },

  // Data exfiltration via prompt
  { pattern: /(?:send|post|transmit|forward|copy)\s+(?:all|any|the|this)?\s*(?:conversation|chat|history|context|messages?)\s+(?:to|at)\s+/i, description: "Instructs exfiltration of conversation data", severity: "critical" },
  { pattern: /(?:include|append|attach|embed)\s+(?:the\s+)?(?:api\s+key|token|password|secret|credential|ssh\s+key)/i, description: "Attempts to extract credentials via prompt", severity: "critical" },

  // Encoding-based evasion
  { pattern: /(?:decode|eval|execute|run)\s+(?:the\s+)?(?:base64|hex|rot13|encoded)/i, description: "Instructs decoding of obfuscated payloads", severity: "critical" },
];

// Suspicious URL patterns in skills
const SUSPICIOUS_URL_PATTERNS: Array<{ pattern: RegExp; description: string }> = [
  { pattern: /curl\s+(?:-[sS]\s+)?https?:\/\/(?!github\.com|raw\.githubusercontent|npmjs\.com|pypi\.org)/i, description: "Downloads from non-standard source" },
  { pattern: /wget\s+(?:-q\s+)?https?:\/\/(?!github\.com|raw\.githubusercontent)/i, description: "Downloads from non-standard source" },
  { pattern: /\|\s*(?:bash|sh|zsh|python|node|eval)/i, description: "Pipes download output to execution" },
  { pattern: /(?:bit\.ly|tinyurl|t\.co|goo\.gl|is\.gd|shorturl)\//i, description: "URL shortener (obscures destination)" },
  { pattern: /(?:pastebin\.com|hastebin\.com|paste\.ee|ghostbin)/i, description: "Paste site (potential malicious payload host)" },
];

export const promptInjection: Rule = {
  id: "prompt-injection",
  name: "Prompt Injection Detection",
  description: "Detects prompt injection, tool poisoning, and behavioral hijacking in skill instructions and tool descriptions",

  run(files: ScannedFile[]): Finding[] {
    const findings: Finding[] = [];

    for (const file of files) {
      // Focus on markdown (SKILL.md, docs), JSON (MCP config), and YAML files
      const isSkillMd = file.relativePath.toLowerCase().includes("skill.md");
      const isMarkdown = file.ext === ".md";
      const isConfig = [".json", ".yaml", ".yml"].includes(file.ext);

      if (!isMarkdown && !isConfig) continue;

      // Check each line for injection patterns
      for (let i = 0; i < file.lines.length; i++) {
        const line = file.lines[i]!;

        for (const { pattern, description, severity } of INJECTION_PATTERNS) {
          // Reset lastIndex for global patterns
          pattern.lastIndex = 0;
          if (pattern.test(line)) {
            findings.push({
              rule: "prompt-injection",
              severity: isSkillMd ? severity : "warning", // Higher severity in SKILL.md
              file: file.relativePath,
              line: i + 1,
              message: `Prompt injection: ${description}`,
              evidence: line.trim().substring(0, 120),
            });
            break; // One finding per line
          }
        }
      }

      // Check for suspicious URLs in skill files
      if (isSkillMd || isMarkdown) {
        for (let i = 0; i < file.lines.length; i++) {
          const line = file.lines[i]!;
          for (const { pattern, description } of SUSPICIOUS_URL_PATTERNS) {
            pattern.lastIndex = 0;
            if (pattern.test(line)) {
              findings.push({
                rule: "prompt-injection",
                severity: "warning",
                file: file.relativePath,
                line: i + 1,
                message: `Suspicious URL: ${description}`,
                evidence: line.trim().substring(0, 120),
              });
              break;
            }
          }
        }
      }

      // Check for overall file-level red flags
      const fullContent = file.content.toLowerCase();

      // Excessive instruction density in tool descriptions
      if (isConfig) {
        const instructionWords = (fullContent.match(/\b(must|always|never|important|crucial|required)\b/gi) || []).length;
        const wordCount = fullContent.split(/\s+/).length;
        if (wordCount > 50 && instructionWords / wordCount > 0.05) {
          findings.push({
            rule: "prompt-injection",
            severity: "warning",
            file: file.relativePath,
            message: `High instruction density (${instructionWords} directive words in ${wordCount} words) — may indicate tool poisoning`,
          });
        }
      }
    }

    return findings;
  },
};
