/**
 * MCP Message Interceptor
 * 
 * Central engine that routes MCP JSON-RPC messages to appropriate detectors
 * and aggregates security alerts.
 */

import { detectToolInjection, detectToolListInjection, type ToolInfo, type DetectionResult } from "./detectors/tool-injection.js";
import { detectResultInjection } from "./detectors/result-injection.js";
import { detectDataLeak } from "./detectors/data-leak.js";
import { AnomalyDetector } from "./detectors/anomaly.js";

export interface McpMessage {
  jsonrpc: "2.0";
  id?: string | number;
  method?: string;
  params?: Record<string, unknown>;
  result?: unknown;
  error?: { code: number; message: string };
}

export interface InterceptorConfig {
  /** Block high-severity findings */
  enforce: boolean;
  /** Enabled detector categories */
  enabledDetectors: string[];
  /** Rate limit (calls per minute, 0 = unlimited) */
  rateLimit: number;
}

const DEFAULT_CONFIG: InterceptorConfig = {
  enforce: false,
  enabledDetectors: ["tool-injection", "result-injection", "data-leak", "anomaly"],
  rateLimit: 0,
};

export class Interceptor {
  private config: InterceptorConfig;
  private anomalyDetector: AnomalyDetector;
  private alerts: DetectionResult[] = [];
  private registeredTools: Map<string, ToolInfo> = new Map();
  private callCount = 0;
  private callCountReset = Date.now();
  private pendingCalls: Map<string | number, string> = new Map(); // id -> toolName

  constructor(config?: Partial<InterceptorConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.anomalyDetector = new AnomalyDetector();
  }

  /**
   * Intercept a client→server message
   * Returns alerts; if enforce=true and high-severity alert found, caller should block
   */
  interceptRequest(message: McpMessage): DetectionResult[] {
    const results: DetectionResult[] = [];

    if (message.method === "tools/call" && message.params) {
      const toolName = (message.params.name as string) || "unknown";
      const args = (message.params.arguments as Record<string, unknown>) || {};

      // Track pending call
      if (message.id !== undefined) {
        this.pendingCalls.set(message.id, toolName);
      }

      // Rate limiting
      this.callCount++;
      const now = Date.now();
      if (now - this.callCountReset > 60000) {
        this.callCount = 1;
        this.callCountReset = now;
      }
      if (this.config.rateLimit > 0 && this.callCount > this.config.rateLimit) {
        results.push({
          level: "high",
          detector: "rate-limit",
          rule: "rate-limit-exceeded",
          message: `Rate limit exceeded: ${this.callCount}/${this.config.rateLimit} calls/min`,
          evidence: `Tool: ${toolName}`,
          toolName,
        });
      }

      // Data leak detection
      if (this.isEnabled("data-leak")) {
        results.push(...detectDataLeak(toolName, args));
      }

      // Anomaly detection
      if (this.isEnabled("anomaly")) {
        results.push(...this.anomalyDetector.recordAndDetect(toolName, args));
      }

      // Check arguments for injection patterns
      if (this.isEnabled("tool-injection")) {
        const argsStr = JSON.stringify(args);
        // Quick injection check on arguments
        if (/ignore\s+(?:all\s+)?(?:previous|prior|above)\s+instructions/i.test(argsStr)) {
          results.push({
            level: "high",
            detector: "tool-injection",
            rule: "arg-injection",
            message: "Prompt injection detected in tool call arguments",
            evidence: argsStr.substring(0, 200),
            toolName,
          });
        }
      }
    }

    this.alerts.push(...results);
    return results;
  }

  /**
   * Intercept a server→client message
   */
  interceptResponse(message: McpMessage): DetectionResult[] {
    const results: DetectionResult[] = [];

    // tools/list response — scan all tool descriptions
    if (message.result && typeof message.result === "object") {
      const res = message.result as Record<string, unknown>;

      // tools/list
      if (Array.isArray(res.tools)) {
        const tools = res.tools as ToolInfo[];
        // Store tools
        for (const tool of tools) {
          this.registeredTools.set(tool.name, tool);
        }

        if (this.isEnabled("tool-injection")) {
          results.push(...detectToolListInjection(tools));
        }
      }

      // resources/read — check for sensitive data in response
      if (res.contents && Array.isArray(res.contents)) {
        for (const content of res.contents as { text?: string }[]) {
          if (content.text && this.isEnabled("result-injection")) {
            const toolName = "resources/read";
            results.push(...detectResultInjection(toolName, content.text));
          }
        }
      }
    }

    // Tool call result — check for injection in result
    if (message.id !== undefined && message.result !== undefined) {
      const toolName = this.pendingCalls.get(message.id) || "unknown";
      this.pendingCalls.delete(message.id);

      if (this.isEnabled("result-injection")) {
        results.push(...detectResultInjection(toolName, message.result));
      }
    }

    this.alerts.push(...results);
    return results;
  }

  /** Check if a detector category is enabled */
  private isEnabled(detector: string): boolean {
    return this.config.enabledDetectors.includes(detector);
  }

  /** Should this message be blocked? */
  shouldBlock(alerts: DetectionResult[]): boolean {
    return this.config.enforce && alerts.some(a => a.level === "high");
  }

  /** Get all recorded alerts */
  getAlerts(): DetectionResult[] {
    return [...this.alerts];
  }

  /** Get registered tools */
  getTools(): ToolInfo[] {
    return [...this.registeredTools.values()];
  }

  /** Get stats */
  getStats(): { totalAlerts: number; highAlerts: number; toolsRegistered: number; totalCalls: number } {
    return {
      totalAlerts: this.alerts.length,
      highAlerts: this.alerts.filter(a => a.level === "high").length,
      toolsRegistered: this.registeredTools.size,
      totalCalls: this.callCount,
    };
  }
}
