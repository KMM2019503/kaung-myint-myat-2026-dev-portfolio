# Motion Spec

Use this spec when implementing GSAP animations in this portfolio.

## Source Files to Mirror

- `src/lib/gsap.ts`
- `src/components/sections/Hero.tsx`
- `src/components/ui/Navbar.tsx`

## Motion Intent

- Heavy where storytelling benefits from choreography (Hero, About, Projects intros).
- Subtle where users are reading content or interacting with controls.
- Never let motion compete with readability.

## Recommended Defaults

- Easing baseline: `power3.out` for entrances and section reveals.
- Entrance duration target: `0.5s` to `1.2s` depending on content density.
- Stagger target: `0.05s` to `0.2s` for grouped reveals.
- Infinite loops: reserve for low-amplitude decorative elements only.

## Section Intensity Map

- Hero: high intensity, timeline-based orchestration allowed.
- About and Projects headers: medium-to-high intensity entrance, then calm state.
- Skills and Footer: medium or subtle; prioritize scanability.
- Navbar and controls: subtle micro-motion only.

## Scroll Trigger Rules

- Trigger reveals when content is near entering view, not after it is fully visible.
- Keep trigger setup simple and predictable.
- Avoid multiple independent triggers on the same element unless necessary.
- Prefer one timeline with coordinated children over many unrelated tweens.

## Mobile and Performance Guardrails

- Reduce motion density and parallax intensity on mobile.
- Avoid large transform + blur combos on many elements simultaneously.
- Keep frame-heavy effects off long lists and dense content blocks.
- Ensure animations do not block touch interactions.

## Final QA Checklist

- Verify the page remains smooth while scrolling.
- Verify animations do not overlap important text timings.
- Verify dark and light themes both look correct during animated states.
- Verify no animation is required for understanding core information.
