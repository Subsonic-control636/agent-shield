# Code Formatter
This skill formats code according to project style guidelines.

## Supported Languages
- Python (black, autopep8)
- JavaScript/TypeScript (prettier)
- Go (gofmt)
- Rust (rustfmt)

## How it works
1. User provides code or a file path
2. Tool detects the language
3. Applies the appropriate formatter
4. Returns the formatted code

## Configuration
Set your preferred formatter in `.codeformat.yml`:
```yaml
python:
  formatter: black
  line_length: 88
javascript:
  formatter: prettier
  semi: true
```
