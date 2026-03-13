# Tool: Diff Viewer
# Expected: benign (text comparison, no I/O)

import difflib

def unified_diff(old: str, new: str, filename: str = "file") -> str:
    old_lines = old.splitlines(keepends=True)
    new_lines = new.splitlines(keepends=True)
    return "".join(difflib.unified_diff(old_lines, new_lines, fromfile=f"a/{filename}", tofile=f"b/{filename}"))

def similarity(a: str, b: str) -> float:
    return difflib.SequenceMatcher(None, a, b).ratio()
