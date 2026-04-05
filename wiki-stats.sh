#!/usr/bin/env bash
# wiki-stats.sh — Show wiki statistics
# Usage: ./wiki-stats.sh

WIKI_DIR="$(dirname "$0")/wiki"

echo "=== Wiki Statistics ==="
echo ""

sources=$(find "$WIKI_DIR/sources" -name "*.md" 2>/dev/null | wc -l)
entities=$(find "$WIKI_DIR/entities" -name "*.md" 2>/dev/null | wc -l)
concepts=$(find "$WIKI_DIR/concepts" -name "*.md" 2>/dev/null | wc -l)
analyses=$(find "$WIKI_DIR/analyses" -name "*.md" 2>/dev/null | wc -l)
total=$((sources + entities + concepts + analyses + 2)) # +2 for index.md and log.md

echo "  Sources:   $sources"
echo "  Entities:  $entities"
echo "  Concepts:  $concepts"
echo "  Analyses:  $analyses"
echo "  ─────────────────"
echo "  Total:     $total pages"
echo ""

# Count wikilinks
links=$(grep -r -o '\[\[.*\]\]' "$WIKI_DIR" 2>/dev/null | wc -l)
echo "  Wikilinks: ${links:-0}"

# Count contradictions and gaps
contradictions=$(grep -r '\[CONTRADICTION\]' "$WIKI_DIR" 2>/dev/null | wc -l)
gaps=$(grep -r '\[GAP\]' "$WIKI_DIR" 2>/dev/null | wc -l)
echo "  Flagged:   ${contradictions:-0} contradictions, ${gaps:-0} gaps"

# Log entries
log_entries=$(grep -c "^## \[" "$WIKI_DIR/log.md" 2>/dev/null || echo "0")
echo "  Log:       $log_entries entries"
