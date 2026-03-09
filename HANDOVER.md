# The Phygital Studio Website Handover Document

## Overview
This is a modern, immersive, interactive web experience created for **The Phygital Studio**. The site merges sophisticated web technologies with 3D elements and interactive animations to simulate the merging of physical and digital worlds.

## Technology Stack
- **Framework:** React + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **3D Graphics:** Spline (React-Spline)
- **Icons:** Lucide React
- **Icons & Assets:** Assorted web-optimized images/videos

## Key Features
1. **Interactive Spline Backgrounds**: The site relies heavily on WebGL 3D Spline scenes to provide a feeling of infinite, interactive space.
2. **"Experience" Flow**: The site utilizes a slide-based sequential experience where the user clicks or presses spacebar to navigate through sensory and philosophical states (`SensoryLayer.tsx`, `TouchSoundLayer.tsx`, `Interiority.tsx`, etc.).
3. **Immersive Audio**: `SoundManager.tsx` handles spatial/music audio for the experience sequence.
4. **Responsive & Mobile-Aware**: For iOS stability, complex WebGL components detect `isMobile` states and adapt to avoid Safari memory limits.

## Project Structure
- `src/App.tsx`: The primary orchestrator. Manages routing through an internal state representing different "sections" and plays/stops sound based on the view.
- `src/components/`:
  - **Landing (`Landing.tsx`)**: The hero introduction with Spline background, big text, and dynamic calls-to-actions.
  - **Experience Components**: `Transition.tsx`, `SensoryLayer.tsx`, `TouchSoundLayer.tsx`, `Interiority.tsx`, `Philosophy.tsx`, `PhilosophyExtended.tsx`. These form the "Experience" presentation.
  - **Our Work (`OurWork.tsx`)**: Portfolio gallery.
  - **Footer (`Footer.tsx`), ContactUs (`ContactUs.tsx`), Privacy (`Privacy.tsx`)**: Informational sections.

## Known Challenges & Solutions
1. **Mobile UI Responsiveness**: Large text scaling (`Let's get Phygital`) and button groupings on smaller devices can occasionally overlap. Handled via CSS Flexbox ordering, padding offsets, and `100dvh` min-height wrappers.
2. **iOS Safari WebGL Crash**: Since each Spline component generates a WebGL context, moving between routes quickly on iOS can exceed Safari's tight memory limits. Optimized by reducing `react-spline` instances on mobile for secondary scenes like `PhilosophyExtended.tsx`.

## Final Notes for Deployment
- The project is deployed using Netlify.
- Be cautious when adding new `<Spline />` components—always provide static fallbacks on mobile browsers if you plan to have multiple 3D scenes on screen sequentially.
