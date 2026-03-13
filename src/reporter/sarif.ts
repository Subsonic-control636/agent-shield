import type { ScanResult, Finding } from "../types.js";

const SEVERITY_MAP: Record<string, string> = {
  high: "error",
  medium: "warning",
  low: "note",
};

export function toSarif(result: ScanResult): string {
  return JSON.stringify({
    $schema: "https://raw.githubusercontent.com/oasis-tcs/sarif-spec/main/sarif-2.1/schema/sarif-schema-2.1.0.json",
    version: "2.1.0",
    runs: [{
      tool: {
        driver: {
          name: "AgentShield",
          informationUri: "https://github.com/elliotllliu/agent-shield",
          rules: uniqueRules(result.findings).map(id => ({
            id,
            shortDescription: { text: id },
          })),
        },
      },
      results: result.findings.map(f => ({
        ruleId: f.rule,
        level: SEVERITY_MAP[f.severity] || "note",
        message: { text: f.message },
        locations: [{
          physicalLocation: {
            artifactLocation: { uri: f.file },
            region: f.line ? { startLine: f.line } : undefined,
          },
        }],
        ...(f.evidence ? { fingerprints: { evidence: f.evidence } } : {}),
      })),
    }],
  }, null, 2);
}

function uniqueRules(findings: Finding[]): string[] {
  return [...new Set(findings.map(f => f.rule))];
}
