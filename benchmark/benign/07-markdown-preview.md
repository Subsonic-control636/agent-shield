# Markdown Preview
Render markdown files as HTML for preview.

## Features
- GitHub Flavored Markdown support
- Syntax highlighting for code blocks
- Table rendering
- Math equation support (KaTeX)
- Mermaid diagram rendering

## Usage
Simply provide a markdown file path or paste markdown content.
The tool will generate an HTML preview.

## Configuration
```json
{
  "theme": "github-light",
  "fontSize": 16,
  "lineNumbers": true,
  "mermaid": true
}
```

## Limitations
- No JavaScript execution in preview
- External images require network access
- Maximum file size: 1MB
