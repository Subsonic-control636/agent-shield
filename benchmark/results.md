# AgentShield Benchmark Results

Generated: 2026-03-13T03:42:25.110Z
Duration: 204ms

## Summary

| Metric | Value |
|--------|-------|
| Malicious samples | 9 |
| Benign samples | 10 |
| True Positives | 9/9 |
| False Negatives | 0 |
| True Negatives | 10/10 |
| False Positives | 0 |
| **Recall** | **100.0%** |
| **Precision** | **100.0%** |
| **F1 Score** | **100.0%** |
| **FPR** | **0.0%** |
| **Accuracy** | **100.0%** |

## Malicious Samples

| File | Detected | Critical | Warning | Score | Rules |
|------|----------|----------|---------|-------|-------|
| malicious/01-instruction-override.md | ✅ | 0 | 7 | 0 | prompt-injection |
| malicious/02-identity-manipulation.md | ✅ | 0 | 8 | 0 | prompt-injection |
| malicious/03-system-prompt-attacks.md | ✅ | 0 | 10 | 0 | prompt-injection |
| malicious/04-hidden-instructions.md | ✅ | 1 | 7 | 0 | prompt-injection, sensitive-read |
| malicious/05-behavioral-hijacking.md | ✅ | 1 | 6 | 0 | tool-shadowing, prompt-injection |
| malicious/06-tool-poisoning.md | ✅ | 0 | 5 | 0 | prompt-injection |
| malicious/07-data-exfiltration.md | ✅ | 0 | 5 | 0 | prompt-injection, sensitive-read |
| malicious/08-encoding-evasion.md | ✅ | 0 | 4 | 0 | prompt-injection |
| malicious/09-advanced-attacks.md | ✅ | 0 | 12 | 0 | prompt-injection, sensitive-read |

## Benign Samples

| File | Clean | Critical | Warning | Score |
|------|-------|----------|---------|-------|
| benign/01-weather-tool.md | ✅ | 0 | 0 | 100 |
| benign/02-code-formatter.md | ✅ | 0 | 0 | 100 |
| benign/03-git-helper.md | ✅ | 0 | 0 | 100 |
| benign/04-database-query.md | ✅ | 0 | 0 | 100 |
| benign/05-translation.md | ✅ | 0 | 0 | 100 |
| benign/06-image-resizer.md | ✅ | 0 | 0 | 100 |
| benign/07-markdown-preview.md | ✅ | 0 | 0 | 100 |
| benign/08-calculator.md | ✅ | 0 | 0 | 100 |
| benign/09-spell-checker.md | ✅ | 0 | 0 | 100 |
| benign/10-file-search.md | ✅ | 0 | 0 | 100 |
