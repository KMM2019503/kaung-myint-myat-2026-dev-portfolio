---
name: content-migration
description: Migrate legacy portfolio content into the current codebase with high factual fidelity. Use when creating or updating profile copy, about text, experience details, skills descriptions, project metadata, social links, or image asset mappings from `../kaungmyintmyat_portfolio`.
---

# Content Migration

## Overview

Use this skill to transfer legacy portfolio data into new components without losing meaning or introducing factual drift.
Treat the references as the canonical source unless the user explicitly requests rewrites.

## Workflow

### 1. Read Canonical Sources

Read the relevant reference file before editing:
- `references/content-source.md` for profile text, experience, projects, and links.
- `references/image-asset-map.md` for image migration and file naming.

### 2. Select a Migration Mode

Choose one mode per request:
- `Fidelity mode`: Keep wording and facts unchanged.
- `Format mode`: Keep facts unchanged, only normalize structure and readability.
- `Rewrite mode`: Rewrite content only when explicitly requested.

### 3. Migrate Content Blocks Safely

When migrating text blocks:
- Preserve names, roles, dates, links, and organization names exactly.
- Preserve project-to-tech relationships.
- Keep quotations and long-form personal statements intact unless rewrite mode is requested.
- Split large paragraphs only when formatting requires it, without changing meaning.

### 4. Migrate Assets by Manifest

When migrating assets:
- Use filenames from `references/image-asset-map.md`.
- Keep destination under `public/images/` unless task says otherwise.
- If a required image is missing, report the exact missing filename.

### 5. Validate Before Finalizing

Run a migration sanity pass:
- Verify no factual fields changed accidentally.
- Verify all links still resolve to intended targets.
- Verify referenced images exist in expected paths.
- Verify section labels and ordering still match project structure.

## Decision Rules

1. Prefer factual fidelity over stylistic edits by default.
2. Do not invent missing personal or project details.
3. Keep legacy references as source of truth unless user overrides.
4. Escalate ambiguities by listing assumptions explicitly in the final result.

## References

- Use `references/content-source.md` for canonical legacy text and links.
- Use `references/image-asset-map.md` for asset migration names and categories.
