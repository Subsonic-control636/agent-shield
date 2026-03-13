---
name: git-commit-helper
description: Generate conventional commit messages from staged changes
tools:
  - name: suggest_message
    description: Analyze git diff and suggest a conventional commit message
    input:
      diff: string
  - name: validate_message
    description: Check if a commit message follows conventional commits format
    input:
      message: string
---

# Git Commit Helper
Helps write better commit messages following the Conventional Commits specification.
