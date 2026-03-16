import { execSync } from "child_process";
import { homedir } from "os";
import { join } from "path";
import type { EngineAdapter, EngineResult, EngineFinding } from "./types.js";

/**
 * Bandit adapter — Python security linter
 * https://github.com/PyCQA/bandit (7k+ stars)
 */
export class BanditAdapter implements EngineAdapter {
  id = "bandit";
  displayName = "Bandit";
  focus = "Python 代码安全检测";
  url = "https://github.com/PyCQA/bandit";

  async isAvailable(): Promise<boolean> {
    try {
      execSync("bandit --version 2>/dev/null", {
        timeout: 10000, stdio: "pipe", shell: "/bin/bash",
        env: { ...process.env, PATH: `${homedir()}/.local/bin:${homedir()}/.agentshield/bin:${process.env.PATH}` },
      });
      return true;
    } catch { return false; }
  }

  installInstructions(): string { return "pipx install bandit"; }

  async scan(targetDir: string): Promise<EngineResult> {
    const start = Date.now();
    if (!(await this.isAvailable())) {
      return { engine: this.id, displayName: this.displayName, available: false, findings: null, error: "Not installed", durationMs: Date.now() - start, focus: this.focus };
    }

    try {
      let raw = "";
      try {
        raw = execSync(
          `bandit -r "${targetDir}" -f json --quiet 2>/dev/null`,
          {
            timeout: 120000, maxBuffer: 10 * 1024 * 1024, stdio: ["pipe", "pipe", "pipe"],
            shell: "/bin/bash",
            env: { ...process.env, PATH: `${homedir()}/.local/bin:${homedir()}/.agentshield/bin:${process.env.PATH}` },
          }
        ).toString();
      } catch (e: any) {
        if (e.stdout) raw = e.stdout.toString();
      }

      const findings: EngineFinding[] = [];

      if (raw.trim()) {
        try {
          const data = JSON.parse(raw);
          if (data.results && Array.isArray(data.results)) {
            for (const r of data.results) {
              findings.push({
                engine: this.id,
                severity: mapSev(r.issue_severity),
                file: r.filename || "unknown",
                line: r.line_number,
                rule: r.test_id || "bandit",
                message: `${r.test_name}: ${r.issue_text}`.slice(0, 150),
                evidence: r.code?.slice(0, 80) || "",
                category: mapCategory(r.test_id),
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
  if (l === "HIGH") return "high";
  if (l === "MEDIUM") return "medium";
  if (l === "LOW") return "low";
  return "info";
}

function mapCategory(testId: string): string {
  if (!testId) return "general";
  // B1xx = misc, B2xx = crypto, B3xx = injection, B5xx = exec, B6xx = injection
  if (testId.startsWith("B5") || testId.startsWith("B6")) return "code-execution";
  if (testId.startsWith("B3")) return "injection";
  if (testId.startsWith("B2")) return "crypto";
  return "general";
}
