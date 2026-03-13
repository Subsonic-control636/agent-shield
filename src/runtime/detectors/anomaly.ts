/**
 * Anomaly Detector
 * 
 * Detects behavioral anomalies in MCP tool usage:
 * - Rapid-fire calls (beacon behavior / C2)
 * - Tool argument pattern changes (rug-pull indicator)
 * - Unusual tool call sequences
 * - Name/description mismatch
 */

import type { DetectionResult } from "./tool-injection.js";

interface CallRecord {
  toolName: string;
  argKeys: string;
  timestamp: number;
  argSample: string;
}

export class AnomalyDetector {
  private history: CallRecord[] = [];
  private toolCallCounts: Map<string, number> = new Map();
  private windowMs: number;

  constructor(windowMs = 60000) {
    this.windowMs = windowMs;
  }

  /** Record a tool call and check for anomalies */
  recordAndDetect(toolName: string, args: Record<string, unknown>): DetectionResult[] {
    const now = Date.now();
    const argKeys = Object.keys(args).sort().join(",");
    const argSample = JSON.stringify(args).substring(0, 200);

    // Add to history
    this.history.push({ toolName, argKeys, timestamp: now, argSample });

    // Prune old entries
    this.history = this.history.filter(h => now - h.timestamp < this.windowMs);

    // Update counts
    this.toolCallCounts.set(toolName, (this.toolCallCounts.get(toolName) || 0) + 1);

    const detections: DetectionResult[] = [];

    // 1. Beacon detection: same tool called repeatedly at regular intervals
    detections.push(...this.detectBeacon(toolName, now));

    // 2. Argument pattern change (rug-pull)
    detections.push(...this.detectArgPatternChange(toolName, argKeys));

    // 3. Burst detection: many calls in short time
    detections.push(...this.detectBurst(now));

    // 4. Unusual sequence: tool never seen before suddenly called
    detections.push(...this.detectNewTool(toolName));

    return detections;
  }

  private detectBeacon(toolName: string, now: number): DetectionResult[] {
    const toolCalls = this.history.filter(h => h.toolName === toolName);
    if (toolCalls.length < 4) return [];

    // Check for regular intervals (±20% tolerance)
    const intervals: number[] = [];
    for (let i = 1; i < toolCalls.length; i++) {
      intervals.push(toolCalls[i]!.timestamp - toolCalls[i-1]!.timestamp);
    }

    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const isRegular = intervals.every(i => Math.abs(i - avgInterval) / avgInterval < 0.2);

    if (isRegular && avgInterval < 10000) {
      return [{
        level: "medium",
        detector: "anomaly",
        rule: "beacon-behavior",
        message: `Tool "${toolName}" called ${toolCalls.length} times at ~${Math.round(avgInterval / 1000)}s intervals — beacon pattern`,
        evidence: `Interval: ${Math.round(avgInterval)}ms avg, ${toolCalls.length} calls`,
        toolName,
      }];
    }

    return [];
  }

  private detectArgPatternChange(toolName: string, currentArgKeys: string): DetectionResult[] {
    const toolCalls = this.history.filter(h => h.toolName === toolName);
    if (toolCalls.length < 6) return [];

    // Check if the last 5 calls had consistent arg keys, but this one changed
    const recent = toolCalls.slice(-6, -1);
    const prevPattern = recent[0]?.argKeys;
    if (!prevPattern) return [];

    const wasConsistent = recent.every(c => c.argKeys === prevPattern);
    if (wasConsistent && currentArgKeys !== prevPattern) {
      return [{
        level: "medium",
        detector: "anomaly",
        rule: "arg-pattern-change",
        message: `Tool "${toolName}" argument pattern changed — possible rug-pull`,
        evidence: `Previous: {${prevPattern}} → Current: {${currentArgKeys}}`,
        toolName,
      }];
    }

    return [];
  }

  private detectBurst(now: number): DetectionResult[] {
    const recentWindow = 5000; // 5 seconds
    const recentCalls = this.history.filter(h => now - h.timestamp < recentWindow);
    if (recentCalls.length > 20) {
      return [{
        level: "high",
        detector: "anomaly",
        rule: "call-burst",
        message: `${recentCalls.length} tool calls in ${recentWindow / 1000}s — abnormal burst`,
        evidence: `Tools: ${[...new Set(recentCalls.map(c => c.toolName))].join(", ")}`,
        toolName: "*",
      }];
    }
    return [];
  }

  private detectNewTool(toolName: string): DetectionResult[] {
    // Only flag if we have significant history and this is the first call to this tool
    if (this.history.length > 20 && this.toolCallCounts.get(toolName) === 1) {
      return [{
        level: "low",
        detector: "anomaly",
        rule: "new-tool-call",
        message: `First call to "${toolName}" after ${this.history.length} other calls — monitor closely`,
        evidence: `Previously seen tools: ${[...this.toolCallCounts.keys()].filter(k => k !== toolName).slice(0, 5).join(", ")}`,
        toolName,
      }];
    }
    return [];
  }

  /** Get summary of detected patterns */
  getSummary(): { totalCalls: number; uniqueTools: number; windowMs: number } {
    return {
      totalCalls: this.history.length,
      uniqueTools: this.toolCallCounts.size,
      windowMs: this.windowMs,
    };
  }
}
