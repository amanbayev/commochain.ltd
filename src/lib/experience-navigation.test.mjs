import assert from 'node:assert/strict';
import { test } from 'node:test';
import { nextAudienceIndex, sectionAtReadingLine, sectionKeys } from './experience-navigation.ts';

test('audience tabs wrap and support first/last keyboard navigation', () => {
  assert.equal(nextAudienceIndex('ArrowRight', 0, 3), 1);
  assert.equal(nextAudienceIndex('ArrowRight', 2, 3), 0);
  assert.equal(nextAudienceIndex('ArrowLeft', 0, 3), 2);
  assert.equal(nextAudienceIndex('Home', 2, 3), 0);
  assert.equal(nextAudienceIndex('End', 0, 3), 2);
  assert.equal(nextAudienceIndex('Tab', 0, 3), null);
  assert.equal(nextAudienceIndex('ArrowRight', 0, 0), null);
  assert.equal(nextAudienceIndex('ArrowDown', 2, 3, true), 0);
  assert.equal(nextAudienceIndex('ArrowUp', 0, 3, true), 2);
  assert.equal(nextAudienceIndex('ArrowLeft', 0, 3, true), null);
  assert.equal(nextAudienceIndex('ArrowDown', 0, 3), null);
});

test('section tracking handles the film, long sections, gaps and exact boundaries', () => {
  const bounds = [
    { key: 'overview', top: 200, bottom: 900 },
    { key: 'infrastructure', top: 900, bottom: 2500 },
    { key: 'assets', top: 2500, bottom: 9000 },
    { key: 'company', top: 9100, bottom: 10000 },
    { key: 'contact', top: 10000, bottom: 11000 },
  ];
  assert.equal(sectionAtReadingLine(bounds, 132), null);
  assert.equal(sectionAtReadingLine(bounds, 200), 'overview');
  assert.equal(sectionAtReadingLine(bounds, 900), 'infrastructure');
  assert.equal(sectionAtReadingLine(bounds, 8000), 'assets');
  assert.equal(sectionAtReadingLine(bounds, 9050), null);
  assert.equal(sectionAtReadingLine(bounds, 10000), 'contact');
  assert.equal(sectionAtReadingLine(bounds, 12000), null);
  assert.deepEqual(bounds.map(section => section.key), sectionKeys);
});
