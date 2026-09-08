import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { overviewCopy } from '../content/overview-copy.ts';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const escape = text => text.replaceAll('&', '&amp;').replaceAll("'", '&#x27;');

for (const locale of ['en', 'ru', 'kk']) {
  test(`${locale}: innovation partnership and regulatory record are distinct`, () => {
    const html = read(`../../dist/${locale}.html`);
    const partnership = html.match(/<article class="innovation-partnership"[\s\S]*?<\/article>/)?.[0];
    assert.ok(partnership);
    assert.ok(partnership.includes(escape(overviewCopy[locale].company.partnershipBody)));
    assert.ok(partnership.includes(escape(overviewCopy[locale].company.shareholderBody)));
    assert.ok(!partnership.includes('AFSA-A-LA-2026-0014'));
    assert.ok(html.includes('AFSA-A-LA-2026-0014'));
    assert.match(html, /class="brand-monogram [^"]+"[^>]+aria-hidden="true"[^>]+focusable="false"/);
    assert.match(html, /class="link-arrow"[^>]+aria-hidden="true"/);
  });
}

test('brand motif reuses the original mark without changing the company logo', () => {
  const logo = read('../../public/assets/concepts/logo-B-dark.svg');
  const component = read('./brand-details.tsx');
  const originalPath = logo.match(/<path d="([^"]+)"/)?.[1];
  assert.ok(originalPath);
  assert.ok(component.includes(originalPath));
});

test('new surface tokens preserve readable contrast', () => {
  const css = read('../overview.css');
  const token = name => css.match(new RegExp(`--${name}:(#[0-9a-f]{6})`))?.[1];
  const luminance = hex => {
    assert.ok(hex);
    const [r, g, b] = hex.slice(1).match(/../g).map(value => {
      const c = parseInt(value, 16) / 255;
      return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;
    });
    return .2126 * r + .7152 * g + .0722 * b;
  };
  for (const [fg, bg, minimum] of [
    ['text-forest', 'surface-paper', 4.5], ['text-muted', 'surface-inlay', 4.5],
    ['text-on-dark', 'surface-forest', 4.5], ['focus-light', 'surface-paper', 3],
    ['focus-dark', 'surface-ink', 3],
  ]) {
    const values = [luminance(token(fg)), luminance(token(bg))].sort((a, b) => b - a);
    const contrast = (values[0] + .05) / (values[1] + .05);
    assert.ok(contrast >= minimum, `${fg} on ${bg}: ${contrast}`);
  }
});
