export type { LlmProvider, LlmConfig, LlmAnalysisResult, LlmFinding } from "./types.js";
export { SYSTEM_PROMPT, buildUserPrompt } from "./prompt.js";
export { OpenAIProvider } from "./openai.js";
export { AnthropicProvider } from "./anthropic.js";
export { OllamaProvider } from "./ollama.js";

import type { LlmProvider, LlmConfig } from "./types.js";
import { OpenAIProvider } from "./openai.js";
import { AnthropicProvider } from "./anthropic.js";
import { OllamaProvider } from "./ollama.js";

/** Create an LLM provider from config */
export function createProvider(config: LlmConfig): LlmProvider {
  switch (config.provider) {
    case "openai": {
      const key = config.apiKey || process.env.OPENAI_API_KEY;
      if (!key) throw new Error("OpenAI API key required. Set OPENAI_API_KEY or use --llm-api-key");
      return new OpenAIProvider(key, config.model, config.baseUrl);
    }
    case "anthropic": {
      const key = config.apiKey || process.env.ANTHROPIC_API_KEY;
      if (!key) throw new Error("Anthropic API key required. Set ANTHROPIC_API_KEY or use --llm-api-key");
      return new AnthropicProvider(key, config.model, config.baseUrl);
    }
    case "ollama": {
      return new OllamaProvider(config.model, config.baseUrl);
    }
    default:
      throw new Error(`Unknown LLM provider: ${config.provider}`);
  }
}

/** Auto-detect provider from available env vars */
export function autoDetectProvider(model?: string, baseUrl?: string): LlmConfig | null {
  if (process.env.ANTHROPIC_API_KEY) {
    return { provider: "anthropic", model, baseUrl, apiKey: process.env.ANTHROPIC_API_KEY };
  }
  if (process.env.OPENAI_API_KEY) {
    return { provider: "openai", model, baseUrl, apiKey: process.env.OPENAI_API_KEY };
  }
  // Try Ollama as last resort (no key needed)
  return { provider: "ollama", model: model || "llama3.2", baseUrl };
}
