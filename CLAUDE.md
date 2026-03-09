# CLAUDE.md - The Phygital Studio (TPS)

## Project Overview

**The Phygital Studio** is a marketing/portfolio website for a Bangalore-based experience center design studio. It showcases immersive phygital (physical + digital) experiences, interactive installations, and client work through a cinematic, slide-based web experience.

- **Live site**: https://thephygital.studio
- **Hosting**: Netlify (SPA with client-side routing)
- **Database**: Turso (libSQL) for persistent content management

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build tool**: Vite 5
- **Styling**: Tailwind CSS 3 + custom CSS animations
- **Animation**: Framer Motion
- **3D**: Three.js via @react-three/fiber + @react-three/drei, Spline
- **Icons**: Lucide React
- **Database**: Turso (@libsql/client) - SQLite-compatible edge database
- **Deployment**: Netlify (Node 18)

## Commands

```bash
npm run dev       # Start dev server (port 5173)
npm run build     # Production build (output: dist/)
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

## Project Structure

```
TPS/
├── index.html              # Entry HTML with SEO meta tags and structured data
├── src/
│   ├── main.tsx            # React entry point
│   ├── App.tsx             # Root component - routing and section navigation
│   ├── index.css           # Global styles, Tailwind directives, custom animations
│   ├── components/         # All React components (flat structure, no nesting)
│   │   ├── Landing.tsx     # Homepage / hero
│   │   ├── Transition.tsx  # Experience intro transition
│   │   ├── SensoryLayer.tsx
│   │   ├── TouchSoundLayer.tsx
│   │   ├── Interiority.tsx
│   │   ├── Philosophy.tsx
│   │   ├── PhilosophyExtended.tsx
│   │   ├── OurWork.tsx     # Portfolio/video gallery
│   │   ├── ContactUs.tsx   # Contact form (saves to Turso DB)
│   │   ├── Privacy.tsx     # Privacy policy
│   │   ├── Admin.tsx       # Admin panel for content management
│   │   ├── Footer.tsx
│   │   ├── Gallery.tsx
│   │   ├── LogoShowcase.tsx
│   │   ├── ModelViewer.tsx # 3D model viewer (Three.js)
│   │   ├── SoundManager.tsx
│   │   ├── SoundToggle.tsx
│   │   ├── SplashCursor.tsx
│   │   ├── SplineTest.tsx  # Spline 3D scene viewer
│   │   ├── ScrambleText.tsx
│   │   ├── AuroraBackground.tsx
│   │   ├── DitheredBackground.tsx
│   │   ├── HyperspeedBackground.tsx
│   │   ├── IridescenceBackground.tsx
│   │   ├── InfiniteMenu.tsx
│   │   └── InfiniteGridMenu.ts
│   ├── data/
│   │   └── ourWorkData.ts  # Default video/logo data + localStorage helpers
│   └── lib/
│       ├── turso.ts        # Turso database client initialization
│       └── db.ts           # Database schema, CRUD operations
├── public/
│   ├── Embassy.glb         # 3D model file
│   ├── Futurecity.wav      # Background audio
│   ├── logos/              # Client logo images
│   ├── robots.txt
│   └── sitemap.xml
├── logos/                  # Additional logo assets
├── dist/                   # Built output (Netlify publish dir)
├── netlify.toml            # Netlify deployment config
├── tailwind.config.js
├── tsconfig.json           # References tsconfig.app.json + tsconfig.node.json
├── tsconfig.app.json       # Strict TS config (ES2020, noUnusedLocals)
├── vite.config.ts
├── eslint.config.js        # Flat ESLint config with react-hooks + react-refresh
└── postcss.config.js
```

## Architecture & Key Patterns

### Routing

The app uses **custom client-side routing** (no React Router). Navigation is managed entirely in `App.tsx`:

- `routeToSection` / `sectionToRoute` maps define URL-to-section mappings
- `handleSectionChange()` updates state and calls `window.history.pushState()`
- Browser back/forward handled via `popstate` event listener
- Netlify `_redirects` and `netlify.toml` redirect all paths to `index.html` for SPA support

**Section flow** (the "experience" journey):
`Landing -> Transition -> SensoryLayer -> TouchSoundLayer -> Interiority -> Philosophy -> PhilosophyExtended -> OurWork -> ContactUs`

### State Management

No external state library. All state lives in `App.tsx` via `useState`:
- `currentSection` - which section/page is displayed
- `soundEnabled` - audio playback toggle
- `slidesStarted` - whether the experience slideshow is active
- `showExperienceModal` - pre-experience prompt modal

### Data Layer

Two data sources coexist:
1. **Turso database** (`src/lib/turso.ts`, `src/lib/db.ts`) - persistent storage for videos, logos, and contact inquiries
2. **localStorage fallback** (`src/data/ourWorkData.ts`) - default data with local override support

Database tables: `videos`, `logos`, `inquiries`

### Component Conventions

- All components are in `src/components/` (flat, no subdirectories)
- Components are functional with hooks
- Animation via Framer Motion's `motion.*` components and `AnimatePresence`
- Background effect components: `AuroraBackground`, `DitheredBackground`, `HyperspeedBackground`, `IridescenceBackground`
- Most section components accept callback props like `onNext`, `onHome`, `onContact`, `onStartExperience`

### Styling

- Tailwind CSS utility classes as the primary styling approach
- Custom CSS classes in `index.css` for animations and effects (`scrollbar-hide`, `glass-effect`, `animate-scroll`, `video-card`, `logo-float`)
- Custom Tailwind theme extensions: `gradient-radial`, `gradient-conic`, monospace font family
- Dark theme throughout (black background, white text)

## TypeScript Configuration

- **Strict mode** enabled
- `noUnusedLocals` and `noUnusedParameters` enforced
- Target: ES2020
- JSX: react-jsx (automatic runtime)
- Module resolution: bundler mode

## Linting

ESLint 9 with flat config (`eslint.config.js`):
- TypeScript-ESLint recommended rules
- React Hooks rules (recommended)
- React Refresh plugin (warns on non-component exports)
- `dist/` directory ignored

## Deployment

- **Platform**: Netlify
- **Build command**: `npm run build`
- **Publish directory**: `dist/`
- **Node version**: 18
- All routes redirect to `/index.html` (SPA mode)

## Development Guidelines

1. **No router library** - add new pages by extending the `Section` type and route maps in `App.tsx`
2. **Components are self-contained** - each section component handles its own layout and animations
3. **Sound is section-aware** - `SoundManager` receives the current section and plays appropriate audio
4. **Mobile-responsive** - orientation detection with portrait-lock overlay; landscape navigation uses fixed side buttons
5. **Keyboard navigation** - Arrow keys and Space navigate between experience slides; Escape exits
6. **Keep the dark aesthetic** - the site uses a consistent black/dark theme with glass-morphism effects
7. **3D assets** go in `public/` (GLB models, audio files)
8. **Client logos** are stored in both `public/logos/` and root `logos/` directories with subfolders per client

## Important Notes

- The Turso database credentials are hardcoded in `src/lib/turso.ts` - these are client-side visible tokens
- The `/admin` route provides content management (videos, logos, inquiries) - no authentication guard
- Large assets exist in `public/` (19MB audio file `Futurecity.wav`)
- The `dist/` directory is committed - Netlify builds from source but the built output is also in the repo
