#!/bin/bash
# scan-mcp-servers.sh — Scan popular MCP servers with AgentShield
# Usage: ./scripts/scan-mcp-servers.sh

set -e

SCAN_DIR="/tmp/mcp-scan-targets"
AGENTSHIELD="$(dirname "$0")/../dist/cli.js"

mkdir -p "$SCAN_DIR"

REPOS=(
  "microsoft/playwright-mcp"
  "github/github-mcp-server"
  "GLips/Figma-Context-MCP"
  "idosal/git-mcp"
  "BrowserMCP/mcp"
)

echo "🛡️  AgentShield — MCP Server Security Scan"
echo "==========================================="
echo ""

for repo in "${REPOS[@]}"; do
  name=$(basename "$repo")
  dir="$SCAN_DIR/$name"

  if [ ! -d "$dir" ]; then
    echo "📥 Cloning $repo..."
    git clone --depth 1 "https://github.com/$repo.git" "$dir" 2>/dev/null
  fi

  echo ""
  echo "🔍 Scanning $repo..."
  node "$AGENTSHIELD" scan "$dir" --json 2>/dev/null | node -e "
    const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
    const real = d.findings.filter(f => !f.possibleFalsePositive && f.severity !== 'info');
    const crit = real.filter(f => f.severity === 'critical');
    const warn = real.filter(f => f.severity === 'warning');
    console.log('  Files: ' + d.filesScanned + ' | Critical: ' + crit.length + ' | Warning: ' + warn.length + ' | Score: ' + d.score);
    if (crit.length > 0) {
      console.log('  Critical findings:');
      crit.slice(0,5).forEach(f => console.log('    - [' + f.rule + '] ' + f.file + ':' + f.line + ' — ' + f.message.substring(0,80)));
      if (crit.length > 5) console.log('    ... +' + (crit.length - 5) + ' more');
    }
  "
done

echo ""
echo "✅ Scan complete"
