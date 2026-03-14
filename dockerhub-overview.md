# 🛡️ Agent Shield

**Full-stack security for AI Agents — Static Analysis + Runtime Interception**

Scan AI agent skills, MCP servers, and plugins for security vulnerabilities before they reach your agents.

## Quick Start

```bash
# Scan a directory
docker run --rm -v $(pwd):/workspace elliotllliu/agent-shield scan .

# Scan with JSON output
docker run --rm -v $(pwd):/workspace elliotllliu/agent-shield scan . --json

# Set a minimum score threshold
docker run --rm -v $(pwd):/workspace elliotllliu/agent-shield scan . --fail-under 70

# Verify file integrity
docker run --rm -v $(pwd):/workspace elliotllliu/agent-shield verify .
```

## What It Detects

- 🔴 **Backdoors** — eval(), exec() with dynamic input
- 🔴 **Data exfiltration** — reads secrets → sends HTTP
- 🔴 **Reverse shells** — hidden remote access
- 🟡 **Prompt injection** — in 8 languages (中/日/韓/俄/阿/西/法/德)
- 🟡 **Tool poisoning** — description says X, code does Y
- 🟢 **Supply chain** — typosquatting, hidden files

## Features

- **31 security rules** with cross-file taint tracking
- **Multi-language** — TypeScript, JavaScript, Python, Go, Rust
- **Runtime MCP proxy** — intercept malicious tool calls in real-time
- **100% offline** — your code never leaves your machine
- **SARIF + HTML reports** for CI/CD integration

## Also Available As

- **npm**: `npx @elliotllliu/agent-shield scan .`
- **GitHub Action**: `uses: elliotllliu/agent-shield@main`
- **VS Code Extension**: Coming soon

## Links

- [GitHub](https://github.com/elliotllliu/agent-shield)
- [npm](https://www.npmjs.com/package/@elliotllliu/agent-shield)
- [MCP Server Security Report](https://github.com/elliotllliu/agent-shield/blob/main/docs/mcp-servers-report.md)
