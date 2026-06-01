# YNot Solutions Visual Fix Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task after user approval. This is a correction pass for the existing Next.js App Router site in `C:\Users\jayan\Desktop\ynotsolutions-web`.

**Goal:** Repair the broken visual system called out in the screenshots so the homepage feels like a polished creative-agency DevOps website: stable responsive layouts, a credible Mac-terminal-style hero demo, aligned infrastructure route cards, professional dark demo sections, interactive process cards, a visible final globe, and readable header controls on both yellow and black backgrounds.

**Architecture:** Keep the current Next.js + TypeScript structure, but refactor the homepage presentation layer around deterministic layout primitives instead of fragile absolute positioning. Replace the most broken CSS-driven illusions with explicit section-specific components and responsive CSS contracts. Add automated visual/layout regressions with Playwright so these exact failures cannot silently return.

**Tech Stack:** Next.js App Router, React, TypeScript, CSS custom properties, CSS Grid/Flex, lightweight CSS animations, Playwright, optional IntersectionObserver class toggles if needed. No new heavy dependency is required unless a later implementation chooses to replace the CSS globe with a WebGL/canvas globe.

---

## Source of Truth From User Feedback

The current homepage is not acceptable and must be fixed around these user-reported issues:

1. Hero / first section:
   - Current demo does not look like a Mac window.
   - It should look much more like a Mac terminal.
   - Current demo feels visually bad and unprofessional.

2. Second section / infrastructure route:
   - Cards do not line up with the route line exactly.
   - Placements are off.
   - Placements must persist across PC screen resolutions.

3. Third section / modern workloads demo:
   - Demo looks very bad.
   - Layout has issues everywhere.
   - It does not look professional.

4. Process/cards section before globe:
   - Cards need hover effects.
   - Section should feel interactive and polished, not static.

5. Final globe section:
   - Globe is not visible; section reads as plain black.
   - `DEVOPS DONE BETTER` text is misplaced.
   - There is excessive broken empty space.

6. Header:
   - When the site switches into dark theme, header nav text/buttons do not change colors correctly.
   - Only the logo remains visible.
   - Header text/buttons must visibly change color based on section theme.

---

## Visual QA Findings From Attached Screenshots

### Screenshot 1: hero visual / yellow section

Observed problems:
- The black demo panels read as generic floating rectangles, not a Mac terminal.
- No credible titlebar structure: traffic-light dots are reduced to a tiny single-dot cue.
- Terminal content lacks prompt hierarchy, command lines, output rows, cursor, and structured terminal chrome.
- `deployment path` content is too sparse and horizontally cramped inside a huge black box.
- Main terminal and log terminal are disconnected from the hero copy; there is no intentional composition.
- Floating coordinate labels feel random rather than part of a refined interface.

Fix direction:
- Replace `window/main-window/log-window` presentation with a single premium `mac-terminal` component.
- Use visible Mac traffic lights, a terminal title/path bar, tab/status row, command prompt lines, deploy pipeline output, and a bottom status strip.
- Keep a secondary observability pane only if it is physically attached or visually docked to the main terminal.
- Use CSS variables and fixed internal grid, not arbitrary absolute offsets.

### Screenshot 2: infrastructure route / yellow section

Observed problems:
- Cards are placed by independent absolute percentages, so they do not lock to the SVG route.
- The route line passes behind cards without precise anchor points.
- At wide desktop resolution, cards look scattered and unbalanced.
- Some card titles overlap route strokes visually.
- The line and card sequence do not communicate a clean path.

Fix direction:
- Rebuild the section as a deterministic `route-board`.
- Use one shared coordinate system for SVG route and cards.
- Use CSS variables per node: `--x`, `--y`, `--anchor-x`, `--anchor-y`.
- SVG route path must use the same coordinate assumptions as card anchor points.
- Use `viewBox="0 0 1440 720"` or similar fixed internal map, with cards positioned as percentages inside that map.
- On desktop, route passes through explicit node markers and card anchor points; on tablet/mobile, switch to a vertical timeline/card stack.

### Screenshot 3: modern workloads dark demo

Observed problems:
- Left headline is acceptable in concept but oversized and imbalanced against the weak diagram.
- Right diagram looks empty, awkward, and low-effort.
- Lines and labels do not form a recognizable system or dashboard.
- The demo panel lacks depth, hierarchy, and real DevOps meaning.
- Orbit graphics collide with rectangular labels instead of feeling designed.

Fix direction:
- Replace `core-orbit` with a professional control-plane dashboard panel.
- Use a framed Mac/infrastructure canvas or dashboard card with titlebar, side rail, metrics, pipeline status, Kubernetes cluster map, deployment health, log stream, and alert status.
- Keep the yellow-on-black technical language but avoid random geometric leftovers.
- Ensure the diagram has a clear center, grid, labels, and a believable hierarchy.

### Screenshot 4: process section before globe

Observed problems:
- Process cards are too flat and static.
- The row is huge but visually underdeveloped.
- The user specifically wants hover effects on these cards.
- There is no tactile affordance that the cards are premium/interactive.

Fix direction:
- Convert process row into four equal premium cards with hover/focus states.
- Add subtle yellow top-line growth, background lift, border glow, and internal arrow/status microinteraction.
- Keep cards keyboard accessible using `:focus-within` or add an internal CTA link if appropriate.
- Maintain a stable desktop grid and stack cleanly on smaller viewports.

### Screenshot 5: final globe + header on dark section

Observed problems:
- The globe is effectively absent because `.planet` is positioned too far below the viewport (`bottom:-48vw`) and too dark.
- Section becomes a plain black void with a thin accidental line.
- Giant `DEVOPS DONE BETTER` text is too low/dim/wide and reads as misplaced background overflow.
- Foreground copy is clipped behind the fixed header.
- Header nav/CTA are nearly invisible on dark background due to bad theme handling and possibly opacity/contrast.

Fix direction:
- Rebuild final globe as a visible hero-scale set piece above the fold of the section.
- Place globe center/right or centered behind text, not mostly below the viewport.
- Use brighter yellow rim light, grid/latitude lines, continents, route arcs, and glow.
- Place `DEVOPS DONE BETTER` as intentional background typography behind the globe or as a bottom marquee, not covering the primary copy.
- Add a robust header theme system using scroll observation or CSS section markers so header colors change reliably between yellow and dark sections.

---

## Non-Negotiable Acceptance Criteria

### Visual acceptance

- Hero demo clearly reads as a Mac terminal at first glance.
- Hero terminal has a recognizable Mac traffic-light titlebar, command prompts, output rows, and terminal-like monospace content.
- Infrastructure route cards align to route markers at desktop widths: 1280, 1440, 1536, 1920, and 2560 px.
- No route card appears randomly detached from its route line on desktop.
- Modern workloads demo looks like a professional DevOps/control-plane dashboard, not random labels and lines.
- Process cards have visible hover/focus effects.
- Globe section contains a clearly visible globe without needing to scroll through a black void.
- `DEVOPS DONE BETTER` is intentionally placed and does not obscure/crop awkwardly.
- Header nav links and CTA are readable on yellow sections and black sections.
- No horizontal overflow on common desktop and mobile widths.

### Technical acceptance

- `npm run lint` passes.
- `npm run typecheck` passes.
- `npm run build` passes.
- `npm run test:e2e` passes.
- Browser console has no JavaScript errors on the homepage.
- Playwright checks include viewport widths that represent common PC screen resolutions.
- Reduced-motion users still see all content; animations are decorative only.

---

## Files Likely To Change

Modify:
- `components/Header.tsx`
- `components/HeroScene.tsx`
- `components/InfrastructureLandscape.tsx`
- `components/ProcessRoute.tsx`
- `components/GlobeClimax.tsx`
- `app/page.tsx`
- `styles/components.css`
- `styles/tokens.css`
- `styles/utilities.css` if needed
- `tests/smoke.spec.ts`
- `tests/visual-layout.spec.ts` or equivalent new Playwright test

Possibly create:
- `components/HeaderThemeObserver.tsx`
- `components/MacTerminalDemo.tsx`
- `components/ControlPlaneDemo.tsx`
- `components/RouteBoard.tsx`
- `components/VisibleOpsGlobe.tsx`

Avoid changing unless necessary:
- Contact form behavior.
- Placeholder/in-development pages.
- Navigation route list in `lib/navigation.ts`, unless labels are directly causing header spacing issues.

---

## Implementation Tasks

### Task 1: Establish a layout-regression baseline before editing

**Objective:** Add tests that fail against the current visual/layout problems so fixes are measurable.

**Files:**
- Modify or create: `tests/visual-layout.spec.ts`
- Possibly modify: `playwright.config.ts`

**Steps:**
1. Add desktop viewport coverage for widths: `1280x900`, `1440x900`, `1536x960`, `1920x1080`, `2560x1440`.
2. For each viewport, load `/` against production/test server.
3. Assert no document horizontal overflow:
   - `document.documentElement.scrollWidth <= window.innerWidth + 2`.
4. Add selectors/data attributes in later tasks and assert:
   - hero Mac terminal visible and above fold,
   - route-board markers/cards visible,
   - final globe bounding box intersects viewport when the globe section is scrolled into view,
   - header links have sufficient non-transparent computed color on dark section.
5. Keep tests initially minimal if selectors do not exist yet; expand after components are refactored.

**Expected verification:**
- Before fixes, at least the globe/header/route assertions should expose the current broken behavior.
- After all tasks, all visual layout tests pass.

---

### Task 2: Add explicit section theme markers and a header theme observer

**Objective:** Make header color changes deterministic instead of relying on fragile global styles.

**Files:**
- Modify: `components/Header.tsx`
- Create: `components/HeaderThemeObserver.tsx` or inline logic in `Header.tsx`
- Modify: `app/page.tsx`
- Modify: `styles/components.css`

**Implementation details:**
1. Add a `data-header-theme` attribute to major homepage sections:
   - yellow sections: `data-header-theme="light"`
   - dark sections: `data-header-theme="dark"`
2. In `Header.tsx`, track current theme with `useState<'light' | 'dark'>('light')`.
3. Use `IntersectionObserver` with a top root margin that corresponds to the fixed header zone, for example:
   - `rootMargin: '-72px 0px -70% 0px'`
4. Apply class:
   - `site-header theme-light`
   - `site-header theme-dark`
5. CSS contract:
   - `theme-light`: dark text, yellow/cream/blurred light surface, black CTA border/text.
   - `theme-dark`: cream/yellow text, dark opaque surface, yellow CTA border/text.
6. Do not hide nav links through opacity below `.45` in either theme.
7. CTA must be readable in both themes.
8. Mobile menu must inherit the dark readable theme, not disappear.

**CSS target behavior:**
- On yellow background:
  - logo mark black/yellow,
  - brand text black,
  - nav black,
  - CTA black border/text or black filled button.
- On black background:
  - logo mark yellow/black,
  - brand text cream,
  - nav cream or yellow-muted with hover to yellow,
  - CTA yellow border/text or yellow filled button.

**Verification:**
- Use Playwright to scroll to `#modern-workloads`, `#process`, and `#scale`, then compare computed header link color and opacity.
- Manually screenshot on both yellow and black sections.

---

### Task 3: Replace the hero visual with a real Mac-terminal-style demo

**Objective:** Make the first section's demo immediately recognizable as a premium Mac terminal interface.

**Files:**
- Modify: `components/HeroScene.tsx`
- Optionally create: `components/MacTerminalDemo.tsx`
- Modify: `styles/components.css`

**Component structure:**
Replace the current `.window`, `.main-window`, `.log-window`, `.pipeline`, `.route-card` composition with:

```tsx
<div className="mac-terminal" data-testid="hero-mac-terminal" aria-label="Mac terminal showing a DevOps deployment">
  <div className="mac-terminal__chrome">
    <span className="traffic red" />
    <span className="traffic yellow" />
    <span className="traffic green" />
    <span className="terminal-title">ynot-prod — deploy.sh</span>
  </div>
  <div className="mac-terminal__tabs">
    <span>production</span>
    <span>k8s-east</span>
    <span>healthy</span>
  </div>
  <div className="mac-terminal__body">
    <p><span>$</span> yn deploy --env production --strategy rolling</p>
    <p className="output ok">✓ pipeline green · image promoted · rollback armed</p>
    <p><span>$</span> kubectl rollout status deployment/api</p>
    <p className="output">deployment "api" successfully rolled out</p>
    <div className="deploy-steps">...</div>
    <p className="cursor-line"><span>$</span> observing live cluster<span className="cursor" /></p>
  </div>
  <div className="mac-terminal__status">latency 42ms · errors 0 · cluster synced</div>
</div>
```

**Visual rules:**
- Width: `min(720px, 100%)`.
- Do not position the main terminal with arbitrary `right/top` offsets.
- Use a nested log/observability sidebar only inside the terminal frame or as a docked child.
- Use `box-shadow`, thin yellow keylines, and cream terminal text.
- Keep text legible; avoid opacity lower than `.58` for important terminal output.
- Add a blinking cursor but disable it under reduced motion.

**Responsive rules:**
- At desktop, terminal sits to the right of hero copy in a balanced grid.
- At `max-width: 900px`, terminal stacks below copy and remains inside viewport.
- At narrow widths, pipeline chips wrap instead of overflowing.

**Verification:**
- Browser screenshot first section at 1440 and 1920 px.
- Confirm terminal resembles Mac terminal without needing explanation.
- Confirm no horizontal overflow.

---

### Task 4: Rebuild the infrastructure section as a stable route board

**Objective:** Ensure every card aligns with the route line consistently across PC screen resolutions.

**Files:**
- Modify: `components/InfrastructureLandscape.tsx`
- Optionally create: `components/RouteBoard.tsx`
- Modify: `styles/components.css`

**Current issue to remove:**
- CSS absolute classes `.n0` through `.n7` are independent from the SVG path and must be replaced or reworked.

**New model:**
Use data-driven coordinates:

```ts
const nodes = [
  { id: '01', name: 'Codebase', desc: '...', x: 8, y: 18 },
  { id: '02', name: 'CI/CD', desc: '...', x: 22, y: 44 },
  { id: '03', name: 'Registry', desc: '...', x: 41, y: 24 },
  { id: '04', name: 'IaC', desc: '...', x: 60, y: 42 },
  { id: '05', name: 'Kubernetes', desc: '...', x: 14, y: 70 },
  { id: '06', name: 'Cloud Runtime', desc: '...', x: 34, y: 72 },
  { id: '07', name: 'Observability', desc: '...', x: 74, y: 66 },
  { id: '08', name: 'Incident Loop', desc: '...', x: 90, y: 72 }
];
```

Render each card as:

```tsx
<article
  className="infra-node"
  style={{ '--x': `${node.x}%`, '--y': `${node.y}%` } as React.CSSProperties}
>
```

CSS:

```css
.infra-node {
  left: var(--x);
  top: var(--y);
  transform: translate(-50%, -50%);
}
```

But avoid card clipping at edges by using either:
- node-specific `anchor` values, or
- a board padding and x/y values that never place card centers too close to the edges.

**Route alignment rule:**
- SVG marker circles must use the same x/y coordinates as cards.
- Route line should connect marker points, not visually guess behind cards.
- Cards should have a small marker/notch/connector line pointing to the route marker if the card does not sit directly on the route.

**Desktop board:**
- Fixed internal aspect ratio: `aspect-ratio: 16 / 7` or `min-height: clamp(560px, 48vw, 760px)`.
- Use `max-width: 1600px; margin-inline: auto;` for predictable scaling.
- Cards use `clamp(190px, 14vw, 250px)` widths.

**Tablet/mobile board:**
- Disable SVG route and use vertical timeline/cards.
- No absolute placements below `980px`.

**Verification:**
- Add Playwright bounding-box checks at 1280, 1440, 1536, 1920, 2560 widths.
- Test each route marker is within a small distance of either the card center or connector target.
- Visual screenshot at 1440 and 1920.

---

### Task 5: Replace the modern workloads demo with a professional control-plane panel

**Objective:** Fix the third dark section demo so it looks intentional, polished, and DevOps-specific.

**Files:**
- Modify: `app/page.tsx`
- Create or modify: `components/ControlPlaneDemo.tsx`
- Modify: `styles/components.css`

**New section layout:**
- Keep a two-column dark section, but reduce the headline max width and improve the demo density.
- Left: editorial copy.
- Right: a large dashboard/control-plane panel.

**Panel contents:**
1. Header/titlebar:
   - `YNot Control Plane`
   - status pills: `prod`, `healthy`, `0 incidents`
2. Main status row:
   - deployment health percentage,
   - active services,
   - latency/error budget.
3. Cluster map:
   - three service cards connected by clean lines:
     - API Gateway
     - Worker Pool
     - Database Jobs
4. Pipeline strip:
   - Build → Test → Registry → Rollout → Observe
5. Log stream:
   - 4 short lines with timestamps.
6. Alert panel:
   - `rollback ready`, `alerts nominal`, `SLO tracking`.

**Visual rules:**
- Use a strong panel border and subtle inner grid.
- Avoid random floating labels like current `.core-node` unless they are aligned to a real diagram.
- Use a consistent spacing unit: 12/16/24 px.
- Keep yellow as signal/accent only, not full fill.
- Important text at `rgba(247,243,232,.88+)`; muted text no lower than `.55`.

**Animation:**
- Subtle pulse on healthy status dot.
- Optional line sweep through pipeline steps.
- No layout-changing animation.

**Verification:**
- Screenshot at desktop and tablet widths.
- Confirm panel does not overlap headline.
- Confirm all text is readable.

---

### Task 6: Add process-card hover and focus interactions

**Objective:** Make the process cards before the globe feel interactive and premium.

**Files:**
- Modify: `components/ProcessRoute.tsx`
- Modify: `styles/components.css`

**Implementation details:**
- Add class to articles: `className="process-card"`.
- Add optional decorative arrow/status line inside each card:
  - `Audit → Architect → Implement → Operate`
- CSS hover/focus states:
  - card lifts `translateY(-10px)`,
  - border changes to yellow,
  - top rule expands from 0 to 100%,
  - subtle background changes from black to `rgba(242,200,75,.045)`,
  - title shifts slightly or arrow slides right,
  - transition uses `var(--ease-out)`.
- Add `:focus-within` styles identical to hover.
- Respect reduced motion with no transform but keep color/border state.

**Layout rules:**
- Desktop: four-column grid with equal heights.
- At `max-width: 1100px`: two-column grid.
- At `max-width: 700px`: one-column stack.
- Cards must not depend on hover-only content for comprehension.

**Verification:**
- Use Playwright hover on each card and assert computed transform or border color changes.
- Manually inspect hover at desktop.

---

### Task 7: Rebuild the final globe section so the globe is visible and the text is intentional

**Objective:** Turn the broken black void into a visible final set piece.

**Files:**
- Modify: `components/GlobeClimax.tsx`
- Optionally create: `components/VisibleOpsGlobe.tsx`
- Modify: `styles/components.css`

**Current issue to remove:**
- `.planet { bottom:-48vw; ... }` hides the globe below the section.
- `globe-type` is too dim, too wide, and placed without relation to globe/copy.

**New layout option A: CSS globe, no new dependency**
- Section height: `min-height: clamp(780px, 100vh, 1040px)` instead of `120vh` with empty space.
- Use CSS grid:
  - left/top: copy block,
  - center/right: visible globe.
- Place globe:
  - `right: max(-120px, -6vw);`
  - `top: 50%;`
  - `transform: translateY(-46%);`
  - `width: clamp(560px, 58vw, 1080px);`
- Globe visual:
  - brighter rim: `box-shadow: 0 0 140px rgba(242,200,75,.24), inset ...`
  - visible latitude/longitude lines using pseudo-elements or layered gradients,
  - yellow continents with opacity `.22-.35`,
  - route arcs above globe with stronger contrast,
  - small endpoint dots.
- Add `data-testid="visible-globe"`.

**New layout option B: Lightweight canvas/WebGL globe**
- Only use if CSS globe remains visually weak.
- Use existing Three dependency if already installed.
- Render a visible wireframe sphere with points/arcs.
- Keep server safe via client component only.

**Text placement:**
- `DEVOPS DONE BETTER` should be a controlled background wordmark:
  - either behind globe centered vertically,
  - or along bottom with `mask-image` fade edges.
- It should not start at the top under the header or clip hero copy.
- Use `z-index` layering:
  - wordmark: 1,
  - globe: 2,
  - copy: 3,
  - header: 50.

**Copy placement:**
- Add top padding accounting for fixed header: `padding-top: clamp(140px, 14vh, 190px)`.
- Copy max width: `620px`.
- CTA must remain visible and not overlap wordmark.

**Verification:**
- Scroll to globe section at 1440 and 1920 widths.
- Confirm globe occupies visible viewport area.
- Confirm no giant plain black gap before/after globe.
- Confirm wordmark reads intentional, not misplaced.

---

### Task 8: Normalize section spacing and remove broken empty areas

**Objective:** Make the homepage flow feel deliberate from top to bottom.

**Files:**
- Modify: `app/globals.css`
- Modify: `styles/components.css`

**Rules:**
- Avoid `min-height: 120vh` unless content intentionally fills it.
- Dark sections should use `min-height: auto` plus explicit `padding-block` unless they are hero/set-piece sections.
- Clamp large headings so they do not collide with the fixed header or create huge empty zones.
- Avoid transforms for persistent card offsets because transforms do not reserve layout space.
- Replace absolute decorative elements that create overflow with contained pseudo-elements.

**Specific targets:**
- `.core-section`: reduce awkward empty top/bottom space and center content better.
- `.process-section`: make process cards begin closer to heading after a sane gap.
- `.globe-section`: remove black void by pulling globe into viewport and setting controlled min-height.

**Verification:**
- Use full-page screenshot at 1440 px height/width and scan for suspicious empty black zones.
- Ensure sections transition smoothly: yellow → dark workload → process → globe.

---

### Task 9: Responsive desktop and mobile QA pass

**Objective:** Ensure placements persist across PC screen resolutions and remain usable on smaller devices.

**Files:**
- Modify: `styles/components.css`
- Modify: `tests/visual-layout.spec.ts`

**Viewports to test:**
- Desktop PC: `1280x900`, `1366x768`, `1440x900`, `1536x960`, `1920x1080`, `2560x1440`
- Tablet: `1024x768`, `900x1200`
- Mobile: `390x844`, `430x932`

**Checks:**
- Header visible/readable in every section.
- Hero terminal stays inside viewport.
- Infrastructure route board deterministic on desktop; stacked timeline below breakpoint.
- Control-plane panel does not overflow or become unreadable.
- Process hover cards stack cleanly.
- Globe visible and not clipped into absence.
- No horizontal overflow.

---

### Task 10: Final production verification

**Objective:** Prove the fixed implementation works, not just that files changed.

**Commands:**

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

**Browser QA:**
1. Start production server:
   ```bash
   npm run start
   ```
   or use the existing Playwright production webServer if configured.
2. Open homepage in browser.
3. Inspect console for errors.
4. Capture/inspect screenshots of:
   - hero section,
   - infrastructure route section,
   - modern workloads demo,
   - process cards hover state,
   - final globe section,
   - dark-section header.
5. If any visual issue remains, patch and rerun verification.

**Required final report:**
- List exact files changed.
- List exact commands run and pass/fail output.
- Mention any remaining limitation honestly.
- Include confirmation that the attached screenshot issues were specifically checked.

---

## Design System Adjustments

### Color

Keep the yellow/black identity, but improve contrast:
- Yellow background: `#f2c84b` can remain primary.
- Dark background: `#050505` / `#080807`.
- Cream text: `#f7f3e8`.
- Muted text on dark: increase from current `#a8a090` if needed to `#bdb5a4`.
- Lines on dark: `rgba(247,243,232,.14-.22)`.
- Yellow signal on dark: use `#f2c84b`, not low-opacity yellow for key labels.

### Typography

- Keep Geist/Geist Mono.
- Maintain oversized editorial headings, but reduce upper clamp values in sections where they cause clipping or imbalance.
- Terminal/demo text should use Geist Mono and be readable at `12-14px` minimum.

### Motion

- Use motion for polish only:
  - terminal cursor blink,
  - route line dash movement,
  - process hover lift,
  - globe slow rotation/routes.
- No animation should be required to reveal critical content.
- Respect `prefers-reduced-motion`.

---

## Risks and Mitigations

1. Risk: Header theme observer flickers between sections.
   - Mitigation: Use stable section markers and a header-height root margin. Default to dark only when a dark section has meaningful intersection near the top.

2. Risk: Infrastructure card alignment becomes complex at very wide widths.
   - Mitigation: Constrain route board to a max width and use a fixed internal coordinate system.

3. Risk: CSS globe still looks flat.
   - Mitigation: Start with improved CSS globe; if visual QA fails, use existing Three dependency for a simple client-only wireframe globe.

4. Risk: Hover effects are invisible on touch devices.
   - Mitigation: Add static visual affordances and focus states; do not hide important information behind hover.

5. Risk: Overcorrecting into a purely terminal aesthetic.
   - Mitigation: Only the hero demo should feel like a Mac terminal. The rest should stay creative-agency/industrial DevOps, not an entire console UI.

---

## Approval Gate

Do not implement this plan until the user approves. After approval, implement in the order above, verify with real commands and browser QA, then report exact results.
