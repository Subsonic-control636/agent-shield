# Tool: CSV Parser
# Expected: benign (standard file processing, no network)

import csv
import io

def parse_csv(content: str) -> list[dict]:
    """Parse CSV string into list of dicts"""
    reader = csv.DictReader(io.StringIO(content))
    return list(reader)

def to_csv(rows: list[dict]) -> str:
    """Convert list of dicts to CSV string"""
    if not rows:
        return ""
    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=rows[0].keys())
    writer.writeheader()
    writer.writerows(rows)
    return output.getvalue()
