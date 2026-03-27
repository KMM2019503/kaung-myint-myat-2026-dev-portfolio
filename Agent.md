# Kaung Myint Myat (Piaz) — 2026 Developer Portfolio

## Project Overview
This is a rewrite of the original portfolio at `../kaungmyintmyat_portfolio`. Personal developer portfolio website showcasing projects, skills, and experience.

---

## Skill Routing (Mandatory)

At the start of every new conversation, check skill applicability before implementing.

### Shared Skills
- `ui-consistency` (`skills/ui-consistency/SKILL.md`): Canonical UI system for tokens, typography, spacing rhythm, dark mode parity, and responsive behavior.
- `content-migration` (`skills/content-migration/SKILL.md`): Canonical workflow for migrating legacy portfolio text, project data, links, and image manifests.
- `gsap-motion` (`skills/gsap-motion/SKILL.md`): Canonical animation workflow for GSAP timelines, scroll reveals, parallax restraint, and mobile-safe motion.
- `folder-structure` (`skills/folder-structure/SKILL.md`): Canonical file placement and naming workflow for consistent project structure.

### Skill Selection Order
When multiple skills apply, use this order:
1. `content-migration` for source-of-truth copy/assets.
2. `folder-structure` for file placement, naming, and directory decisions.
3. `ui-consistency` for visual system decisions and component styling.
4. `gsap-motion` for animation implementation and motion QA.

### Routing Rules
- For mixed tasks, use all applicable skills in the selection order above.
- For non-UI and non-content tasks, skip unrelated skills.
- The agent decides whether each skill applies, but this check is required for every conversation.

---

## Design Direction

### Color Theme
- **Light + Dark mode** with toggle support
- **Primary color**: make mostly use color but make change easily
- Professional color palette

### Vibe/Aesthetic
- **Professional** overall feel
- **Strategic animations** - heavy where needed, subtle elsewhere
- Not overwhelming, purposeful motion

### Layout Structure
- **Single-page scrolling** sections
- Section order:
  1. **Hero Section** - Introduce myself (heavy animation)
  2. **About Me Section** - My story (heavy animation)
  3. **My Work / Projects Section** - Showcase experience (heavy animation)
  4. **Skills & Technologies Section** - Show what I can do (include AI agent usage)
  5. **Footer Section** - Final links and credits

### Animation Style
- **Scroll-Triggered Animations** - content reveals on scroll
- **Parallax Scrolling** - depth and layer effects
- **Full-Page Scrolling** - snap between sections
- Modern GSAP-powered interactions (ScrollTrigger, ScrollSmoother)

### Reference Policy
- **Content only** (text, photos) from old portfolio
- **Fresh UI/UX design** - no copying old layout/components

### Typography
- **Headings**: Lora (serif, elegant)
- **Body/UI**: Ubuntu (sans-serif, modern)

### Responsive Design ⚠️ CRITICAL
- **100% responsive** - mobile-first approach
- Must work flawlessly on all screen sizes (mobile, tablet, desktop)
- Touch-friendly interactions on mobile
- Responsive animations (disable/reduce on mobile if needed)

## Tech Stack
- **Framework**: React 19
- **Build Tool**: Vite 7
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4 + Chakra UI v3
- **Routing**: TanStack Router
- **Animation**: GSAP
- **Icons**: Lucide React
- **Linting/Formatting**: Biome 2
- **Package Manager**: Bun

## Development Commands
```bash
bun run dev          # Start development server
bun run build        # Build for production (runs TypeScript check first)
bun run preview      # Preview production build
bun run lint         # Run Biome linter
bun run lint:fix     # Run Biome linter with auto-fix
bun run format       # Format code with Biome
```

## Completion Checks (Mandatory)
- Before finishing any implementation task, run `bun run lint` and `bun run build`.
- If errors are found (TypeScript or Biome), fix them before marking the task done.
- If an error cannot be fixed safely in the same task, report the exact blocker and impacted files.

## Code Conventions
- **Indentation**: Tabs
- **Quotes**: Double quotes
- **Semicolons**: Always
- **Line Width**: 100 characters
- **Imports**: Auto-organized (Biome)

## Project Structure
```
src/
├── App.tsx        # Main application component
├── main.tsx       # Application entry point
├── index.css      # Global styles (Tailwind)
└── assets/        # Static assets (images, SVGs)
```

## Deployment
Configured for Vercel deployment (see `vercel.json`).

---

## Legacy Sources

Use the `content-migration` skill for all legacy data transfer tasks.

- Canonical content source: `skills/content-migration/references/content-source.md`
- Canonical image manifest: `skills/content-migration/references/image-asset-map.md`
- Legacy project path: `../kaungmyintmyat_portfolio`

---

## Notes
- This is a fresh project setup with modern React 19 and Vite 7
- Uses Chakra UI v3 (latest version with new API)
- Tailwind CSS 4 with Vite plugin integration
- Copyright notice: "Copyright © 2024 Piniaz" (update year for 2026)
