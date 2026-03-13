# 🛡️ AgentShield for VS Code

Security scanner for AI agent skills, MCP servers, and plugins — right in your editor.

## Features

- **Auto-scan on save** — see security issues as red/yellow squiggles instantly
- **Status bar score** — always know your project's security score
- **31 security rules** — backdoors, data exfil, prompt injection, and more
- **Multi-language** — JS/TS, Python, Go, Rust, Shell, YAML, JSON, Markdown

## Commands

| Command | Description |
|---------|-------------|
| `Agent Shield: Scan Current File` | Scan the active file |
| `Agent Shield: Scan Workspace` | Scan the entire workspace |

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `agentShield.autoScan` | `true` | Auto-scan files on save |
| `agentShield.failUnder` | `70` | Score threshold for status bar warning |
| `agentShield.disabledRules` | `[]` | Rules to disable |

## How It Works

The extension uses the `@elliotllliu/agent-shield` npm package under the hood. It runs the same 31 security rules as the CLI, including:

- 🔴 **Backdoors** — `eval()`, `exec()`, reverse shells
- 🔴 **Data exfiltration** — sensitive file reads + HTTP requests
- 🟡 **Prompt injection** — 55+ patterns in 8 languages
- 🟡 **Tool shadowing** — cross-server tool name conflicts
- 🟢 **Supply chain** — known CVEs, typosquatting
- 🆕 **Python AST** — taint tracking through data flow
- 🆕 **Cross-file** — multi-file attack chain detection

## Requirements

- Node.js 18+ (for running `npx`)
- VS Code 1.85+

## Installation

### From VSIX (local)
```bash
cd vscode-extension
npm install
npm run compile
npx vsce package
code --install-extension agent-shield-0.1.0.vsix
```

### From Marketplace (coming soon)
Search for "AgentShield" in the VS Code Extensions panel.

## License

MIT
