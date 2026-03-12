import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mcpManifestRule } from "../src/rules/mcp-manifest.js";
import type { ScannedFile } from "../src/types.js";

function makeFile(relativePath: string, content: string): ScannedFile {
  const ext = "." + relativePath.split(".").pop()!;
  return {
    path: `/fake/${relativePath}`,
    relativePath,
    content,
    lines: content.split("\n"),
    ext,
  };
}

describe("mcp-manifest", () => {
  it("should detect wildcard permissions in mcp.json", () => {
    const files = [
      makeFile("package.json", JSON.stringify({ dependencies: { "@modelcontextprotocol/sdk": "^1.0" } })),
      makeFile("mcp.json", JSON.stringify({ permissions: ["*"] })),
    ];
    const findings = mcpManifestRule.run(files);
    const critical = findings.filter((f) => f.severity === "critical" && f.message.includes("wildcard"));
    assert.ok(critical.length > 0, "Should flag wildcard permissions");
  });

  it("should detect exec in MCP tool files", () => {
    const files = [
      makeFile("package.json", JSON.stringify({ dependencies: { "@modelcontextprotocol/sdk": "^1.0" } })),
      makeFile("server.ts", `
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { execSync } from "child_process";
const server = new McpServer({ name: "test" });
server.tool("run", "run stuff", async ({ cmd }) => {
  const output = execSync(cmd);
  return { content: [{ type: "text", text: output }] };
});
`),
    ];
    const findings = mcpManifestRule.run(files);
    const execFindings = findings.filter((f) => f.message.includes("executes shell"));
    assert.ok(execFindings.length > 0, "Should flag exec in MCP tool");
  });

  it("should detect suspicious tool descriptions", () => {
    const files = [
      makeFile("package.json", JSON.stringify({ dependencies: { "@modelcontextprotocol/sdk": "^1.0" } })),
      makeFile("index.ts", `
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
server.tool("files", "Read entire filesystem and access all files", async () => {});
`),
    ];
    const findings = mcpManifestRule.run(files);
    const suspicious = findings.filter((f) => f.message.includes("Suspicious"));
    assert.ok(suspicious.length > 0, "Should flag suspicious tool description");
  });

  it("should not flag safe MCP server", () => {
    const files = [
      makeFile("package.json", JSON.stringify({ dependencies: { "@modelcontextprotocol/sdk": "^1.0" } })),
      makeFile("server.ts", `
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
const server = new McpServer({ name: "safe" });
server.tool("greet", "Say hello to the user", async ({ name }) => {
  return { content: [{ type: "text", text: "Hello " + name }] };
});
`),
    ];
    const findings = mcpManifestRule.run(files);
    const critical = findings.filter((f) => f.severity === "critical");
    assert.strictEqual(critical.length, 0, "Safe MCP server should have no critical findings");
  });

  it("should skip non-MCP projects", () => {
    const files = [
      makeFile("package.json", JSON.stringify({ dependencies: { "express": "^4.0" } })),
      makeFile("index.ts", `const app = express(); app.listen(3000);`),
    ];
    const findings = mcpManifestRule.run(files);
    assert.strictEqual(findings.length, 0, "Non-MCP projects should produce no findings");
  });

  it("should detect missing path validation", () => {
    const files = [
      makeFile("package.json", JSON.stringify({ dependencies: { "@modelcontextprotocol/sdk": "^1.0" } })),
      makeFile("tools.ts", `
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
server.tool("read", "Read a file by path", async ({ filePath }) => {
  const content = readFileSync(filePath, "utf-8");
  return { content: [{ type: "text", text: content }] };
});
`),
    ];
    const findings = mcpManifestRule.run(files);
    const pathFindings = findings.filter((f) => f.message.includes("path validation"));
    assert.ok(pathFindings.length > 0, "Should flag missing path validation");
  });
});
