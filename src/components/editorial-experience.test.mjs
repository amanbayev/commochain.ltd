import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { test } from 'node:test';
import { experienceCopy } from '../content/experience-copy.ts';

const built = path => new URL(`../../dist/${path}`, import.meta.url);
const escape = text => text.replaceAll('&', '&amp;').replaceAll("'", '&#x27;');

for (const locale of ['en', 'ru', 'kk']) {
  test(`${locale}: role tabs have unique relationships, reachable content and no-JS fallback`, () => {
    const html = readFileSync(built(`${locale}.html`), 'utf8');
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length);
    assert.equal((html.match(/role="tab"/g) || []).length, 3);
    assert.equal((html.match(/role="tabpanel"/g) || []).length, 3);
    for (let index = 0; index < 3; index++) {
      assert.ok(html.includes(`aria-controls="audience-panel-${index}"`));
      assert.ok(html.includes(`aria-labelledby="audience-tab-${index}"`));
      assert.ok(html.includes(escape(experienceCopy[locale].audience.items[index].cta)));
    }
    assert.match(html, /role="tab"[^>]+aria-selected="true"[^>]+tabindex="0"/);
    assert.ok(html.includes('.audience-panel[hidden]{display:grid!important}'));
    assert.ok(html.includes('href="#contact"'));
  });
  test(`${locale}: diagrams, imagery, comparisons and lifecycle stay explanatory and localized`, () => {
    const html = readFileSync(built(`${locale}.html`), 'utf8');
    const copy = experienceCopy[locale];
    for (const text of [copy.illustration, copy.fieldCaption, copy.grainCaption, copy.architecture.note, copy.architecture.connection, ...copy.architecture.protocols, ...copy.architecture.market, ...copy.journey.outputs, ...copy.comparison.labels]) {
      assert.ok(html.includes(escape(text)), `Missing ${text}`);
    }
    assert.equal((html.match(/class="journey-marker"/g) || []).length, 4);
    const images = [...html.matchAll(/<img[^>]*src="\/assets\/editorial\/[^>]+>/g)].map(match => match[0]);
    assert.equal(images.length, 4);
    for (const image of images) {
      assert.ok(image.includes('loading="lazy"'));
      assert.ok(image.includes('decoding="async"'));
      assert.match(image, /width="\d+" height="\d+"/);
    }
  });
}

test('responsive editorial assets are WebP, local, and bounded in size', () => {
  let totalBytes = 0;
  for (const name of ['field-season', 'grain-storage']) {
    for (const suffix of ['', '-small']) {
      const file = built(`assets/editorial/${name}${suffix}.webp`);
      const bytes = readFileSync(file);
      assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
      assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
      assert.ok(statSync(file).size < 350_000);
      totalBytes += bytes.length;
    }
  }
  assert.ok(totalBytes < 800_000, `Editorial assets total ${totalBytes} bytes`);
});
