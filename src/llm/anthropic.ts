import type { LlmProvider, LlmAnalysisResult, LlmFinding } from "./types.js";
import { SYSTEM_PROMPT, buildUserPrompt } from "./prompt.js";

/** Anthropic Claude provider */
export class AnthropicProvider implements LlmProvider {
  name = "anthropic";
  private apiKey: string;
  private model: string;
  private baseUrl: string;

  constructor(apiKey: string, model?: string, baseUrl?: string) {
    this.apiKey = apiKey;
    this.model = model || "claude-sonnet-4-20250514";
    this.baseUrl = (baseUrl || "https://api.anthropic.com").replace(/\/$/, "");
  }

  async analyze(text: string, filename: string): Promise<LlmAnalysisResult> {
    const response = await fetch(`${this.baseUrl}/v1/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: this.model,
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages: [
          { role: "user", content: buildUserPrompt(text, filename) },
        ],
        temperature: 0,
      }),
      signal: AbortSignal.timeout(30_000),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      throw new Error(`Anthropic API error ${response.status}: ${body.slice(0, 200)}`);
    }

    const data = await response.json() as {
      content: Array<{ type: string; text: string }>;
      usage?: { input_tokens: number; output_tokens: number };
    };

    const content = data.content?.find(c => c.type === "text")?.text || "[]";
    const findings = parseFindings(content);

    return {
      findings,
      model: this.model,
      tokensUsed: data.usage ? data.usage.input_tokens + data.usage.output_tokens : undefined,
    };
  }
}

function parseFindings(content: string): LlmFinding[] {
  try {
    // Strip markdown code fences if present
    const cleaned = content.replace(/^```(?:json)?\n?/gm, "").replace(/\n?```$/gm, "").trim();
    const parsed = JSON.parse(cleaned);
    const arr = Array.isArray(parsed) ? parsed : (parsed.findings || parsed.results || []);
    if (!Array.isArray(arr)) return [];

    return arr
      .filter((item: unknown) => item && typeof item === "object")
      .map((item: Record<string, unknown>) => ({
        line: typeof item.line === "number" ? item.line : undefined,
        severity: item.severity === "high" ? "high" as const : "medium" as const,
        description: String(item.description || "LLM-detected prompt injection"),
        evidence: item.evidence ? String(item.evidence).slice(0, 120) : undefined,
      }));
  } catch {
    return [];
  }
}
