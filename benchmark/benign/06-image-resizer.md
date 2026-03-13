# Image Resizer
Resize and optimize images for web use.

## Features
- Resize to specific dimensions
- Maintain aspect ratio
- Convert between formats (PNG, JPEG, WebP)
- Compress for web optimization

## Usage
```
resize --width 800 --quality 85 input.png output.webp
```

## Supported Formats
| Format | Read | Write |
|--------|------|-------|
| PNG    | ✅   | ✅    |
| JPEG   | ✅   | ✅    |
| WebP   | ✅   | ✅    |
| GIF    | ✅   | ❌    |
| SVG    | ✅   | ❌    |
