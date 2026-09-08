import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { experienceCopy } from '../content/experience-copy.ts';
import { fieldToFinanceCopy } from '../content/field-to-finance-copy.ts';
import { overviewCopy } from '../content/overview-copy.ts';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const escape = text => text.replaceAll('&', '&amp;').replaceAll("'", '&#x27;');

for (const locale of ['en', 'ru', 'kk']) {
  test(`${locale}: a shorter reading path preserves supporting evidence and visible qualifications`, () => {
    const html = read(`../../dist/${locale}.html`);
    const experience = experienceCopy[locale];
    const field = fieldToFinanceCopy[locale];
    const overview = overviewCopy[locale];
    const details = [...html.matchAll(/<details class="supporting-detail [\s\S]*?<\/details>/g)].map(match => match[0]);
    assert.equal(details.length, 4);
    for (const detail of details) {
      assert.ok(!detail.slice(0, detail.indexOf('>')).includes(' open'));
      assert.match(detail, /<summary>.+class="disclosure-mark"/);
    }
    for (const label of [experience.reading.instrumentChecklist, experience.reading.comparisonDetails, experience.reading.journeyDetails, experience.reading.grainDetails]) {
      assert.ok(details.some(detail => detail.includes(escape(label))));
    }
    const visibleReading = html.replace(/<details[\s\S]*?<\/details>/g, '');
    for (const text of [field.rights, field.risk, overview.grain.note, overview.overview.statusBody, experience.reading.definitionBody]) {
      assert.ok(visibleReading.includes(escape(text)), `Qualification must not be collapsed: ${text}`);
    }
    for (const text of [
      ...overview.process.steps.map(item => item.body), ...overview.grain.facts.map(item => item.body), overview.grain.evidenceBody,
      ...experience.journey.actors, ...experience.journey.outputs, ...experience.comparison.values.flat(),
    ]) assert.ok(details.some(detail => detail.includes(escape(text))), `Supporting detail lost: ${text}`);
    for (const item of field.journey) assert.ok(visibleReading.includes(escape(item.body)));
    const download = read(`../../dist/downloads/commoditychain-overview-${locale}.html`);
    assert.ok(download.includes(escape(experience.reading.definitionBody)));
  });
}

test('photo motion is a CSS-only enhancement with static mobile and reduced-motion defaults', () => {
  const css = read('../overview.css');
  const component = read('./editorial-photo.tsx');
  assert.match(css, /@supports\(animation-timeline:view\(\)\)/);
  assert.match(css, /@media\(min-width:768px\) and \(prefers-reduced-motion:no-preference\)/);
  assert.match(css, /animation:asset-landscape-drift linear both;animation-timeline:--asset-photo/);
  assert.match(css, /\.field-hero\{[^}]*view-timeline:--field-landscape block/);
  assert.match(css, /\.editorial-photo-field img\{animation-timeline:--field-landscape\}/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)\{\.editorial-photo img\{animation:none;transform:none\}/);
  assert.ok(!/addEventListener|useEffect|requestAnimationFrame/.test(component));
  assert.ok(!css.includes('animation:engine-flow'));
});
