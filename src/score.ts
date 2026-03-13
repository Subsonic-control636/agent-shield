import type { Finding } from "./types.js";

/**
 * Compute a security score from 0-100.
 *
 * Three-tier risk system:
 *   🔴 high    (must fix):     -25
 *   🟡 medium  (should check):  -8
 *   🟢 low     (note):          -2
 *
 * Core principle: 宁可漏报，不要误报 (prefer missed reports over false alarms)
 * Minimum score is 0.
 */
export function computeScore(findings: Finding[]): number {
  let score = 100;
  for (const f of findings) {
    // Don't penalize FP-flagged findings
    if (f.possibleFalsePositive) continue;
    switch (f.severity) {
      case "high":
        score -= 25;
        break;
      case "medium":
        score -= 8;
        break;
      case "low":
        score -= 2;
        break;
    }
  }
  return Math.max(0, score);
}

/** Human-readable risk label */
export function riskLabel(score: number): string {
  if (score >= 90) return "Low Risk";
  if (score >= 70) return "Moderate Risk";
  if (score >= 40) return "High Risk";
  return "Critical Risk";
}
