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
const locales = ['kk', 'ru', 'en'];
const ogLocales = { kk: 'kk_KZ', ru: 'ru_RU', en: 'en_US' };

await viteBuild();
await mkdir(resolve(root, '.build'), { recursive: true });
await esbuild({ entryPoints: [resolve(root, 'src/prerender.tsx')], outfile: resolve(root, '.build/prerender.mjs'), bundle: true, platform: 'node', format: 'esm', packages: 'external', jsx: 'automatic', define: { 'process.env.NODE_ENV': '"production"' } });
const { renderLocale } = await import(pathToFileURL(resolve(root, '.build/prerender.mjs')).href);
const template = await readFile(resolve(root, 'dist/index.html'), 'utf8');
if (!template.includes('<!--site-head-->') || !template.includes('<!--app-html-->')) throw new Error('Static HTML template markers were not preserved.');

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
  if (locale === 'kk') await writeFile(resolve(root, 'dist/index.html'), html);
}
await writeFile(resolve(root, 'dist/robots.txt'), indexable ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n');
await writeFile(resolve(root, 'dist/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${locales.map(locale => `<url><loc>${escape(origin)}/${locale}</loc></url>`).join('')}</urlset>\n`);
await writeFile(resolve(root, 'dist/404.html'), '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>CommodityChain</title></head><body><main><h1>CommodityChain</h1><nav><a lang="kk" href="/kk">Қазақша</a> / <a lang="ru" href="/ru">Русский</a> / <a lang="en" href="/en">English</a></nav></main></body></html>');
await rm(resolve(root, '.build'), { recursive: true, force: true });
console.log(`Static V3 ready in dist/: /kk, /ru, /en. Search indexing ${indexable ? 'enabled' : 'disabled'}. Film remains external.`);
