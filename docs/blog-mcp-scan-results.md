# We Scanned 17 Popular MCP Servers — Here's What We Found

The Model Context Protocol (MCP) is quickly becoming the standard for connecting AI agents to external tools. Claude Desktop, Cursor, Windsurf, and dozens of other AI apps now support MCP servers as plugins.

But here's the problem: **nobody is checking if these servers are safe to install.**

We built [Agent Shield](https://github.com/elliotllliu/agent-shield), a security scanner for AI agent tools, and used it to audit 17 of the most popular MCP servers — including official ones from Anthropic, AWS, Cloudflare, Docker, Brave, and Azure.

The results were eye-opening.

## TL;DR

- **17 servers scanned**, 4,198 files, 1.2 million lines of code
- **100% of servers** lack proper permission declarations
- **5 servers** (29%) scored as high risk
- **1 real eval() vulnerability** found in Playwright MCP
- Average security score: **34/100**

## What We Scanned

We selected servers across the MCP ecosystem — from official reference implementations to popular community projects:

| Tier | Servers |
|------|---------|
| **Official** | Anthropic's reference servers, AWS MCP |
| **Major vendors** | Cloudflare, Azure, Docker, Brave Search |
| **Popular community** | Playwright, Obsidian, Figma, PostgreSQL, Supabase, Kubernetes, Notion |

All scans were fully offline — no code ever left our machine.

## The Results

| Server | Score | Risk | Top Findings |
|--------|-------|------|-------------|
| cloudflare/mcp-server-cloudflare | -100 | 🔴 | privilege, phone-home, backdoor |
| awslabs/mcp | -100 | 🔴 | credential-hardcode, privilege, phone-home |
| modelcontextprotocol/servers | -29 | 🔴 | privilege, phone-home, cross-file |
| anthropics/anthropic-quickstarts | -1 | 🔴 | privilege, sensitive-read |
| Azure/azure-mcp | 26 | 🟡 | privilege, backdoor |
| docker/hub-mcp | 35 | 🟡 | privilege, description-integrity |
| supabase-mcp-server | 42 | 🟡 | credential-hardcode, privilege |
| mcp-server-kubernetes | 43 | 🟡 | privilege, env-leak |
| Figma-Context-MCP | 48 | 🟡 | privilege, phone-home |
| brave-search-mcp-server | 58 | 🟡 | privilege, network-ssrf |
| **MCP-Server-Playwright** | **64** | **🔴** | **backdoor (eval), privilege** |
| postgres-mcp | 78 | 🟡 | credential-hardcode |
| docker-mcp | 97 | 🟢 | privilege |
| mcp-server-docker | 97 | 🟢 | privilege |

*(Scores range from -100 to 100. Higher is safer.)*

## 3 Key Findings

### 1. Nobody Declares Permissions (17/17 servers)

The MCP spec supports permission declarations in server manifests. In practice, **not a single server we scanned uses them.**

This means when you install a Kubernetes MCP server, there's no machine-readable way to know it can `kubectl delete` your pods. When you install the Docker server, nothing declares it can remove containers.

Users have to read source code or trust the README. That's not scalable security.

### 2. A Real eval() Vulnerability in Playwright MCP

The Playwright MCP server from Automata Labs contains a genuine `eval()` call with dynamic input at `index.ts:535`:

```javascript
// User-controlled data flows into eval()
eval(userProvidedScript)
```

This means an AI agent using this server could be tricked into executing arbitrary JavaScript — a textbook code injection vector. This is not a false positive; it's a real security risk that any project using Playwright MCP should be aware of.

### 3. Monorepos Inflate Risk Scores — But Still Have Issues

AWS's MCP repository (-100 score) and Cloudflare's (-100) are monorepos containing dozens of sub-packages, test fixtures, and example code. Their low scores are inflated by volume.

But even accounting for that, we found real patterns worth investigating: hardcoded credentials in example configs, test files with embedded secrets, and worker code that makes unrestricted HTTP requests.

## Why This Matters

The MCP ecosystem is growing fast. Anthropic's reference implementation has 18K+ stars. The awesome-mcp-servers list has 6K+ entries.

But unlike npm (which has `npm audit`), PyPI (which has `safety`), or Docker Hub (which has image scanning), **MCP servers have no standard security scanning.**

When a developer installs `@modelcontextprotocol/server-filesystem`, they're giving an AI agent read/write access to their files. When they install `mcp-server-kubernetes`, they're giving it access to their cluster. The security implications are significant, and there's currently no automated way to assess them.

## About False Positives

We want to be transparent: some findings, especially `env-leak` and `phone-home`, can be false positives for legitimate API clients. MCP servers naturally read API keys from environment variables and make HTTP requests — that's what they do.

Agent Shield flags these patterns for manual review, not as definitive security failures. The goal is to surface patterns that *could* be problematic and let developers make informed decisions.

That said, several findings — like the Playwright `eval()`, missing permission declarations, and hardcoded credentials — are genuine issues worth fixing.

## How We Did It

[Agent Shield](https://github.com/elliotllliu/agent-shield) performs static analysis with:

- **31 security rules** covering code injection, data exfiltration, reverse shells, obfuscation, prompt injection, and more
- **Cross-file taint tracking** to follow dangerous data flows across modules
- **Multi-language support** — TypeScript, JavaScript, Python, Go, Rust
- **MCP-specific checks** — manifest validation, permission declarations, description integrity

All scanning is fully offline. No code is uploaded anywhere.

```bash
# Try it yourself
npx @elliotllliu/agent-shield scan <directory>

# Or with Docker
docker run --rm -v $(pwd):/workspace agent-shield scan .
```

## What Should Change

1. **MCP servers should declare permissions.** The spec supports it; implementations should use it.
2. **Registries should scan before listing.** awesome-mcp-servers, Glama.ai, Smithery — all could integrate automated scanning.
3. **CI pipelines should include security checks.** Just like you run linters and tests, scan your MCP server before publishing.

The MCP ecosystem is at an inflection point. The tooling is maturing, adoption is accelerating, and the security practices need to catch up before the first major incident happens.

---

*[Agent Shield](https://github.com/elliotllliu/agent-shield) is an open-source security scanner for AI agent skills, MCP servers, and plugins. Install it with `npm install -g @elliotllliu/agent-shield` or use it as a [GitHub Action](https://github.com/elliotllliu/agent-shield).*

*Have a server you'd like us to scan? [Open an issue](https://github.com/elliotllliu/agent-shield/issues) or just run it yourself — it's free and fully offline.*
