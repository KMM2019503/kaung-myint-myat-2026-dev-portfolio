# UI Consistency Checklist

Use this checklist before finalizing any UI change in this portfolio.

## Tokens and Styling

- Use `var(--color-*)` for color values instead of one-off hex values.
- Use established gradient and shadow patterns from `src/index.css`.
- Use Chakra spacing/radius/font-size tokens when writing Chakra style objects.
- Add any new shared token to both `src/index.css` and `src/theme/index.ts`.

## Typography

- Use `Lora` for headings and display emphasis.
- Use `Ubuntu` for body text and UI labels.
- Keep heading and body hierarchy consistent with neighboring sections.

## Layout and Spacing

- Keep section structure aligned with single-page scrolling flow.
- Reuse existing container width and spacing rhythm.
- Avoid arbitrary spacing values unless there is a clear visual reason.

## Motion

- Use GSAP timelines for major reveals.
- Keep scroll-triggered effects purposeful and content-driven.
- Reduce heavy motion on smaller screens to preserve smoothness.
- Keep durations and easings aligned with existing animations.

## Responsive and Dark Mode

- Validate `base`, `sm`, `md`, and `lg` breakpoints.
- Keep touch targets easy to use on mobile.
- Ensure light and dark mode legibility for text, controls, and surfaces.
- Verify no contrast regressions are introduced.

## Final Consistency Pass

- Confirm no new ad-hoc visual language was introduced.
- Confirm component style matches `Hero` and `Navbar` design tone.
- Confirm visual rhythm feels consistent across adjacent sections.
