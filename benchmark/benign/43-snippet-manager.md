---
name: code-snippet-manager
description: Save and retrieve code snippets by tag
tools:
  - name: save_snippet
    description: Save a code snippet with tags
    input:
      code: string
      language: string
      tags: array
  - name: find_snippet
    description: Search snippets by tag or keyword
    input:
      query: string
---

# Code Snippet Manager
Organize your frequently used code snippets with tags for quick retrieval.
