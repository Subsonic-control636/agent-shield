/**
 * Runtime Alert Reporter
 * 
 * Formats and outputs security alerts in real-time.
 */

import type { DetectionResult } from "./detectors/tool-injection.js";

const LEVEL_ICON: Record<string, string> = {
  high: "🔴",
  medium: "🟡",
  low: "🟢",
};

const LEVEL_COLOR: Record<string, string> = {
  high: "\x1b[31m",
  medium: "\x1b[33m",
  low: "\x1b[32m",
};

const RESET = "\x1b[0m";
const DIM = "\x1b[2m";
const BOLD = "\x1b[1m";

export function formatAlert(alert: DetectionResult, blocked: boolean): string {
  const icon = LEVEL_ICON[alert.level] || "⚪";
  const color = LEVEL_COLOR[alert.level] || "";
  const action = blocked ? ` ${BOLD}\x1b[31m[BLOCKED]${RESET}` : "";
  const time = new Date().toISOString().split("T")[1]?.replace("Z", "") || "";

  return [
    `${DIM}${time}${RESET} ${icon} ${color}${alert.message}${RESET}${action}`,
    `  ${DIM}Tool: ${alert.toolName} | Rule: ${alert.rule} | Detector: ${alert.detector}${RESET}`,
    `  ${DIM}Evidence: ${alert.evidence.substring(0, 120)}${RESET}`,
  ].join("\n");
}

export function formatSummary(stats: { totalAlerts: number; highAlerts: number; toolsRegistered: number; totalCalls: number }): string {
  const divider = "─".repeat(50);
  return [
    divider,
    `${BOLD}🛡️ AgentShield Runtime Summary${RESET}`,
    divider,
    `  Tools registered:  ${stats.toolsRegistered}`,
    `  Total tool calls:  ${stats.totalCalls}`,
    `  Security alerts:   ${stats.totalAlerts}`,
    `    🔴 High:         ${stats.highAlerts}`,
    `    🟡 Medium:       ${stats.totalAlerts - stats.highAlerts}`,
    divider,
  ].join("\n");
}

export function formatAlertJson(alert: DetectionResult, blocked: boolean): string {
  return JSON.stringify({
    ...alert,
    blocked,
    timestamp: new Date().toISOString(),
  });
}
