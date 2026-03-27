# Structure Map

Use this file as the canonical placement guide for new files.

## Current `src/` Layout

- `src/App.tsx` - top-level application shell composition.
- `src/main.tsx` - application entry and provider bootstrapping.
- `src/index.css` - global CSS variables and base styles.
- `src/components/sections/` - page section components.
- `src/components/ui/` - reusable UI-level components.
- `src/hooks/` - shared custom React hooks.
- `src/lib/` - utility integrations/helpers (`gsap`, adapters, utility logic).
- `src/theme/` - Chakra/theme system configuration.
- `src/providers/` - provider wrappers and app-level context setup.
- `src/assets/` - importable local assets used by source code.

## Placement Matrix

- New section like About/Work/Skills: `src/components/sections/`.
- Shared button/card/navbar widget: `src/components/ui/`.
- Reusable state/effect logic with `use*`: `src/hooks/`.
- Shared pure helper or external integration wrapper: `src/lib/`.
- Theme token/system changes: `src/theme/`.
- New global providers: `src/providers/`.
- Static files served directly at URL path: `public/`.
- Image/SVG imported into TS/TSX: `src/assets/`.

## Naming and File Conventions

- Section/UI components: `PascalCase.tsx`.
- Hooks: `useSomething.ts`.
- Utility modules: descriptive name, usually `.ts`.
- Keep one primary responsibility per file.

## Anti-Patterns to Avoid

- Do not create vague buckets such as `src/utils2` or `src/misc`.
- Do not mix section components and shared UI components in one folder.
- Do not place hook logic directly in UI files when reused elsewhere.
- Do not duplicate helper logic across `hooks/` and `lib/`.
