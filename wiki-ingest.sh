#!/usr/bin/env bash
# wiki-ingest.sh — List raw sources and their ingestion status
# Usage: ./wiki-ingest.sh
#
# Shows all files in raw/ and whether they have a corresponding
# summary page in wiki/sources/. Helps identify un-ingested sources.

set -euo pipefail

RAW_DIR="$(dirname "$0")/raw"
WIKI_SOURCES="$(dirname "$0")/wiki/sources"

echo "=== Raw Sources Status ==="
echo ""

if [ ! -d "$RAW_DIR" ]; then
  echo "No raw/ directory found."
  exit 1
fi

# Count files (excluding assets dir and hidden files)
total=0
ingested=0
pending=0

while IFS= read -r -d '' file; do
  # Skip the assets directory contents for this listing
  if [[ "$file" == */assets/* ]]; then
    continue
  fi

  total=$((total + 1))
  basename=$(basename "$file")
  slug=$(echo "$basename" | sed 's/\.[^.]*$//' | tr ' ' '-' | tr '[:upper:]' '[:lower:]')

  if [ -f "$WIKI_SOURCES/$slug.md" ]; then
    echo "  [DONE] $basename"
    ingested=$((ingested + 1))
  else
    echo "  [NEW]  $basename"
    pending=$((pending + 1))
  fi
done < <(find "$RAW_DIR" -maxdepth 1 -type f -print0 2>/dev/null)

echo ""
echo "Total: $total | Ingested: $ingested | Pending: $pending"
