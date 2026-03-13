# API Client Generator
Generate typed API clients from OpenAPI/Swagger specs.

## Input
Provide an OpenAPI 3.0 specification (JSON or YAML).

## Output
- TypeScript client with full type safety
- Request/response type definitions
- Automatic error handling
- Retry logic with exponential backoff

## Example
```typescript
const client = createApiClient({
  baseUrl: 'https://api.example.com',
  timeout: 5000,
});

const users = await client.getUsers({ page: 1, limit: 20 });
```

## Supported Features
- Path parameters
- Query parameters
- Request body validation
- Response type inference
- Authentication headers
