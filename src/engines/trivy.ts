import { execSync } from "child_process";
import { existsSync } from "fs";
import { join } from "path";
import { homedir, platform, arch } from "os";
import type { EngineAdapter, EngineResult, EngineFinding } from "./types.js";

/**
 * Trivy adapter — Vulnerability scanner + secret detection
 * https://github.com/aquasecurity/trivy (24k+ stars)
 */
export class TrivyAdapter implements EngineAdapter {
  id = "trivy";
  displayName = "Trivy";
  focus = "漏洞扫描 + 密钥检测 + SBOM 分析";
  url = "https://github.com/aquasecurity/trivy";

  private getBin(): string {
    const localBin = join(homedir(), ".agentshield", "bin", "trivy");
    if (existsSync(localBin)) return localBin;
    return "trivy";
  }

  async isAvailable(): Promise<boolean> {
    try {
      execSync(`${this.getBin()} --version 2>/dev/null`, { timeout: 10000, stdio: "pipe" });
      return true;
    } catch { return false; }
  }

  installInstructions(): string { return "curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b ~/.agentshield/bin"; }

  async scan(targetDir: string): Promise<EngineResult> {
    const start = Date.now();
    if (!(await this.isAvailable())) {
      return { engine: this.id, displayName: this.displayName, available: false, findings: null, error: "Not installed", durationMs: Date.now() - start, focus: this.focus };
    }

    try {
      const bin = this.getBin();
      let raw = "";
      try {
        raw = execSync(
          `${bin} fs --scanners vuln,secret --format json --quiet "${targetDir}" 2>/dev/null`,
          { timeout: 120000, maxBuffer: 20 * 1024 * 1024, stdio: ["pipe", "pipe", "pipe"] }
        ).toString();
      } catch (e: any) {
        // Trivy exits non-zero when it finds issues
        if (e.stdout) raw = e.stdout.toString();
      }

      const findings: EngineFinding[] = [];

      if (raw.trim()) {
        try {
          const data = JSON.parse(raw);
          // Parse vulnerabilities
          if (data.Results) {
            for (const result of data.Results) {
              if (result.Vulnerabilities) {
                for (const vuln of result.Vulnerabilities) {
                  findings.push({
                    engine: this.id,
                    severity: mapSev(vuln.Severity),
                    file: result.Target || "unknown",
                    rule: "vulnerability",
                    message: `${vuln.VulnerabilityID}: ${vuln.Title || vuln.Description || ""}`.slice(0, 120),
                    evidence: `${vuln.PkgName}@${vuln.InstalledVersion} → fix: ${vuln.FixedVersion || "none"}`,
                    category: "supply-chain",
                  });
                }
              }
              if (result.Secrets) {
                for (const secret of result.Secrets) {
                  findings.push({
                    engine: this.id,
                    severity: "high",
                    file: result.Target || "unknown",
                    line: secret.StartLine,
                    rule: "hardcoded-secret",
                    message: `Secret detected: ${secret.Category} (${secret.Title})`,
                    evidence: secret.Match?.slice(0, 80) || "",
                    category: "credentials",
                  });
                }
              }
            }
          }
        } catch { /* JSON parse failed */ }
      }

      return { engine: this.id, displayName: this.displayName, available: true, findings, durationMs: Date.now() - start, focus: this.focus };
    } catch (err) {
      return { engine: this.id, displayName: this.displayName, available: true, findings: null, error: (err as Error).message?.slice(0, 200), durationMs: Date.now() - start, focus: this.focus };
    }
  }
}

function mapSev(s: string): "high" | "medium" | "low" | "info" {
  const l = (s || "").toUpperCase();
  if (l === "CRITICAL" || l === "HIGH") return "high";
  if (l === "MEDIUM") return "medium";
  if (l === "LOW") return "low";
  return "info";
}
