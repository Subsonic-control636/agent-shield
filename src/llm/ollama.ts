import type { LlmProvider, LlmAnalysisResult, LlmFinding } from "./types.js";
import { SYSTEM_PROMPT, buildUserPrompt } from "./prompt.js";

/** Ollama local provider */
export class OllamaProvider implements LlmProvider {
  name = "ollama";
  private model: string;
  private baseUrl: string;

  constructor(model?: string, baseUrl?: string) {
    this.model = model || "llama3.2";
    this.baseUrl = (baseUrl || "http://localhost:11434").replace(/\/$/, "");
  }

  async analyze(text: string, filename: string): Promise<LlmAnalysisResult> {
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(text, filename) },
        ],
        stream: false,
        format: "json",
        options: { temperature: 0 },
      }),
      signal: AbortSignal.timeout(60_000), // Ollama can be slower
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      throw new Error(`Ollama API error ${response.status}: ${body.slice(0, 200)}`);
    }

    const data = await response.json() as {
      message?: { content: string };
      eval_count?: number;
      prompt_eval_count?: number;
    };

    const content = data.message?.content || "[]";
    const findings = parseFindings(content);

    return {
      findings,
      model: this.model,
      tokensUsed: (data.eval_count || 0) + (data.prompt_eval_count || 0) || undefined,
    };
  }
}

function parseFindings(content: string): LlmFinding[] {
  try {
    const cleaned = content.replace(/^```(?:json)?\n?/gm, "").replace(/\n?```$/gm, "").trim();
    const parsed = JSON.parse(cleaned);
    const arr = Array.isArray(parsed) ? parsed : (parsed.findings || parsed.results || []);
    if (!Array.isArray(arr)) return [];

    return arr
      .filter((item: unknown) => item && typeof item === "object")
      .map((item: Record<string, unknown>) => ({
        line: typeof item.line === "number" ? item.line : undefined,
        severity: item.severity === "critical" ? "critical" as const : "warning" as const,
        description: String(item.description || "LLM-detected prompt injection"),
        evidence: item.evidence ? String(item.evidence).slice(0, 120) : undefined,
      }));
  } catch {
    return [];
  }
}
