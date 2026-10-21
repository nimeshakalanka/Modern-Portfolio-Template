# DESIGN.md

The design system for the portfolio. Tokens live in `app/globals.css`; this file explains them and records where the signature effects are used and why.

## Direction
**"Quiet canvas, one bright idea."** A calm, editorial layout with lots of whitespace and strong type, so the work is the focus. Two signature touches give it personality without clutter:

1. **Liquid glass** on a few surfaces that float above content.
2. A slow, soft **gradient mesh + film-grain noise** background, so the glass has something to refract.

Everything else stays flat and quiet.

Things to avoid:
- generic template layouts and stock hero illustrations
- emoji used as icons
- more than one accent colour
- motion that delays reading.

## Colour
One accent (indigo) on a zinc neutral scale. Both themes are designed to meet WCAG AA.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | `#FAFAFA` | `#09090B` | Page background |
| `--surface` | `#FFFFFF` | `#18181B` | Cards, inputs |
| `--surface-muted` | `#F4F4F5` | `#27272A` | Chips, timeline rail, placeholders |
| `--fg` | `#09090B` | `#FAFAFA` | Primary text (19.9:1 / 19.1:1) |
| `--fg-muted` | `#52525B` | `#A1A1AA` | Secondary text (7.7:1 / 7.8:1) |
| `--border` | `#E4E4E7` | `#27272A` | Hairlines |
| `--accent` | `#4F46E5` | `#818CF8` | Links, active states, CTA (6.3:1 on bg / 6.6:1 on bg) |
| `--accent-fg` | `#FFFFFF` | `#09090B` | Text on accent buttons |
| `--accent-soft` | accent @ 12% | accent @ 16% | Tag backgrounds, focus glow |
| `--danger` / `--success` | `#DC2626` / `#15803D` | `#F87171` / `#4ADE80` | Form feedback only, always paired with an icon and text |

- **Gradient mesh:** three blurred radial blobs, all the accent hue at different lightness and opacity (8–22%), so there is still one accent.
- **Project placeholders:** the slug picks a hue within ±35° of the accent, so they look consistent but distinguishable.

## Typography
`next/font/google`, self-hosted, `display: swap`, so there are no external requests and no layout shift.

- **Display:** *Bricolage Grotesque* (600–800). Characterful, slightly quirky grotesque used for headings and the name.
- **Body:** *Inter* (400–600). Highly legible UI and body text.

Fluid type scale using `clamp()`, with a 360px → 1440px interpolation:

| Step | Size | Use |
| --- | --- | --- |
| `display` | `clamp(2.75rem, 1.6rem + 5.2vw, 6rem)` | Hero name |
| `h1` | `clamp(2.25rem, 1.6rem + 2.8vw, 3.75rem)` | Page titles |
| `h2` | `clamp(1.75rem, 1.4rem + 1.6vw, 2.5rem)` | Section headings |
| `h3` | `1.25rem` | Card titles |
| `body` | `1rem` (`1.0625rem` ≥ md), line-height 1.65 | Paragraphs, max 68ch |
| `small` | `0.875rem` | Meta, tags |
| `eyebrow` | `0.8125rem`, uppercase, `0.14em` tracking | Section labels |

Headings use `text-wrap: balance`; paragraphs use `text-wrap: pretty`.

## Spacing, radius, elevation
- **Spacing:** Tailwind's 4px base. Rhythm steps 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128.
- **Sections:** `padding-block: clamp(4rem, 3rem + 5vw, 8rem)`.
- **Container:** max 72rem, side gutters `clamp(1rem, 4vw, 2rem)`, so there are always at least 16px of gutter.
- **Radius:** `--radius-sm` 10px (inputs, chips) · `--radius-md` 16px (buttons) · `--radius-lg` 24px (cards) · `--radius-xl` 32px (modal, hero glass) · full (pills).
- **Elevation:** a hairline border plus one soft shadow `0 1px 2px rgb(0 0 0 / .04), 0 12px 32px -12px rgb(0 0 0 / .12)`. Cards lift 4px on hover.

## Components
- **Layout:** `Navbar`, `MobileMenu`, `Footer`, `Background`, `SkipLink`, `ThemeToggle`
- **UI:**
  - Buttons and tags: `ButtonLink` / `Button` (primary · secondary · ghost), `Tag`
  - Headings and layout: `SectionHeading` (eyebrow + title + lede), `Container`
  - Motion: `Reveal`, `Stagger`
  - Media and icons: `GradientPlaceholder`, `SocialIcon`
- **Sections:** `Hero`, `Intro`, `FeaturedProjects`, `SkillsHighlight`, `Bio`, `EducationTimeline`, `SkillGroups`, `ProjectGrid` (filters + cards), `ProjectCard`, `ProjectModal`, `ContactForm`, `ContactAside`
- **Glass:** `GlassSurface`, `useLiquidGlass`

## Wireframes

### Shared (every page)
- **Navbar:** a floating glass pill, centred, top 16px, sticky. Order: logo monogram · links · theme toggle. The active link has a sliding indicator. Below `md`, the links collapse into a menu button that opens a full-width sheet.
- **Footer:** name + one-line tagline · nav links · social icons · © year. Stacks on mobile.

### Home `/`
1. **Hero** (min-height ~88svh):
   - eyebrow ("Hello, I'm"), display name, tagline, one-line value statement
   - CTA group in a glass pill: **View Projects** (primary) + **Contact Me** (secondary)
   - a location/availability chip and a scroll cue.
2. **Intro:** two-column on desktop. Short bio on the left; three "at a glance" stats/facts on the right (from `profile.ts`).
3. **Featured projects:** three cards (projects flagged `featured`) and a "See all projects →" link.
4. **Skills highlight:** marquee-free wrap of the top skills as chips, grouped by category, and a link to About.
5. **Closing CTA band:** "Have a project in mind?" plus a Contact button.

### About `/about`
1. **Header:** page title + lede.
2. **Bio + photo:** the portrait slot is a 4:5 `GradientPlaceholder` with initials until a photo is added. Bio paragraphs + **Download CV** button.
3. **Education timeline:** vertical rail with dots. Each entry shows institution, degree, years and notes.
4. **Skills by category:** a card per category, with chips and an optional level.

### Projects `/projects`
1. **Header:** title + count.
2. **Filter bar:** "All" + unique tags, as a horizontally wrapping row of `aria-pressed` chips.
3. **Grid:**
   - columns: 1 col < 640px · 2 cols < 1024px · 3 cols at 1024px and up
   - each card: image (16:10), title, description, tags, **Live** + **GitHub** buttons, "Details" opener.
4. **Modal:** large image, long description, highlights, role and year, tech, and links. Esc, the close button or the backdrop closes it, and focus returns to the opener.

### Contact `/contact`
- Two columns at `lg`, stacked below.
- **Left:** a form card (name, email, message, hidden honeypot) with a submit button that has a spinner.
- **Right:** a glass "availability" card (status, location, response time) and social links.
- Success and error banners use an `aria-live` region.

### 404
A big display "404" with an accent underline, one sentence, and **Back home** + **View projects** buttons.

## Motion (motion.dev, `motion/react`)
Principle: motion explains structure and gives feedback. It never decorates for its own sake.
- **Durations:** 150–250ms for UI feedback; 400–600ms for entrances.
- **Easing:** `[0.22, 1, 0.36, 1]` (ease-out-quint). Springs (`stiffness 400, damping 30`) for the nav indicator and layout changes.

| Where | What | Why |
| --- | --- | --- |
| Hero | Staggered fade-up of eyebrow → name → tagline → CTAs | First impression; establishes the reading order |
| Sections | `whileInView` fade-up once, `margin: -10%` | Signals new content without hiding it for long |
| Lists (cards, chips, timeline) | Stagger children by 60ms | Guides the eye across the grid |
| Nav | Shared `layoutId` pill under the active link | Shows where you are and where you went |
| Buttons/cards | `whileHover` lift and `whileTap` scale 0.97 | Tactile feedback |
| Project filter | `layout` + `AnimatePresence mode="popLayout"` | Cards visibly reflow instead of jumping |
| Modal | Card image morphs into the modal (shared `layoutId`) | Keeps context between list and detail |
| Routes | React `<ViewTransition>` crossfade + 12px rise, header anchored | Smooth page changes where supported; instant elsewhere |

**Reduced motion:**
- `MotionConfig reducedMotion="user"` turns transforms off and keeps opacity.
- A CSS media query disables view transitions and the mesh drift.
- Content is never left hidden: reveal elements render visible when JS or animation is unavailable.

## Liquid glass (liquid-glass-js)
A WebGL refraction + blur shader that samples an `html2canvas` snapshot of the page.

- **Why sparingly:** each surface is a WebGL canvas, and the snapshot costs one main-thread capture, so it is used where it adds the most.
- **Where (3 surfaces):**
  1. **Navbar:** floats over all content, so the refraction is visible as you scroll. This is the signature element.
  2. **Hero CTA group:** draws the eye to the two primary actions.
  3. **Contact availability card:** echoes the nav and adds depth to an otherwise form-heavy page.
- **Fallback:** the same surface always renders with CSS glass first (`backdrop-filter: blur(16px) saturate(160%)`, translucent tint, hairline border, inner highlight). Where `backdrop-filter` is unsupported, a near-opaque tint keeps text readable.
- **The WebGL layer only fades in on top when all of these hold:**
  - WebGL is available
  - the user doesn't prefer reduced motion
  - the device has a fine pointer and is at least 768px wide
  - Save-Data is off
  - the URL has no `?glass=off` and `NEXT_PUBLIC_LIQUID_GLASS` isn't `off`.
- **Loading:** the library and html2canvas are dynamically imported during idle time after load, so they stay out of the critical path.
- **Snapshot refresh:** the snapshot is retaken after theme change, route change and resize.
- **Accessibility:** the canvas is `aria-hidden` and `pointer-events: none`; text sits on top and keeps its contrast against the tint.

## Accessibility checklist
- Skip link
- Visible 2px accent focus ring with offset
- One `h1` per page and a sequential heading order
- Labels on every input
- `aria-current="page"` on nav links
- Mobile menu: `aria-expanded` + `aria-controls`, Esc closes it
- Modal: `role="dialog"` + `aria-modal` + focus trap
- Tap targets ≥ 44px
- Colour is never the only signal
- Alt text on all images; decorative SVGs are `aria-hidden`
