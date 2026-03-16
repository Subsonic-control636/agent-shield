import { execSync } from "child_process";
import { existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import type { EngineAdapter, EngineResult, EngineFinding } from "./types.js";

/**
 * Bearer adapter — Data flow + privacy scanner
 * https://github.com/Bearer/bearer (2k+ stars)
 */
export class BearerAdapter implements EngineAdapter {
  id = "bearer";
  displayName = "Bearer";
  focus = "数据流分析 + 隐私风险检测";
  url = "https://github.com/Bearer/bearer";

  private getBin(): string {
    const localBin = join(homedir(), ".agentshield", "bin", "bearer");
    if (existsSync(localBin)) return localBin;
    return "bearer";
  }

  async isAvailable(): Promise<boolean> {
    try {
      execSync(`${this.getBin()} version 2>/dev/null`, { timeout: 10000, stdio: "pipe" });
      return true;
    } catch { return false; }
  }

  installInstructions(): string { return "curl -sfL https://raw.githubusercontent.com/Bearer/bearer/main/contrib/install.sh | sh -s -- -b ~/.agentshield/bin"; }

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
          `${bin} scan "${targetDir}" --format json --quiet 2>/dev/null`,
          { timeout: 120000, maxBuffer: 10 * 1024 * 1024, stdio: ["pipe", "pipe", "pipe"] }
        ).toString();
      } catch (e: any) {
        if (e.stdout) raw = e.stdout.toString();
      }

      const findings: EngineFinding[] = [];

      if (raw.trim()) {
        try {
          const data = JSON.parse(raw);
          const rules = data.findings || data.results || [];
          if (Array.isArray(rules)) {
            for (const r of rules) {
              findings.push({
                engine: this.id,
                severity: mapSev(r.severity || r.level),
                file: r.filename || r.file || "unknown",
                line: r.line_number || r.line,
                rule: r.rule_id || r.id || "bearer",
                message: (r.title || r.description || r.message || "").slice(0, 150),
                evidence: (r.snippet || r.code || "").slice(0, 80),
                category: r.category || "data-flow",
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

function mapSev(s: string): "high" | "medium" | "low" | "info" {
  const l = (s || "").toUpperCase();
  if (l === "CRITICAL" || l === "HIGH" || l === "ERROR") return "high";
  if (l === "MEDIUM" || l === "WARNING") return "medium";
  if (l === "LOW") return "low";
  return "info";
}
