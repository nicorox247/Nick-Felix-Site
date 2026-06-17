# Portfolio Progress Tracker

## Site Overview
React + Vite + Tailwind CSS v4 portfolio. Deployed on Vercel at **nick-felix.vercel.app**.  
Primary entry point: `/` → `About` page.

---

## Page Status

| Page | Route | Status | Notes |
|---|---|---|---|
| About | `/` `/about` | ✅ Done | Timeline + AthleteSprite + AvatarFlicker + tag ticker |
| Projects | `/projects` | ✅ Done | Swiper carousel, 3 projects |
| Project Detail | `/projects/:id` | ✅ Done | Per-project media + content |
| Contact | `/contact` | ✅ Done | EmailJS form with validation |
| Resume | `/resume` | ✅ Done | PDF viewer with zoom + fullscreen |
| Research | `/research` | 🚧 Stub | Renders `<ComingSoon />` placeholder |
| Homepage (Canvas) | `/` (disabled) | ⏸ Paused | Interactive canvas zones w/ sprite navigation — commented out in favor of About |
| Track | `/track` | ❓ Unknown | Route exists, content unclear |
| Color Lab | `/colors` | 🛠 Dev only | Theme experimentation page |

---

## Feature Status

### About Page
- [x] Hero section — name + subtitle + AvatarFlicker
- [x] Project tag ticker (pulls from `projects.js`)
- [x] Scroll-driven timeline with AthleteSprite animation
- [x] Keyboard arrow navigation (← →)
- [ ] Arrow button UI re-enable (sticky Prev/Next buttons — commented out)
- [ ] Auto-scroll on arrow click (commented out, needs UX decision)

### Projects Page
- [x] Swiper carousel with mobile arrow hiding
- [x] Featured flag on projects
- [x] Per-project detail page with images + video
- [ ] Add more projects (only 3 exist)
- [ ] Filter/tag system for projects
- [ ] Live preview embeds

### Homepage (Canvas Mode)
- [x] Mouse-following sprite on tilemap background
- [x] Interactive zones → navigate to pages
- [x] DevZoneEditor helper (delete before re-enabling)
- [ ] Clean up dev helpers and re-evaluate enabling this as `/` route
- [ ] Polish zone labels and UX prompts

### Research Page
- [ ] Define content (papers, experiments, writeups?)
- [ ] Build out layout

### Contact
- [x] EmailJS integration
- [x] Client-side validation
- [ ] Social links (LinkedIn, GitHub)

### Global
- [x] Sticky gradient navbar
- [x] Responsive mobile nav
- [x] AnimatePresence page transitions
- [ ] Dark mode support
- [ ] SEO meta tags / Open Graph
- [ ] Favicon update (currently Vite default)
- [ ] Loading skeleton states

---

## Backlog / Ideas

- [ ] **Spice up About page** — richer visual for each timeline node (icons, images)
- [ ] **Homepage canvas re-enable** — clean up dev helpers, tune zone positions, add UX hints
- [ ] **Animate the project carousel cards** on hover (scale, glow, lift)
- [ ] **Add a blog/writing section** — essays, short-form posts
- [ ] **Track page** — define purpose (running stats? habit tracker?)
- [ ] **Footer links** — GitHub, LinkedIn, Twitter/X
- [ ] **Resume page** — fix download link (currently points to `resume_summer_2025.pdf` which may not exist in `/public`)
- [ ] **Scroll-progress indicator** on long pages
- [ ] **Custom 404 page**

---

## Completed Milestones

- `Avatar Animation` — AvatarFlicker component added
- `Swiper arrow hiding on mobile` — small screen UX fix
- `Reduced avatar spacing for mobile`
- `New Resume` — PDF updated to Fall 2025 version
- `Resume update`
