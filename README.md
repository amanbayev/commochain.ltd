# CommodityChain V3

GitHub-ready source for the public static CommodityChain website. This package is configured for **Vercel hosting**, with GitHub storing the repository. It does not require Higgsfield login, a server, a database, wallets or accounts for visitors.

## Upload to GitHub

1. Extract the ZIP on your computer.
2. Create a GitHub repository. **Private is recommended** for company source; Vercel can import a private repository after you grant it access.
3. Open **Add file > Upload files**.
4. Upload the **contents of the extracted folder**, preserving the `src`, `public` and `scripts` directories. `package.json` and `vercel.json` must be at the repository root, not inside an extra enclosing folder.
5. Commit the upload. Do not upload the ZIP itself as the only repository file.

The package contains a pinned npm lockfile. Do not upload `node_modules`, local `.env` files, `.vercel` credentials or build caches.

## Deploy to Vercel

1. Sign in to your Vercel account and select the appropriate team. Vercel's policy requires **Pro or Enterprise for commercial use**; no subscription is created by this package.
2. Choose **Add New > Project**, connect GitHub and import this repository.
3. Confirm the project root is the folder containing `package.json`.
4. The included `vercel.json` sets these values:
   - Framework: Vite
   - Install command: `npm ci`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Node.js: 22.x
5. Deploy. Test the production deployment in a signed-out/incognito browser. Ensure production domains are not protected by an authentication/password setting.
6. Verify `/kk`, `/ru` and `/en`, scroll forward/backward through the film, switch language at a mid-story point, and use the contact links.

No secret environment variables or API keys are required.

## Connect commochain.ltd through Porkbun

1. In Vercel Project Settings > Domains, add `commochain.ltd` and `www.commochain.ltd`.
2. Copy the **exact values shown by that project's domain configuration**. Vercel DNS values can be project-specific; do not reuse an IP or CNAME from an unrelated tutorial.
3. In Porkbun Domain Management > DNS:
   - Root domain: add the requested **A** record; leave Host blank; use Vercel's displayed IPv4 address.
   - `www`: add the requested **CNAME**; Host is `www`; use Vercel's displayed CNAME target.
   - Add a TXT verification record only if Vercel explicitly requests it.
4. Replace only conflicting website/parking records. **Preserve Google MX, SPF, DKIM, DMARC, verification records and unrelated/trading-app subdomains.** The previously observed MX was priority 1, `smtp.google.com`.
5. Keep Porkbun nameservers unless you deliberately migrate the entire DNS zone.
6. Wait for Vercel's domain verification and HTTPS status to become valid. Choose one primary hostname and redirect the other.
7. Do not point the new domain at the old sign-in-gated Higgsfield hostname.

## Search indexing and metadata

`site.config.json` contains:

```json
{
  "siteUrl": "https://www.commochain.ltd",
  "allowIndexing": false
}
```

Search indexing is **off by default**, preserving the draft/launch-review control. After domain setup and the required factual/legal review, change `allowIndexing` to `true`, confirm `siteUrl`, commit and redeploy.

Optional build environment overrides are `SITE_URL` and `PUBLIC_INDEXABLE=true`. These are public configuration, not secrets.

The build creates localized static HTML for `/kk`, `/ru` and `/en`, plus canonical/hreflang metadata, Open Graph tags, `robots.txt` and `sitemap.xml`. `/` redirects to `/kk`. Language switching does not remount the video or reset the story position.

## Local preview (optional)

Install Node.js 22, open a terminal in this folder, then run:

```sh
npm ci
npm run build
npm run preview
```

Open `http://127.0.0.1:4173/en`.

For development, use `npm run dev`. Source HTML is not intended to be opened directly with a `file://` URL.

## What is included

- The existing V3 film and scroll-video controller, with responsive cinematic controls and a complementary readable business overview.
- Shared Kazakh, Russian and English dictionaries from the owner's supplied copy file.
- The unchanged provisional Concept B logo, favicon, opening poster and self-hosted Noto fonts with their licences.
- The actual eleven-caption timing data for the ten-clip, 50.042-second story.
- Contact and footer links to `mailto:info@commochain.ltd`.
- Reduced-motion and failed-media static reading modes.

## Film delivery

The **34.4 MiB film is not in this ZIP or the deployment output**. The browser streams the unchanged MP4 from its existing public media CDN. See `src/content/story-media.json` for the URL. This avoids static-host asset limits.

An internet connection is required for the film. CDN availability is still an external dependency. If it moves later, change only that URL to the replacement public, HTTPS, byte-range-capable MP4 endpoint and redeploy. The local opening poster and text remain available if video loading fails.

## Where to edit

- Visitor copy: `src/content/commochain-copy.kk-ru-en.json`
- Business overview: `src/content/overview-copy.ts`
- Field-to-Finance explanation: `src/content/field-to-finance-copy.ts`
- Story component and interactions: `src/components/story-page.tsx`
- Styling: `src/story.css`
- Readable overview and enquiry styling: `src/overview.css`
- Caption timing: `src/content/story-timing.json`
- Film/poster locations: `src/content/story-media.json`
- Site origin/indexing: `site.config.json`
- Vercel settings: `vercel.json`

## Review items retained

Publication does not verify regulatory status. Outstanding checks remain: licence scope/status, implemented compliance controls, Solana network/deployment, instrument rights and availability, human translation/legal review, mailbox delivery, and physical-device/Safari behavior. Supplied footage retains its baked-in English labels and minor source handoff differences. Concept B remains provisional, not trademark-cleared.

This is a static website package, **not a GitHub Pages configuration**. GitHub Pages project-path hosting would require additional base-path/routing configuration and a review of its commercial-use policy. No deployment or DNS change is performed merely by uploading the source to GitHub.

No platform-internal scaffolding, account credentials or original source videos are included. No new open-source licence is applied to the company code; font licences are included separately.

## Launch-stage business overview

The cinematic opening leads directly to a readable overview in all three languages. The launch protocols distinguish pre-harvest Field-to-Finance from stored-grain warehouse-receipt instruments. Independent verification, issuer obligations, exchange, clearing, registry and compliance responsibilities are explained separately. Future music, gaming and water-facility protocols remain labelled as development concepts.

The company section links the company and AFSA licence records without displaying a licence-status claim. The existing footer qualifications, contact address, film, timing, iOS scrub controller and indexing gate are retained. Canonical URLs use the existing `www` production hostname; no DNS changes are involved.

`npm run build` also generates `/downloads/commoditychain-overview-{en,ru,kk}.html`: self-contained, script-free documents for offline reading or printing. These reuse the localized source copy rather than republishing supplied PDFs. The download URLs are production-build assets, not Vite development routes.

The enquiry form prepares a draft only. It sends no requests, stores no visitor data and requires the visitor to open their email app and send the message. Inputs stay disabled until hydration; without JavaScript, a direct email link replaces the form. No backend, new API, service integration or dependency was introduced.

### Verify changes before a preview

Use Node.js 22 and the existing npm lockfile:

```sh
npm ci
npm run typecheck
npm test
npm run build
npm run test:built
```

Pure-function/content tests live beside the code. `npm test` also runs the existing 11 deterministic scroll-video controller checks. Built-page tests check every locale, downloadable content, canonical URLs, noindex and the non-JavaScript form fallback. The repository has no configured lint script; do not report lint as passing.

Review mobile portrait/landscape, chapter jumps and browser history, locale changes, text/failed-media fallback, disclosures and email draft preparation. A physical affected iPhone still needs to verify Safari video behavior. Human review of the Kazakh/Russian translations and instrument-specific legal wording remains a publication step. Use a feature-branch draft PR and Vercel preview; do not merge or deploy production without approval.

## Editorial experience revision

The overview now includes localized audience tabs with contextual enquiry links, a two-engine architecture diagram, an image-led protocol comparison and a connected four-step lifecycle with responsibility and evidence labels. Navigation highlights the section crossing the reading line. The existing mobile section menu retains its keyboard dismissal and now highlights the current section.

Two AI-generated agricultural illustrations are served locally in responsive, lazy-loaded WebP sizes. They are labelled as illustrations, not company facilities or financed fields. Exact prompts and asset provenance are in [docs/editorial-assets.md](docs/editorial-assets.md). No extra video, UI library or application dependency was added; the npm lockfile is unchanged.

Audience tabs support arrow keys (left/right on desktop, up/down in the mobile layout), Home and End. Their content is available without JavaScript. The lifecycle remains a linear document on mobile, and reduced-motion preferences disable the diagram's decorative connections. All launch-stage wording, risk qualifications, three languages, contacts, source film/controller, indexing and deployment configuration are retained.

This revision passed 10 pure-function/content tests, 11 simulated scroll-video controller checks and 15 built-page/download/asset/preview-server checks (36 total), plus TypeScript and the production build using Node.js 22. `pnpm lint` was attempted but the repository has no lint script. Fresh browser/device interaction and visual checks were not performed for this revision; the previous revision's browser checks below do not certify the new layout. An affected physical iPhone and human translation/legal review remain publication checks.

## Checks completed for the preceding business-overview revision

The business-overview revision passed TypeScript, the production build, seven content/navigation/enquiry tests, eleven simulated scroll-video controller tests and seven built-page/download tests. Local Chromium checks covered narrow portrait and short landscape layouts, language switching without resetting the video position, forward/backward seeking, section navigation, disclosures, keyboard menu dismissal, text/failed-media fallback and preparation/copying of an unsent enquiry. All three built locale routes and overview downloads returned HTTP 200. These checks do not certify physical iOS behavior. Production remains on the previously approved deployment until the new feature PR is reviewed and approved.

References: [Vercel commercial-use policy](https://vercel.com/docs/limits/fair-use-guidelines), [Vercel domain setup](https://vercel.com/docs/domains/working-with-domains/add-a-domain), [Porkbun DNS guide](https://kb.porkbun.com/article/231-how-to-add-dns-records-on-porkbun).
