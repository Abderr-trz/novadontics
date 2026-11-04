# Novadontics — Creative Direction and Handoff

## Goal
Create a product-first, bespoke editorial SaaS experience for dental practice management. The current challenge is visual quality, authentic branding and meaningful motion rather than adding more features.

## Approved direction (Nov 2026)
- Preserve genuine Novadontics logo and existing /public/assets/novadontics screenshots.
- Larger display typography, fewer decorative elements, room for real product imagery.
- Primary palette: soft neutral canvas (#f8f8f5), deep mineral green (#172722), muted sage (#829087), subtle Novadontics amber (#e5ad37).
- Manrope for display, Inter for UI and body copy. Use consistent optical line breaks.
- No 01/02/03 section numbering, tiny uppercase eyebrow labels, yellow-dot kickers, generic three-card layouts or invented product dashboards.
- Primary CTA is Book a free demo linking to official Novadontics URL.
- Trust signals should be sourced from official Novadontics and kept visually restrained.

## Page composition
1. Hero: giant editorial statement plus oversized authentic dashboard image; low-noise credibility bar.
2. Connected practice: one dark visual chapter demonstrating five workflows converging into the real product. GSAP ScrollTrigger on desktop, static simplified mobile.
3. Product experience: four accessible tabs with big real product screenshots.
4. Who it's for: verified practice logos, editorial photo, clean unnumbered link rows.
5. Closing: confident type and a demo CTA.

## Motion
- Hero entrance: staggered lines, 0.65–1.1 second ease. No permanent blocking overlays.
- Connected platform: reversible pinned/scrubbed timeline ONLY when viewport >=1024px and height >=700px and reduced motion is off.
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
