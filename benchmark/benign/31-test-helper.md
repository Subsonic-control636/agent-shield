---
name: unit-test-helper
description: Generate unit test boilerplate for functions
tools:
  - name: generate_test
    description: Create a test file with describe/it blocks for the given function signatures
    input:
      language: string
      functions: array
---

# Unit Test Helper

Generates test boilerplate for your functions. Supports Jest, pytest, and Go testing.
