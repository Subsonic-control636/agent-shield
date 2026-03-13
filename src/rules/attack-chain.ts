import type { Rule, Finding, ScannedFile } from "../types.js";

/**
 * Rule: attack-chain
 * Detects multi-step attack patterns — complete kill chains that combine
 * individually benign operations into dangerous sequences.
 *
 * Kill chain stages:
 *   Reconnaissance → Access → Collection → Exfiltration → Persistence
 *
 * This goes beyond single-pattern matching. We look for COMBINATIONS of
 * behaviors across a codebase that form known attack patterns.
 */

// === Stage 1: Reconnaissance — gathering system/environment info ===
const RECON_PATTERNS = [
  { pattern: /os\.uname|platform\.system|platform\.node|socket\.gethostname/i, stage: "recon", desc: "Gathers system information" },
  { pattern: /os\.listdir\s*\(\s*["'`]\/|os\.walk\s*\(\s*["'`]\//i, stage: "recon", desc: "Enumerates root filesystem" },
  { pattern: /subprocess.*(?:whoami|id\s|hostname|uname|ifconfig|ip\s+addr)/i, stage: "recon", desc: "Runs system recon commands" },
  { pattern: /os\.environ\.keys|os\.environ\.items|dict\(os\.environ\)/i, stage: "recon", desc: "Dumps all environment variables" },
  { pattern: /glob\.glob\s*\(\s*["'`].*(?:\*\*|\.ssh|\.aws|\.kube)/i, stage: "recon", desc: "Searches for sensitive files via glob" },
];

// === Stage 2: Access — gaining access to sensitive resources ===
const ACCESS_PATTERNS = [
  { pattern: /open\s*\([^)]*(?:\/etc\/passwd|\/etc\/shadow|\.ssh\/|\.aws\/|\.kube\/)/i, stage: "access", desc: "Opens sensitive system files" },
  { pattern: /readFileSync\s*\([^)]*(?:\.ssh|\.env|\.aws|credentials|private.?key)/i, stage: "access", desc: "Reads sensitive files" },
  { pattern: /os\.environ\s*\[\s*["'](?:AWS_|OPENAI_|ANTHROPIC_|DATABASE_|DB_|MONGO|REDIS|SECRET|PRIVATE)/i, stage: "access", desc: "Accesses sensitive env vars" },
  { pattern: /keyring\.get_password|keychain|credential_store/i, stage: "access", desc: "Accesses system credential store" },
];

// === Stage 3: Collection — aggregating collected data ===
const COLLECTION_PATTERNS = [
  { pattern: /json\.dumps?\s*\(\s*\{[^}]*(?:key|secret|password|token|credential)/i, stage: "collect", desc: "Serializes sensitive data to JSON" },
  { pattern: /base64\.(?:b64encode|encodebytes|encodestring)/i, stage: "collect", desc: "Base64 encodes data (potential obfuscation)" },
  { pattern: /\.encode\s*\(\s*["'](?:utf-8|ascii)["']\s*\).*base64|base64.*\.encode/i, stage: "collect", desc: "Encodes data before transmission" },
  { pattern: /zipfile\.ZipFile\s*\(.*["']w["']/i, stage: "collect", desc: "Creates zip archive (potential data staging)" },
  { pattern: /tar\.open\s*\(.*["']w/i, stage: "collect", desc: "Creates tar archive (potential data staging)" },
];

// === Stage 4: Exfiltration — sending data out ===
const EXFIL_PATTERNS = [
  { pattern: /requests\.post\s*\(\s*(?!.*localhost|.*127\.0\.0\.1|.*self\.).*json\s*=/i, stage: "exfil", desc: "POSTs data to external server" },
  { pattern: /urllib\.request\.urlopen\s*\(.*Request\s*\(/i, stage: "exfil", desc: "Sends data via urllib" },
  { pattern: /smtplib\.SMTP|email\.mime/i, stage: "exfil", desc: "Sends email (potential data exfiltration)" },
  { pattern: /(?:ftplib|paramiko)\..*(?:put|upload|send|store)/i, stage: "exfil", desc: "Uploads data via FTP/SFTP" },
  { pattern: /webhook|discord\..*(?:send|post)|slack\..*(?:send|post)|telegram.*(?:send|post)/i, stage: "exfil", desc: "Sends data to messaging webhook" },
];

// === Stage 5: Persistence — maintaining access ===
const PERSISTENCE_PATTERNS = [
  { pattern: /crontab|sched\.scheduler|schedule\.every|apscheduler/i, stage: "persist", desc: "Schedules recurring execution" },
  { pattern: /(?:systemd|launchd|init\.d).*(?:install|register|enable)/i, stage: "persist", desc: "Installs system service" },
  { pattern: /(?:ssh-keygen|authorized_keys|\.ssh\/config).*(?:write|append|>>)/i, stage: "persist", desc: "Modifies SSH configuration" },
  { pattern: /(?:\.bashrc|\.profile|\.zshrc|\.bash_profile).*(?:write|append|>>|open.*w)/i, stage: "persist", desc: "Modifies shell profile" },
  { pattern: /registry.*(?:set|create)|winreg.*(?:set|create)/i, stage: "persist", desc: "Modifies Windows registry" },
];

// === Known attack chain signatures ===
interface ChainSignature {
  name: string;
  severity: "high" | "medium";
  requiredStages: string[];
  description: string;
}

const KNOWN_CHAINS: ChainSignature[] = [
  {
    name: "Data Exfiltration Kill Chain",
    severity: "high",
    requiredStages: ["access", "exfil"],
    description: "Reads sensitive data and sends it to external server — classic exfiltration pattern",
  },
  {
    name: "Full Kill Chain (Recon → Access → Exfil)",
    severity: "high",
    requiredStages: ["recon", "access", "exfil"],
    description: "Complete attack sequence: system reconnaissance, credential access, and data exfiltration",
  },
  {
    name: "Persistent Backdoor",
    severity: "high",
    requiredStages: ["access", "persist"],
    description: "Accesses credentials and establishes persistence — ongoing backdoor risk",
  },
  {
    name: "Staged Exfiltration",
    severity: "high",
    requiredStages: ["access", "collect", "exfil"],
    description: "Collects sensitive data, stages it, then exfiltrates — sophisticated attack pattern",
  },
  {
    name: "Recon + Persistence",
    severity: "medium",
    requiredStages: ["recon", "persist"],
    description: "Gathers system info and establishes persistence — potential APT staging",
  },
];

const ALL_STAGE_PATTERNS = [
  ...RECON_PATTERNS,
  ...ACCESS_PATTERNS,
  ...COLLECTION_PATTERNS,
  ...EXFIL_PATTERNS,
  ...PERSISTENCE_PATTERNS,
];

export const attackChainRule: Rule = {
  id: "attack-chain",
  name: "Attack Chain Detection",
  description: "Detects multi-step attack patterns (kill chains) across the codebase",

  run(files: ScannedFile[]): Finding[] {
    const findings: Finding[] = [];
    const codeFiles = files.filter(f => [".ts", ".js", ".py", ".sh"].includes(f.ext));
    if (codeFiles.length === 0) return findings;

    // Analyze each file for kill chain stages
    const fileStages = new Map<string, { stages: Set<string>; evidence: Map<string, string[]> }>();

    for (const file of codeFiles) {
      const stages = new Set<string>();
      const evidence = new Map<string, string[]>();

      for (let i = 0; i < file.lines.length; i++) {
        const line = file.lines[i]!;
        const trimmed = line.trimStart();
        if (trimmed.startsWith("#") || trimmed.startsWith("//") || trimmed.startsWith("*")) continue;

        for (const { pattern, stage, desc } of ALL_STAGE_PATTERNS) {
          if (pattern.test(line)) {
            stages.add(stage);
            if (!evidence.has(stage)) evidence.set(stage, []);
            evidence.get(stage)!.push(`${file.relativePath}:${i + 1} — ${desc}`);
          }
        }
      }

      if (stages.size > 0) {
        fileStages.set(file.relativePath, { stages, evidence });
      }
    }

    // === Single-file chain detection ===
    for (const [filePath, { stages, evidence }] of fileStages) {
      for (const chain of KNOWN_CHAINS) {
        if (chain.requiredStages.every(s => stages.has(s))) {
          const chainEvidence = chain.requiredStages
            .map(s => evidence.get(s)?.[0])
            .filter(Boolean)
            .join(" → ");

          findings.push({
            rule: "attack-chain",
            severity: chain.severity,
            file: filePath,
            message: `${chain.name}: ${chain.description}`,
            evidence: chainEvidence.slice(0, 200),
            confidence: "high",
          });
        }
      }
    }

    // === Cross-file chain detection ===
    // Aggregate stages across all files
    const globalStages = new Set<string>();
    const globalEvidence = new Map<string, string[]>();

    for (const [, { stages, evidence }] of fileStages) {
      for (const stage of stages) {
        globalStages.add(stage);
        if (!globalEvidence.has(stage)) globalEvidence.set(stage, []);
        globalEvidence.get(stage)!.push(...(evidence.get(stage) || []));
      }
    }

    // Only report cross-file chains if no single file already has the complete chain
    for (const chain of KNOWN_CHAINS) {
      if (chain.requiredStages.every(s => globalStages.has(s))) {
        // Check if any single file already has this chain (avoid duplicate)
        const singleFileHasChain = Array.from(fileStages.values()).some(
          ({ stages }) => chain.requiredStages.every(s => stages.has(s))
        );

        if (!singleFileHasChain && chain.requiredStages.length >= 2) {
          const chainEvidence = chain.requiredStages
            .map(s => globalEvidence.get(s)?.[0])
            .filter(Boolean)
            .join(" → ");

          findings.push({
            rule: "attack-chain",
            severity: chain.severity,
            file: ".",
            message: `Cross-file ${chain.name}: ${chain.description} (distributed across multiple files)`,
            evidence: chainEvidence.slice(0, 200),
            confidence: "medium",
          });
        }
      }
    }

    return findings;
  },
};
