# THWP Wiki — LLM Knowledge Base Schema

This file defines how the LLM maintains the THWP wiki. It is the schema layer
of the LLM Wiki pattern (cf. Karpathy's LLM Wiki gist).

## Architecture

```
raw/            # Immutable source documents (articles, notes, transcripts, images)
raw/assets/     # Downloaded images and media referenced by sources
wiki/           # LLM-generated and maintained markdown pages
wiki/index.md   # Content catalog — every page listed with summary
wiki/log.md     # Chronological append-only activity log
CLAUDE.md       # This file — schema and conventions
```

## Directory Conventions

- **raw/** — Source of truth. The LLM reads from here but NEVER modifies these files.
  Drop articles, PDFs, transcripts, notes, images here. Subdirectories are fine.
- **wiki/** — The LLM owns this directory entirely. All files are markdown.
  The LLM creates, updates, and deletes pages as needed.
- **wiki/sources/** — One summary page per ingested source.
- **wiki/entities/** — Pages for people, bands, venues, labels, etc.
- **wiki/concepts/** — Pages for themes, genres, techniques, topics.
- **wiki/analyses/** — Comparisons, deep dives, syntheses filed from queries.

## Page Format

Every wiki page uses this template:

```markdown
---
title: Page Title
type: source | entity | concept | analysis | overview
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: [list of source filenames that informed this page]
tags: [relevant tags]
---

# Page Title

Content here. Use [[wikilinks]] for cross-references to other wiki pages.
Use standard markdown. Keep paragraphs focused.

## See Also

- [[Related Page 1]]
- [[Related Page 2]]
```

## Operations

### Ingest

When the user adds a new source to `raw/` and asks to ingest it:

1. Read the source document thoroughly.
2. Discuss key takeaways with the user if they want interaction, or proceed autonomously.
3. Create a summary page in `wiki/sources/` with key facts, quotes, and analysis.
4. Update `wiki/index.md` — add the new page with a one-line summary.
5. Create or update relevant entity pages in `wiki/entities/`.
6. Create or update relevant concept pages in `wiki/concepts/`.
7. Check for contradictions with existing wiki content and flag them.
8. Append an entry to `wiki/log.md`.

A single source may touch 10-15 wiki pages. That's expected and good.

### Query

When the user asks a question:

1. Read `wiki/index.md` to find relevant pages.
2. Read those pages and synthesize an answer.
3. Cite wiki pages in the response.
4. If the answer is substantial (comparison, analysis, deep dive), offer to file it
   as a new page in `wiki/analyses/`.
5. If filing, update `wiki/index.md` and `wiki/log.md`.

### Lint

When the user asks for a health check:

1. Scan all wiki pages for:
   - Contradictions between pages
   - Stale claims superseded by newer sources
   - Orphan pages with no inbound links
   - Important concepts mentioned but lacking their own page
   - Missing cross-references
   - Data gaps that could be filled
2. Report findings and suggest fixes.
3. Offer to fix issues automatically.
4. Log the lint pass in `wiki/log.md`.

## Logging Convention

Each log entry in `wiki/log.md` uses this format:

```markdown
## [YYYY-MM-DD] action | Title
Brief description of what was done and which pages were affected.
```

Actions: `ingest`, `query`, `lint`, `update`, `create`, `delete`

This makes the log parseable: `grep "^## \[" wiki/log.md | tail -5`

## Cross-References

- Use `[[Page Title]]` wikilink syntax for internal links.
- When creating or updating a page, check if newly mentioned entities/concepts
  already have pages. If not, create stubs.
- Every page should have at least one inbound link (except index.md and log.md).

## Style Guide

- Write in clear, concise prose. No fluff.
- Use headers to organize. Keep sections scannable.
- Prefer bullet points for lists of facts.
- Include direct quotes from sources when they're particularly insightful.
- Note uncertainty explicitly: "Source X claims... but Source Y contradicts..."
- Tag contradictions with `[CONTRADICTION]` so they're easy to find.
- Tag gaps with `[GAP]` where more information is needed.

## Domain Context

This wiki is associated with the THWP band website. It can be used for:
- Band history and lore
- Music analysis and reviews
- Industry research
- Tour and venue notes
- Fan community knowledge
- Or any other knowledge domain the user chooses

The wiki is domain-agnostic by design — adapt these conventions to whatever
the user is building knowledge about.
