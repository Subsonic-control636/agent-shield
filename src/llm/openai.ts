import type { LlmProvider, LlmAnalysisResult, LlmFinding } from "./types.js";
import { SYSTEM_PROMPT, buildUserPrompt } from "./prompt.js";

/** OpenAI-compatible provider (works with OpenAI, Azure, any compatible API) */
export class OpenAIProvider implements LlmProvider {
  name = "openai";
  private apiKey: string;
  private model: string;
  private baseUrl: string;

  constructor(apiKey: string, model?: string, baseUrl?: string) {
    this.apiKey = apiKey;
    this.model = model || "gpt-4o-mini";
    this.baseUrl = (baseUrl || "https://api.openai.com/v1").replace(/\/$/, "");
  }

  async analyze(text: string, filename: string): Promise<LlmAnalysisResult> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(text, filename) },
        ],
        temperature: 0,
        response_format: { type: "json_object" },
      }),
      signal: AbortSignal.timeout(30_000),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      throw new Error(`OpenAI API error ${response.status}: ${body.slice(0, 200)}`);
    }

    const data = await response.json() as {
      choices: Array<{ message: { content: string } }>;
      usage?: { total_tokens: number };
    };

    const content = data.choices?.[0]?.message?.content || "[]";
    const findings = parseFindings(content);

    return {
      findings,
      model: this.model,
      tokensUsed: data.usage?.total_tokens,
    };
  }
}

/** Parse LLM response into findings, handling various response formats */
function parseFindings(content: string): LlmFinding[] {
  try {
    const parsed = JSON.parse(content);
    // Handle both direct array and { findings: [...] } wrapper
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
