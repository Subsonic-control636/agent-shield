# File Search Tool
Search for files and content across your project.

## Features
- Filename search with glob patterns
- Full-text content search
- Regex pattern matching
- File type filtering

## Usage
```
search "TODO" --ext .ts,.js --ignore node_modules
search --name "*.test.ts" --path src/
```

## Options
- `--ext` — Filter by file extension
- `--ignore` — Directories to skip
- `--max-depth` — Limit directory depth
- `--case-sensitive` — Enable case-sensitive search

## Performance
- Uses streaming for large directories
- Respects .gitignore by default
- Caches file index for repeated searches
