import { locales } from '../i18n.ts';
// Run against a fresh production build: npm run build && npm run test:built
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { overviewCopy } from '../content/overview-copy.ts';
import { fieldToFinanceCopy } from '../content/field-to-finance-copy.ts';

const read = path => readFileSync(new URL(`../../dist/${path}`, import.meta.url), 'utf8');
const escape = text => text.replaceAll('&', '&amp;').replaceAll("'", '&#x27;');

for (const locale of locales) {
  test(`${locale}: static page includes the new content, stable targets and safe form fallback`, () => {
    const html = read(`${locale}.html`);
    assert.ok(html.includes(`<html lang="${locale}">`));
    assert.ok(html.includes(escape(fieldToFinanceCopy[locale].headline)));
    assert.ok(html.includes(escape(fieldToFinanceCopy[locale].rights)));
    assert.ok(html.includes(escape(overviewCopy[locale].company.partnershipTitle)));
    assert.ok(html.includes(escape(overviewCopy[locale].company.partnershipBody)));
    for (const id of ['overview', 'infrastructure', 'assets', 'company', 'contact']) assert.ok(html.includes(`id="${id}"`));
    assert.match(html, /<fieldset[^>]+disabled=""/);
    assert.match(html, /<noscript><style>\.enquiry-form/);
    assert.ok(html.includes('name="robots" content="noindex, nofollow"'));
    assert.ok(html.includes(`rel="canonical" href="https://www.commochain.ltd/${locale}"`));
    for (const alternate of locales) {
      assert.ok(html.includes(`rel="alternate" hreflang="${alternate}" href="https://www.commochain.ltd/${alternate}"`));
      assert.ok(html.includes(`href="/${alternate}" hrefLang="${alternate}"`));
      assert.ok(read('sitemap.xml').includes(`<loc>https://www.commochain.ltd/${alternate}</loc>`));
      assert.ok(read('404.html').includes(`lang="${alternate}" href="/${alternate}"`));
    }
    if (locale === 'zh') assert.ok(html.includes('property="og:locale" content="zh_CN"'));
    assert.ok(html.includes(`href="/downloads/commoditychain-overview-${locale}.html"`));
  });
  test(`${locale}: download is self-contained, localized and preserves the caveats`, () => {
    const html = read(`downloads/commoditychain-overview-${locale}.html`);
    assert.ok(html.startsWith(`<!doctype html><html lang="${locale}">`));
    assert.ok(html.includes(`<title>CommodityChain | ${overviewCopy[locale].nav.overview}</title>`));
    assert.ok(html.includes(escape(fieldToFinanceCopy[locale].risk)));
    assert.ok(html.includes(escape(overviewCopy[locale].overview.statusBody)));
    assert.ok(html.includes(escape(overviewCopy[locale].company.partnershipBody)));
    assert.ok(html.includes('mailto:info@commochain.ltd'));
    assert.ok(!/<script|<link[^>]+stylesheet|<img|<video/i.test(html));
    if (locale === 'zh') assert.equal((html.match(/data:font\/woff2;base64,/g) || []).length, 3);
    assert.ok(!/pending approval|licence status:|license status:/i.test(html));
  });
}

test('indexing remains disabled', () => {
  assert.equal(read('robots.txt'), 'User-agent: *\nDisallow: /\n');
});
