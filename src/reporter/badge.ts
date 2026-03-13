import type { ScanResult } from "../types.js";
import { letterGrade, gradeLabel } from "../score.js";

/**
 * Generate a shields.io-style SVG badge for the security score.
 */
export function generateBadgeSvg(result: ScanResult): string {
  const score = result.scoreResult?.overall ?? result.score;
  const { color, label } = getBadgeStyle(score);
  const grade = letterGrade(score);
  const scoreText = `${score} (${grade})`;

  // Shield dimensions
  const labelWidth = 90;
  const valueWidth = 80;
  const totalWidth = labelWidth + valueWidth;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20" role="img" aria-label="AgentShield: ${scoreText}">
  <title>AgentShield: ${scoreText} (${label})</title>
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <clipPath id="r">
    <rect width="${totalWidth}" height="20" rx="3" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#r)">
    <rect width="${labelWidth}" height="20" fill="#555"/>
    <rect x="${labelWidth}" width="${valueWidth}" height="20" fill="${color}"/>
    <rect width="${totalWidth}" height="20" fill="url(#s)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110">
    <text aria-hidden="true" x="${labelWidth * 5}" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)">${"🛡️ AgentShield"}</text>
    <text x="${labelWidth * 5}" y="140" transform="scale(.1)">${"🛡️ AgentShield"}</text>
    <text aria-hidden="true" x="${(labelWidth + valueWidth / 2) * 10}" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)">${scoreText}</text>
    <text x="${(labelWidth + valueWidth / 2) * 10}" y="140" transform="scale(.1)">${scoreText}</text>
  </g>
</svg>`;
}

/** Generate a markdown badge string */
export function generateBadgeMarkdown(score: number, repoUrl?: string): string {
  const { color } = getBadgeStyle(score);
  const grade = letterGrade(score);
  const badgeUrl = `https://img.shields.io/badge/AgentShield-${encodeURIComponent(`${score} (${grade})`)}-${color.replace("#", "")}?logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAxTDMgNXY2YzAgNS41NSAzLjg0IDEwLjc0IDkgMTIgNS4xNi0xLjI2IDktNi40NSA5LTEyVjVsLTktNHoiLz48L3N2Zz4=`;
  const link = repoUrl || "https://github.com/elliotllliu/agent-shield";
  return `[![AgentShield ${score} (${grade})](${badgeUrl})](${link})`;
}

function getBadgeStyle(score: number): { color: string; label: string } {
  if (score >= 90) return { color: "#4c1", label: "A · Safe" };
  if (score >= 75) return { color: "#a3c51c", label: "B · Low Risk" };
  if (score >= 50) return { color: "#dfb317", label: "C · Elevated Risk" };
  if (score >= 25) return { color: "#fe7d37", label: "D · High Risk" };
  if (score >= 0) return { color: "#e05d44", label: "F · Critical" };
  return { color: "#8b0000", label: "F- · Severe" };
}
