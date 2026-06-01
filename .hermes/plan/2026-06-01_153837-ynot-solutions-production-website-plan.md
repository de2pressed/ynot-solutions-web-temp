# YNot Solutions Production Website Implementation Plan

> **For Hermes:** This is an approval-gated implementation plan. Do not scaffold, overwrite, or build until the user approves this plan. When approved, implement task-by-task and verify with real local/build/browser output.

**Goal:** Build a Vercel-ready, multi-page, cinematic YNot Solutions website that feels like a creative agency built an operational DevOps infrastructure experience, with a fully real homepage and contact page plus branded in-development supporting pages.

**Architecture:** Replace the disposable existing `index.html` with a production-grade Next.js App Router application. The site will use a motion-first homepage with a yellow-to-black scroll narrative, a real contact route, and placeholder supporting routes that preserve the premium brand system. Animation will be implemented as progressive enhancement with reduced-motion fallbacks.

**Tech Stack:** Next.js App Router + React + TypeScript + GSAP/ScrollTrigger + React Three Fiber/Three.js for the mandatory globe + custom CSS modules/global design tokens + Playwright smoke/overflow tests + Vercel deployment compatibility.

---

## 0. Decisions Locked From User Answers

- Existing `index.html`: disposable; rebuild from scratch.
- Deliverable: fully production-ready multi-page website deployable on Vercel and runnable locally.
- Framework: choose the best stack for polished visuals and animation, not plain static HTML.
- SEO priority: secondary; visual/art direction first, but include correct metadata basics.
- Content: hardcoded for v1.
- Real pages now: Home and Contact.
- Placeholder/in-development pages: all other nav/supporting pages.
- Brand name: `YNot Solutions` exactly.
- Company type: startup DevOps implementation partner.
- Offering: DevOps consulting and managed infrastructure. YNot Solutions builds and runs reliable infrastructure — CI/CD, cloud, Kubernetes, and automation for teams that want to ship faster.
- Positioning line: `Infrastructure that just works — so your team can focus on building, not firefighting.`
- Messaging emphasis: use “DevOps” heavily; use infrastructure/deployment/cloud/Kubernetes/automation language as supporting terms.
- Visitor takeaway after 10 seconds: these people can deploy our app and scale our infrastructure.
- Logo/assets: none provided; create a simple confident typographic/mark system.
- Globe: mandatory in v1.

---

## 1. Art Direction Summary

The website must not look like a generic SaaS template, startup landing page, cyberpunk dashboard, or traditional agency website. The final product should feel like an art-directed infrastructure system: cinematic, matte, operational, technically precise, and premium.

### Visual references to synthesize

- **ClickHouse:** yellow/black infrastructure intensity, strong contrast, industrial technical confidence.
- **Framer:** cinematic scroll composition, refined motion, product-forward drama.
- **Linear/Vercel:** precision, restraint, clean system UI hierarchy.
- **SpaceX/BMW influence:** monumental scale and engineering confidence, especially in the globe/footer climax.

### Color system

Primary direction:
- Industrial yellow background at the opening: warm, engineered, not playful.
- Deep matte black for the later operational environment.
- Muted grayscale telemetry, blueprint lines, and operational annotations.
- Restrained highlight accents only where useful for signal/motion states.

Proposed tokens:
- `--yellow-core: #F2C84B` — main industrial yellow.
- `--yellow-soft: #F7DA72` — atmospheric yellow highlight.
- `--yellow-deep: #C9971A` — shadow/accent yellow.
- `--black: #050505` — matte deep black.
- `--black-soft: #0D0D0A` — elevated dark surface.
- `--ink: #11100B` — text/objects on yellow.
- `--white: #F7F3E8` — warm white on black.
- `--muted: #A8A090` — secondary text on dark.
- `--line-yellow: rgba(17, 16, 11, 0.20)` — yellow-environment blueprint lines.
- `--line-dark: rgba(247, 243, 232, 0.14)` — dark-environment blueprint lines.
- Optional signal accent: `#79A7FF` at low opacity only for observability/route signals, never as a dominant brand color.

### Typography

Use a premium sans-serif with tight display composition and a subtle mono for telemetry:
- Primary: `Geist` or `Inter`.
- Display treatment: oversized, compressed, confident, strong but not cartoonish.
- Technical labels: `Geist Mono` or `JetBrains Mono` for small operational tags only.

Principles:
- Headlines should be large and architectural.
- Body copy should be concise. Avoid long paragraphs.
- Use DevOps language plainly, not AI buzzword language.
- Avoid “unlock,” “seamless,” “next-gen,” “revolutionary,” and other generic AI/SaaS filler.

---

## 2. Proposed Route Map

### Real routes

1. `/`
   - Cinematic homepage.
   - Full scroll narrative.
   - Mandatory globe climax.
   - Primary CTA to `/contact`.

2. `/contact`
   - Real contact page.
   - Premium form UI.
   - No fake backend unless configured later.
   - v1 submission behavior: `mailto:` fallback or client-side composed email unless a form provider is supplied before implementation.

### Placeholder routes

Create branded “page in development” routes for:

- `/services`
- `/about`
- `/work`
- `/ai-infrastructure`

Each placeholder should still feel production-polished:
- same header/footer,
- dark/yellow operational background,
- concise “This page is in development” message,
- return-home CTA,
- contact CTA.

Navigation labels:
- Services → `/services`
- AI Infrastructure → `/ai-infrastructure`
- Work → `/work`
- About → `/about`
- Contact → `/contact`

Homepage anchor links may also be used inside the homepage for sections:
- Capabilities
- Process
- Globe/Scale

---

## 3. Homepage Narrative and Section Plan

The homepage should feel like a progressive operational journey:

`Operational DevOps Foundation → Connected Deployment Systems → AI/Modern Workload Readiness → Global Infrastructure Scale → Operational Stability`

### Section 1: Sticky operational header

Purpose:
- Establish brand confidence immediately.
- Keep navigation compact and infrastructural.
- Adapt visually as yellow environment transitions into black.

Design:
- Sticky top header.
- On yellow: matte ink text, subtle bottom rule, compact operational feel.
- On dark: matte black surface, warm white text, yellow CTA.
- No heavy glassmorphism.
- No glossy SaaS gradient pill.

Logo:
- Text-based mark: `YNot Solutions`.
- Optional simple symbol: bracket/grid/route mark generated in CSS/SVG.
- Keep confident and minimal.

Nav:
- Services
- AI Infrastructure
- Work
- About
- Contact

CTA:
- Primary nav CTA: `Plan a Deployment`
- Destination: `/contact`

Header interactions:
- Hover: subtle underline sweep or bracket ticks.
- Active/focus state: engineered line reveal, not bounce.

### Section 2: Hero — yellow operational environment

Goal:
- Within 10 seconds, communicate: YNot can deploy and scale apps.

Hero headline:
- Recommended final copy:
  `DevOps systems that keep shipping.`

Supporting line:
- Use the user-approved positioning line:
  `Infrastructure that just works — so your team can focus on building, not firefighting.`

Operational label:
- `MODERN DEVOPS SYSTEMS`
- Style as infrastructure classification/tape language, not a playful badge.

Primary CTA:
- `Plan a Deployment`
- Destination: `/contact`

Secondary CTA:
- `Explore Capabilities`
- Scrolls to capabilities/infrastructure landscape.

Hero visual:
- Layered operational interface composition, not fake analytics cards.
- Include real DevOps concepts:
  - source control,
  - CI pipeline,
  - container registry,
  - Kubernetes cluster,
  - cloud runtime,
  - observability stream.
- Use black system objects on yellow environment.
- Use route lines, deployment pathing, blueprint curves.
- Avoid fake stock dashboard charts.

Motion:
- Background drafting grid and route lines subtly move.
- Interface windows have slow operational updates.
- CTA microinteraction: mechanical line sweep and small coordinate ticks.
- No playful bounce.

Copy density:
- Hero should be minimal: headline, one sentence, two CTAs, 3-4 small operational proof chips.

Proof chips:
- `CI/CD`
- `Cloud Infrastructure`
- `Kubernetes`
- `Automation`

### Section 3: Infrastructure landscape — connected DevOps ecosystem

Goal:
- Visualize how YNot connects all pieces of deployment infrastructure.

Headline:
- `From commit to cloud, every layer coordinated.`

Body:
- `YNot Solutions designs and operates the DevOps systems behind fast releases: pipelines, clusters, cloud automation, monitoring, and the handoffs between them.`

Visual:
- “Infrastructure operations park” but serious in execution.
- Spatial map of nodes:
  - Codebase
  - CI/CD
  - Registry
  - IaC
  - Kubernetes
  - Cloud Runtime
  - Observability
  - Incident Loop
- Routes animate as the user scrolls into the section.
- Signal packets travel between nodes with restraint.
- Nodes are modular, premium, architectural.

Interaction:
- Hover/focus on nodes reveals one-line explanations.
- On mobile, node map becomes a staged vertical deployment route.

Avoid:
- Repeated generic feature cards.
- Random floating shapes.
- Looping animation noise.

### Section 4: Capabilities — clear service communication

Goal:
- Make the offering explicit and conversion-friendly.

Headline:
- `DevOps implementation for teams that need production confidence.`

Capability cards:
1. `CI/CD Implementation`
   - `Release pipelines, preview environments, rollback paths, and deployment automation.`
2. `Cloud Infrastructure`
   - `AWS, GCP, Azure, networking, runtime environments, and scalable foundations.`
3. `Kubernetes & Containers`
   - `Cluster setup, workload deployment, service routing, and operational patterns.`
4. `Infrastructure as Code`
   - `Terraform-first infrastructure that can be reviewed, repeated, and recovered.`
5. `Observability`
   - `Logs, metrics, alerts, dashboards, and visibility into system behavior.`
6. `Managed Infrastructure`
   - `Ongoing improvements, reliability work, automation, and infrastructure care.`

Design:
- Cards should not look like basic SaaS cards.
- Use operational panels, route connectors, and deployment-state labels.
- Keep copy compact.

### Section 5: Yellow-to-black transition / AI and modern workloads readiness

Goal:
- Smoothly move from bright operational planning into darker systems environment.
- AI is not the main business claim, but modern workload readiness can be shown without overclaiming GPU/model deployment unless later confirmed.

Headline:
- `Built for modern workloads, not fragile release days.`

Body:
- `Whether you are deploying SaaS products, internal platforms, or AI-enabled services, the infrastructure needs to be observable, repeatable, and ready to scale.`

Visual:
- Central operational core/control plane.
- Routes converge into a dark core as the background darkens.
- Use terms like `routing`, `workloads`, `scale`, `observability`, `automation`.
- Avoid claiming GPU orchestration as a core service unless the user later confirms it.

Motion:
- Section entry darkens the global environment.
- Blueprint systems adapt from ink-on-yellow to yellow/white-on-black.
- Density increases, but readability remains.

### Section 6: Process — how YNot works

Goal:
- Make the startup feel credible and structured.

Headline:
- `A deployment process built around stability.`

Steps:
1. `Audit`
   - `Map the current deployment path, infrastructure risks, and operational bottlenecks.`
2. `Architect`
   - `Design the pipeline, cloud, cluster, and automation structure around your product.`
3. `Implement`
   - `Build CI/CD, infrastructure as code, runtime configuration, and observability.`
4. `Operate`
   - `Improve reliability, reduce manual work, and keep deployment systems healthy.`

Design:
- Timeline/route system rather than normal numbered cards.
- Scroll reveals each phase as infrastructure routes stabilize.

### Section 7: Mandatory globe climax — global infrastructure scale

Goal:
- Cinematic climax: massive operational infrastructure scale.

Headline layer:
- Environmental typography behind globe:
  `DEVOPS DONE BETTER`

Foreground copy:
- `Infrastructure with a wider operating radius.`

Supporting copy:
- `From first deployment to scaled cloud operations, YNot Solutions builds the DevOps foundation your team can rely on.`

Globe requirements:
- Mandatory in v1.
- Extremely large and partially hidden below viewport.
- Mostly below screen bounds; visible upper arc creates scale.
- Globe intersects footer horizon.
- Recognizable continents, but matte and stylized.
- Avoid saturated blue Earth, stock globe, blockchain visual, neon cyber globe.
- Monochrome/matte planetary treatment with infrastructure overlays.
- Route systems animate across surface.

Implementation approach:
- Use React Three Fiber/Three.js if feasible within performance budget.
- Use custom shader/material or geometry overlays for matte treatment.
- Use scroll progress to rotate globe initially.
- After stabilization threshold, rotate autonomously very slowly.
- If WebGL fails or reduced motion is enabled, show a high-quality SVG/canvas fallback.

Motion:
- Weighted and slow.
- No fast spinning.
- Route signals precise and sparse.

CTA:
- `Plan Your Infrastructure`
- Destination: `/contact`

### Section 8: Footer — operational dock

Goal:
- Resolve the cinematic experience into calm operational stability.

Design:
- Edge-to-edge rectangular dock.
- Not floating, not card-based.
- Matte black with structural dividers.
- Globe visually anchors into footer horizon.

Footer content:
- Brand statement:
  `YNot Solutions builds and runs reliable DevOps infrastructure for teams that need to ship faster without firefighting.`
- Navigation.
- Capabilities/categories:
  - CI/CD
  - Cloud Infrastructure
  - Kubernetes
  - Automation
  - Observability
  - Managed Infrastructure
- CTA: `Plan a Deployment`
- Contact email placeholder to be added if user provides one; otherwise contact page link only.

---

## 4. Contact Page Plan

Route: `/contact`

Purpose:
- Convert interested visitors into leads without breaking the premium operational tone.

Headline:
- `Tell us what you need to deploy, scale, or stabilize.`

Intro copy:
- `Share a few details about your infrastructure, release process, or cloud environment. YNot Solutions will help map the next operational step.`

Form fields:
- Name
- Work email
- Company
- What do you need help with? dropdown:
  - CI/CD
  - Cloud infrastructure
  - Kubernetes
  - Automation
  - Observability
  - Managed infrastructure
  - Not sure yet
- Timeline dropdown:
  - ASAP
  - This month
  - This quarter
  - Planning ahead
- Message textarea

Submission behavior for v1:
- Since no backend/form provider was specified, implement safe client-side validation and a `mailto:` fallback button or generated email link.
- Do not fake a successful server submission.
- If the user provides Formspree/Netlify/Supabase/API endpoint later, wire it then.

Design:
- Dark operational page.
- Form fields plain and premium, not decorative gradient/glass fields.
- Strong focus states.
- CTA button with mechanical hover.
- Side panel showing operational categories and expected collaboration flow.

Validation:
- Required: name, email, message.
- Email format validation.
- Accessible labels and error text.

---

## 5. Placeholder Page Plan

Routes:
- `/services`
- `/about`
- `/work`
- `/ai-infrastructure`

Shared component: `InDevelopmentPage`

Copy pattern:
- Overline: `YNOT SOLUTIONS / SYSTEM PAGE`
- Heading: `[Page Name] is in development.`
- Body: `This section is being shaped into a more complete view of YNot Solutions’ DevOps systems work. For now, start with the homepage or contact us about your infrastructure.`
- CTA 1: `Return Home`
- CTA 2: `Contact YNot`

Design:
- Not bare/minimal default pages.
- Same header/footer.
- Branded operational background.
- Page-specific small route lines/annotations.

---

## 6. File and Directory Plan

Create/replace project structure:

```txt
ynotsolutions-web/
  .hermes/
    plan/
      2026-06-01_153837-ynot-solutions-production-website-plan.md
  app/
    layout.tsx
    page.tsx
    globals.css
    contact/
      page.tsx
    services/
      page.tsx
    about/
      page.tsx
    work/
      page.tsx
    ai-infrastructure/
      page.tsx
  components/
    Header.tsx
    Footer.tsx
    Button.tsx
    SectionShell.tsx
    AmbientSystem.tsx
    HeroScene.tsx
    InfrastructureLandscape.tsx
    CapabilityGrid.tsx
    ProcessRoute.tsx
    GlobeClimax.tsx
    ContactForm.tsx
    InDevelopmentPage.tsx
    ReducedMotionProvider.tsx
  lib/
    copy.ts
    navigation.ts
    motion.ts
    useReducedMotion.ts
  styles/
    tokens.css
    utilities.css
  public/
    favicon.svg
    og-image.svg
  tests/
    smoke.spec.ts
  package.json
  next.config.ts
  tsconfig.json
  eslint.config.mjs
  playwright.config.ts
  README.md
```

Notes:
- If Next.js creates some defaults in different locations, preserve Next conventions.
- Keep copy centralized in `lib/copy.ts` so it is easier to refine later.
- Keep global design tokens in `styles/tokens.css` imported by `app/globals.css`.
- Use CSS modules or component-scoped class names for major sections.

---

## 7. Implementation Tasks

### Task 1: Initialize the Next.js production app

**Objective:** Replace the disposable static file with a Vercel-ready Next.js TypeScript app.

**Files:**
- Create/modify: `package.json`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `README.md`
- Remove/replace: `index.html`

**Commands:**
- Initialize with Next.js TypeScript setup.
- Install animation dependencies:
  - `gsap`
  - `three`
  - `@react-three/fiber`
  - `@react-three/drei`
  - `@playwright/test`

**Verification:**
- `npm run dev` starts local server.
- `npm run build` succeeds.
- No old `index.html` remains as the app entry point.

### Task 2: Establish design tokens and global CSS

**Objective:** Create the yellow/black operational visual system.

**Files:**
- Create: `styles/tokens.css`
- Create: `styles/utilities.css`
- Modify: `app/globals.css`

**Implementation notes:**
- Define colors, typography, spacing, z-index, section sizing, easing curves.
- Add base body styles.
- Add reduced-motion global handling.
- Add focus-visible states.
- Prevent horizontal overflow.

**Verification:**
- App renders with correct base font/colors.
- No horizontal scrollbar at 390px, 768px, 1440px.

### Task 3: Build layout shell, header, and footer

**Objective:** Create consistent multi-page chrome.

**Files:**
- Create: `components/Header.tsx`
- Create: `components/Footer.tsx`
- Create: `components/Button.tsx`
- Create: `lib/navigation.ts`
- Modify: `app/layout.tsx`

**Implementation notes:**
- Sticky header.
- Responsive mobile nav.
- CTA to `/contact`.
- Header adapts based on scroll/dark sections using CSS class or IntersectionObserver.
- Footer uses operational dock treatment.

**Verification:**
- All nav links route correctly.
- Mobile menu opens/closes.
- Keyboard focus works.

### Task 4: Centralize website copy

**Objective:** Keep all hardcoded v1 copy organized and easy to refine.

**Files:**
- Create: `lib/copy.ts`

**Content groups:**
- Hero copy.
- Capabilities.
- Process steps.
- Contact form labels.
- Placeholder page copy.
- Footer categories.

**Verification:**
- Components import copy from `lib/copy.ts` instead of scattering text everywhere.

### Task 5: Build ambient background system

**Objective:** Create alive operational drafting layers that evolve from yellow to black.

**Files:**
- Create: `components/AmbientSystem.tsx`
- Modify: `app/page.tsx`

**Implementation notes:**
- Use SVG/CSS/canvas-style layers for:
  - drafting grid,
  - blueprint curves,
  - route lines,
  - topographic/operational annotations.
- Motion must be subtle.
- Avoid generic particles, glows, mesh gradients, random shapes.
- Background density increases with scroll.

**Verification:**
- Background feels like environment, not wallpaper.
- Reduced motion keeps static visible layers.

### Task 6: Build homepage hero scene

**Objective:** Create the yellow opening scene with strong DevOps positioning.

**Files:**
- Create: `components/HeroScene.tsx`
- Modify: `app/page.tsx`

**Required copy:**
- Headline: `DevOps systems that keep shipping.`
- Subcopy: `Infrastructure that just works — so your team can focus on building, not firefighting.`
- Label: `MODERN DEVOPS SYSTEMS`
- CTA 1: `Plan a Deployment`
- CTA 2: `Explore Capabilities`

**Visual:**
- Layered operational interface windows.
- Real DevOps labels.
- Route lines from commit to deployment.

**Verification:**
- Above-the-fold communicates deployment/scaling immediately.
- CTA positions are prominent but not gimmicky.
- Mobile hero is recomposed, not merely squeezed.

### Task 7: Build infrastructure landscape section

**Objective:** Visualize connected DevOps ecosystem.

**Files:**
- Create: `components/InfrastructureLandscape.tsx`

**Nodes:**
- Codebase
- CI/CD
- Registry
- IaC
- Kubernetes
- Cloud Runtime
- Observability
- Incident Loop

**Motion:**
- Routes activate on scroll.
- Signals move sparingly.
- Hover/focus reveals context.

**Verification:**
- Section feels like living operational landscape, not feature card grid.
- Text remains understandable to founders and CTOs.

### Task 8: Build capabilities grid

**Objective:** Clearly state services without generic SaaS visuals.

**Files:**
- Create: `components/CapabilityGrid.tsx`

**Capabilities:**
- CI/CD Implementation
- Cloud Infrastructure
- Kubernetes & Containers
- Infrastructure as Code
- Observability
- Managed Infrastructure

**Verification:**
- DevOps appears prominently.
- No unsupported AI/GPU claims.

### Task 9: Build dark transition and modern workloads core

**Objective:** Transition into darker operational environment while keeping claims accurate.

**Files:**
- Create or include in: `components/ProcessRoute.tsx` / homepage sections

**Implementation notes:**
- Use scroll-triggered color transition.
- Use central core/control-plane visual.
- Mention modern/AI-enabled workloads cautiously.
- Do not imply YNot builds AI models.

**Verification:**
- Yellow-to-black transition is cinematic and smooth.
- Header adapts correctly.

### Task 10: Build process section

**Objective:** Make YNot’s implementation process credible.

**Files:**
- Create: `components/ProcessRoute.tsx`

**Steps:**
- Audit
- Architect
- Implement
- Operate

**Verification:**
- Process is clear in under 20 seconds of reading.
- Scroll animation supports the route metaphor.

### Task 11: Build mandatory globe climax

**Objective:** Create the cinematic final globe section.

**Files:**
- Create: `components/GlobeClimax.tsx`

**Implementation approach:**
- Use React Three Fiber/Three.js for globe if stable.
- Add fallback for reduced motion / WebGL failure.
- Matte monochrome Earth with recognizable continents.
- Sparse infrastructure routes.
- Environmental typography behind globe: `DEVOPS DONE BETTER`.

**Motion behavior:**
- Scroll rotates globe initially.
- Globe stabilizes after scroll progress threshold.
- Then rotates autonomously very slowly.

**Verification:**
- Globe is huge, partially hidden, and physically weighted.
- It does not look like a stock globe/blockchain object.
- Reduced-motion fallback shows content and does not trap user.

### Task 12: Build contact page and form

**Objective:** Create the only real supporting page.

**Files:**
- Create: `app/contact/page.tsx`
- Create: `components/ContactForm.tsx`

**Fields:**
- Name
- Work email
- Company
- Help type
- Timeline
- Message

**Submission:**
- Implement client validation.
- Use `mailto:` fallback unless user provides a real form endpoint before implementation.
- Do not fake backend success.

**Verification:**
- Required errors display.
- Invalid email displays error.
- Mailto fallback includes structured message.
- Page works on mobile.

### Task 13: Build placeholder pages

**Objective:** Add polished “in development” routes.

**Files:**
- Create: `components/InDevelopmentPage.tsx`
- Create: `app/services/page.tsx`
- Create: `app/about/page.tsx`
- Create: `app/work/page.tsx`
- Create: `app/ai-infrastructure/page.tsx`

**Verification:**
- Each route loads.
- Each has branded layout, return home CTA, contact CTA.

### Task 14: Add metadata and deployment basics

**Objective:** Make app production/Vercel-ready.

**Files:**
- Modify: `app/layout.tsx`
- Create: `public/favicon.svg`
- Create: `public/og-image.svg`
- Modify: `next.config.ts`

**Metadata:**
- Title: `YNot Solutions — DevOps Systems That Keep Shipping`
- Description: `YNot Solutions builds and runs reliable DevOps infrastructure — CI/CD, cloud, Kubernetes, and automation for teams that want to ship faster.`

**Verification:**
- Metadata appears in built HTML.
- Favicon loads.

### Task 15: Add Playwright smoke and overflow tests

**Objective:** Catch major production issues.

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/smoke.spec.ts`
- Modify: `package.json`

**Tests:**
- Homepage loads.
- Contact page loads.
- Placeholder routes load.
- Nav works.
- Mobile menu works.
- Contact validation works.
- No horizontal overflow at 390, 768, 1440 widths.
- Reduced-motion mode shows content and does not block with preloader/animation.

**Verification command:**
- `npm run build`
- `npm run test:e2e`

### Task 16: Production QA pass

**Objective:** Verify real artifact before handoff.

**Commands:**
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run test:e2e`
- Start local production server.
- Use browser QA to inspect homepage/contact visually.

**Manual visual QA checklist:**
- Hero does not clip at desktop/tablet/mobile.
- Yellow-to-black transition feels intentional.
- Header state does not clash with background.
- Buttons are placed with clear conversion hierarchy.
- Globe appears massive and not generic.
- Contact page is usable.
- Placeholder pages feel intentionally branded.
- No console errors.
- No horizontal scrolling.

---

## 8. Copy Drafts

### Hero

Overline:
`MODERN DEVOPS SYSTEMS`

Headline:
`DevOps systems that keep shipping.`

Body:
`Infrastructure that just works — so your team can focus on building, not firefighting.`

CTA:
`Plan a Deployment`

Secondary:
`Explore Capabilities`

### Infrastructure landscape

Headline:
`From commit to cloud, every layer coordinated.`

Body:
`YNot Solutions designs and operates the DevOps systems behind fast releases: pipelines, clusters, cloud automation, monitoring, and the handoffs between them.`

### Capabilities

Headline:
`DevOps implementation for teams that need production confidence.`

Body:
`We build the release systems, cloud foundations, automation, and observability that help teams ship faster without adding operational chaos.`

### Modern workloads core

Headline:
`Built for modern workloads, not fragile release days.`

Body:
`Whether you are deploying SaaS products, internal platforms, or AI-enabled services, your infrastructure needs to be observable, repeatable, and ready to scale.`

### Process

Headline:
`A deployment process built around stability.`

Body:
`We map what exists, design what should exist, implement the missing systems, and keep improving the infrastructure your team depends on.`

### Globe

Background text:
`DEVOPS DONE BETTER`

Headline:
`Infrastructure with a wider operating radius.`

Body:
`From first deployment to scaled cloud operations, YNot Solutions builds the DevOps foundation your team can rely on.`

CTA:
`Plan Your Infrastructure`

### Footer

`YNot Solutions builds and runs reliable DevOps infrastructure for teams that need to ship faster without firefighting.`

---

## 9. Risks and Mitigations

### Risk: Globe implementation looks generic

Mitigation:
- Avoid stock blue Earth materials.
- Use matte monochrome planet treatment.
- Make globe oversized and partially hidden.
- Put `DEVOPS DONE BETTER` behind it to create custom composition.
- Add sparse route overlays rather than many neon arcs.

### Risk: Animation hurts performance

Mitigation:
- Use CSS/SVG for most background systems.
- Reserve WebGL for globe only.
- Lazy-load globe section if possible.
- Add reduced-motion and fallback rendering.
- Test mobile performance.

### Risk: Site overclaims AI infrastructure

Mitigation:
- Keep DevOps as primary messaging.
- Use “modern workloads” and “AI-enabled services” lightly.
- Avoid GPU/model routing claims unless confirmed later.

### Risk: Looks cyberpunk instead of premium infrastructure

Mitigation:
- Avoid neon saturation, excessive glow, random particles.
- Use matte black, industrial yellow, restrained telemetry.
- Keep motion weighted and slow.

### Risk: Contact form has no backend

Mitigation:
- Use honest mailto fallback for v1.
- Do not fake submission success.
- Leave clear integration point for Formspree/Netlify/custom API later.

---

## 10. Acceptance Criteria

The implementation is complete only when:

- Existing static `index.html` has been replaced by a real Next.js app.
- Project runs locally with `npm run dev`.
- Project builds successfully with `npm run build`.
- Home page has cinematic yellow-to-black narrative.
- Contact page is real and usable.
- Services/About/Work/AI Infrastructure are polished in-development pages.
- Sticky header and footer work on all routes.
- Mandatory globe exists in v1 and visually anchors the footer/climax.
- Copy emphasizes DevOps heavily.
- No unsupported AI/GPU claims are presented as core services.
- Site is responsive on mobile/tablet/desktop.
- Reduced-motion mode remains usable.
- No horizontal overflow.
- Browser console is clean of app errors.
- Playwright smoke tests pass.
- Final handoff includes actual command output summary.

---

## 11. Open Items Before or During Implementation

These are not blockers because defaults have been chosen, but the user may override them:

1. Contact destination: if a real email/form endpoint is provided, wire it instead of mailto.
2. Any real client proof/logos/metrics: add only if provided.
3. Any exact tool/platform list: default to common DevOps terms without implying official partnerships.
4. Logo refinement: v1 uses a custom typographic mark unless assets are provided.
5. AI service specificity: keep cautious unless user confirms GPU/model deployment services.

---

## 12. Recommended Execution Approach After Approval

After approval, implement in this sequence:

1. Scaffold Next.js app and install dependencies.
2. Build global design system.
3. Build shared header/footer/button primitives.
4. Build homepage sections without globe first.
5. Build contact and placeholder routes.
6. Build globe climax.
7. Add tests.
8. Run full build and browser QA.
9. Patch visual/performance issues found during QA.
10. Final summary with real command outputs and remaining optional improvements.

Do not proceed to implementation until the user explicitly approves this plan.
