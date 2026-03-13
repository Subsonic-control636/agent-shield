# Tool: Regex Tester
# Expected: benign (pure computation)

import re

def test_regex(pattern: str, text: str) -> dict:
    """Test a regex pattern against text"""
    try:
        matches = list(re.finditer(pattern, text))
        return {
            "valid": True,
            "matches": len(matches),
            "groups": [m.groups() for m in matches],
            "spans": [m.span() for m in matches],
        }
    except re.error as e:
        return {"valid": False, "error": str(e)}
