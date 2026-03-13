/**
 * Sensitive Data Leak Detector
 * 
 * Scans MCP tool call arguments for:
 * - Sensitive file paths (~/.ssh, ~/.aws, /etc/passwd)
 * - Path traversal attempts
 * - Credential-bearing URLs
 * - Environment variable references
 */

import type { DetectionResult } from "./tool-injection.js";

const SENSITIVE_PATHS: { pattern: RegExp; rule: string; level: "high" | "medium"; desc: string }[] = [
  // SSH keys and config
  { pattern: /~\/\.ssh\/|\/\.ssh\//i, rule: "arg-ssh-access", level: "high", desc: "SSH directory access" },
  { pattern: /id_rsa|id_ed25519|id_ecdsa|authorized_keys/i, rule: "arg-ssh-key", level: "high", desc: "SSH key file access" },
  // AWS credentials
  { pattern: /~\/\.aws\/|\/\.aws\//i, rule: "arg-aws-access", level: "high", desc: "AWS credentials directory access" },
  { pattern: /\.aws\/credentials/i, rule: "arg-aws-creds", level: "high", desc: "AWS credentials file access" },
  // Kubernetes
  { pattern: /~\/\.kube\/|\/\.kube\//i, rule: "arg-kube-access", level: "high", desc: "Kubernetes config access" },
  // Git credentials
  { pattern: /\.git-credentials|\.gitconfig/i, rule: "arg-git-creds", level: "medium", desc: "Git credentials access" },
  // System files
  { pattern: /\/etc\/(?:passwd|shadow|sudoers)/i, rule: "arg-sys-file", level: "high", desc: "System file access" },
  // Environment files
  { pattern: /\.env(?:\.|$)|\.env\.local|\.env\.production/i, rule: "arg-env-file", level: "medium", desc: "Environment file access" },
  // Database files
  { pattern: /\.sqlite|\.db$|\.sql$/i, rule: "arg-db-file", level: "medium", desc: "Database file access" },
  // Browser data
  { pattern: /(?:Chrome|Firefox|Safari).*(?:Login\s+Data|Cookies|History)/i, rule: "arg-browser-data", level: "high", desc: "Browser credential store access" },
  // GPG/PGP
  { pattern: /~\/\.gnupg\/|\/\.gnupg\//i, rule: "arg-gpg-access", level: "high", desc: "GPG keyring access" },
  // Config directories
  { pattern: /~\/\.config\/|\/\.config\//i, rule: "arg-config-access", level: "medium", desc: "Config directory access" },
];

const PATH_TRAVERSAL: { pattern: RegExp; rule: string; level: "high" | "medium"; desc: string }[] = [
  { pattern: /\.\.\/\.\.\/\.\.\//i, rule: "arg-deep-traversal", level: "high", desc: "Deep path traversal (3+ levels)" },
  { pattern: /\.\.\//g, rule: "arg-traversal", level: "medium", desc: "Path traversal attempt" },
  { pattern: /%2e%2e%2f|%2e%2e\//i, rule: "arg-encoded-traversal", level: "high", desc: "URL-encoded path traversal" },
];

const CREDENTIAL_URLS: { pattern: RegExp; rule: string; level: "high"; desc: string }[] = [
  { pattern: /https?:\/\/[^@\s]*:[^@\s]*@/i, rule: "arg-cred-url", level: "high", desc: "URL contains embedded credentials" },
  { pattern: /(?:api[_-]?key|token|secret|password|auth)=[A-Za-z0-9_-]{8,}/i, rule: "arg-cred-param", level: "high", desc: "Credential in URL parameter" },
];

export function detectDataLeak(toolName: string, args: Record<string, unknown>): DetectionResult[] {
  const detections: DetectionResult[] = [];
  const argsStr = JSON.stringify(args);

  // Check sensitive paths
  for (const { pattern, rule, level, desc } of SENSITIVE_PATHS) {
    pattern.lastIndex = 0;
    if (pattern.test(argsStr)) {
      const match = argsStr.match(pattern);
      detections.push({
        level,
        detector: "data-leak",
        rule,
        message: desc,
        evidence: match ? match[0] : argsStr.substring(0, 150),
        toolName,
      });
    }
  }

  // Check path traversal
  for (const { pattern, rule, level, desc } of PATH_TRAVERSAL) {
    pattern.lastIndex = 0;
    if (pattern.test(argsStr)) {
      detections.push({
        level,
        detector: "data-leak",
        rule,
        message: desc,
        evidence: argsStr.substring(0, 150),
        toolName,
      });
    }
  }

  // Check credential URLs
  for (const { pattern, rule, level, desc } of CREDENTIAL_URLS) {
    pattern.lastIndex = 0;
    if (pattern.test(argsStr)) {
      detections.push({
        level,
        detector: "data-leak",
        rule,
        message: desc,
        evidence: "[URL redacted]",
        toolName,
      });
    }
  }

  return detections;
}
