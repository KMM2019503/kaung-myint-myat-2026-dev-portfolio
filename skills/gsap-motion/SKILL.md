---
name: gsap-motion
description: Define and implement consistent GSAP animation behavior for this portfolio. Use when building or refactoring entrance animations, scroll-triggered reveals, timeline sequencing, parallax effects, section transitions, and mobile-safe motion behavior in React components.
---

# GSAP Motion

## Overview

Use this skill to keep all GSAP-driven motion aligned with the portfolio's intended style: expressive where needed, subtle elsewhere.
Prioritize performance, responsiveness, and readability over animation volume.

## Workflow

### 1. Audit Existing Motion Sources

Read current motion implementation before adding new effects:
- `src/lib/gsap.ts`
- `src/components/sections/Hero.tsx`
- `src/components/ui/Navbar.tsx`

### 2. Choose Motion Intensity by Section Role

Apply section intent:
- Hero and key story sections: heavier timeline choreography.
- Supporting sections and controls: subtle, fast, low-distraction motion.
- Navigation elements: lightweight entrance and interaction feedback only.

### 3. Implement Predictable GSAP Structure

Structure animations for maintainability:
- Group related effects in a timeline per section.
- Use clear class or ref targets for animated elements.
- Keep sequencing readable with offsets and shared defaults.
- Reuse utility wrappers from `src/lib/gsap.ts` where possible.

### 4. Apply Scroll and Parallax with Restraint

For scroll interactions:
- Reveal content as it enters viewport with stable trigger points.
- Use parallax only when it supports depth and does not reduce clarity.
- Avoid stacking multiple competing scroll effects in the same viewport region.

### 5. Protect Mobile Performance and Accessibility

Before finalizing motion:
- Reduce motion density on small screens.
- Keep animation durations short enough to avoid perceived lag.
- Ensure content remains understandable without animation timing.
- Avoid effects that cause scroll jank or layout instability.

### 6. Run Motion QA Pass

Validate:
- Entry order and sequencing feel intentional.
- Light and dark themes both present cleanly during animated states.
- Motion does not block interaction or reading flow.
- Major sections still feel cohesive with the overall visual tone.

## Decision Rules

1. Favor motion that communicates structure over decorative motion.
2. Favor timeline consistency over isolated one-off effects.
3. Favor smooth performance over complex choreography.
4. Favor readable content at every animation state.

## Reference

Read `references/motion-spec.md` for recommended defaults, section intensity mapping, and guardrails.
