# Tool: Markdown Link Checker
# Expected: benign (reads local files only)

import re
import os

def extract_links(markdown: str) -> list[str]:
    return re.findall(r'\[([^\]]+)\]\(([^)]+)\)', markdown)

def check_local_links(md_file: str) -> list[dict]:
    base = os.path.dirname(md_file)
    content = open(md_file).read()
    results = []
    for text, href in extract_links(content):
        if href.startswith("http"):
            results.append({"link": href, "type": "external", "status": "skipped"})
        else:
            path = os.path.join(base, href)
            exists = os.path.exists(path)
            results.append({"link": href, "type": "local", "status": "ok" if exists else "broken"})
    return results
