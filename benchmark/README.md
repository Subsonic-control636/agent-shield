# AgentShield Detection Benchmark

This benchmark evaluates AgentShield's detection accuracy across
multiple attack categories and benign samples.

## Structure
- `malicious/` — Attack samples, each file targets one category
- `benign/` — Safe samples that should NOT trigger findings
- `run.ts` — Benchmark runner script
- `results.md` — Latest benchmark results

## Metrics
- **Recall** = true positives / (true positives + false negatives)
- **FPR** = false positives / (false positives + true negatives)
- **Precision** = true positives / (true positives + false positives)
- **F1** = 2 * precision * recall / (precision + recall)
