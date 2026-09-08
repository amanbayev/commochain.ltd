import assert from 'node:assert/strict';
import { test } from 'node:test';
import { observeDiagramMotion } from './diagram-motion.ts';

function fixture({ reduced = false, supported = true } = {}) {
  const attrs = new Map();
  const listeners = new Set();
  let enter;
  let observations = 0;
  let disconnects = 0;
  let writes = 0;
  const element = {
    setAttribute(name, value) { attrs.set(name, value); writes++; },
    removeAttribute(name) { attrs.delete(name); },
  };
  const preference = {
    matches: reduced,
    addEventListener(_event, handler) { listeners.add(handler); },
    removeEventListener(_event, handler) { listeners.delete(handler); },
  };
  const cleanup = observeDiagramMotion(element, {
    preference,
    createObserver: supported ? (callback, options) => {
      assert.equal(options.threshold, .25);
      enter = callback;
      return { observe(target) { assert.equal(target, element); observations++; }, disconnect() { disconnects++; } };
    } : undefined,
  });
  return {
    attrs, listeners, cleanup,
    get observations() { return observations; }, get disconnects() { return disconnects; }, get writes() { return writes; },
    visible(ratio = .5, target = element) { enter?.([{ target, isIntersecting: ratio > 0, intersectionRatio: ratio }]); },
    reduce(value) { preference.matches = value; for (const listener of listeners) listener(); },
  };
}

test('diagram remains fully static until a meaningful part is visible', () => {
  const f = fixture();
  assert.equal(f.observations, 1);
  f.visible(0); f.visible(.1); f.visible(.5, {});
  assert.equal(f.attrs.size, 0);
  f.visible(.25);
  assert.equal(f.attrs.get('data-motion-entered'), 'true');
  assert.equal(f.disconnects, 1);
  f.cleanup();
});
test('diagram entry is one-shot even if a queued observer callback repeats', () => {
  const f = fixture();
  f.visible(); f.visible(0); f.visible();
  assert.equal(f.writes, 1);
  f.cleanup();
});
test('reduced motion at startup creates no observer or decorative state', () => {
  const f = fixture({ reduced: true });
  assert.equal(f.observations, 0);
  assert.equal(f.listeners.size, 0);
  assert.equal(f.attrs.size, 0);
  f.cleanup();
});
test('changing to reduced motion cancels an armed or already-entered diagram', () => {
  for (const alreadyEntered of [false, true]) {
    const f = fixture();
    if (alreadyEntered) f.visible();
    f.reduce(true); f.visible();
    assert.equal(f.attrs.size, 0);
    assert.ok(f.disconnects > 0);
    f.cleanup();
  }
});
test('turning motion back on does not replay a cancelled sequence', () => {
  const f = fixture();
  f.visible(); f.reduce(true); f.reduce(false); f.visible();
  assert.equal(f.attrs.size, 0);
  assert.equal(f.writes, 1);
  f.cleanup();
});
test('missing IntersectionObserver retains the complete static fallback', () => {
  const f = fixture({ supported: false });
  assert.equal(f.observations, 0);
  assert.equal(f.listeners.size, 0);
  f.cleanup();
});
test('cleanup removes state and listeners and ignores obsolete callbacks', () => {
  const f = fixture();
  f.visible(); f.cleanup(); f.visible();
  assert.equal(f.attrs.size, 0);
  assert.equal(f.listeners.size, 0);
  assert.equal(f.writes, 1);
});
