import type { Finding } from "./types.js";

/**
 * Compute a security score from 0-100.
 *
 * Core principle: 宁可漏报，不要误报
 * Only high-confidence findings (confirmed issues) heavily impact score.
 *
 * Scoring:
 *   critical (confirmed):  -25
 *   warning  (uncertain):   -5  (reduced from -10, since these need review)
 *   info     (note/FP):     -0  (does not affect score)
 *
 * Minimum score is 0.
 */
export function computeScore(findings: Finding[]): number {
  let score = 100;
  for (const f of findings) {
    switch (f.severity) {
      case "critical":
        score -= 25;
        break;
      case "warning":
        score -= 5;
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
