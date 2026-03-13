# 🛡️ MCP Server Security Report

> Scanned by [Agent Shield](https://github.com/elliotllliu/agent-shield) v0.8.0
> Date: 2026-03-13

## Summary

| Metric | Value |
|--------|-------|
| Servers scanned | 17 |
| Files analyzed | 4,198 |
| Lines of code | 1,248,151 |
| Average score | **34/100** (43/100 excl. monorepos) |

| Risk Level | Count | % |
|------------|-------|---|
| 🔴 High risk | 5 | 29% |
| 🟡 Medium risk | 9 | 52% |
| 🟢 Clean | 3 | 17% |

## Detailed Results

| Server | Score | 🔴 | 🟡 | 🟢 | Files | Top Findings |
|--------|-------|-----|-----|-----|-------|-------------|
| 🔴 [mcp-server-cloudflare](https://github.com/cloudflare/mcp-server-cloudflare) | -100 | 45 | 61 | 102 | 323 | privilege, phone-home, backdoor |
| 🔴 [mcp](https://github.com/awslabs/mcp) | -100 | 77 | 350 | 692 | 3026 | credential-hardcode, privilege, phone-home |
| 🔴 [servers](https://github.com/modelcontextprotocol/servers) | -29 | 2 | 10 | 38 | 110 | privilege, phone-home, cross-file |
| 🔴 [anthropic-quickstarts](https://github.com/anthropics/anthropic-quickstarts) | -1 | 1 | 11 | 22 | 156 | privilege, sensitive-read, python-security |
| 🟡 [azure-mcp](https://github.com/Azure/azure-mcp) | 26 | 0 | 10 | 7 | 191 | privilege, backdoor, mcp-manifest |
| 🟡 [hub-mcp](https://github.com/docker/hub-mcp) | 35 | 0 | 7 | 20 | 32 | privilege, description-integrity, mcp-manifest |
| 🟡 [supabase-mcp-server](https://github.com/alexander-zuev/supabase-mcp-server) | 42 | 0 | 10 | 8 | 73 | credential-hardcode, privilege, python-security |
| 🟡 [mcp-server-kubernetes](https://github.com/Flux159/mcp-server-kubernetes) | 43 | 0 | 5 | 290 | 110 | privilege, description-integrity, env-leak |
| 🟡 [mcp-obsidian](https://github.com/MarkusPfundstein/mcp-obsidian) | 47 | 0 | 9 | 2 | 7 | privilege, phone-home, env-leak |
| 🟡 [Figma-Context-MCP](https://github.com/GLips/Figma-Context-MCP) | 48 | 0 | 5 | 26 | 44 | privilege, phone-home, env-leak |
| 🟡 [brave-search-mcp-server](https://github.com/brave/brave-search-mcp-server) | 58 | 0 | 4 | 4 | 41 | privilege, network-ssrf, data-exfil |
| 🔴 [MCP-Server-Playwright](https://github.com/Automata-Labs-team/MCP-Server-Playwright) | 64 | 1 | 0 | 7 | 6 | backdoor, privilege, mcp-manifest |
| 🟡 [postgres-mcp](https://github.com/crystaldba/postgres-mcp) | 78 | 0 | 1 | 22 | 53 | credential-hardcode, privilege, sensitive-read |
| 🟢 [mcp-obsidian](https://github.com/calclavia/mcp-obsidian) | 90 | 0 | 0 | 9 | 6 | supply-chain, privilege |
| 🟡 [notion_mcp](https://github.com/danhilse/notion_mcp) | 91 | 0 | 1 | 1 | 5 | env-leak, privilege |
| 🟢 [docker-mcp](https://github.com/QuantGeekDev/docker-mcp) | 97 | 0 | 0 | 1 | 6 | privilege |
| 🟢 [mcp-server-docker](https://github.com/ckreiling/mcp-server-docker) | 97 | 0 | 0 | 1 | 9 | privilege |

## Key Findings

### Most Common Issues
- **privilege** — found in 17/17 servers
- **mcp-manifest** — found in 7/17 servers
- **phone-home** — found in 5/17 servers
- **env-leak** — found in 5/17 servers
- **data-exfil** — found in 5/17 servers
- **sensitive-read** — found in 4/17 servers
- **prompt-injection** — found in 4/17 servers
- **backdoor** — found in 3/17 servers
- **credential-hardcode** — found in 3/17 servers
- **supply-chain** — found in 3/17 servers

## Methodology

- Static analysis only (no code execution)
- 31 security rules including cross-file analysis, AST taint tracking, prompt injection detection
- All scans run offline — no code leaves your machine
- Scan tool: [Agent Shield](https://github.com/elliotllliu/agent-shield) v0.8.0

## About False Positives

Some findings (especially `env-leak` and `network-ssrf`) may be false positives for legitimate API clients. MCP servers often need to read environment variables for API keys and make HTTP requests to external services — this is expected behavior, not exfiltration. Agent Shield flags these patterns for manual review.

## Notable Real Findings

| Server | Finding | Real Risk? |
|--------|---------|------------|
| **MCP-Server-Playwright** | `eval()` with dynamic input (index.ts:535) | ⚠️ Yes — user-controlled code execution |
| **modelcontextprotocol/servers** | Cross-file injection: filesystem reads → release script | 🟡 Worth reviewing |
| **anthropic-quickstarts** | Reads sensitive data + HTTP request in financial app | 🟡 Expected for API client, but worth verifying |
| **awslabs/mcp** | 77 high findings across 3,026 files | 📦 Monorepo — many are test/example code |
| **cloudflare/mcp-server-cloudflare** | 45 high findings across 323 files | 📦 Monorepo with worker examples |

> **Key insight**: The most common finding (`privilege` — 17/17 servers) means almost no MCP server properly declares its permissions in manifest. This is an ecosystem-wide gap, not individual server failures.
