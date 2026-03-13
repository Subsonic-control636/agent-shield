/**
 * Tool Result Injection Detector
 * 
 * Scans MCP tool execution results for:
 * - Indirect prompt injection (hidden instructions in results)
 * - Credential/token leaks in responses
 * - Encoded payloads (base64, hex)
 * - Excessive data volume (exfil indicator)
 */

import type { DetectionResult } from "./tool-injection.js";

// Injection patterns in tool results
const RESULT_INJECTION_PATTERNS: { pattern: RegExp; rule: string; level: "high" | "medium"; desc: string }[] = [
  // Indirect prompt injection (instructions embedded in tool output)
  { pattern: /ignore\s+(?:all\s+)?(?:previous|above|prior)\s+instructions/i, rule: "result-injection", level: "high", desc: "Prompt injection in tool result" },
  { pattern: /\bIMPORTANT\s*(?:SYSTEM\s*)?(?:NOTE|INSTRUCTION|UPDATE)\s*:/i, rule: "result-injection", level: "high", desc: "Fake system instruction in tool result" },
  { pattern: /you\s+(?:must|should|need\s+to)\s+(?:now|immediately|first)\s+(?:read|access|send|open|execute|run)/i, rule: "result-injection", level: "high", desc: "Command injection in tool result" },
  { pattern: /\[SYSTEM\]|\[ADMIN\]|\[OVERRIDE\]|\[PRIORITY\]/i, rule: "result-injection", level: "high", desc: "Fake priority marker in tool result" },
  { pattern: /(?:do\s+not|don't|never)\s+(?:tell|show|reveal|display)\s+(?:the\s+)?(?:user|human)/i, rule: "result-covert", level: "high", desc: "Covert action instruction in tool result" },
  // Data exfiltration commands
  { pattern: /(?:send|post|upload|transmit)\s+(?:this|the|all)\s+(?:data|content|information|results?)\s+to/i, rule: "result-exfil-cmd", level: "high", desc: "Exfiltration command in tool result" },
  { pattern: /(?:curl|wget|fetch|http)\s+https?:\/\//i, rule: "result-exfil-cmd", level: "medium", desc: "HTTP request instruction in tool result" },
  // Multilingual injection in results
  { pattern: /忽略上面的|前の指示を無視|이전.*지시.*무시|игнорируй/i, rule: "result-multilang", level: "high", desc: "Non-English injection in tool result" },
];

// Credential patterns in results
const CREDENTIAL_PATTERNS: { pattern: RegExp; rule: string; level: "high" | "medium"; desc: string }[] = [
  { pattern: /-----BEGIN\s+(?:RSA\s+)?(?:PRIVATE|EC)\s+KEY-----/i, rule: "result-key-leak", level: "high", desc: "Private key leaked in tool result" },
  { pattern: /AKIA[0-9A-Z]{16}/i, rule: "result-aws-key", level: "high", desc: "AWS access key in tool result" },
  { pattern: /(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9_]{36}/i, rule: "result-github-token", level: "high", desc: "GitHub token in tool result" },
  { pattern: /sk-[A-Za-z0-9]{20,}/i, rule: "result-openai-key", level: "high", desc: "OpenAI API key in tool result" },
  { pattern: /(?:xox[bpsa]-[A-Za-z0-9-]{10,})/i, rule: "result-slack-token", level: "high", desc: "Slack token in tool result" },
  { pattern: /eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/i, rule: "result-jwt", level: "medium", desc: "JWT token in tool result" },
];

// Suspicious encoded payloads
const ENCODING_PATTERNS: { pattern: RegExp; rule: string; level: "medium"; desc: string }[] = [
  { pattern: /(?:eval|exec|Function)\s*\(\s*(?:atob|Buffer\.from)\s*\(/i, rule: "result-encoded-exec", level: "medium", desc: "Encoded code execution in tool result" },
  { pattern: /\\x[0-9a-f]{2}(?:\\x[0-9a-f]{2}){10,}/i, rule: "result-hex-payload", level: "medium", desc: "Large hex-encoded payload in tool result" },
];

/** Maximum safe result size (characters) before flagging */
const MAX_SAFE_RESULT_SIZE = 100_000;

export function detectResultInjection(toolName: string, result: unknown): DetectionResult[] {
  const detections: DetectionResult[] = [];
  const resultStr = typeof result === "string" ? result : JSON.stringify(result || "");

  // Check size anomaly
  if (resultStr.length > MAX_SAFE_RESULT_SIZE) {
    detections.push({
      level: "medium",
      detector: "result-injection",
      rule: "result-size-anomaly",
      message: `Tool result unusually large: ${(resultStr.length / 1024).toFixed(0)}KB — possible data dump`,
      evidence: `First 200 chars: ${resultStr.substring(0, 200)}`,
      toolName,
    });
  }

  // Check injection patterns
  for (const { pattern, rule, level, desc } of RESULT_INJECTION_PATTERNS) {
    pattern.lastIndex = 0;
    if (pattern.test(resultStr)) {
      const match = resultStr.match(pattern);
      detections.push({
        level,
        detector: "result-injection",
        rule,
        message: desc,
        evidence: match ? match[0].substring(0, 150) : resultStr.substring(0, 150),
        toolName,
      });
    }
  }

  // Check credential leaks
  for (const { pattern, rule, level, desc } of CREDENTIAL_PATTERNS) {
    pattern.lastIndex = 0;
    if (pattern.test(resultStr)) {
      detections.push({
        level,
        detector: "result-injection",
        rule,
        message: desc,
        evidence: "[credential redacted]",
        toolName,
      });
    }
  }

  // Check encoded payloads
  for (const { pattern, rule, level, desc } of ENCODING_PATTERNS) {
    pattern.lastIndex = 0;
    if (pattern.test(resultStr)) {
      detections.push({
        level,
        detector: "result-injection",
        rule,
        message: desc,
        evidence: resultStr.substring(0, 150),
        toolName,
      });
    }
  }

  return detections;
}
