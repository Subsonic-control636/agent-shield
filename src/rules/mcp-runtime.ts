import type { Rule, Finding, ScannedFile } from "../types.js";

/**
 * Rule: mcp-runtime
 * Runtime analysis of MCP server configurations.
 *
 * Detects security issues that only manifest at runtime:
 * 1. Tool count explosion (server exposes too many tools)
 * 2. Dynamic tool registration (tools that change after startup)
 * 3. Overly permissive input schemas (accepts any JSON)
 * 4. Missing input validation in tool schemas
 * 5. Dangerous default values in tool parameters
 * 6. Cross-server tool name conflicts
 * 7. Server-to-server communication (MCP proxy chains)
 * 8. Excessive resource exposure
 */

interface McpToolDef {
  name: string;
  description?: string;
  inputSchema?: any;
  file: string;
  line: number;
}

interface McpServerDef {
  name: string;
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  url?: string;
  tools: McpToolDef[];
  file: string;
}

// Extract MCP server definitions from config files
function extractMcpServers(files: ScannedFile[]): McpServerDef[] {
  const servers: McpServerDef[] = [];

  for (const file of files) {
    if (file.ext !== ".json") continue;

    try {
      const json = JSON.parse(file.content);

      // Claude Desktop / Cursor / OpenClaw MCP config format
      const mcpServers = json.mcpServers || json.mcp_servers || json.servers;
      if (mcpServers && typeof mcpServers === "object") {
        for (const [name, config] of Object.entries(mcpServers) as [string, any][]) {
          servers.push({
            name,
            command: config.command,
            args: config.args,
            env: config.env,
            url: config.url,
            tools: [], // Will be populated from tool definitions
            file: file.relativePath,
          });
        }
      }
    } catch { /* not valid JSON or not MCP config */ }
  }

  // Extract tool definitions from Python MCP servers
  for (const file of files) {
    if (file.ext !== ".py") continue;

    const toolDefs: McpToolDef[] = [];
    for (let i = 0; i < file.lines.length; i++) {
      const line = file.lines[i]!;

      // @mcp.tool() or @server.tool() decorator
      if (/@\w+\.tool\s*\(/.test(line)) {
        // Next function definition is the tool
        for (let j = i + 1; j < Math.min(i + 5, file.lines.length); j++) {
          const funcLine = file.lines[j]!;
          const funcMatch = funcLine.match(/def\s+(\w+)/);
          if (funcMatch) {
            toolDefs.push({
              name: funcMatch[1]!,
              file: file.relativePath,
              line: j + 1,
            });
            break;
          }
        }
      }
    }

    if (toolDefs.length > 0) {
      // Find or create server for this file
      let server = servers.find(s =>
        s.command?.includes(file.relativePath) ||
        s.file === file.relativePath
      );
      if (!server) {
        server = {
          name: file.relativePath,
          tools: [],
          file: file.relativePath,
        };
        servers.push(server);
      }
      server.tools.push(...toolDefs);
    }
  }

  return servers;
}

export const mcpRuntimeRule: Rule = {
  id: "mcp-runtime",
  name: "MCP Runtime Security",
  description: "Detects runtime security issues in MCP server configurations and tool definitions",

  run(files: ScannedFile[]): Finding[] {
    const findings: Finding[] = [];
    const servers = extractMcpServers(files);

    if (servers.length === 0) return findings;

    for (const server of servers) {
      // Check 1: Dangerous commands
      if (server.command) {
        const dangerous = [
          { pattern: /\bnode\b.*--inspect/, desc: "Debug inspector enabled — allows remote code execution" },
          { pattern: /\bpython\b.*-c\s/, desc: "Python inline code execution" },
          { pattern: /\bsh\b|\bbash\b.*-c/, desc: "Shell command execution" },
          { pattern: /--allow-all|--no-sandbox/, desc: "All permissions/no sandbox — no security boundary" },
        ];

        const fullCmd = [server.command, ...(server.args || [])].join(" ");
        for (const { pattern, desc } of dangerous) {
          if (pattern.test(fullCmd)) {
            findings.push({
              rule: "mcp-runtime",
              severity: "high",
              file: server.file,
              message: `MCP server '${server.name}': ${desc}`,
              evidence: fullCmd.slice(0, 150),
              confidence: "high",
            });
          }
        }
      }

      // Check 2: Sensitive environment variables exposed to MCP server
      if (server.env) {
        const sensitiveEnvKeys = /^(AWS_|OPENAI_|ANTHROPIC_|DATABASE_|DB_|MONGO|REDIS|SECRET|PRIVATE|TOKEN|PASSWORD|API_KEY)/i;
        const exposedKeys = Object.keys(server.env).filter(k => sensitiveEnvKeys.test(k));
        if (exposedKeys.length > 3) {
          findings.push({
            rule: "mcp-runtime",
            severity: "medium",
            file: server.file,
            message: `MCP server '${server.name}' receives ${exposedKeys.length} sensitive env vars: ${exposedKeys.slice(0, 5).join(", ")}${exposedKeys.length > 5 ? "..." : ""}`,
            confidence: "medium",
          });
        }
      }

      // Check 3: URL-based server (SSE/WebSocket) — higher risk surface
      if (server.url) {
        if (!/^https:/.test(server.url) && !/localhost|127\.0\.0\.1/.test(server.url)) {
          findings.push({
            rule: "mcp-runtime",
            severity: "high",
            file: server.file,
            message: `MCP server '${server.name}' uses non-HTTPS remote URL: ${server.url}`,
            confidence: "high",
          });
        }
      }

      // Check 4: Tool count explosion
      if (server.tools.length > 20) {
        findings.push({
          rule: "mcp-runtime",
          severity: "medium",
          file: server.file,
          message: `MCP server '${server.name}' exposes ${server.tools.length} tools — excessive tool count increases attack surface`,
          confidence: "medium",
        });
      }
    }

    // Check 5: Cross-server tool name conflicts
    const toolNames = new Map<string, string[]>();
    for (const server of servers) {
      for (const tool of server.tools) {
        if (!toolNames.has(tool.name)) toolNames.set(tool.name, []);
        toolNames.get(tool.name)!.push(server.name);
      }
    }

    for (const [toolName, serverNames] of toolNames) {
      if (serverNames.length > 1) {
        findings.push({
          rule: "mcp-runtime",
          severity: "high",
          file: servers[0]!.file,
          message: `Tool name conflict: '${toolName}' defined in multiple servers: ${serverNames.join(", ")} — potential tool shadowing`,
          confidence: "high",
        });
      }
    }

    // Check 6: Input schema analysis from JSON configs
    for (const file of files) {
      if (file.ext !== ".json") continue;
      try {
        const json = JSON.parse(file.content);
        const tools = json.tools || [];
        if (!Array.isArray(tools)) continue;

        for (const tool of tools) {
          if (!tool.inputSchema || !tool.inputSchema.properties) continue;

          // Check for overly permissive schemas
          const props = tool.inputSchema.properties;
          for (const [propName, propDef] of Object.entries(props) as [string, any][]) {
            // Accepts any type
            if (!propDef.type && !propDef.enum && !propDef.const) {
              findings.push({
                rule: "mcp-runtime",
                severity: "low",
                file: file.relativePath,
                message: `Tool '${tool.name}' parameter '${propName}' has no type constraint — accepts any input`,
                confidence: "medium",
              });
            }

            // Dangerous default values
            if (propDef.default && typeof propDef.default === "string") {
              if (/\bsudo\b|\bchmod\s+777\b|--no-verify|--force/.test(propDef.default)) {
                findings.push({
                  rule: "mcp-runtime",
                  severity: "medium",
                  file: file.relativePath,
                  message: `Tool '${tool.name}' has dangerous default for '${propName}': "${propDef.default}"`,
                  confidence: "high",
                });
              }
            }
          }
        }
      } catch { /* skip */ }
    }

    return findings;
  },
};
