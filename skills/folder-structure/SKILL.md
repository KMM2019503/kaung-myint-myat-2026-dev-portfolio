---
name: folder-structure
description: Keep file and directory organization consistent in this React + TypeScript portfolio project. Use when adding, moving, splitting, or renaming files under `src/`, creating new feature folders, placing shared utilities, or deciding where new UI components, hooks, themes, providers, and assets should live.
---

# Folder Structure

## Overview

Use this skill to choose the right location for every new file before implementation.
Prefer extending existing folder patterns over creating ad-hoc directories.

## Workflow

### 1. Inspect Existing Structure First

Use the current `src/` layout as the source of truth:
- `src/components/sections` for page-level sections.
- `src/components/ui` for reusable UI building blocks.
- `src/hooks` for reusable React hooks.
- `src/lib` for utility integrations and shared helpers.
- `src/theme` for Chakra/theme-level token configuration.
- `src/providers` for app-level providers and wrappers.
- `src/assets` for source-controlled local assets used by code imports.

### 2. Apply Placement Decision Rules

Choose placement by responsibility:
1. If it renders a full page section, place in `src/components/sections`.
2. If it is shared visual UI, place in `src/components/ui`.
3. If it encapsulates stateful reusable logic, place in `src/hooks`.
4. If it is framework/tool helper code (animation helpers, formatters, adapters), place in `src/lib`.
5. If it defines cross-app theme tokens/system config, place in `src/theme`.
6. If it composes global providers, place in `src/providers`.
7. If it is static runtime-served media, place in `public/`; if it is bundled import asset, place in `src/assets`.

### 3. Preserve Naming Consistency

Follow existing naming style:
- React component files: `PascalCase.tsx` (for example `Hero.tsx`, `Navbar.tsx`).
- Hook files: `camelCase` with `use` prefix (for example `useTheme.ts`).
- Utility/theme/provider files: descriptive `camelCase` or `index.ts` module barrel where already used.
- Do not create duplicate naming patterns for the same responsibility.

### 4. Prefer Small Structural Changes

When introducing new directories:
- Create a new folder only if at least two related files will live there soon.
- Prefer adding to existing folders when scope is still small.
- Avoid deep nesting unless it reduces clear complexity.

### 5. Validate Structure Before Finalizing

Run a structure sanity check:
- The file path communicates purpose without opening the file.
- Similar responsibilities live together.
- No duplicate utility/component locations were introduced.
- Imports become simpler, not more fragmented.

## Decision Rules

1. Prefer consistency with current structure over abstract ideal architecture.
2. Prefer colocating by responsibility over colocating by temporary feature spike.
3. Prefer fewer top-level folders unless scale clearly requires expansion.
4. Prefer explicit paths and naming over ambiguous buckets like `misc` or `helpers2`.

## Reference

Use `references/structure-map.md` for the canonical folder map and quick placement matrix.
