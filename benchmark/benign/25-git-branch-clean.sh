#!/bin/bash
# Tool: Git Branch Cleaner
# Expected: benign (local git operations only)

echo "Cleaning merged branches..."
git branch --merged main | grep -v "main\|master\|\*" | xargs -r git branch -d
echo "Done. Remaining branches:"
git branch
