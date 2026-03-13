import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { scan } from "../src/scanner/index.js";
import { computeScore, riskLabel } from "../src/score.js";
import { collectFiles } from "../src/scanner/files.js";
import { resolve } from "path";

// ============================================================
// Integration: scan fixtures
// ============================================================
describe("integration: scan malicious-skill", () => {
  it("produces critical findings and low score", () => {
    const result = scan(resolve("tests/fixtures/malicious-skill"));
    assert.ok(result.findings.length > 0);
    assert.ok(result.findings.some((f) => f.severity === "high"));
    assert.ok(result.score < 50, `score ${result.score} should be < 50`);
    assert.ok(result.filesScanned >= 2);
    assert.ok(result.duration >= 0);
  });
});

describe("integration: scan safe-skill", () => {
  it("produces high score with no critical findings", () => {
    const result = scan(resolve("tests/fixtures/safe-skill"));
    assert.equal(result.findings.filter((f) => f.severity === "high").length, 0);
    assert.ok(result.score >= 80, `score ${result.score} should be >= 80`);
  });
});

// ============================================================
// Edge cases
// ============================================================
describe("edge: empty directory", () => {
  it("returns zero files and high score for non-existent dir", () => {
    const result = scan(resolve("tests/fixtures/nonexistent-dir-12345"));
    assert.equal(result.filesScanned, 0);
    assert.ok(result.score >= 90, `score ${result.score} should be >= 90`);
  });
});

describe("edge: collectFiles skips binary extensions", () => {
  it("does not collect .png or .exe files", () => {
    // collectFiles only collects CODE_EXTS, so binary files are inherently skipped
    const files = collectFiles(resolve("tests/fixtures/safe-skill"));
    assert.ok(files.every((f) => !f.ext.match(/\.(png|exe|jpg|gif|wasm)$/)));
  });
});

// ============================================================
// Score
// ============================================================
describe("score", () => {
  it("returns 100 for no findings", () => {
    assert.equal(computeScore([]), 100);
  });

  it("deducts 25 per critical", () => {
    const findings = [
      { rule: "test", severity: "high" as const, file: "a.ts", message: "bad" },
    ];
    assert.equal(computeScore(findings), 75);
  });

  it("deducts 8 per medium risk", () => {
    const findings = [
      { rule: "test", severity: "medium" as const, file: "a.ts", message: "meh" },
    ];
    assert.equal(computeScore(findings), 92);
  });

  it("deducts 2 per low risk", () => {
    const findings = [
      { rule: "test", severity: "low" as const, file: "a.ts", message: "ok" },
    ];
    assert.equal(computeScore(findings), 98);
  });

  it("clamps to 0", () => {
    const findings = Array.from({ length: 10 }, () => ({
      rule: "test", severity: "high" as const, file: "a.ts", message: "bad",
    }));
    assert.equal(computeScore(findings), 0);
  });

  it("riskLabel returns correct labels", () => {
    assert.equal(riskLabel(95), "Low Risk");
    assert.equal(riskLabel(75), "Moderate Risk");
    assert.equal(riskLabel(50), "High Risk");
    assert.equal(riskLabel(20), "Critical Risk");
  });
});
