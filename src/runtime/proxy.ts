/**
 * MCP Runtime Proxy
 * 
 * Sits between MCP client and server as a transparent proxy.
 * Intercepts all JSON-RPC messages for security analysis.
 * 
 * Architecture:
 *   Client (Claude/Cursor) ←→ AgentShield Proxy ←→ MCP Server
 *                                    ↓
 *                            Security Analysis
 *                           (tool-injection, result-injection,
 *                            data-leak, anomaly detection)
 */

import { spawn, type ChildProcess } from "child_process";
import { appendFileSync } from "fs";
import { Interceptor, type McpMessage, type InterceptorConfig } from "./interceptor.js";
import { formatAlert, formatAlertJson, formatSummary } from "./reporter.js";
import type { DetectionResult } from "./detectors/tool-injection.js";

export interface ProxyConfig {
  /** Command to start the MCP server */
  serverCommand: string;
  /** Arguments for the server command */
  serverArgs?: string[];
  /** Working directory for the server */
  cwd?: string;
  /** Block high-severity findings */
  enforce?: boolean;
  /** Maximum tool calls per minute (0 = unlimited) */
  rateLimit?: number;
  /** Log alerts to file (JSONL) */
  logFile?: string;
  /** Detector categories to enable */
  enabledDetectors?: string[];
}

export class McpProxy {
  private config: ProxyConfig;
  private interceptor: Interceptor;
  private serverProcess: ChildProcess | null = null;
  private inputBuffer = "";
  private outputBuffer = "";

  constructor(config: ProxyConfig) {
    this.config = config;

    const interceptorConfig: Partial<InterceptorConfig> = {
      enforce: config.enforce ?? false,
      rateLimit: config.rateLimit ?? 0,
    };
    if (config.enabledDetectors) {
      interceptorConfig.enabledDetectors = config.enabledDetectors;
    }

    this.interceptor = new Interceptor(interceptorConfig);
  }

  /** Start the proxy */
  start(): void {
    const { serverCommand, serverArgs = [], cwd } = this.config;

    process.stderr.write("🛡️ AgentShield MCP Proxy starting...\n");
    process.stderr.write(`   Server: ${serverCommand} ${serverArgs.join(" ")}\n`);
    process.stderr.write(`   Mode: ${this.config.enforce ? "ENFORCE (blocking)" : "MONITOR (logging only)"}\n`);
    if (this.config.rateLimit) {
      process.stderr.write(`   Rate limit: ${this.config.rateLimit} calls/min\n`);
    }
    if (this.config.logFile) {
      process.stderr.write(`   Log: ${this.config.logFile}\n`);
    }
    process.stderr.write("\n");

    // Spawn the real MCP server
    this.serverProcess = spawn(serverCommand, serverArgs, {
      cwd,
      stdio: ["pipe", "pipe", "pipe"],
      env: { ...process.env },
    });

    // Client → Proxy → Server
    process.stdin.on("data", (chunk) => {
      this.inputBuffer += chunk.toString();
      this.processBuffer(this.inputBuffer, "request", (remaining) => {
        this.inputBuffer = remaining;
      });
    });

    // Server → Proxy → Client
    this.serverProcess.stdout?.on("data", (chunk) => {
      this.outputBuffer += chunk.toString();
      this.processBuffer(this.outputBuffer, "response", (remaining) => {
        this.outputBuffer = remaining;
      });
    });

    // Forward stderr from server
    this.serverProcess.stderr?.on("data", (data) => {
      process.stderr.write(data);
    });

    // Handle server exit
    this.serverProcess.on("exit", (code) => {
      const stats = this.interceptor.getStats();
      process.stderr.write("\n");
      process.stderr.write(formatSummary(stats));
      process.stderr.write("\n");
      process.exit(code || 0);
    });

    // Handle signals
    process.on("SIGINT", () => {
      const stats = this.interceptor.getStats();
      process.stderr.write("\n");
      process.stderr.write(formatSummary(stats));
      process.stderr.write("\n");
      this.stop();
      process.exit(0);
    });
  }

  /** Process buffered data, extract complete JSON-RPC messages */
  private processBuffer(buffer: string, direction: "request" | "response", updateBuffer: (remaining: string) => void): void {
    // MCP uses newline-delimited JSON
    const lines = buffer.split("\n");
    const remaining = lines.pop() || ""; // Incomplete line
    updateBuffer(remaining);

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      try {
        const message: McpMessage = JSON.parse(trimmed);
        const alerts = this.analyzeMessage(message, direction);

        // If enforce mode and high-severity alert, block the request
        if (direction === "request" && this.interceptor.shouldBlock(alerts)) {
          this.sendBlockResponse(message);
          continue; // Don't forward to server
        }

        // Forward the message
        if (direction === "request") {
          this.serverProcess?.stdin?.write(trimmed + "\n");
        } else {
          process.stdout.write(trimmed + "\n");
        }
      } catch {
        // Not valid JSON, forward as-is
        if (direction === "request") {
          this.serverProcess?.stdin?.write(trimmed + "\n");
        } else {
          process.stdout.write(trimmed + "\n");
        }
      }
    }
  }

  /** Analyze a message and report alerts */
  private analyzeMessage(message: McpMessage, direction: "request" | "response"): DetectionResult[] {
    const alerts = direction === "request"
      ? this.interceptor.interceptRequest(message)
      : this.interceptor.interceptResponse(message);

    for (const alert of alerts) {
      const blocked = this.interceptor.shouldBlock([alert]);
      process.stderr.write(formatAlert(alert, blocked) + "\n\n");

      if (this.config.logFile) {
        try {
          appendFileSync(this.config.logFile, formatAlertJson(alert, blocked) + "\n");
        } catch {
          // Ignore log write errors
        }
      }
    }

    return alerts;
  }

  /** Send a block response back to the client */
  private sendBlockResponse(message: McpMessage): void {
    if (message.id !== undefined) {
      const errorResponse: McpMessage = {
        jsonrpc: "2.0",
        id: message.id,
        error: {
          code: -32000,
          message: "AgentShield: Request blocked due to security concerns",
        },
      };
      process.stdout.write(JSON.stringify(errorResponse) + "\n");
    }
  }

  /** Stop the proxy */
  stop(): void {
    this.serverProcess?.kill();
    this.serverProcess = null;
  }

  /** Get the interceptor for testing/inspection */
  getInterceptor(): Interceptor {
    return this.interceptor;
  }
}

/**
 * MCP Audit — one-shot analysis of an MCP server's tools/list
 */
export async function auditMcpServer(command: string, args: string[] = []): Promise<{ tools: number; alerts: DetectionResult[] }> {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      stdio: ["pipe", "pipe", "pipe"],
    });

    let output = "";
    const interceptor = new Interceptor();

    proc.stdout?.on("data", (chunk) => {
      output += chunk.toString();
    });

    // Send initialize + tools/list
    const initMsg = JSON.stringify({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "agent-shield-audit", version: "1.0" } } });
    const listMsg = JSON.stringify({ jsonrpc: "2.0", id: 2, method: "tools/list", params: {} });

    proc.stdin?.write(initMsg + "\n");

    setTimeout(() => {
      proc.stdin?.write(listMsg + "\n");
    }, 1000);

    setTimeout(() => {
      proc.kill();

      // Parse responses
      const lines = output.split("\n").filter(l => l.trim());
      let totalAlerts: DetectionResult[] = [];
      let toolCount = 0;

      for (const line of lines) {
        try {
          const msg: McpMessage = JSON.parse(line);
          const alerts = interceptor.interceptResponse(msg);
          totalAlerts.push(...alerts);

          // Count tools
          if (msg.result && typeof msg.result === "object") {
            const res = msg.result as { tools?: unknown[] };
            if (res.tools) toolCount = res.tools.length;
          }
        } catch {
          // Skip non-JSON
        }
      }

      resolve({ tools: toolCount, alerts: totalAlerts });
    }, 3000);

    proc.on("error", reject);
  });
}
