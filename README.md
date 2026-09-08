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
  "siteUrl": "https://commochain.ltd",
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

- The existing V3 scroll-controlled film experience, adapted to standalone static hosting without changing its content or visual design.
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
- Story component and interactions: `src/components/story-page.tsx`
- Styling: `src/story.css`
- Caption timing: `src/content/story-timing.json`
- Film/poster locations: `src/content/story-media.json`
- Site origin/indexing: `site.config.json`
- Vercel settings: `vercel.json`

## Review items retained

Publication does not verify regulatory status. Outstanding checks remain: licence scope/status, implemented compliance controls, Solana network/deployment, instrument rights and availability, human translation/legal review, mailbox delivery, and physical-device/Safari behavior. Supplied footage retains its baked-in English labels and minor source handoff differences. Concept B remains provisional, not trademark-cleared.

This is a static website package, **not a GitHub Pages configuration**. GitHub Pages project-path hosting would require additional base-path/routing configuration and a review of its commercial-use policy. No deployment or DNS change is performed merely by uploading the source to GitHub.

No platform-internal scaffolding, account credentials or original source videos are included. No new open-source licence is applied to the company code; font licences are included separately.

## Checks completed for this package

The production build and TypeScript check passed. The built static pages were served locally without authentication and checked in Chromium: all three locale routes, hydration without page errors, actual CDN-film seeking forward/backward, language switching without resetting the video, narrow-mobile layout and reduced-motion fallback. The largest built asset is about 222 KB; the movie is excluded. Actual Vercel deployment, its access settings, custom-domain DNS and HTTPS activation must still be completed in your account.

References: [Vercel commercial-use policy](https://vercel.com/docs/limits/fair-use-guidelines), [Vercel domain setup](https://vercel.com/docs/domains/working-with-domains/add-a-domain), [Porkbun DNS guide](https://kb.porkbun.com/article/231-how-to-add-dns-records-on-porkbun).
