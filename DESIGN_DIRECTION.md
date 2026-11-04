# Novadontics — Creative Direction and Handoff

## Goal
Create a product-first, bespoke editorial SaaS experience for dental practice management. The current challenge is visual quality, authentic branding and meaningful motion rather than adding more features.

## Approved direction (Nov 2026)

### Homepage Header & Hero — explicit visual reference (Nov 4)
The user supplied an Attio homepage screenshot and approved this **composition**, not Attio branding: white navigation with genuine Novadontics logo left, calm links centered, two right-aligned CTA buttons; centered narrow pill; oversized centered two-line headline; centered support copy and outline + dark buttons; restrained pale blue/neutral ambient glow and faint vertical lines at the bottom; real Novadontics product interface shown below the fold in a single large clean frame. No split hero, side panel, numbered label, awards band, stock graphics, or made-up login URL. Header secondary link is View pricing (official Novadontics URL) because no verified Novadontics sign-in URL was available. Main CTA books a demo. Keep responsive composition faithful.

Do NOT revert this centered hero to the former asymmetric layout during later Codex refinements.

- Preserve genuine Novadontics logo and existing /public/assets/novadontics screenshots.
- Larger display typography, fewer decorative elements, room for real product imagery.
- Primary palette: soft neutral canvas (#f8f8f5), deep mineral green (#172722), muted sage (#829087), subtle Novadontics amber (#e5ad37).
- Manrope for display, Inter for UI and body copy. Use consistent optical line breaks.
- No 01/02/03 section numbering, tiny uppercase eyebrow labels, yellow-dot kickers, generic three-card layouts or invented product dashboards.
- Primary CTA is Book a free demo linking to official Novadontics URL.
- Trust signals should be sourced from official Novadontics and kept visually restrained.

## Page composition
1. Hero: Attio-like centered navigation and centered type, minimal pill and buttons, product screenshot below the fold, faint ambient glow. No awards bar in hero.
2. Connected practice: light Attio-like four-window composition: large authentic Novadontics practice-management screenshot centered; patient-engagement upper-left, clinical-imaging lower-left on charcoal window, implant-management right. GSAP scroll-controlled staggered entrance on large desktop; static responsive grid on tablet/mobile. Use the genuine /public/assets/novadontics images; never use Attio interfaces.
3. Product experience: four accessible tabs with big real product screenshots.
4. Who it's for: verified practice logos, editorial photo, clean unnumbered link rows.
5. Closing: confident type and a demo CTA.

## Motion
- Hero entrance: staggered lines, 0.65–1.1 second ease. No permanent blocking overlays.
- Connected platform: reversible pinned/scrubbed GSAP layered-window reveal ONLY when viewport >=1180px and height >=780px and reduced motion is off. Each image appears separately, not a single flattened collage. Mobile/tablet shows visible static grid.
- Product tabs: short nonblocking image reveal; use the same panel with proper ARIA and keyboard arrows.
- No scroll hijacking; avoid multiple complex pins.
- Mobile and reduced-motion users should see complete content without JavaScript choreography.

## Next session: priorities for Codex
1. Run npm ci, npm run lint and npm run build. Fix compile, hydration and accessibility errors.
2. Run in browser; take screenshots at 1440x900 and 390x844. Check image framing, headline wrap, sticky section and CTA destinations.
3. Compare with https://novadontics-mockup.vercel.app/ and carefully chosen editorial reference. Fix specific measurable differences, not generic "make premium" changes.
4. Test scroll forward and backward; test feature tabs via mouse and keyboard; test mobile navigation and reduced motion.
5. After user approval, merge design-refinement-editorial into main and deploy production via Vercel.

## Developer notes
All refactor work is on design-refinement-editorial. Do not overwrite production/main until reviewed. The primary design styles live in src/app/globals.css. Navigation keeps authentic branding. Latest preview environment should be checked to confirm this branch builds correctly. All customer claims require verification against the official Novadontics site.

## November 4 — Multi-screen platform implementation
The user selected the Attio multi-window screenshot as composition reference for the section after the hero. Implemented in `src/components/sections/ConnectedPlatform.tsx` and `src/app/platform-showcase.css`, loaded by `src/app/layout.tsx`. Subsequent product section typography/colors were harmonized in `src/app/globals.css` and `src/components/sections/ProductExperience.tsx`. No main branch changes. Build passed in Vercel preview. Visual QA remains blocked because Vercel Deployment Protection redirects TinyFish to login; authenticated browser verification is still required before merging. Ask user to connect an authorized Vercel account or use a TinyFish browser profile configured at https://agent.tinyfish.ai/profiles, then inspect both 1440px and 390px layouts and scroll forward/backward.
