// Deterministic controller tests. Run after npm ci: node scripts/check-scroll-video.mjs
// These simulate media lifecycle events; they do not emulate physical iOS Safari.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const source = readFileSync(new URL('../src/lib/scroll-video.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 },
}).outputText;
const { createScrollVideo } = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));
const microtasks = async () => { await Promise.resolve(); await Promise.resolve(); await Promise.resolve(); };

class Clock {
  now = 1; id = 0; jobs = new Map();
  setTimeout = (fn, delay) => { const id = ++this.id; this.jobs.set(id, { fn, due:this.now+delay }); return id; };
  clearTimeout = id => this.jobs.delete(id);
  setInterval = (fn, delay) => { const id = ++this.id; this.jobs.set(id, { fn, due:this.now+delay, interval:delay }); return id; };
  clearInterval = this.clearTimeout;
  tick(ms) {
    const end = this.now + ms;
    for (;;) {
      const pending = [...this.jobs].filter(([,j])=>j.due<=end).sort((a,b)=>a[1].due-b[1].due)[0];
      if (!pending) break;
      const [id,j] = pending; this.now=j.due;
      if (j.interval) j.due+=j.interval; else this.jobs.delete(id);
      j.fn();
    }
    this.now=end;
  }
}
class Media extends EventTarget {
  readyState=1; duration=50; seeking=false; paused=true;
  dataset={}; attrs={}; seeks=[]; plays=0; pauses=0; loads=0;
  _time=0; pending=[]; callbacks=new Map(); frameID=0; rejectPlay=false;
  get currentTime() { return this._time; }
  set currentTime(value) { this.seeks.push(value); this._time=value; this.seeking=true; }
  setAttribute(name,value) { this.attrs[name]=value; }
  play() {
    this.plays++;
    if (this.rejectPlay) return Promise.reject(new DOMException('Blocked for test','NotAllowedError'));
    return new Promise(resolve=>this.pending.push(resolve));
  }
  pause() { this.pauses++; this.paused=true; }
  load() { this.loads++; this.readyState=0; this.seeking=false; this._time=0; }
  requestVideoFrameCallback(fn) { const id=++this.frameID; this.callbacks.set(id,fn); return id; }
  cancelVideoFrameCallback(id) { this.callbacks.delete(id); }
  emit(name) { this.dispatchEvent(new Event(name)); }
  startPlayback() {
    this.readyState=4; this.paused=false; this.emit('loadeddata');
    for (const resolve of this.pending.splice(0)) resolve();
  }
  presentFrame() { const callbacks=[...this.callbacks.values()]; this.callbacks.clear(); callbacks.forEach(fn=>fn(0,{})); }
  completeSeek() { this.seeking=false; this.readyState=4; this.emit('seeked'); }
}
let passed=0;
async function check(name,fn) {
  const clock=new Clock(); const media=new Media(); const states=[];
  const priorWindow=globalThis.window, priorDocument=globalThis.document;
  const priorPerformance=Object.getOwnPropertyDescriptor(globalThis,'performance');
  globalThis.window=clock; globalThis.document={hidden:false};
  Object.defineProperty(globalThis,'performance',{configurable:true,value:{now:()=>clock.now}});
  let controller;
  try {
    await fn({clock,media,states,make:()=>controller=createScrollVideo(media,24,s=>states.push(s))});
    passed++; console.log('PASS '+name);
  } finally {
    controller?.dispose();
    assert.equal(clock.jobs.size,0,'All timers cleaned up');
    globalThis.window=priorWindow; globalThis.document=priorDocument;
    Object.defineProperty(globalThis,'performance',priorPerformance);
  }
}
async function boot(media) { media.startPlayback(); await microtasks(); media.presentFrame(); }

await check('metadata alone does not trigger a seek; startup is not paused early', async({media,make})=>{
  const c=make(); c.setTarget(10); media.emit('loadedmetadata');
  assert.equal(media.plays,1); assert.equal(media.seeks.length,0); assert.equal(media.pauses,0);
  media.startPlayback(); assert.equal(media.pauses,0,'loadeddata must not abort play');
  await microtasks(); assert.equal(media.pauses,0);
  media.presentFrame(); assert.equal(media.paused,true); assert.equal(media.seeks.at(-1),10);
});
await check('forward/backward targets are coalesced to the newest pending time', async({media,make})=>{
  const c=make(); await boot(media);
  c.setTarget(30); c.setTarget(40); c.setTarget(12);
  assert.deepEqual(media.seeks,[30]);
  media.completeSeek(); assert.deepEqual(media.seeks,[30,12]);
  media.completeSeek(); assert.equal(media.dataset.scrubState,'ready');
  assert.equal(media.currentTime,12); assert.equal(media.paused,true);
});
await check('blocked automatic play exposes retry; trusted activation calls play synchronously', async({media,make})=>{
  media.rejectPlay=true; const c=make(); c.setTarget(22); await microtasks();
  assert.equal(media.dataset.scrubState,'needs-gesture');
  media.rejectPlay=false; c.activate(true); assert.equal(media.plays,2);
  await boot(media); assert.equal(media.seeks.at(-1),22); media.completeSeek();
  assert.equal(media.dataset.scrubState,'ready');
  assert.equal(media.muted,true); assert.equal(media.defaultMuted,true); assert.equal(media.playsInline,true);
});
await check('extra gestures after initialization do not restart playback or reload', async({media,make})=>{
  const c=make(); await boot(media); c.activate(true); c.activate(true);
  assert.equal(media.plays,1); assert.equal(media.loads,0);
});
await check('source bounds and invalid targets are handled', async({media,make})=>{
  const c=make(); await boot(media); c.setTarget(100);
  assert.equal(media.seeks.at(-1),50-1/24); media.completeSeek();
  c.setTarget(NaN); c.setTarget(Infinity); assert.equal(media.seeks.length,1);
  c.setTarget(-10); assert.equal(media.seeks.at(-1),0);
});
await check('older engines without frame callbacks use the bounded presentation fallback', async({media,clock,make})=>{
  media.requestVideoFrameCallback=undefined;
  const c=make(); c.setTarget(8); media.startPlayback(); await microtasks();
  clock.tick(150); assert.equal(media.paused,true); assert.equal(media.seeks.at(-1),8);
});
await check('stalled seek has a manual recovery and preserves latest scroll target', async({media,clock,make})=>{
  const c=make(); await boot(media); c.setTarget(17); clock.tick(9000);
  assert.equal(media.dataset.scrubState,'needs-gesture'); assert.equal(media.loads,0);
  c.setTarget(25); c.activate(true); assert.equal(media.loads,0);
  c.activate(true, true); assert.equal(media.loads,1);
  await boot(media); assert.equal(media.seeks.at(-1),25); media.completeSeek();
  assert.equal(media.dataset.scrubState,'ready');
});
await check('a pending automatic play can be upgraded once by a gesture', async({media,make})=>{
  const c=make(); c.activate(true); c.activate(true);
  assert.equal(media.plays,2); await boot(media);
  assert.equal(media.dataset.scrubState,'ready'); assert.equal(media.paused,true);
});
await check('a hung play request is stopped and cannot start an orphan autoplay later', async({media,clock,make})=>{
  make(); clock.tick(10000); assert.equal(media.dataset.scrubState,'needs-gesture');
  assert.equal(media.paused,true); assert.equal(media.pauses,1);
  // Resolve the stale promise without changing the physical paused state.
  media.pending.splice(0).forEach(resolve=>resolve()); await microtasks();
  assert.equal(media.callbacks.size,0); assert.equal(media.dataset.scrubState,'needs-gesture');
});
await check('disposing before play settles ignores the obsolete initialization', async({media,make})=>{
  const c=make(); c.dispose(); media.pending.splice(0).forEach(resolve=>resolve()); await microtasks();
  assert.equal(media.seeks.length,0); assert.equal(media.callbacks.size,0);
});
await check('a target requested while frame data is unavailable resumes on canplay', async({media,make})=>{
  const c=make(); await boot(media); media.readyState=1; c.setTarget(32);
  assert.equal(media.seeks.length,0); media.readyState=4; media.emit('canplay');
  assert.equal(media.seeks.at(-1),32); media.completeSeek();
  assert.equal(media.dataset.scrubState,'ready');
});
console.log(`\n${passed} controller checks passed. These are simulated lifecycle tests, not iPhone certification.`);
