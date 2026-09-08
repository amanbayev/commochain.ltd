# CommodityChain public website

React 19, TypeScript, Vite 7 and Node.js 22; statically generated Kazakh, Russian and English pages on the existing Vercel project. This is the marketing website, not the separate trading application.

## Current review: clarity and verification

The default route explains the business immediately: hero, licence/stage/strategic shareholder, two agricultural applications, verification methodology, lifecycle, participation, governance, FAQ and enquiry. Architecture, future concepts and the complete story transcript are optional deeper reading.

The original eleven-chapter film is opt-in. Its source, timing and scroll controller are unchanged. The homepage mounts no video and does not request the film until the visitor opens the story. Reduced-motion, failed-media and no-JavaScript paths remain readable.

Current facts and qualifications come from the supplied licence certificate and the owner's implementation brief. See [claim sources and unresolved reviews](docs/public-claims.md). The supplied certificate and private supporting documents are not published.

Online enquiry delivery is **disabled by default**. The owner confirmed that no delivery provider is configured. The form prepares an explicitly unsent email draft. A tested optional Vercel endpoint, provider adapter and durable spam/idempotency guard are included, but no accounts, credentials or DNS changes have been made. See [enquiry configuration](docs/enquiry-setup.md).

This revision stops at a feature-branch draft PR and preview. Do not merge, promote a preview or deploy production without explicit owner approval.

## Local setup and checks

Use Node.js 22 and the existing npm lockfile:

```sh
npm ci
npm run typecheck
npm test
npm run build
npm run test:built
npm run preview
```

Open http://127.0.0.1:4173/en (also /ru and /kk). The local static preview intentionally reports the enquiry endpoint unavailable; it never sends email. For frontend development use `npm run dev`.

Tests live beside their code. There is no lint script. Parent AGENTS.md also requires pnpm lint/typecheck/test/build; use the installed pnpm runtime to attempt these scripts, without installing dependencies through pnpm or replacing package-lock.json.

The optional browser review harness uses an externally installed Playwright package and Chrome, not a project dependency. Instructions, screenshots and measured results are in [the review report](docs/public-site-review.md). Physical affected-iPhone testing, native-language review and legal review remain separate.

## Content and implementation

- Company facts, homepage and verification: `src/content/public-site-copy.ts`
- Supporting business and protocol content: `src/content/overview-copy.ts`, `field-to-finance-copy.ts`, `experience-copy.ts`
- Film captions and sharing metadata: `src/content/commochain-copy.kk-ru-en.json`
- Enquiry language: `src/content/enquiry-copy.ts`
- Reading layout and optional story: `src/components/business-overview.tsx`, `story-page.tsx`
- Brand foundation: `src/story.css`, `overview.css`, `motion.css`; current surface: `src/public-site.css`
- Enquiry contract FIRST: `packages/contracts/openapi.yaml`; domain service: `packages/enquiries`; external interfaces: `packages/adapters`; Vercel entry: `api/enquiry.ts`
- Media source and exact timing: `src/content/story-media.json`, `story-timing.json`

The build generates self-contained, script-free /downloads/commoditychain-overview-{en,ru,kk}.html for offline reading or printing from the same localized content. These are not republished source PDFs.

The original poster, provisional Concept B logo, favicon and self-hosted Noto fonts are retained. The existing local agricultural illustrations are clearly labelled, not presented as satellite evidence or financed company assets. Provenance remains in [editorial assets](docs/editorial-assets.md).

## Deployment and discovery controls

Keep the existing Vercel Git integration and Node 22 build. Feature-branch pushes create previews; production requires separate approval. Do not change domains, DNS, production variables or the trading application as part of this revision.

`site.config.json` retains the production canonical origin https://www.commochain.ltd and `allowIndexing: false`. Existing build overrides `SITE_URL` and `PUBLIC_INDEXABLE` remain unchanged. No automatic indexing approval is implied. Check the actual deployed HTML, robots.txt and headers; the repository flag alone does not establish live indexing state.

The build retains localized titles/descriptions, canonical and hreflang links, Open Graph metadata, robots.txt and sitemap.xml. The root redirects to /kk. Downloads remain noindex.

The 34.4 MiB film is not copied into the build output. Opening the optional story uses its existing external media CDN; availability remains an external dependency. Never change that provider or publish a duplicate video as a routine design edit.

No new tracking service is activated. `commoditychain:public-event` CustomEvent hooks expose only named actions and an optional enumerated category, never enquiry contents.

Do not commit node_modules, dist, .build, .vercel, local .env files, credentials or confidential documents. No new company-code licence is granted; existing font licences remain included.
