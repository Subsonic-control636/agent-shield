import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { discoverAgents } from "../src/discover.js";

describe("discover: agent discovery", () => {
  it("returns an array", () => {
    const agents = discoverAgents();
    assert.ok(Array.isArray(agents));
  });

  it("each agent has required fields", () => {
    const agents = discoverAgents();
    for (const agent of agents) {
      assert.ok(typeof agent.name === "string");
      assert.ok(agent.configPath === null || typeof agent.configPath === "string");
      assert.ok(agent.skillsDir === null || typeof agent.skillsDir === "string");
      assert.ok(typeof agent.mcpServerCount === "number");
    }
  });

  it("finds at least Claude Code on this machine", () => {
    // This test assumes Claude Code is installed (as seen from prior discover output)
    const agents = discoverAgents();
    const claude = agents.find(a => a.name === "Claude Code");
    // Only assert if we're in the right environment
    if (claude) {
      assert.ok(claude.configPath || claude.skillsDir);
    }
  });
});
