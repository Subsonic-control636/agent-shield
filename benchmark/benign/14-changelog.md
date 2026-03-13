# Changelog Generator
Automatically generates changelogs from git history.

## Features
- Parses conventional commits (feat, fix, docs, refactor)
- Groups changes by type
- Links to PRs and issues
- Supports semantic versioning

## Usage
```bash
changelog generate --from v1.0.0 --to v2.0.0
```

## Output Format
```markdown
## [2.0.0] - 2024-03-15
### Features
- Add dark mode support (#123)
### Bug Fixes
- Fix memory leak in parser (#456)
### Documentation
- Update API reference (#789)
```

## Options
- `--format` — Output format (markdown, json, html)
- `--group-by` — Group changes (type, scope, author)
