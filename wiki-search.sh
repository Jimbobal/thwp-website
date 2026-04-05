#!/usr/bin/env bash
# wiki-search.sh — Simple search tool for the LLM Wiki
# Usage: ./wiki-search.sh <query>
#
# Searches all wiki markdown files for the given query using grep.
# Returns matching files with context. Useful for the LLM to find
# relevant pages when the index isn't enough.

set -euo pipefail

WIKI_DIR="$(dirname "$0")/wiki"
QUERY="${1:?Usage: wiki-search.sh <query>}"

echo "=== Wiki Search: \"$QUERY\" ==="
echo ""

# Search with context, case-insensitive
grep -r -i -n --include="*.md" -C 2 "$QUERY" "$WIKI_DIR" 2>/dev/null || echo "No results found."
