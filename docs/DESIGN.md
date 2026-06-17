# Design Decisions

Tracks the intentional choices — color, layout, motion, component architecture — and the reasoning behind them.

---

## Color System

Defined in `src/App.css` via `@theme {}` (Tailwind v4 CSS-first config).

| Token | Value | Usage |
|---|---|---|
| `background` | `slate-300` (~`#CBD5E1`) | Page background |
| `primary` | `#0A369D` | NavBar gradient, buttons, timeline nodes |
| `accent` | `#7D4F50` | Decorative / secondary accents |
| `highlight` | `teal-400` (~`#2DD4BF`) | Active nav links, hover states, icon color |
| `warning` | `#FF7D00` | Warnings |
| `error` | `#DB162F` | Form validation errors |
| `muted` | `#6E6362` | Subtext, descriptions, placeholders |
| `dark` | `#000000` | Headings, primary text |
| `light` | `#f1faee` | Light surfaces, text on dark backgrounds |

### Alternate Themes (saved in comments)
Two alternate palettes are saved as comments in `App.css` — a Columbia Blue scheme and a teal/earth-tone scheme. Switch by swapping the `@theme {}` block.

---

## Typography

- **Font family:** `system-ui, Avenir, Helvetica, Arial` (no custom web font actively loaded — Inter import exists in `index.css` but isn't applied)
- **Headings:** `font-bold text-dark` (h1), `font-semibold text-dark` (h2)
- **Body/descriptions:** `text-muted`
- **NavBar:** `font-extrabold tracking-wider` (logo), `font-semibold uppercase tracking-wider` (links)

**Decision:** System fonts keep load times fast. If a custom font is added, Inter is already imported as a candidate.

---

## Layout

- **Max content width:** `lg:max-w-[90%]` on NavBar; pages use their own internal widths
- **Grid:** `grid-cols-1 md:grid-cols-2` for hero/bio sections
- **Flex direction:** `flex flex-col min-h-screen` root layout ensures footer sticks to bottom

---

## Navigation

- Sticky top navbar with dark blue gradient (`bg-gradient-primary`)
- Desktop: horizontal link list; Mobile: hamburger dropdown
- Active link highlighted with `text-highlight` (teal)
- `AnimatePresence` + `motion` wrappers on routes for page transition animations

**Decision:** Route is keyed on `location.pathname` so AnimatePresence correctly detects page changes and fires exit/enter animations.

---

## About Page

### Hero
- 2-column grid: text left, avatar right (stacks on mobile)
- `AvatarFlicker` — glitch/flicker effect on avatar image

### Timeline
- 7 nodes representing facets of Nick's identity
- `AthleteSprite` — pixel-art sprinter that runs between nodes as user scrolls
- Sprite faces left or right based on node index parity
- Scroll detection uses a 1px-tall band at 4/6 viewport height; whichever node intersects triggers navigation
- Arrow key navigation also supported

**Decision:** Chose scroll-based activation over sticky buttons for a cleaner look. Buttons and auto-scroll are commented out but preserved — evaluate re-enabling if UX testing shows users get confused.

### Tag Ticker
- Pulls tech stack tags from all projects in `projects.js` dynamically (deduped via `Set`)
- Scrolling ticker gives a quick skills snapshot without a wall of chips

---

## Homepage Canvas (Active)

### Sprite Movement System (`SpriteCanvas.jsx`)

Mouse-follow with exponential easing + departure delay. Tuned params:

| Param | Value | Role |
|---|---|---|
| `ease` | via `maxEase/minEase` | Fraction of gap closed per frame — fast when far, slows as it closes |
| `maxEase` | `0.005` | Speed ceiling |
| `minEase` | `0.001` | Speed floor (keeps ease from bottoming out to zero) |
| `lockInDelay` | `600ms` | How long direction must be stable before ease ramps to maxEase |
| `idleRadius` | `30px` | Sprite snaps to rest when within this distance of mouse |
| `departureDelay` | `600ms` | After arriving, sprite holds position this long before chasing again — gives mouse a head start so easing is meaningful |

**Why departure delay:** Without it, the sprite catches up to the mouse and then immediately re-engages at near-zero distance, making the easing invisible and movement feel 1-to-1.

**Critical bug fixed:** `runningFrames` and `zones` default prop values were inline array literals (`= [1,2,3,4]`), creating new references every render. This caused the RAF loop to restart on every zone enter/exit (which triggers a re-render via `activeZone` state in Homepage). On restart, stale refs caused `ease` to jump straight to `maxEase` — felt like the sprite "skyrocketed." Fix: move defaults outside the component as module-level constants.

**Zone detection** is done inside the RAF loop via refs — `onZoneChange` only fires on enter/exit, not every frame. Eliminates 60 React state updates per second.

---

## Homepage Canvas (Architecture)

- Pixel-art athlete on a courtyard tilemap background (`courtyardTile.png`)
- Mouse-following movement via `RunnerCanvas`
- 5 interactive zones (research, resume, project_1, project_2, other) that navigate to pages when athlete walks into them
- `DevZoneEditor` and `showZoneHelpers` key are dev-only — **must be removed before re-enabling**

**Decision:** Currently routed to About instead. The canvas homepage is a differentiator worth pursuing — it's a "wow" moment — but needs polish and cleanup before it's the default experience.

---

## Projects Page

- Swiper carousel (`ProjectCarousel`) — one project fills the screen at a time
- Swiper arrows hidden on small screens (too cramped)
- Per-project detail pages at `/projects/:id` with images, video, stack tags, and content

**Decision:** Carousel keeps the projects page focused. The detail page handles depth. This avoids a grid that overwhelms with thumbnails.

---

## Gradients (Utility Classes)

Defined in `App.css` as `@utility` blocks:

| Class | Effect |
|---|---|
| `bg-gradient-primary` | Blue → black → blue (navbar, buttons) |
| `bg-gradient-highlight` | Sky blue variant (hover state) |
| `bg-gradient-accent` | Slate → light (secondary button) |
| `node-left` | Blue → sky from top-left (even timeline nodes) |
| `node-right` | Blue → sky from top-right (odd timeline nodes) |

---

## Motion / Animation

- **Page transitions:** `AnimatePresence` + Framer Motion `motion` wrappers
- **Avatar:** Custom flicker animation via `AvatarFlicker.jsx`
- **Sprite running:** Frame-based canvas animation in `AthleteSprite.jsx`
- **Tag ticker:** CSS scroll animation via `ProjectTagTicker.jsx`
- **Scroll hint:** `.animate-wave` class on "Scroll to explore" text

---

## Responsive Breakpoints (Tailwind defaults)

| Prefix | Width |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

---

## What to Spice Up — Candidate Ideas

1. **Timeline node cards** — add icons or micro-illustrations per identity facet
2. **Hover effects on project cards** — 3D tilt, glow, or scale lift
3. **Cursor** — custom cursor that reacts to hover targets
4. **Noise/grain texture** on background for depth
5. **Parallax sections** — subtle depth on scroll between hero elements
6. **Hero typewriter** — animated text cycling through "developer / athlete / analyst"
7. **Canvas homepage** — re-enable and polish the tilemap experience as the landing page
8. **Social links in footer** with hover glow (GitHub, LinkedIn)
9. **Research page** — dark-academia aesthetic, paper-card layout
10. **Ambient background particles** or subtle animated gradient on About hero
