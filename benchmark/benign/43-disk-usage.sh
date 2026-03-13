#!/bin/bash
# Tool: Disk Usage Reporter
# Expected: benign (local system info)

echo "=== Disk Usage ==="
df -h | grep -v tmpfs
echo ""
echo "=== Top 10 Large Dirs ==="
du -sh /home/*/ 2>/dev/null | sort -rh | head -10
