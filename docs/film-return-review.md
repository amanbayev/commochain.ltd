# Owner-requested film, elevator verification, logo and footer revision

Scope: follow-up to draft PR #3 on feature/public-site-clarity-and-verification, starting at 48d56e49115350550481ed17238211b2d57a9f42. The owner explicitly reversed the optional-film design. This revision remains preview-only; no production merge, deployment, DNS or environment change is authorised here.

## Changes

- Restored the original eleven-chapter scroll film as the opening experience, followed by all new business sections in normal document flow. Removed the separate open/close story view. One player, unchanged media URL/timing/controller, original short opening caption, forward/backward chapter navigation and locale continuity. Direct overview/contact links remain available.
- Updated stored-grain verification from the owner's new description: cameras, scales, laboratory testing and robots inside silos provide grain quantity/quality measurements and observations. Shared EN/RU/KK content drives the main comparison, verification section, deeper grain explanation and printable overview. Warehouse receipts, identification and custody remain a separate complementary evidence layer; no site-specific deployment or precision claim was added.
- Replaced the text-only TechHub identity with the owner's supplied logo after background extraction.
- Fixed the actual lower-section layout cause: DeeperOverview was outside the business-overview scope and therefore lost its section-gutter and editorial-line variables. Restoring that scope fixes desktop horizontal padding and disclosure dividers. Added padded disclosure bodies, paragraph/article rhythm and a separated return-to-film action/footer.

Impeccable polish/craft guidance was used for the narrow spacing and identity integration. This is not a new design direction. New business content, company/licence/governance facts, risk wording, contacts, disabled enquiry boundary, indexing gate and dependency lockfile remain intact.

## Actual checks

Node 22.23.2, Windows PowerShell:

- pnpm lint: attempted; no lint script exists.
- pnpm typecheck, pnpm test, pnpm build: passed.
- npm run build and npm run test:built: passed.
- 77 automated checks: 35 content/domain/adapter/pure checks, 11 simulated scroll-controller checks and 31 built-page/component/asset checks.
- Manual Impeccable detector on changed reading UI/CSS: one invocation, zero findings.
- git diff --check: passed.
- No dependency installation or new dependency; original scroll-video.ts, media/timing manifests, Vercel/indexing configuration and enquiry server/adapters are unchanged in this follow-up.

The batched Chrome review covered all three languages at 320×568, 390×844, 768×1024, 1440×1000 and 844×390. One initial check timed out waiting eight seconds for network-idle while the large film loaded. The harness was corrected to use DOM/font/interactive readiness rather than treat an active film download as a broken page. The single confirmation pass passed all 25 groups with zero unexpected page/console errors.

Measured confirmation:

| Check | Desktop | Mobile |
| --- | --- | --- |
| Film precedes the overview | 9500px to overview at 1440×1000 | 6844px at 390×844, matching the original journey |
| Lower-section horizontal gutter | 97.92px | 22px |
| Expanded-content bottom padding | 32px | 32px |
| Paragraph separation | 24px | 24px |
| Return-action to footer-top separation | 104px | 80px |

Exactly one video was mounted in each cinematic viewport/locale test. In Chrome, the forward target 5.0925s reached decoded currentTime 5.092475s; backward navigation returned to 0s, readyState=4, paused. Language switching preserved the chapter and the same video DOM element. Overview navigation focused its heading, and replay returned to the opening without a duplicate player.

Also checked: failed-media text fallback, reduced-motion static view, no-JavaScript text and native disclosures, mobile/landscape menu and Escape, audience-to-form context, validation, explicitly unsent email draft and mocked online acceptance/failure/duplicate/retry. No real enquiry was sent.

These are Chrome checks, not physical-iPhone certification. WebKit remains unavailable; affected-device Safari and background/foreground review remain outstanding.

## Screenshots and machine-readable results

- Opening: [desktop](review-film-return/after-desktop.png), [mobile](review-film-return/after-mobile.png).
- Partner logo: [desktop](review-film-return/after-logo-desktop.png), [mobile](review-film-return/after-logo-mobile.png).
- Footer: [before desktop](review-film-return/before-footer-desktop.png) → [after desktop](review-film-return/after-footer-desktop.png); [before mobile](review-film-return/before-footer-mobile.png) → [after mobile](review-film-return/after-footer-mobile.png).
- [Expanded grain explanation](review-film-return/after-grain-detail-mobile.png) is an element crop, so surrounding page gutters are outside that image; gutter measurements above are from the full page.
- [First-pass findings](review-film-return/first-pass-results.json) and [confirmation](review-film-return/results.json).

## Logo provenance and processing

Input: owner-supplied techhub logo.png. Output: public/assets/techhub-transparent.png (1949×807, 456250 bytes). Original attachment was not overwritten.

Used the built-in image generation/editing tool in background-extraction mode, not a CLI/API fallback. The output was visually checked against the supplied symbol/wordmark. PNG is RGBA; sampled corner, central symbol hole and space above the letters have alpha=0. A sampled letter pixel has alpha=254. Width/height attributes reserve layout space; the image loads lazily on the existing light partnership panel.

Final editing prompt:

> Use case: background-extraction. Asset type: supplied partner logo for an existing website. Image 1 is the sole edit target. Remove ONLY the white background, including white internal negative spaces, and output an actual transparent PNG with alpha. Preserve the exact supplied circular segmented purple symbol, the exact dark navy word "Tech", original letterforms, colors, placement, spacing, edge geometry and proportions. This is NOT a logo redesign. Keep horizontal composition tightly framed like the source with a small transparent margin. No additional text, no recoloring, no shadows, no fake checkerboard, no white rectangle, no visual changes to the logo itself.

This is an edited raster derivative, not a newly supplied original vector brand master.
