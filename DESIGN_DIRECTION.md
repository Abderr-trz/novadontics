# Novadontics — Creative Direction and Handoff

## Goal
Create a product-first, bespoke editorial SaaS experience for dental practice management. The current challenge is visual quality, authentic branding and meaningful motion rather than adding more features.

## Approved direction (Nov 2026)

### Homepage Header & Hero — explicit visual reference (Nov 4)
The user supplied an Attio homepage screenshot and approved this **composition**, not Attio branding: white navigation with genuine Novadontics logo left, calm links centered, two right-aligned CTA buttons; centered narrow pill; oversized centered two-line headline; centered support copy and outline + dark buttons; restrained pale blue/neutral ambient glow and faint vertical lines at the bottom; real Novadontics product interface shown below the fold in a single large clean frame. No split hero, side panel, numbered label, awards band, stock graphics, or made-up login URL. Header secondary link is View pricing (official Novadontics URL) because no verified Novadontics sign-in URL was available. Main CTA books a demo. Keep responsive composition faithful.

Do NOT revert this centered hero to the former asymmetric layout during later Codex refinements.

- Preserve genuine Novadontics logo and existing /public/assets/novadontics screenshots.
- Professionally scaled Manrope display typography (titles usually 36–74px depending on hierarchy), Inter body, minimal decorative elements, and authentic large product imagery.
- Current primary palette: genuine Novadontics icon yellow (#FFF300), orange (#EC8624), warm-sand / cold-orange neutral (#F3D7B3), true logo gray (#697C7D) and ink charcoal (#242629). Never reintroduce green SaaS accents or bluish generic canvas.
- Manrope for ALL display/section headings and UI headings; Inter for body/navigation and interactive labels. Maintain consistent optical line breaks and no 90px h2 headings.
- No 01/02/03 section numbering, tiny uppercase eyebrow labels, yellow-dot kickers, generic three-card layouts or invented product dashboards.
- Primary CTA is Book a free demo linking to official Novadontics URL.
- Trust signals should be sourced from official Novadontics and kept visually restrained.

## Page composition (based on the user's 34-second Attio video)
1. **Hero (00–05s)**: centered, large editorial type, a minimal pill and two accessible CTAs. NO duplicate screenshot in the hero. One continuous warm light canvas. Current hero typography target at desktop: 72–80px, not the previous near-100px heading. Supporting copy 18–19px with controlled ~690px width.
2. **Screen composition (05–07s)**: four separate REAL Novadontics screenshots rise from the lower viewport with depth offsets, soft shadows and subtle browser chrome. They do not emerge from a single flat screenshot. Implemented in `src/components/sections/ConnectedPlatform.tsx` and `src/app/platform-showcase.css`.
3. **Practice logos (07–09s)**: original Novadontics customer logos from `TrustProof.tsx` directly after the product composition. No repeated logos in the practice audience section.
4. **Sticky workflow story (09–20s)**: a compact left-side navigation highlights the active chapter as the user naturally scrolls real product screenshots and narrative on the right. Implemented in `ProductExperience.tsx` and `src/app/product-story.css`.
5. **Dark cinematic moment (21–25s)**: final CTA with original amber/orange halo that moves subtly with scroll, NOT an Attio visual asset. Implemented in `PracticeAndClosing.tsx` and `src/app/novadontics-brand-motion.css`.
6. Preserve audience content and verified practice information; do not invent testimonials, business metrics or clinical data.

## Motion
- Hero: short GSAP entrance plus fade-out coordinated in one timeline with the platform windows, no scroll hijacking.
- Hero + layered collage: unified scroll timeline in `src/components/sections/HeroPlatformTransition.tsx` (both sections are children). The hero copy fades/slightly rises while the real Novadontics window collage appears progressively in the same viewport. Timeline uses natural scrolling, no pinning. Desktop/tablet >=768px reveals all four windows; mobile keeps the grid static while fading the hero gently. Reduced-motion users see all content unanimated.
- Product story: CSS `position: sticky` navigation (desktop >=900px); ScrollTrigger observes each section and updates active link on forward/reverse scroll. Product imagery has subtle scroll-linked opacity and position transitions. Mobile displays all chapters stacked.
- Dark closing: gentle orbit scale/translation tied to scroll, reduced motion respected.
- Do not add Lenis, smooth-scroll hijacking, multiple fullscreen pins or gratuitous gradients.

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

## Brand colors verified against real SVG
Logo icon: yellow `#FFF300`, orange `#EC8624`, gold `#FEB300`. Wordmark: gray `#697C7D`. Use these as carefully controlled accents on neutral white/charcoal backgrounds, NOT as giant saturated surfaces.

## Current QA constraints
Vercel preview deployments are protected by login. Automated browser tools see Vercel sign-in rather than the actual preview, so complete desktop/mobile visual QA and real scroll testing still require an authorized browser session. The GitHub branch is intentionally left separate from main until review.

## November 4 — Hero-to-collage refinements after user screenshots
User explicitly rejected oversized hero text and the empty striped band between hero and platform. The fix is in `HeroPlatformTransition.tsx`, `Hero.tsx`, `ConnectedPlatform.tsx`, and `src/app/hero-platform-transition.css`. The page now renders `<HeroPlatformTransition />` in place of two unrelated siblings. Shared warm background across both sections, no repeating grid seams, refined optical headline sizing and vertical rhythm. GSAP fade-out and layered-window rise are controlled by one reversible ScrollTrigger. `src/app/hero-platform-transition.css` MUST remain the final imported stylesheet so it can override older hero styles. Run browser visual QA in Vercel after granting authorized access before merging.


## November 4 — Final five-part homepage structure and new conversion story

The user approved adding carefully selected missing value from the official Novadontics website, without copying its excessive homepage length. The final homepage is five narrative chapters (navigation/footer excluded):

1. **Hero + real software collage:** `HeroPlatformTransition` (preserve the Attio-like hero-to-product scroll choreography).
2. **Product experience:** `ProductExperience`, sticky links and real screenshots.
3. **One patient, one connected journey:** `PatientJourney` added to `src/app/page.tsx`. Five stages: appointment, patient record, imaging, billing and follow-up. A dark charcoal pinned desktop story changes actual Novadontics screenshots in response to native scroll. Static full-story timeline on mobile, short viewports and reduced-motion. This is an *illustrative journey*, not a simulated live patient chart; no invented data or claims that all features are included in all subscription tiers.
4. **Built for your practice + trust:** existing `PracticeAndClosing` audience layout enhanced with four verified target audiences and `CustomerVoice`, using a real, attributed Dr. Yana Pekarski testimonial and official portrait. Do not use unverifiable dramatic metrics or invent reviews.
5. **Switching made simple + final CTA:** `Onboarding` shows four summarized steps (data conversion, training, go-live, ongoing support), then the existing dark CTA. Specific conversion time estimates vary between official pages and must NOT be stated as guarantees.

New CSS: `patient-journey.css` and `trust-onboarding.css`, loaded in `src/app/layout.tsx` before the user's final hero override.

Verified official links:
- https://www.novadontics.com/the-platform
- https://www.novadontics.com/solutions/new-practices
- https://www.novadontics.com/solutions/groups-dsos
- https://www.novadontics.com/testimonials
- https://www.novadontics.com/onboarding
- https://www.novadontics.com/book-a-demo

Before merging, inspect the protected Vercel preview at 1440x900 and 390x844 in an authorized browser. Check the dark journey's five-stage scrub, keyboard-accessible stage buttons, portrait image load, customer quote overflow, onboarding timeline and mobile static flow. Run lint/build. Never merge without explicit user approval.


## November 4 — Product Experience reference refinement (user Attio screenshots)

User explicitly selected three Attio screenshots showing a left-hand sticky chapter index, orange-free original Attio blue rail, spacious editorial copy at right and authentic interface screenshots displayed directly without fake surrounding browser-window UI. Novadontics adaptation keeps four REAL dental workflows (practice management, patient engagement, clinical imaging, implant dentistry), NOT Attio sales/CRM copy.

Implementation:
- `src/components/sections/ProductExperience.tsx` rewritten for compact editorial header (main statement + muted follow-up in one h3), sticky left nav with URL fragment links, active state synchronized to down/up scroll through GSAP ScrollTrigger, authentic local product images.
- `src/app/product-story.css` replaced with a refined layout: H2 max 63px desktop, individual feature statement max 37px; better controlled description, no fake browser chrome, images on borderless light-gray staging surfaces with soft drop shadows, gray #697C7D and orange #EC8624 official brand colors.
- Only the ProductExperience component and its stylesheet were edited in this refinement; no other homepage component changed.
- Latest Vercel deployment for these commits: `902ac61fde6f054df5aedd194a2153ead27a1aac`, status READY.
- TinyFish verified the real rendered desktop section: four genuine feature images rendered; sticky nav and active indicator worked scrolling forward/back; no clipping, broken images, overlap or horizontal overflow detected. Mobile viewport, exact pixel measurements, and performance metrics were not available and remain to be checked before merge.
- Keep branch `design-refinement-editorial` separate from main until explicit approval.


## November 4 — Full-site polish requested after user screenshots

The user rejected the giant generic image-holder surfaces, green accents, oversized headings and oversized navigation. Latest design decisions are mandatory for future sessions:
- Navbar height **72px desktop / 68px mobile**, real logo width around **151px**, ~13.5px navigation labels and ONE compact **Book a demo** CTA on desktop. No redundant “View pricing” button (Pricing remains in primary navigation).
- The brand color system is grounded in the official logo: `#FFF300` yellow, `#EC8624` orange, warm-sand `#F3D7B3`, slate `#697C7D`, charcoal `#242629`. Light ivory surfaces and dark neutral charcoal are supporting colors. Never use deep mineral green or arbitrary blue for headlines, panels, CTA or accents.
- Consistent title font is the already-installed `Manrope` via `next/font/google`; body and UI use `Inter`. Hero display capped around 83px; product section heading max 60px; chapter titles 36px; journey/closing titles max ~74–79px. Maintain deliberate tracking and line-height.
- Product Experience photography/UI: original assets already include their OWN built-in frame/backdrop. Rendering them inside another padded, shadowed rounded box is prohibited. In `ProductExperience.tsx` use a single `product-story-media--{workflow.id}` figure, in `product-story.css` with NO extra padding, background, border, shadow or browser chrome. Respect natural image aspect ratios and their intrinsic art direction (practice neutral; patient forms warm; imaging dark; implant tablet on ivory).
- Use narrow active rail orange stroke, restrained text and large natural product visuals; keep GSAP scroll tracking and accessible anchors.
- Keep `main` untouched until QA and explicit user approval. Validate 1440, 1024, 390, 360 widths and reduced motion.


## November 4 — Definitive One Patient Journey visual redesign

User asked to thoroughly understand and elevate the One patient journey / One connected record section, using external premium SaaS motion references and the authentic dental workflows.

Design sources studied:
- Attio (https://attio.com/) — readable, restrained motion and product storytelling.
- Linear design rationale (https://linear.app/now/behind-the-latest-design-refresh) — remove unnecessary UI chrome and borders; structure is felt, not imposed.
- Official Novadontics: https://www.novadontics.com/platform/practice-management and https://www.novadontics.com/platform/clinical-imaging — scheduling, clinical record, imaging, billing and patient communication are connected workflows.

Final code at `src/components/sections/PatientJourney.tsx` and `src/app/patient-journey.css`:
- Editorial intro on warm ivory with an orange-tinted label and a two-tone Inter heading **One patient journey. One connected record.**
- FULL-BLEED charcoal scrolling chapter; not a huge rounded card, boxed dashboard, or fake browser window.
- Genuine product screen remains **sticky left**; five naturally scrollable treatment moments appear **right** as a continuous timeline (appointment, record, imaging, billing and payments, follow-up).
- Soft orange/yellow vertical progress line is scrubbed through GSAP ScrollTrigger; active moment changes with forward and reverse scroll; screen transitions use restrained opacity/scale and genuine Novadontics images. No mousewheel interception, forced pinning or fabricated patient data.
- Screen max-width ~700px / max-height 470px with original art direction preserved.
- All five stages are exposed as a sequential static flow on narrow viewports (<960px), shorter desktop heights (<700px) and reduced-motion preference. No unverified patient claims.
- Existing Inter heading/body hierarchy and brand orange/yellow/slate used; typography mostly 31–43px for stage headlines, 15–17px for supporting text.
- Actual desktop browser QA (TinyFish) at approximately 1368x831 reported sticky screen, 5 right stages, vertical progress, smooth screen transitions, no clipping/overlap/excess whitespace. Mobile was NOT visually verified: check 390px and 768px before final merge.
- Branch preview: https://novadontics-nr104wiua-abderrahim-tarzoukt-s-projects.vercel.app/ (Vercel Deployment Protection; obtain share access via Vercel tool).
- Never merge to `main` before user visual review.


## November 4 — Reimplementation from user's uploaded 12.417s, 1920×1080, 60fps video (authoritative current journey design)

IMPORTANT: This supersedes the earlier DARK STICKY PRODUCT SCREEN patient-journey direction above. The user supplied a screen-recorded Novadontics reference showing “Five moving parts. One beautiful rhythm.” and explicitly requested that the **One patient journey. One connected record.** section adopt this motion. The recording was inspected over 25 evenly-spaced frames and individual high-resolution key frames.

Observed reference-motion sequence:
1. Warm/ivory dot-grid workflow canvas comes into view with five white feature cards surrounding the original brand-marked center.
2. All five have faint/gray curved connector lines. Each card is clear but inactive; central mark is initially subdued.
3. As scrolling progresses, connections trace sequentially in bright yellow/orange while nodes transition to visible “Connected” states. Connected state is persistent while the animation progresses; no large cards fly across the screen.
4. Center label brightens to indicate unified practice when connections finish. The visual structure stays spatially anchored (pin/scrub) during the sequence.
5. Final interconnected state remains visible until scrolling out; reverse scrolling should reverse the states.

Implementation lives ONLY in:
- `src/components/sections/PatientJourney.tsx`: clickable five-node diagram with cards Appointment, Patient record, Clinical imaging, Billing & payments, Follow-up. Original `LogoColorAndGray.svg` displayed at the center, no fake patient info. SVG 1200×620 bezier curves have neutral base paths and GSAP-animated gold/orange overlay stroke-dashoffset. ScrollTrigger pins the stage and scrubs five connection steps; react state controls connected badges and central status. Selecting a card navigates to its scroll segment using the existing native window smooth scroll; no wheel interception. Toggle behavior reversible.
- `src/app/patient-journey.css`: 1400px-wide cream canvas with soft original dotted grid, low-shadow white nodes with deliberate positions, warm gold connectors, center brand panel, modest/consistent Inter type, mobile stacked accessible list, static reduced-motion fallback.
- GSAP is only active with viewport >=1120px wide and >=720px tall and when reduced motion is NOT requested. Below either threshold or with reduced motion the five steps remain visible as a linear mobile/tablet flow with no pinning, no JS-dependent visibility.
- All other website sections remain untouched.

Vercel deployment for source commit `fb812dfd14efb69af18389a3fe9d2429fd68b2d5` is READY; preview is protected and share link can be generated with Vercel get_access_to_vercel_url. TinyFish QA was attempted but cancelled by the user before a full visual result was returned: DO NOT claim live scroll-movement visual verification for this build. Next validation: review full connection sequence, reverse scroll, card clicks at 1368×831; also inspect mobile at 390px and 768px. Maintain current branch; do not merge to main without user approval.


## November 4 — Continuous-page refinement and borderless trust wall

User selected an editorial screenshot of black wordmarks in two clean rows, explicitly **without a tile grid**. They also requested that the site feel like ONE page, not a stack of disconnected boxed sections.

Implementation:
- `src/components/sections/TrustProof.tsx`: retained eight verifiable dental practice logos from the existing repository. The large left-side title column is replaced by a short centered credibility line; a simple 4×2 logo wall below, no new fabricated companies. GSAP stagger remains mild, and never hides logos completely while waiting for ScrollTrigger (min alpha .78 instead of autoAlpha 0).
- `src/app/practice-proof.css`: full-width logo wall on the inherited page canvas, no border or logo background boxes; optical compensation for source logo whitespace; 2-column responsive phone grid and reduced-motion visibility.
- `src/app/continuous-flow.css` imported last via `src/app/layout.tsx`: shared ivory canvas flows continuously from Hero to Product Experience to connected patient journey, solutions and onboarding. Remove the box around the full Product Experience section; preserve only the useful internal navigation hairline. Remove abrupt section outlines and avoid large redundant gaps. Onboarding gradually warms the shared canvas, transitioning deliberately into the dark closing CTA.
- No changes to the verified logo assets, hero GSAP interactions, patient journey content or core routes; `main` stays untouched.

Build: Vercel READY on `design-refinement-editorial`. TinyFish QA captured the page but did not reliably scroll into the customer logo wall; it therefore could not validate logo visibility visually. A robustness patch ensures logo elements remain at least partly visible rather than waiting invisibly for an animation trigger. Check 1440x900 and 390x844 manually, with particular attention to the 4×2 wall and the product-story background seam before merging.
