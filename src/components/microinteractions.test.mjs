import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

test('microinteractions are progressive, bounded and leave all default content visible', () => {
  const css = readFileSync(new URL('../motion.css', import.meta.url), 'utf8');
  assert.match(css, /@media screen and \(prefers-reduced-motion: no-preference\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /\.audience-panel:not\(\[hidden\]\)/);
  assert.match(css, /\.supporting-detail\[open\]::details-content/);
  assert.match(css, /\.enquiry-submit:active:not\(:disabled\)/);
  assert.match(css, /\.engine-diagram\[data-motion-entered=true\]/);
  assert.ok(!/infinite|opacity:\s*0\s*[;}]/.test(css));
  assert.ok(!/transition:\s*all|animation-fill-mode:\s*(both|forwards)/.test(css));
  for (const locale of ['en', 'ru', 'kk']) {
    const html = readFileSync(new URL(`../../dist/${locale}.html`, import.meta.url), 'utf8');
    assert.match(html, /class="engine-diagram" aria-describedby="engine-model-note"/);
    assert.ok(!html.includes('data-motion-entered'));
  }
});
