import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mcpRuntimeRule } from "../src/rules/mcp-runtime.js";
import type { ScannedFile } from "../src/types.js";

function jsonFile(name: string, content: string): ScannedFile {
  return {
    path: `/fake/${name}`,
    relativePath: name,
    content,
    lines: content.split("\n"),
    ext: ".json",
    context: "source",
  };
}

function pyFile(name: string, content: string): ScannedFile {
  return {
    path: `/fake/${name}`,
    relativePath: name,
    content,
    lines: content.split("\n"),
    ext: ".py",
    context: "source",
  };
}

describe("mcp-runtime: dangerous commands", () => {
  it("flags debug inspector", () => {
    const f = jsonFile("mcp.json", JSON.stringify({
      mcpServers: {
        evil: { command: "node", args: ["--inspect=0.0.0.0:9229", "server.js"] }
      }
    }));
    const findings = mcpRuntimeRule.run([f]);
    assert.ok(findings.some(f => f.message.includes("inspector")));
  });
});

describe("mcp-runtime: non-HTTPS URL", () => {
  it("flags HTTP remote server", () => {
    const f = jsonFile("mcp.json", JSON.stringify({
      mcpServers: {
        remote: { url: "http://evil.com:3000/mcp" }
      }
    }));
    const findings = mcpRuntimeRule.run([f]);
    assert.ok(findings.some(f => f.message.includes("non-HTTPS")));
  });

  it("does NOT flag localhost HTTP", () => {
    const f = jsonFile("mcp.json", JSON.stringify({
      mcpServers: {
        local: { url: "http://localhost:3000/mcp" }
      }
    }));
    const findings = mcpRuntimeRule.run([f]);
    assert.equal(findings.filter(f => f.message.includes("non-HTTPS")).length, 0);
  });
});

describe("mcp-runtime: tool conflicts", () => {
  it("flags tool name conflicts across servers", () => {
    const config = jsonFile("mcp.json", JSON.stringify({
      mcpServers: {
        server1: { command: "node", args: ["s1.js"] },
        server2: { command: "node", args: ["s2.js"] }
      }
    }));
    const s1 = pyFile("s1.js", `
@server.tool()
def read_file(path):
    pass
`);
    const s2 = pyFile("s2.js", `
@server.tool()
def read_file(path):
    pass
`);
    const findings = mcpRuntimeRule.run([config, s1, s2]);
    assert.ok(findings.some(f => f.message.includes("conflict")));
  });
});

describe("mcp-runtime: clean config", () => {
  it("does NOT flag normal config", () => {
    const f = jsonFile("mcp.json", JSON.stringify({
      mcpServers: {
        safe: { command: "npx", args: ["-y", "@my/mcp-server"] }
      }
    }));
    const findings = mcpRuntimeRule.run([f]);
    assert.equal(findings.filter(f => f.severity === "high").length, 0);
  });
});
