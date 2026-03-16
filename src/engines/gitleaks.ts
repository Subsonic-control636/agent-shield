import { execSync } from "child_process";
import { existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import type { EngineAdapter, EngineResult, EngineFinding } from "./types.js";

/**
 * Gitleaks adapter — Secret/token leak detection
 * https://github.com/gitleaks/gitleaks (18k+ stars)
 */
export class GitleaksAdapter implements EngineAdapter {
  id = "gitleaks";
  displayName = "Gitleaks";
  focus = "密钥和 Token 泄露检测";
  url = "https://github.com/gitleaks/gitleaks";

  private getBin(): string {
    const localBin = join(homedir(), ".agentshield", "bin", "gitleaks");
    if (existsSync(localBin)) return localBin;
    return "gitleaks";
  }

  async isAvailable(): Promise<boolean> {
    try {
      execSync(`${this.getBin()} version 2>/dev/null`, { timeout: 10000, stdio: "pipe" });
      return true;
    } catch { return false; }
  }

  installInstructions(): string { return "https://github.com/gitleaks/gitleaks/releases"; }

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
          `${bin} detect --source "${targetDir}" --report-format json --no-git 2>/dev/null`,
          { timeout: 60000, maxBuffer: 10 * 1024 * 1024, stdio: ["pipe", "pipe", "pipe"] }
        ).toString();
      } catch (e: any) {
        if (e.stdout) raw = e.stdout.toString();
      }

      const findings: EngineFinding[] = [];

      if (raw.trim()) {
        try {
          const leaks = JSON.parse(raw);
          if (Array.isArray(leaks)) {
            for (const leak of leaks) {
              findings.push({
                engine: this.id,
                severity: "high",
                file: leak.File || "unknown",
                line: leak.StartLine,
                rule: "secret-leak",
                message: `${leak.Description || leak.RuleID}: secret detected`,
                evidence: leak.Match?.slice(0, 80) || "",
                category: "credentials",
              });
            }
          }
        } catch { /* parse failed */ }
      }

      return { engine: this.id, displayName: this.displayName, available: true, findings, durationMs: Date.now() - start, focus: this.focus };
    } catch (err) {
      return { engine: this.id, displayName: this.displayName, available: true, findings: null, error: (err as Error).message?.slice(0, 200), durationMs: Date.now() - start, focus: this.focus };
    }
  }
}
