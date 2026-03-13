# JSON Validator
Validates JSON files against schemas.

## Features
- JSON Schema Draft-07 support
- Pretty error messages with line numbers
- Auto-detect schema from $schema field
- Support for $ref references

## Usage
```
validate data.json --schema schema.json
```

## Output
Returns a list of validation errors with paths:
- `/users/0/name`: Expected string, got number
- `/settings/theme`: Value not in enum ["light", "dark"]
