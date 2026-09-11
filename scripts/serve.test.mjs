import assert from 'node:assert/strict';
import { test } from 'node:test';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { locales } from '../src/i18n.ts';

test('local preview serves all locales, downloads and WebP images', { timeout: 15000 }, async t => {
  const child = spawn(process.execPath, ['scripts/serve.mjs'], {
    cwd: fileURLToPath(new URL('../', import.meta.url)),
    env: { ...process.env, PORT: '0' }, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'],
  });
  t.after(() => child.kill());
  const origin = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Preview did not start')), 8000);
    t.after(() => clearTimeout(timer));
    child.once('error', reject);
    child.once('exit', code => reject(new Error(`Preview exited with ${code}`)));
    let output = '';
    child.stdout.on('data', data => {
      output += data;
      const match = output.match(/Local preview: (http:\/\/127\.0\.0\.1:\d+)\/en/);
      if (match) { clearTimeout(timer); resolve(match[1]); }
    });
  });
  for (const locale of locales) {
    const response = await fetch(`${origin}/${locale}`);
    assert.equal(response.status, 200);
    assert.ok((await response.text()).includes(`<html lang="${locale}">`));
    const redirect = await fetch(`${origin}/${locale}/`, { redirect: 'manual' });
    assert.equal(redirect.status, 308);
    assert.equal(redirect.headers.get('location'), `/${locale}`);
    assert.equal((await fetch(`${origin}/downloads/commoditychain-overview-${locale}.html`)).status, 200);
  }
  for (const name of ['field-season', 'grain-storage']) {
    for (const suffix of ['', '-small']) {
      const response = await fetch(`${origin}/assets/editorial/${name}${suffix}.webp`, { method: 'HEAD' });
      assert.equal(response.status, 200);
      assert.equal(response.headers.get('content-type'), 'image/webp');
      assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
      assert.ok(Number(response.headers.get('content-length')) > 0);
    }
  }
});
