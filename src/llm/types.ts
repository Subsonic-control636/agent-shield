/** LLM provider types for deep prompt injection analysis */

export interface LlmFinding {
  line?: number;
  severity: "critical" | "warning";
  description: string;
  evidence?: string;
}

export interface LlmAnalysisResult {
  findings: LlmFinding[];
  model: string;
  tokensUsed?: number;
}

export interface LlmProvider {
  name: string;
  /** Analyze text for prompt injection, return findings */
  analyze(text: string, filename: string): Promise<LlmAnalysisResult>;
}

export interface LlmConfig {
  provider: "openai" | "anthropic" | "ollama";
  model?: string;
  baseUrl?: string;
  apiKey?: string;
}
