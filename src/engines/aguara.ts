import { execSync } from "child_process";
import type { EngineAdapter, EngineResult, EngineFinding } from "./types.js";

export class AguaraAdapter implements EngineAdapter {
  id = "aguara";
  displayName = "Aguara";
  focus = "Prompt injection, data exfiltration, supply-chain attacks (177 rules, NLP + taint tracking)";
  url = "https://github.com/garagon/aguara";

  async isAvailable(): Promise<boolean> {
    try {
      execSync("aguara --version", { timeout: 5000, stdio: "pipe" });
      return true;
    } catch {
      return false;
    }
  }

  installInstructions(): string {
    return `curl -fsSL https://raw.githubusercontent.com/garagon/aguara/main/install.sh | bash`;
  }

  async scan(targetDir: string): Promise<EngineResult> {
    const start = Date.now();
    const available = await this.isAvailable();
    if (!available) {
      return {
        engine: this.id, displayName: this.displayName, available: false, findings: null,
        error: `Not installed. Run: ${this.installInstructions()}`,
        durationMs: Date.now() - start, focus: this.focus,
      };
    }

    try {
      let output: string;
      try {
        output = execSync(`aguara scan "${targetDir}" --format json`, {
          timeout: 120000, stdio: ["pipe", "pipe", "pipe"], maxBuffer: 10 * 1024 * 1024,
        }).toString();
      } catch (err: any) {
        // aguara exits non-zero when findings exist — output is still valid
        output = err.stdout?.toString() || "";
        if (!output) throw err;
      }

      const data = JSON.parse(output);
      const findings: EngineFinding[] = (data.findings || data.results || []).map((f: any) => ({
        engine: this.id,
        severity: mapSeverity(f.severity || f.level),
        file: f.file || f.path || "",
        line: f.line || f.start_line,
        rule: f.rule || f.rule_id || f.check || "",
        message: f.message || f.description || "",
        evidence: f.evidence || f.snippet || f.match || "",
        confidence: f.confidence ?? 0.7,
        category: f.category || f.rule,
      }));

      return {
        engine: this.id, displayName: this.displayName,
        version: data.version, available: true, findings,
        durationMs: Date.now() - start, focus: this.focus,
      };
    } catch (err) {
      return {
        engine: this.id, displayName: this.displayName, available: true, findings: null,
        error: (err as Error).message, durationMs: Date.now() - start, focus: this.focus,
      };
    }
  }
}

function mapSeverity(s: string): "high" | "medium" | "low" | "info" {
  const lower = (s || "").toLowerCase();
  if (lower === "critical" || lower === "high") return "high";
  if (lower === "medium" || lower === "warning") return "medium";
  if (lower === "low") return "low";
  return "info";
}
