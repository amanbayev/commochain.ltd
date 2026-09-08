import assert from 'node:assert/strict';
import { test } from 'node:test';
import { overviewCopy } from './overview-copy.ts';
import { fieldToFinanceCopy } from './field-to-finance-copy.ts';

function shape(value) {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, shape(item)]));
  assert.equal(typeof value, 'string');
  assert.ok(value.trim().length > 0);
  return 'text';
}
test('all three languages cover the same complete content and navigation', () => {
  for (const copy of [overviewCopy, fieldToFinanceCopy]) {
    assert.deepEqual(Object.keys(copy).sort(), ['en', 'kk', 'ru']);
    for (const locale of ['kk', 'ru']) assert.deepEqual(shape(copy[locale]), shape(copy.en));
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
