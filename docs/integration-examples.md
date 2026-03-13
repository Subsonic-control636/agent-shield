# Integration Examples

Ready-to-use CI/CD templates for integrating Agent Shield into your workflow.

## GitHub Actions

### Basic Security Scan

```yaml
# .github/workflows/security.yml
name: Security Scan

on: [push, pull_request]

jobs:
  agent-shield:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Agent Shield
        uses: elliotllliu/agent-shield@main
        with:
          path: '.'
          fail-under: '70'
```

### With SARIF Upload (GitHub Code Scanning)

```yaml
name: Security Scan

on: [push, pull_request]

jobs:
  agent-shield:
    runs-on: ubuntu-latest
    permissions:
      security-events: write
    steps:
      - uses: actions/checkout@v4

      - name: Run Agent Shield
        uses: elliotllliu/agent-shield@main
        id: scan
        with:
          path: '.'
          sarif: 'true'

      - name: Upload SARIF
        if: always()
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: agent-shield-results.sarif
```

### PR Comment with Results

```yaml
name: Security Scan

on:
  pull_request:
    branches: [main]

jobs:
  agent-shield:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
    steps:
      - uses: actions/checkout@v4

      - name: Run Agent Shield
        id: scan
        run: |
          RESULT=$(npx -y @elliotllliu/agent-shield scan . --json 2>&1)
          SCORE=$(echo "$RESULT" | grep -o '"score":[0-9]*' | head -1 | cut -d: -f2)
          FINDINGS=$(echo "$RESULT" | grep -o '"totalFindings":[0-9]*' | head -1 | cut -d: -f2)
          HIGH=$(echo "$RESULT" | grep -o '"high":[0-9]*' | head -1 | cut -d: -f2)
          echo "score=$SCORE" >> "$GITHUB_OUTPUT"
          echo "findings=$FINDINGS" >> "$GITHUB_OUTPUT"
          echo "high=$HIGH" >> "$GITHUB_OUTPUT"

      - name: Comment PR
        uses: actions/github-script@v7
        with:
          script: |
            const score = '${{ steps.scan.outputs.score }}';
            const findings = '${{ steps.scan.outputs.findings }}';
            const high = '${{ steps.scan.outputs.high }}';
            const emoji = score >= 90 ? '✅' : score >= 70 ? '🟡' : score >= 40 ? '🟠' : '🔴';
            const body = `## 🛡️ Agent Shield Security Scan

            ${emoji} **Score: ${score}/100** | Findings: ${findings} | High: ${high}

            <sub>Scanned by [Agent Shield](https://github.com/elliotllliu/agent-shield)</sub>`;

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body
            });
```

## GitLab CI

```yaml
# .gitlab-ci.yml
agent-shield:
  image: node:20-alpine
  stage: test
  script:
    - npx -y @elliotllliu/agent-shield scan . --fail-under 70
  allow_failure: false
```

## Docker

```bash
# Scan current directory
docker run --rm -v $(pwd):/workspace elliotllliu/agent-shield scan .

# Scan with JSON output
docker run --rm -v $(pwd):/workspace elliotllliu/agent-shield scan . --json

# Scan a specific subdirectory
docker run --rm -v $(pwd):/workspace elliotllliu/agent-shield scan ./src
```

## Pre-commit Hook

```bash
#!/bin/sh
# .git/hooks/pre-commit

echo "🛡️ Running Agent Shield..."
npx -y @elliotllliu/agent-shield scan . --fail-under 80 --quiet

if [ $? -ne 0 ]; then
  echo "❌ Security check failed. Fix issues before committing."
  exit 1
fi
```

Or with [pre-commit](https://pre-commit.com/):

```yaml
# .pre-commit-config.yaml
repos:
  - repo: local
    hooks:
      - id: agent-shield
        name: Agent Shield Security Scan
        entry: npx -y @elliotllliu/agent-shield scan . --fail-under 80
        language: system
        pass_filenames: false
        always_run: true
```

## npm Scripts

```json
{
  "scripts": {
    "security": "agent-shield scan .",
    "security:ci": "agent-shield scan . --json --fail-under 70",
    "security:sarif": "agent-shield scan . --sarif -o results.sarif",
    "presecurity": "npm run build"
  }
}
```

## Programmatic Usage (Node.js)

```typescript
import { scan } from '@elliotllliu/agent-shield';

const result = scan('./my-mcp-server');

console.log(`Score: ${result.score}/100`);
console.log(`Findings: ${result.findings.length}`);

// Filter high-risk only
const critical = result.findings.filter(f => f.severity === 'high');
if (critical.length > 0) {
  console.error('🔴 High-risk issues found!');
  process.exit(1);
}
```
