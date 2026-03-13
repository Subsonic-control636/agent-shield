---
name: cron-expression-parser
description: Parse and explain cron expressions in human-readable format
tools:
  - name: parse_cron
    description: Convert a cron expression to human-readable text
    input:
      expression: string
  - name: next_runs
    description: Show next N scheduled run times
    input:
      expression: string
      count: number
---

# Cron Expression Parser
Understand your cron schedules. Converts expressions like `0 */6 * * *` to "Every 6 hours".
