/**
 * Tool Description Injection Detector
 * 
 * Scans MCP tool descriptions for:
 * - Prompt injection patterns (instruction override, identity manipulation)
 * - Tool shadowing hints ("replaces", "overrides", "instead of")
 * - Hidden instructions in Unicode/encoding tricks
 * - Scope creep signals (tool claims benign but description hints at sensitive ops)
 */

export interface ToolInfo {
  name: string;
  description?: string;
  inputSchema?: Record<string, unknown>;
}

export interface DetectionResult {
  level: "high" | "medium" | "low";
  detector: string;
  rule: string;
  message: string;
  evidence: string;
  toolName: string;
}

// Prompt injection patterns in tool descriptions
const DESCRIPTION_INJECTION_PATTERNS: { pattern: RegExp; rule: string; level: "high" | "medium"; desc: string }[] = [
  // Instruction override
  { pattern: /ignore\s+(?:all\s+)?(?:previous|above|prior|earlier)\s+instructions/i, rule: "desc-injection", level: "high", desc: "Instruction override in tool description" },
  { pattern: /disregard\s+(?:all\s+)?(?:previous|prior|above)/i, rule: "desc-injection", level: "high", desc: "Instruction disregard in tool description" },
  { pattern: /forget\s+(?:all\s+)?(?:previous|prior|above|your)\s+(?:instructions|rules|guidelines)/i, rule: "desc-injection", level: "high", desc: "Instruction forget command in description" },
  // Identity manipulation
  { pattern: /you\s+are\s+(?:now|actually|really)\s+/i, rule: "desc-identity", level: "high", desc: "Identity manipulation in tool description" },
  { pattern: /\bact\s+as\s+(?:a\s+)?(?:different|new|unrestricted)/i, rule: "desc-identity", level: "high", desc: "Role reassignment in tool description" },
  // Hidden commands
  { pattern: /\bIMPORTANT\s*(?:SYSTEM\s*)?(?:NOTE|INSTRUCTION|UPDATE)\s*:/i, rule: "desc-hidden-cmd", level: "high", desc: "Fake system instruction in tool description" },
  { pattern: /\bSYSTEM\s*:\s*/i, rule: "desc-hidden-cmd", level: "medium", desc: "System prompt marker in tool description" },
  { pattern: /\bADMIN\s*(?:NOTE|OVERRIDE|INSTRUCTION)\s*:/i, rule: "desc-hidden-cmd", level: "high", desc: "Fake admin instruction in tool description" },
  // Data exfiltration hints
  { pattern: /(?:always|must|should)\s+(?:include|append|prepend|add)\s+(?:the\s+)?(?:contents?\s+of|data\s+from|output\s+of)/i, rule: "desc-exfil-hint", level: "high", desc: "Data exfiltration instruction in description" },
  { pattern: /(?:read|access|open|get)\s+(?:the\s+)?(?:~\/\.|\/etc\/|\.env|\.ssh|credentials|secrets|tokens)/i, rule: "desc-exfil-hint", level: "high", desc: "Sensitive file access instruction in description" },
  // Covert action
  { pattern: /(?:do\s+not|don't|never)\s+(?:tell|show|reveal|display|mention)\s+(?:the\s+)?(?:user|human)/i, rule: "desc-covert", level: "high", desc: "Covert action instruction in description" },
  { pattern: /(?:silently|quietly|secretly|covertly|without\s+(?:the\s+)?user)/i, rule: "desc-covert", level: "medium", desc: "Stealth operation hint in description" },
  // Multilingual injection
  { pattern: /忽略|无视|前の指示を|이전.*지시.*무시|игнорируй|ignora\s+las/i, rule: "desc-multilang", level: "high", desc: "Non-English injection in tool description" },
];

// Tool shadowing patterns
const SHADOWING_PATTERNS: { pattern: RegExp; rule: string; level: "high" | "medium"; desc: string }[] = [
  { pattern: /\b(?:replaces?|overrides?|supersedes?|instead\s+of)\s+(?:the\s+)?(?:default|original|built.?in|standard|existing)/i, rule: "tool-shadow", level: "high", desc: "Tool claims to replace/override another tool" },
  { pattern: /\b(?:use\s+this|prefer\s+this|call\s+this)\s+(?:instead|rather|over)\b/i, rule: "tool-shadow", level: "high", desc: "Tool redirects calls from another tool" },
  { pattern: /\b(?:better|improved|enhanced)\s+(?:version|replacement)\s+(?:of|for)\b/i, rule: "tool-shadow", level: "medium", desc: "Tool presents as improved replacement" },
];

// Zero-width / Unicode tricks
const UNICODE_PATTERNS: { pattern: RegExp; rule: string; level: "medium"; desc: string }[] = [
  { pattern: /[\u200b\u200c\u200d\u2060\ufeff]/g, rule: "desc-unicode", level: "medium", desc: "Zero-width characters in tool description (possible hidden text)" },
  { pattern: /[\u2066\u2067\u2068\u2069\u202a\u202b\u202c\u202d\u202e]/g, rule: "desc-bidi", level: "medium", desc: "Bidirectional text override in tool description" },
];

export function detectToolInjection(tool: ToolInfo): DetectionResult[] {
  const results: DetectionResult[] = [];
  const desc = tool.description || "";
  const name = tool.name || "";

  // Check description for injection
  for (const { pattern, rule, level, desc: msg } of DESCRIPTION_INJECTION_PATTERNS) {
    pattern.lastIndex = 0;
    if (pattern.test(desc)) {
      results.push({
        level,
        detector: "tool-injection",
        rule,
        message: msg,
        evidence: desc.substring(0, 200),
        toolName: name,
      });
    }
  }

  // Check for shadowing
  for (const { pattern, rule, level, desc: msg } of SHADOWING_PATTERNS) {
    pattern.lastIndex = 0;
    if (pattern.test(desc)) {
      results.push({
        level,
        detector: "tool-injection",
        rule,
        message: msg,
        evidence: desc.substring(0, 200),
        toolName: name,
      });
    }
  }

  // Check for Unicode tricks
  for (const { pattern, rule, level, desc: msg } of UNICODE_PATTERNS) {
    pattern.lastIndex = 0;
    if (pattern.test(desc)) {
      results.push({
        level,
        detector: "tool-injection",
        rule,
        message: msg,
        evidence: `[contains hidden Unicode characters]`,
        toolName: name,
      });
    }
  }

  // Scope creep: name suggests simple tool but description hints at sensitive ops
  const simpleNames = /^(calc|calculator|math|add|search|hello|echo|time|date|weather)/i;
  const sensitiveOps = /(?:file|exec|shell|system|network|http|database|sql|email|credential|password|key|token|secret)/i;
  if (simpleNames.test(name) && sensitiveOps.test(desc)) {
    results.push({
      level: "medium",
      detector: "tool-injection",
      rule: "scope-creep",
      message: `Tool "${name}" has simple name but description mentions sensitive operations`,
      evidence: desc.substring(0, 200),
      toolName: name,
    });
  }

  return results;
}

/** Bulk check all tools from a tools/list response */
export function detectToolListInjection(tools: ToolInfo[]): DetectionResult[] {
  const results: DetectionResult[] = [];

  // Per-tool checks
  for (const tool of tools) {
    results.push(...detectToolInjection(tool));
  }

  // Anomaly: too many tools registered
  if (tools.length > 50) {
    results.push({
      level: "medium",
      detector: "tool-injection",
      rule: "tool-count-anomaly",
      message: `MCP server registers ${tools.length} tools — unusually high count`,
      evidence: `Tool names: ${tools.slice(0, 10).map(t => t.name).join(", ")}...`,
      toolName: "*",
    });
  }

  // Check for duplicate/similar tool names (shadowing)
  const names = tools.map(t => t.name.toLowerCase());
  const seen = new Set<string>();
  for (const name of names) {
    if (seen.has(name)) {
      results.push({
        level: "high",
        detector: "tool-injection",
        rule: "duplicate-tool",
        message: `Duplicate tool name: "${name}" registered multiple times`,
        evidence: `This can cause tool shadowing attacks`,
        toolName: name,
      });
    }
    seen.add(name);
  }

  return results;
}
