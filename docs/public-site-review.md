# Public-site clarity preview — review report

## Scope and preserved work

Repository: amanbayev/commochain.ltd, public marketing website only.
Branch: feature/public-site-clarity-and-verification.
Base: 38de5f86abeba3539735caedc38d9b22d3e8acaa, latest origin/main at setup.
Working tree was clean before implementation. No unrelated work was stashed or discarded.

Implemented clear business-first reading, compact certificate/launch/governance facts, two agricultural applications, a five-part verification method, visible rights/risks, balanced audience enquiry paths, company records, FAQ and optional deeper content.

Impeccable 4.1.1 distill/craft guidance shaped the shorter reading order and restrained forest/paper/gold layout. Existing fonts, logo, photographs/illustration labels, film/poster/CDN, eleven-caption timing, video controller, contact addresses, indexing gate, Vercel configuration and dependency lockfile are preserved. No new library, analytics service, generated evidence, licence download, wallet or trading functionality.

## Key final English copy

**Hero:** Connecting real assets to capital.

CommodityChain connects commodity assets with financing through investment-token, exchange and clearing infrastructure. Our initial focus is financing before harvest and grain in storage.

**Primary action:** Discuss your project. **Secondary:** How it works. **Optional:** Explore the full story.

**Stage:** AFSA licensed. Controlled launch.

Commodity Chain Ltd. holds an AFSA licence to operate an exchange and a clearing house for Investment Tokens, subject to applicable licence conditions. Technology review and approval of the first protocol are in progress.

**TechHub:** AIFC TechHub, legally Tech Hub Limited, holds a 10% equity stake and one seat on the Board of Directors. It is a strategic partner in developing tokenization infrastructure aligned with the AIFC ecosystem.

Nearby qualification: TechHub is not AFSA; shareholding and board participation are not regulatory endorsement or a guarantee of investment performance or repayment.

**Verification:** From field evidence to a verifiable record.

Financing starts with understanding the asset. Our agricultural verification workflow brings observations, business assessment and documented findings together, with publicly verifiable records on Solana.

Five connected explanations cover field identification, farmer assessment, NDVI, documented findings and checking the corresponding record. Visible boundaries separate stored-grain evidence, physical truth and blockchain records. No actual farm or live dashboard is implied.

All three languages and printable HTML overviews use shared current facts. Human translation/legal review remains required; source provenance and the register discrepancy are in [public claims](public-claims.md).

## Before and after

Captured with installed Chrome on 9 September 2026; baseline is the current production Russian page, after is the local built preview. Images are actual browser captures, not mockups.

| Observation | Before | After |
| --- | --- | --- |
| Desktop 1440 × 1000, business overview starts | 9500px below initial viewport top | At document top, beneath the fixed navigation |
| Mobile 390 × 844, business overview starts | 6844px below initial viewport top | At document top |
| Desktop Russian credibility strip starts | Not in initial screen | Approximately 761px from top |
| Mobile Russian credibility strip starts | After compulsory film journey | Approximately 1028px; concise launch qualification already appears in the hero |
| Default film loading | Film journey is the default | No video mounted and no MP4 request across all 15 tested viewport/locale combinations |
| Main role of future concepts / engine architecture | Earlier reading path | Optional disclosures after enquiry |

- [Before desktop](review-clarity/before-desktop.png) → [After desktop](review-clarity/after-desktop.png)
- [Before mobile](review-clarity/before-mobile.png) → [After mobile](review-clarity/after-mobile.png)
- [Verification](review-clarity/after-verification.png) · [Company/TechHub](review-clarity/after-company.png)

The complete credibility strip cannot fit in every narrow first screen; business explanation, primary action and concise launch qualification take priority. No Lighthouse score or conversion improvement is claimed.

## Actual checks

Node.js 22.23.2 on Windows, PowerShell. Baseline npm ci/typecheck/test/build/test:built passed before implementation (53 checks).

| Command | Result |
| --- | --- |
| npm ci | Passed using unchanged lockfile; 25 installed, 26 audited, zero reported vulnerabilities |
| npm run typecheck | Passed |
| npm test | 35 content/domain/adapter/pure-function tests + 11 simulated scroll-controller checks passed |
| npm run build | Passed; static /en, /ru, /kk and localized downloads generated |
| npm run test:built | 29 built-page/component/download/asset/server tests passed |
| pnpm lint | Attempted; cannot run because no lint script is configured |
| pnpm typecheck, pnpm test, pnpm build | Passed through the installed pnpm runtime; no pnpm installation or lockfile change |
| git diff --check | Passed |
| Manual Impeccable detector | Run once on new UI targets; zero findings |

Total automated checks: 75, counted once, not multiplied by reruns. The Windows sandbox prevented esbuild directory access; the build succeeded with approved expanded execution. This was an environment constraint, not a dependency upgrade.

Read-only production discovery check on 9 September 2026: /ru returned HTTP 200 with a noindex, nofollow meta tag and canonical https://www.commochain.ltd/ru; robots.txt returned Disallow: /; sitemap.xml listed the three current production locale URLs. No X-Robots-Tag response header was observed on that page. These are deployed observations, not an inference from the repository flag. No indexing setting was changed.

One batched visual/interaction inspection found a reused field-photo positioning rule causing mobile overflow and server/browser Kazakh date-format differences causing hydration errors. Both were corrected in one batch: properly scoped photo dimensions and consistent ISO certificate dates. Duplicate introductory/partnership paragraphs in the printable overview were consolidated.

The single confirmation pass passed all 24 browser groups, with zero unexpected console/page errors. [Machine-readable confirmation](review-clarity/results.json) and [first-pass findings](review-clarity/first-pass-results.json) are retained. The final source audit also aligned the footer's native Back to top target with the business overview for no-JavaScript use.

Browser coverage:

- Chrome: 320 × 568, 390 × 844, 768 × 1024, 1440 × 1000, 844 × 390; EN/RU/KK at each size, no horizontal or heading overflow.
- Audience selection carries investor context to enquiry; inline validation and explicitly unsent draft verified.
- Story entry, forward/backward chapter targets, mid-story locale preservation, video unmount, exact scroll restoration and restored trigger focus checked.
- Media reached readyState=4 during confirmation. Chapter targets changed forward to 5.0925 seconds and backward to zero; this harness does not certify presentation of every requested frame.
- Deliberate missing-media fallback, emulated reduced-motion static story and static photos, mobile/landscape menu and Escape, no-JavaScript disclosures/full transcript/contact reading checked.
- Mocked online provider acceptance, pending disable, duplicate prevention, failure and unchanged retry identity checked. Three mocked POSTs; no real emails.
- WebKit binaries and agent-browser CLI were unavailable. No WebKit or physical-iPhone result is claimed. Actual device background/foreground and affected-iPhone scrubbing still need testing.

The optional harness scripts/review-public-site.mjs uses CC_PLAYWRIGHT_MODULE to locate the external Playwright package and CC_CHROME_PATH for installed Chrome; CC_REVIEW_URL defaults to http://127.0.0.1:4174. Interaction checks are restricted to a local URL. Set CC_CAPTURE_BASELINE=true only for an intentional read-only production baseline capture. No runtime dependency was added.

## Remaining review and release boundary

1. Enquiry delivery is deliberately disabled: approve/configure provider, sender and durable abuse store, retention/privacy and origins, then authorise a real mailbox test separately. See [setup requirements](enquiry-setup.md).
2. Owner/legal review: certificate conditions/annexes, register discrepancy, current permissions, protocol access and governance wording.
3. Native Kazakh/Russian review and physical affected-iPhone/Safari testing, including background/foreground.
4. No approved public certificate copy, leadership assets or authorised Solana example were supplied; no placeholder download, profile or explorer link was invented.
5. Stop at draft PR and preview. Production, DNS, domains, indexing approval and production environment variables remain unchanged.
