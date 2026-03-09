---
name: website_review
description: Review the entire website and identify any overlapping elements, console errors, responsive bugs, mobile optimizations, or webgl issues.
---

# Website Review Skill

This skill allows the agent to thoroughly review a React or frontend project for common responsiveness, performance, and UI alignment issues.

## Usage Instructions
1. **Scan Core Files**: Briefly examine the `App.tsx` and main pages/components (like Landing/Hero). Look for hardcoded heights, missing paddings, overlapping z-indexes, and bad absolute positionings.
2. **Check Interactivity**: Ensure no text is unintentionally overlaid by sticky footers, navigation arrows, or fixed icons (especially on screens under `768px`).
3. **Mobile & Memory Constraints**: Look for intensive operations (like WebGL, `<Spline>`, or heavy Three.js `<Canvas>` blocks). Check if there is an `isMobile` state to disable or lower complexity for Safari/iOS crash prevention.
4. **Lint & Type Check**: Ensure you review for any broken imports or `useEffects` without dependencies.
5. **Console & Log Inspection**: If running in a dev server, inspect any browser console errors or build warnings (e.g. `npm run build` or Vite messages).

Always verify edge-cases when implementing fixes to structural HTML/CSS. Use `overflow-y-auto`, `[100dvh]`, and generic Tailwind classes over arbitrary fixes.
