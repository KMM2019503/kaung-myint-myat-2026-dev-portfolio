---
name: ui-consistency
description: Keep this portfolio UI visually and behaviorally consistent across new features and refactors. Use when creating or updating React/TypeScript UI files, Chakra components, Tailwind classes, global styles, theme tokens, GSAP animations, responsive layouts, dark mode behavior, or section-level page composition.
---

# UI Consistency

## Overview

Use this skill to implement UI changes that match the established portfolio design system.
Prioritize consistency of tokens, typography, spacing rhythm, motion style, and responsive behavior.

## Workflow

### 1. Read Existing System First

Inspect the current sources of truth before editing UI:
- `src/index.css`
- `src/theme/index.ts`
- Existing section and UI components in `src/components/`

### 2. Use Tokens, Not Ad-Hoc Values

Apply shared CSS variables and Chakra tokens instead of hardcoded values:
- Prefer `var(--color-*)` variables for color and surface usage.
- Prefer Chakra spacing, radii, and font-size tokens in style objects.
- Keep gradients, shadows, and borders aligned with existing patterns in `src/index.css`.
- If a new foundational token is required, define it in both:
  - `src/index.css` for CSS variable usage.
  - `src/theme/index.ts` for Chakra token usage.

### 3. Preserve Typography System

Keep the current type system stable:
- Use `Lora` for headings and high-emphasis display text.
- Use `Ubuntu` for body copy and UI labels.
- Maintain clear hierarchy with consistent size and weight progression.

### 4. Preserve Layout Rhythm

Maintain predictable section and component spacing:
- Keep a consistent container strategy and max-width behavior across sections.
- Reuse spacing patterns already used in `Hero` and `Navbar`.
- Avoid one-off spacing values unless required by a specific visual reason.

### 5. Keep Motion Intentional

Align animation choices with project goals (heavy where needed, subtle elsewhere):
- Prefer GSAP timeline orchestration for major section reveals.
- Prefer scroll-triggered reveals and light parallax only when they support content clarity.
- Reduce or disable heavy motion on mobile or when it risks jank.
- Keep easing and duration patterns coherent across components.

### 6. Preserve Responsive and Theme Behavior

Ship all UI changes as mobile-first and theme-safe:
- Validate `base`, `sm`, `md`, and `lg` behavior for layout and typography.
- Preserve touch-friendly target sizes for interactive elements.
- Ensure both light and dark modes remain legible and visually balanced.
- Avoid introducing color combinations that reduce contrast.

### 7. Run a Consistency Pass Before Finalizing

Before finishing, verify:
- No stray hex colors or ad-hoc font stacks were introduced.
- New styles and components fit existing visual language.
- Section animation and spacing feel consistent with the rest of the page.
- Dark mode and mobile views still look intentional.

## Decision Rules

Apply these rules when there is design ambiguity:
1. Favor existing patterns over inventing new ones.
2. Favor tokens over literals.
3. Favor readability and clarity over decorative complexity.
4. Favor smooth performance over maximal animation.
5. Favor cohesive system-level changes over isolated local tweaks.

## Reference

Read `references/ui-checklist.md` for a compact pre-merge checklist and implementation guardrails.
