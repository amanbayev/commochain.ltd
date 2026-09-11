import { build as viteBuild } from 'vite';
import { build as esbuild } from 'esbuild';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const config = JSON.parse(await readFile(resolve(root, 'site.config.json'), 'utf8'));
const copy = JSON.parse(await readFile(resolve(root, 'src/content/commochain-copy.kk-ru-en.json'), 'utf8'));
const origin = (process.env.SITE_URL || config.siteUrl).replace(/\/+$/, '');
if (new URL(origin).protocol !== 'https:') throw new Error('SITE_URL must be an HTTPS origin.');
const indexable = process.env.PUBLIC_INDEXABLE === undefined ? config.allowIndexing : process.env.PUBLIC_INDEXABLE === 'true';
const robots = indexable ? 'index, follow' : 'noindex, nofollow';
const escape = text => String(text).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const locales = copy.shared.localeOrder;
const ogLocales = { kk: 'kk_KZ', ru: 'ru_RU', en: 'en_US', zh: 'zh_CN' };

await viteBuild();
await mkdir(resolve(root, '.build'), { recursive: true });
await esbuild({ entryPoints: [resolve(root, 'src/prerender.tsx')], outfile: resolve(root, '.build/prerender.mjs'), bundle: true, platform: 'node', format: 'esm', packages: 'external', jsx: 'automatic', define: { 'process.env.NODE_ENV': '"production"' } });
const { renderLocale, renderOverviewDocument } = await import(pathToFileURL(resolve(root, '.build/prerender.mjs')).href);
await mkdir(resolve(root, 'dist/downloads'), { recursive: true });
const template = await readFile(resolve(root, 'dist/index.html'), 'utf8');
if (!template.includes('<!--site-head-->') || !template.includes('<!--app-html-->')) throw new Error('Static HTML template markers were not preserved.');
// Embed the Chinese subsets so the offline overview works without installed CJK fonts.
const chinesePrintFonts = (await Promise.all([
  ['CC Sans', 'NotoSansSC-400.woff2', 400],
  ['CC Sans', 'NotoSansSC-600.woff2', 600],
  ['CC Serif', 'NotoSerifSC-400.woff2', 400],
].map(async ([family, filename, weight]) => {
  const bytes = await readFile(resolve(root, 'public/assets/fonts', filename));
  return `@font-face{font-family:'${family}';src:url(data:font/woff2;base64,${bytes.toString('base64')}) format('woff2');font-weight:${weight};font-style:normal;font-display:swap}`;
}))).join('');

for (const locale of locales) {
  const meta = copy.locales[locale].metadata;
  const canonical = `${origin}/${locale}`;
  const head = [
    `<title>${escape(meta.title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}">`,
    `<meta name="robots" content="${robots}">`,
    `<meta name="site-origin" content="${escape(origin)}">`,
    '<meta name="theme-color" content="#0B0F14">',
    `<link rel="canonical" href="${escape(canonical)}">`,
    ...locales.map(code => `<link rel="alternate" hreflang="${code}" href="${escape(origin)}/${code}">`),
    `<link rel="alternate" hreflang="x-default" href="${escape(origin)}/kk">`,
    '<meta property="og:type" content="website">',
    `<meta property="og:title" content="${escape(meta.title)}">`,
    `<meta property="og:description" content="${escape(meta.description)}">`,
    `<meta property="og:url" content="${escape(canonical)}">`,
    `<meta property="og:locale" content="${ogLocales[locale]}">`,
    `<meta property="og:image" content="${escape(origin)}/assets/story/commoditychain-story-poster.jpg">`,
    '<meta name="twitter:card" content="summary_large_image">',
  ].join('\n');
  const html = template.replace('<html lang="kk">', `<html lang="${locale}">`).replace('<!--site-head-->', head).replace('<!--app-html-->', renderLocale(locale));
  await writeFile(resolve(root, `dist/${locale}.html`), html);
  await writeFile(resolve(root, `dist/downloads/commoditychain-overview-${locale}.html`), renderOverviewDocument(locale, origin, locale === 'zh' ? chinesePrintFonts : ''));
  if (locale === 'kk') await writeFile(resolve(root, 'dist/index.html'), html);
}
await writeFile(resolve(root, 'dist/robots.txt'), indexable ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n');
await writeFile(resolve(root, 'dist/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${locales.map(locale => `<url><loc>${escape(origin)}/${locale}</loc></url>`).join('')}</urlset>\n`);
await writeFile(resolve(root, 'dist/404.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>CommodityChain</title></head><body><main><h1>CommodityChain</h1><nav>${locales.map(locale => `<a lang="${locale}" href="/${locale}">${escape(copy.locales[locale].languageName)}</a>`).join(' / ')}</nav></main></body></html>`);
await rm(resolve(root, '.build'), { recursive: true, force: true });
console.log(`Static V3 ready in dist/: ${locales.map(locale => `/${locale}`).join(', ')}. Search indexing ${indexable ? 'enabled' : 'disabled'}. Film remains external.`);
