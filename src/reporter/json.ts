import type { ScanResult } from "../types.js";
import { getRuleReference } from "../references.js";

/** Output scan result as JSON with OWASP/CWE/ATLAS references */
export function printJsonReport(result: ScanResult): void {
  // Enrich each finding with standard references
  const enriched = {
    ...result,
    findings: result.findings.map(f => {
      const ref = getRuleReference(f.rule);
      return {
        ...f,
        references: {
          ...(ref.owasp && { owasp: `${ref.owasp.id}: ${ref.owasp.name}` }),
          ...(ref.cwe && { cwe: ref.cwe.id }),
          ...(ref.atlas && { atlas: `${ref.atlas.id}: ${ref.atlas.name}` }),
          riskCategory: ref.riskCategory,
        },
      };
    }),
  };

  console.log(JSON.stringify(enriched, null, 2));
}
