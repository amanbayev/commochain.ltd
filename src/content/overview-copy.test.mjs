import assert from 'node:assert/strict';
import { test } from 'node:test';
import { overviewCopy } from './overview-copy.ts';
import { fieldToFinanceCopy } from './field-to-finance-copy.ts';
import { experienceCopy } from './experience-copy.ts';

function shape(value) {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, shape(item)]));
  assert.equal(typeof value, 'string');
  assert.ok(value.trim().length > 0);
  return 'text';
}
test('all three languages cover the same complete content and navigation', () => {
  for (const copy of [overviewCopy, fieldToFinanceCopy, experienceCopy]) {
    assert.deepEqual(Object.keys(copy).sort(), ['en', 'kk', 'ru']);
    for (const locale of ['kk', 'ru']) assert.deepEqual(shape(copy[locale]), shape(copy.en));
  }
});

test('experience explanations match existing audience, engine and lifecycle content', () => {
  for (const locale of ['en', 'ru', 'kk']) {
    const copy = experienceCopy[locale];
    assert.equal(copy.audience.items.length, overviewCopy[locale].overview.audiences.length);
    assert.equal(copy.architecture.protocols.length, 4);
    assert.equal(copy.architecture.market.length, 4);
    assert.equal(copy.journey.actors.length, fieldToFinanceCopy[locale].journey.length);
    assert.equal(copy.journey.outputs.length, fieldToFinanceCopy[locale].journey.length);
    assert.equal(copy.comparison.values.length, fieldToFinanceCopy[locale].comparison.length);
    for (const values of copy.comparison.values) assert.equal(values.length, copy.comparison.labels.length);
    for (const item of copy.audience.items) assert.equal(item.checklist.length, 3);
  }
});
test('launch protocols retain independent evidence, legal rights and risk explanations', () => {
  for (const locale of ['en', 'kk', 'ru']) {
    const copy = fieldToFinanceCopy[locale];
    assert.equal(copy.comparison.length, 2);
    assert.equal(copy.journey.length, 4);
    assert.equal(copy.roles.length, 6);
    assert.ok(copy.roles[0].title.includes('SCAS'));
    assert.ok(copy.rights.length > 100 && copy.risk.length > 100);
    assert.equal(overviewCopy[locale].grain.structures.length, 3);
  }
});
