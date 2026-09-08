import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { chapterSeekTime, storyScrollOffset } from './story-navigation.ts';

const timing = JSON.parse(readFileSync(new URL('../content/story-timing.json', import.meta.url), 'utf8'));
test('every chapter link lands inside its caption after integer scroll rounding', () => {
  for (const travel of [6000, 8500]) for (const chapter of timing.captions) {
    const time = storyScrollOffset(chapterSeekTime(chapter), timing.duration_seconds, travel) / travel * timing.duration_seconds;
    assert.ok(time >= chapter.start && time < chapter.end, `${chapter.key}: ${time}`);
  }
});
test('opening frame stays at zero and short chapters never seek beyond their midpoint', () => {
  assert.equal(chapterSeekTime({ start: 0, end: 3 }), 0);
  assert.equal(chapterSeekTime({ start: 2, end: 2.02 }), 2.01);
});
test('out-of-range story targets are bounded by the track', () => {
  assert.equal(storyScrollOffset(-1, 50, 6000), 0);
  assert.equal(storyScrollOffset(51, 50, 6000), 6000);
});
