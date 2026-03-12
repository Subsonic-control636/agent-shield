# 🛡️ AgentShield

Security scanner for AI agent skills, MCP servers, and plugins.

Catch data exfiltration, backdoors, privilege escalation, and supply chain vulnerabilities **before** they reach your agents.

## Quick Start

```bash
npx @elliotllliu/agentshield scan ./my-skill/
```

## What It Detects

| Rule | Severity | Description |
|------|----------|-------------|
| `data-exfil` | 🔴 Critical | Reads sensitive files (SSH keys, credentials) + sends HTTP requests |
| `backdoor` | 🔴 Critical | `eval()`, `new Function()`, `child_process.exec()` with dynamic input |
| `reverse-shell` | 🔴 Critical | Outbound socket connections piped to shell |
| `crypto-mining` | 🔴 Critical | Mining pool connections, known miners (xmrig, coinhive) |
| `credential-hardcode` | 🔴 Critical | Hardcoded AWS keys, GitHub PATs, Stripe keys, private keys |
| `env-leak` | 🔴 Critical | `process.env` access + outbound HTTP (environment variable exfil) |
| `obfuscation` | 🔴 Critical | base64 + eval combos, hex-encoded strings, `String.fromCharCode` |
| `typosquatting` | 🔴 Critical | Suspicious npm package names (e.g. `1odash` instead of `lodash`) |
| `hidden-files` | 🔴 Critical | `.env` files with secrets committed to repo |
| `network-ssrf` | 🟡 Warning | User-controlled URLs in fetch, AWS metadata endpoint access |
| `privilege` | 🟡 Warning | SKILL.md declares `read` but code calls `exec` |
| `supply-chain` | 🟡 Warning | Known CVEs in npm dependencies (`npm audit`) |
| `sensitive-read` | 🟡 Warning | Accesses `~/.ssh/id_rsa`, `~/.aws/credentials`, etc. |
| `excessive-perms` | 🟡 Warning | Too many or dangerous permissions in SKILL.md |
| `phone-home` | 🟡 Warning | Periodic timers + HTTP requests (beacon/heartbeat pattern) |
| `mcp-manifest` | 🟡 Warning | MCP server: wildcard perms, undeclared capabilities, suspicious tool descriptions |
| `mcp-manifest` | 🟡 Warning | MCP server tool/resource declarations vs actual code behavior |

## Example Output

```
🛡️  AgentShield Security Report
📁 Scanned: ./my-skill/ (3 files, 44 lines)

🔴 CRITICAL (3)
  ├─ index.ts:13 — [data-exfil] Reads sensitive data and sends HTTP request — possible exfiltration
  ├─ index.ts:20 — [backdoor] eval() with dynamic input
  └─ index.ts:25 — [backdoor] child_process.exec() — use execFile instead

🟡 WARNING (2)
  ├─ index.ts:23 — [privilege] Code uses 'exec' but SKILL.md doesn't declare it
  └─ index.ts:6  — [sensitive-read] Accesses SSH private key

🟢 INFO (1)
  └─ SKILL.md — [privilege] Detected capabilities: exec, read, web_fetch

✅ Score: 0/100 (Critical Risk)
```

## Usage

```bash
# Scan a directory
agentshield scan ./path/to/skill/

# JSON output (for CI/CD)
agentshield scan ./skill/ --json

# Fail CI if score is below threshold
agentshield scan ./skill/ --fail-under 70

# Disable specific rules
agentshield scan ./skill/ --disable supply-chain,phone-home

# Only run specific rules
agentshield scan ./skill/ --enable backdoor,data-exfil

# Shorthand (directory as first arg)
agentshield ./skill/

# Generate config files
agentshield init

# Watch mode (re-scan on changes)
agentshield watch ./skill/

# Compare two versions
agentshield compare ./skill-v1/ ./skill-v2/
```

## Configuration

Create `.agentshield.yml` in your project (or run `agentshield init`):

```yaml
rules:
  disable:
    - supply-chain    # skip npm audit
    - phone-home      # allow periodic HTTP

severity:
  sensitive-read: info   # downgrade to info

failUnder: 70   # CI threshold

ignore:
  - "tests/**"
  - "*.test.ts"
```

### `.agentshieldignore`

Exclude files from scanning (same syntax as `.gitignore`):

```
node_modules/
dist/
*.test.ts
__tests__/
```

## CI Integration

### GitHub Action (recommended)

```yaml
# .github/workflows/security.yml
name: Security Scan
on: [push, pull_request]
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: elliotllliu/agentshield@main
        with:
          path: './skills/'
          fail-under: '70'
```

### npx one-liner

```yaml
- name: Security scan
  run: npx -y @elliotllliu/agentshield scan ./skills/ --fail-under 70
```

### Action Inputs

| Input | Default | Description |
|-------|---------|-------------|
| `path` | `.` | Directory to scan |
| `fail-under` | *(none)* | Fail if score is below threshold (0-100) |
| `format` | `terminal` | Output format: `terminal` or `json` |

### Action Outputs

| Output | Description |
|--------|-------------|
| `score` | Security score (0-100) |
| `findings` | Number of findings |

## Scoring

Starts at 100, deducts per finding:

| Severity | Deduction |
|----------|-----------|
| Critical | -25 |
| Warning | -10 |
| Info | 0 |

| Score | Risk Level |
|-------|------------|
| 90-100 | Low Risk ✅ |
| 70-89 | Moderate Risk 🟡 |
| 40-69 | High Risk 🟠 |
| 0-39 | Critical Risk 🔴 |

## Supported File Types

- **JavaScript/TypeScript**: `.js`, `.ts`, `.mjs`, `.cjs`, `.tsx`, `.jsx`
- **Python**: `.py`
- **Shell**: `.sh`, `.bash`, `.zsh`
- **Config**: `.json`, `.yaml`, `.yml`, `.toml`
- **Docs**: `SKILL.md` (permission analysis)

## Roadmap

- [ ] AST-based analysis (tree-sitter for multi-language support)
- [ ] MCP server manifest validation
- [ ] Custom rule plugins
- [ ] `agentshield init` — generate security policy
- [ ] Sarif output for GitHub Code Scanning
- [ ] Python `pip-audit` integration
- [ ] Watch mode for development

## License

MIT
