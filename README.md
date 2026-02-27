# VAPOR TRAVEL // ESCAPE TO THE GRID

> *"Infinite destinations. Zero return tickets."*

A retro vaporwave-themed travel portal built as a software engineering portfolio piece. Immersive 3D scenes, glitch aesthetics, and synthwave audio combine to evoke the feeling of browsing a travel agency that got lost somewhere between 1985 and a cyberpunk simulation.

---

## Live Features

### Hero Section
Full-screen React Three Fiber canvas with an animated vaporwave grid scrolling into the void, spinning neon palm trees (Y-axis rotation via `useFrame`), an orbiting ringed sun, and a star field. The headline **"ESCAPE TO THE GRID"** runs a dual-channel RGB glitch effect via CSS `clip-path` pseudo-elements. A global VHS scanline overlay sits fixed over the entire app at `z-index: 9999`.

### Destinations Grid
Eight fictional travel destinations rendered as interactive cards — each with a **live 3D preview canvas** embedded directly inside the card. Models include procedurally built palm trees, retro planes, wireframe cubes, and pyramids. Hover a card to accelerate the spin. Filter destinations by vibe (`CHILL` / `ADVENTURE` / `HORROR`) or free-text search.

**Destinations include:**
- Neon Miami 1985 — *"Where the palms never sleep"*
- Endless Sunset Highway — *"Drive into forever"*
- Grid City Omega — *"Where geometry dreams"*
- Crystal Shore Resort — *"Eternal tidal frequencies"*
- Retrowave Heights — *"Altitude: nostalgia"*
- The Liminal Mall — *"Forever open, never staffed"*
- Synthwave Archipelago — *"Islands in the data stream"*
- Cassette Beach Club — *"Side B, Track ∞"*

Clicking any card opens a **Framer Motion** animated booking modal with star ratings, destination lore, and a "BOOK NOW" confirm.

### Virtual Tour (`/tour`)
A navigable 3D landscape built with `@react-three/fiber`. Use mouse drag to orbit, scroll to zoom. Three glowing octahedron hotspots float over the scene — hover to reveal tooltip labels, click to open booking modals. Palms of seven different neon colors populate the grid. An orbiting sun circles overhead. Auto-rotation is enabled for idle ambiance.

### Easter Egg — VAPOR MODE
**Hold the `V` key for 0.5 seconds** to engage Vapor Mode. All spinning objects (palms, sun rings, mini card models) multiply their rotation speed by 3.5×. The CSS `body.vapor-mode` class applies a full-site `hue-rotate` + `saturate` + `brightness` filter animation. The hero grid shifts to `#FF0080`. The tour scene lighting and fog intensify. The mode indicator in the hero changes from `∴ HOLD [V] FOR VAPOR MODE ∴` to `◈ VAPOR MODE ENGAGED ◈` with a pulsing pink glow.

### Synthwave Audio
A Web Audio API synthesizer plays an **Am7 chord pad** (six oscillators across two octaves: 110, 138.59, 164.81, 220, 261.63, 329.63 Hz) with a slow 0.2 Hz LFO pulse. No external audio files — generated entirely in-browser. Toggle with the `🔊` button in the navbar. Volume fades in/out smoothly over 1–2 seconds to avoid clicks.

### VHS Overlay
Two fixed overlay `div`s create horizontal scanlines at 1px intervals with a 0.1s scroll animation, plus a secondary 2px pattern. A global `prefers-reduced-motion` media query disables all animations for accessibility.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 6 |
| 3D Engine | Three.js + `@react-three/fiber` |
| 3D Helpers | `@react-three/drei` (OrbitControls, Stars, Html, useProgress) |
| Animation | Framer Motion (modals) + CSS keyframes (glitch, scanlines, float) |
| Audio | Web Audio API (no external files) |
| Routing | React Router DOM v6 |
| Fonts | Bebas Neue · VT323 · Orbitron (Google Fonts) |
| Styling | Vanilla CSS with CSS custom properties (design tokens) |

---

## Run Instructions

```bash
# Clone / navigate to the project
cd vaporwave-travel-demo-app

# Install dependencies
npm install

# Start the dev server (opens at http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

Requires Node.js 18+. No environment variables needed.

---

## Project Structure

```
src/
├── App.jsx                   # Root router + audio + vapor mode hooks
├── main.jsx                  # Entry point, CSS imports
├── pages/
│   ├── HomePage.jsx          # Hero + Destinations layout
│   └── TourPage.jsx          # Full-screen 3D tour layout
├── components/
│   ├── Navbar.jsx            # Fixed nav with scroll detection + audio toggle
│   ├── DestinationsGrid.jsx  # Search/filter + card grid + booking modal
│   ├── DestinationCard.jsx   # Individual card with embedded 3D preview
│   ├── SearchFilter.jsx      # Vibe pills + search input
│   ├── BookingModal.jsx      # Framer Motion animated booking dialog
│   └── VHSOverlay.jsx        # Fixed global scanline overlay
├── scenes/
│   ├── HeroScene.jsx         # Full-screen R3F hero canvas
│   ├── TourScene.jsx         # Interactive navigable tour canvas
│   ├── DestinationPreview.jsx# Mini 3D canvas embedded in cards
│   ├── PalmTree.jsx          # Procedural neon palm (trunk + fronds + glow)
│   ├── VaporGrid.jsx         # Scrolling gridHelper floor plane
│   └── OrbitingSun.jsx       # Orbiting sphere with two torus rings
├── hooks/
│   ├── useVaporMode.js       # V-key hold detection → body.vapor-mode
│   └── useAudio.js           # Web Audio API Am7 synth pad
├── data/
│   └── destinations.js       # 8 destination objects with model/vibe/color
└── styles/
    ├── variables.css         # Design tokens (colors, fonts, z-indices, glows)
    ├── global.css            # Reset, body, scrollbar, keyframes, utility classes
    └── glitch.css            # Advanced glitch (pseudo-elements, VHS noise, retro-border)
```

---

## Design System

**Palette:**
- Pink: `#FF6EC7` — primary glow, headlines, CTAs
- Cyan: `#00FFFF` — secondary accents, price tags
- Purple: `#9D00FF` — deep accents, wireframes
- Navy void: `#0A0015` — background base
- Sunset orange/yellow: `#FF6B35` / `#FFD93D` — warm accent destinations

**Fonts:** Bebas Neue (display headings) · VT323 (CRT terminal text) · Orbitron (tech UI labels)

**Glitch:** Dual pseudo-element `clip-path` technique — pink channel shifts -2px left, cyan channel shifts +2px right, both animated at `steps(1)` for a digital glitch rather than smooth interpolation.

---

## Portfolio Notes

This project demonstrates:
- **React Three Fiber integration** — multiple independent WebGL canvases (hero, tour, per-card previews) coexisting without interference
- **Procedural 3D** — all geometry built from Three.js primitives, no external model files required
- **Web Audio API** — synthesized ambient audio without any audio assets
- **CSS artistry** — VHS scanlines, RGB channel-split glitch, neon glow, custom scrollbar, reduced-motion support
- **State architecture** — vapor mode and audio state hoisted to App root, passed via props; vapor mode also reflected in DOM class for CSS/Three.js consumers
- **Interactivity depth** — hover effects on 3D objects inside `<Canvas>`, keyboard easter eggs, orbit controls, clickable 3D hotspots

---

*Built by the Vaporwave Void Squad — Team Lead · Aesthetic Designer · Frontend Engineer · 3D & Animation Engineer · QA Optimizer*

*Lost somewhere in the grid since 1985.*
