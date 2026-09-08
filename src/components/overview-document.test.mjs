// Run against a fresh production build: npm run build && npm run test:built
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { overviewCopy } from '../content/overview-copy.ts';
import { fieldToFinanceCopy } from '../content/field-to-finance-copy.ts';

const read = path => readFileSync(new URL(`../../dist/${path}`, import.meta.url), 'utf8');
const escape = text => text.replaceAll('&', '&amp;').replaceAll("'", '&#x27;');

for (const locale of ['en', 'ru', 'kk']) {
  test(`${locale}: static page includes the new content, stable targets and safe form fallback`, () => {
    const html = read(`${locale}.html`);
    assert.ok(html.includes(`<html lang="${locale}">`));
    assert.ok(html.includes(escape(fieldToFinanceCopy[locale].headline)));
    assert.ok(html.includes(escape(fieldToFinanceCopy[locale].rights)));
    for (const id of ['overview', 'infrastructure', 'assets', 'company', 'contact']) assert.ok(html.includes(`id="${id}"`));
    assert.match(html, /<fieldset[^>]+disabled=""/);
    assert.match(html, /<noscript><style>\.enquiry-form/);
    assert.ok(html.includes('name="robots" content="noindex, nofollow"'));
    assert.ok(html.includes(`rel="canonical" href="https://www.commochain.ltd/${locale}"`));
    assert.ok(html.includes(`href="/downloads/commoditychain-overview-${locale}.html"`));
  });
  test(`${locale}: download is self-contained, localized and preserves the caveats`, () => {
    const html = read(`downloads/commoditychain-overview-${locale}.html`);
    assert.ok(html.startsWith(`<!doctype html><html lang="${locale}">`));
    assert.ok(html.includes(`<title>CommodityChain | ${overviewCopy[locale].nav.overview}</title>`));
    assert.ok(html.includes(escape(fieldToFinanceCopy[locale].risk)));
    assert.ok(html.includes(escape(overviewCopy[locale].overview.statusBody)));
    assert.ok(html.includes('mailto:info@commochain.ltd'));
    assert.ok(!/<script|<link[^>]+stylesheet|<img|<video/i.test(html));
    assert.ok(!/pending approval|licence status:|license status:/i.test(html));
  });
}

test('indexing remains disabled', () => {
  assert.equal(read('robots.txt'), 'User-agent: *\nDisallow: /\n');
});
