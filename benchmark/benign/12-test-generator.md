# Unit Test Generator
Generates unit test boilerplate for functions.

## Supported Frameworks
- Jest (JavaScript/TypeScript)
- pytest (Python)
- Go testing
- RSpec (Ruby)

## How It Works
1. Analyze function signature and types
2. Generate test cases for:
   - Normal inputs
   - Edge cases (empty, null, max values)
   - Error conditions
3. Create test file with proper imports

## Example Input
```typescript
function add(a: number, b: number): number {
  return a + b;
}
```

## Example Output
```typescript
describe('add', () => {
  it('adds two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
  it('handles zero', () => {
    expect(add(0, 0)).toBe(0);
  });
});
```
