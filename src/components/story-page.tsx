import React, { useEffect, useRef, useState } from 'react';
import { type Locale, isLocale } from '../i18n';
import { storyCopy, storyShared, storyLocaleOrder, type SceneKey } from '../story-i18n';
import timing from '../content/story-timing.json';
import localMedia from '../content/story-media.json';
import { createScrollVideo } from '../lib/scroll-video';

const duration = timing.duration_seconds;
const chapters = timing.captions;
const enableMotion: Record<Locale, string> = {
  kk: 'Анимацияны қосу',
  ru: 'Включить анимацию',
  en: 'Enable animation',
};
const clamp = (value:number) => Math.max(0, Math.min(1, value));
const chapterAt = (time:number) => Math.max(0, chapters.findIndex((c,i) => time >= c.start && (time < c.end || i === chapters.length-1)));

type Props = { initialLocale?: Locale; offline?: boolean; assets?: Record<string,string>; media?: { video:string; poster:string }; onLocaleChange?: (locale:Locale)=>void };

export function StoryPage({ initialLocale='kk', offline=false, assets={}, media=localMedia, onLocaleChange }:Props) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [manualStatic, setManualStatic] = useState<boolean|null>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const activateVideoRef = useRef<()=>void>(()=>{});
  const [menu, setMenu] = useState(false);
  const [testFail, setTestFail] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const captionRefs = useRef<Array<HTMLElement|null>>([]);
  const railRefs = useRef<Array<HTMLButtonElement|null>>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef(0);
  const activeRef = useRef(0);
  const localeRef = useRef(locale); localeRef.current = locale;
  const applyRef = useRef<(p:number)=>void>(()=>{});
  const staticMode = failed || (manualStatic ?? reduced);
  const t = storyCopy[locale];
  const asset = (path:string) => assets[path] || path;

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPref = () => setReduced(pref.matches);
    syncPref(); pref.addEventListener('change', syncPref);
    setTestFail(query.get('media') === 'fail');
    if (offline) {
      const initial = window.location.hash.replace(/^#\//, '').split('/')[0];
      if (isLocale(initial)) setLocale(initial);
    }
    setMounted(true);
    return () => pref.removeEventListener('change', syncPref);
  }, [offline]);

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    document.title = t.metadata.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t.metadata.description);
    applyRef.current(progressRef.current);
  }, [locale, t]);

  useEffect(() => {
    if (!mounted || staticMode) return;
    const track = trackRef.current, stage = stageRef.current, video = videoRef.current;
    if (!track || !stage || !video) return;
    let raf = 0, dead = false, lastScroll = -1, lastWidth = 0, lastHeight = 0;
    let top = 0, travel = 1, target = 0, lastChapter = -1;
    const dimensions = () => {
      top = track.getBoundingClientRect().top + window.scrollY;
      travel = Math.max(1, track.offsetHeight - stage.offsetHeight);
      lastWidth = window.innerWidth; lastHeight = window.innerHeight;
    };
    setReady(false); setNeedsGesture(false);
    const scrubber = createScrollVideo(video, timing.fps, status => {
      if (status === 'ready') setReady(true);
      setNeedsGesture(status === 'needs-gesture');
    });
    activateVideoRef.current = () => scrubber.activate(true, true);
    const onGesture = () => scrubber.activate(true);
    const onKey = (event:KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') onGesture();
    };
    document.addEventListener('pointerup', onGesture, { passive:true });
    document.addEventListener('touchend', onGesture, { passive:true });
    document.addEventListener('keydown', onKey);
    const apply = (value:number) => {
      const p = clamp(value); progressRef.current = p; target = p * duration;
      const index = chapterAt(target); activeRef.current = index;
      stage.dataset.progress = p.toFixed(6);
      stage.dataset.targetTime = target.toFixed(4);
      stage.dataset.chapter = chapters[index].key;
      stage.style.setProperty('--story-progress', String(p));
      for (let i=0; i<chapters.length; i++) {
        const node = captionRefs.current[i], rail = railRefs.current[i];
        if (node) {
          const active = i===index;
          node.hidden = !active;
          node.setAttribute('aria-hidden', active ? 'false' : 'true');
          if (active) {
            const enter = index===0 ? 1 : clamp((target-chapters[i].start)/.35);
            node.style.transform = `translateY(${(1-enter)*9}px)`;
            node.style.opacity = String(.82 + enter*.18);
          }
        }
        if (rail) {
          rail.setAttribute('aria-current', i===index ? 'step' : 'false');
          rail.style.setProperty('--chapter-fill', String(clamp((target-chapters[i].start)/(chapters[i].end-chapters[i].start))));
        }
      }
      if (counterRef.current) counterRef.current.textContent = `${storyCopy[localeRef.current].ui.chapter} ${String(index+1).padStart(2,'0')} / ${chapters.length}`;
      if (index !== lastChapter) { lastChapter=index; stage.dataset.activeCaption=String(index); }
      scrubber.setTarget(target);
    };
    applyRef.current = apply;
    const frame = () => {
      if (dead) return;
      if (window.innerWidth!==lastWidth || window.innerHeight!==lastHeight) { dimensions(); lastScroll=-1; }
      const y = window.scrollY;
      if (y!==lastScroll) { lastScroll=y; apply((y-top)/travel); }
      raf=requestAnimationFrame(frame);
    };
    dimensions(); apply((window.scrollY-top)/travel); raf=requestAnimationFrame(frame);
    return () => {
      dead=true; cancelAnimationFrame(raf); scrubber.dispose();
      document.removeEventListener('pointerup',onGesture);
      document.removeEventListener('touchend',onGesture);
      document.removeEventListener('keydown',onKey);
      activateVideoRef.current=()=>{};
      applyRef.current=()=>{};
    };
  }, [mounted, staticMode, testFail, media.video]);

  const jump = (time:number) => {
    setMenu(false);
    if (staticMode) { document.getElementById('text-'+chapters[chapterAt(time)].key)?.scrollIntoView(); return; }
    const track=trackRef.current, stage=stageRef.current;
    if (!track||!stage) return;
    const top=track.getBoundingClientRect().top+window.scrollY;
    window.scrollTo({top:top + clamp(time/duration)*Math.max(1,track.offsetHeight-stage.offsetHeight),behavior:'auto'});
  };
  const jumpKey=(key:SceneKey) => jump(chapters.find(c=>c.key===key)?.start || 0);
  const contact=(event?:React.MouseEvent<HTMLAnchorElement>) => { event?.preventDefault(); setMenu(false); document.getElementById('contact')?.scrollIntoView({behavior:'auto'}); };
  const language=(event:React.MouseEvent<HTMLAnchorElement>,next:Locale) => {
    event.preventDefault(); const y=window.scrollY;
    setLocale(next); setMenu(false);
    if(offline) window.history.replaceState(null,'',`#/${next}/story`);
    else onLocaleChange?.(next);
    requestAnimationFrame(()=>{window.scrollTo({top:y,behavior:'auto'});applyRef.current(progressRef.current);});
  };
  const toggleStatic=() => {
    const next=!staticMode; const key=chapters[activeRef.current].key; const preserved=progressRef.current;
    setManualStatic(next);
    if (!next) { setFailed(false); setReady(false); }
    requestAnimationFrame(()=>{
      if(next)document.getElementById('text-'+key)?.scrollIntoView({behavior:'auto'});
      else { const track=trackRef.current,stage=stageRef.current; if(track&&stage)window.scrollTo({top:track.getBoundingClientRect().top+window.scrollY+preserved*Math.max(1,track.offsetHeight-stage.offsetHeight),behavior:'auto'}); }
    });
  };
  const nav=(key:'story'|'infrastructure'|'assets'|'contact',event:React.MouseEvent<HTMLAnchorElement>)=>{
    event.preventDefault();
    if(key==='contact') contact();
    else jumpKey(key==='infrastructure'?'compliance':key==='assets'?'asset_universe':'field');
  };
  const brand=<img className="story-brand" src={asset('/assets/concepts/logo-B-dark.svg')} alt={storyShared.brand} width="245" height="40"/>;

  return <div className="story-shell" data-locale={locale} data-view={staticMode?'static':'cinematic'}>
    <a className="story-skip-access" href="#contact" onClick={contact}>{t.ui.skipStory}</a>
    <header className="story-header">
      <a href="#story" className="story-home" onClick={e=>nav('story',e)}>{brand}</a>
      <nav className="story-main-nav" aria-label={t.navigation.story}>{(['story','infrastructure','assets','contact'] as const).map(key=><a key={key} href={key==='contact'?'#contact':'#story'} onClick={e=>nav(key,e)}>{t.navigation[key]}</a>)}</nav>
      <nav className="story-languages" aria-label={t.ui.language}>{storyLocaleOrder.map(l=><a key={l} href={offline?`#/${l}/story`:`/${l}`} hrefLang={l} lang={l} aria-current={locale===l?'true':undefined} onClick={e=>language(e,l)}>{storyCopy[l].languageName}</a>)}</nav>
      <button className="story-mobile-menu" aria-expanded={menu} aria-controls="story-menu" onClick={()=>setMenu(!menu)}>{menu?t.ui.closeMenu:t.ui.menu}</button>
      {menu&&<nav id="story-menu" className="story-menu">{(['story','infrastructure','assets','contact'] as const).map(key=><a key={key} href={key==='contact'?'#contact':'#story'} onClick={e=>nav(key,e)}>{t.navigation[key]}</a>)}</nav>}
    </header>
    <main>
      <div id="story" ref={trackRef} className="story-track" hidden={staticMode}>
        <div className="story-stage" ref={stageRef} data-chapter="field" data-progress="0" data-target-time="0">
          <img className={'story-poster '+(ready?'is-covered':'')} src={asset(media.poster)} alt=""/>
          {mounted&&!staticMode&&<video ref={videoRef} className="story-film" src={testFail?'/missing-v3-test.mp4':asset(media.video)} poster={asset(media.poster)} muted playsInline preload="auto" disablePictureInPicture disableRemotePlayback tabIndex={-1} aria-hidden="true" onError={()=>{setFailed(true);setReady(false);}}/>}
          <div className="story-captions">{chapters.map((chapter,index)=>{
            const text=t.scenes[chapter.key as SceneKey];
            return <article key={chapter.key} className={'story-caption caption-'+chapter.key} data-key={chapter.key} ref={node=>{captionRefs.current[index]=node;}} hidden={index!==activeRef.current} aria-hidden={index!==activeRef.current}>
              <div className="story-eyebrow"><span>{storyShared.brand}</span>{chapter.concept&&<span className="concept-marker">{t.ui.concept}</span>}</div>
              {index===0?<h1>{text.headline}</h1>:<h2>{text.headline}</h2>}
              <p>{text.body}</p>
            </article>;
          })}</div>
          {!ready&&!needsGesture&&<span className="story-loading" role="status">{t.ui.loading}</span>}
          {needsGesture&&<button type="button" className="story-loading story-enable-motion" onClick={()=>activateVideoRef.current()}>{enableMotion[locale]}</button>}
          <div className="story-controls"><div className="story-control-left"><span ref={counterRef} className="story-counter">{`${t.ui.chapter} ${String(activeRef.current+1).padStart(2,'0')} / ${chapters.length}`}</span><button onClick={()=>jump(chapters[Math.max(0,activeRef.current-1)].start+.05)} aria-label={t.ui.previous} className="chapter-arrow prev"/><button onClick={()=>jump(chapters[Math.min(chapters.length-1,activeRef.current+1)].start+.05)} aria-label={t.ui.next} className="chapter-arrow next"/></div><a href="#contact" className="story-partnership" onClick={contact}>{t.ui.emailCta}<span className="css-arrow" aria-hidden="true"/></a><button className="story-static-toggle" onClick={toggleStatic}>{t.ui.staticView}</button></div>
          <div className="story-bottom"><span className="story-scroll-cue" title={t.ui.scrollExplanation}>{t.ui.scroll}</span><a href="#contact" onClick={contact}>{t.ui.skipStory}</a></div>
          <nav className="story-rail" aria-label={t.ui.chapter}>{chapters.map((c,index)=><button key={c.key} ref={node=>{railRefs.current[index]=node;}} style={{flexGrow:c.end-c.start}} aria-label={`${t.ui.chapter} ${index+1}: ${t.scenes[c.key as SceneKey].headline}`} title={t.scenes[c.key as SceneKey].headline} aria-current={index===activeRef.current?'step':undefined} onClick={()=>jump(c.start+.05)}><span/></button>)}</nav>
        </div>
      </div>
      <section className="story-static" hidden={!staticMode} aria-label={t.ui.readStory}>
        <div className="static-opening"><img src={asset(media.poster)} alt=""/><div><span>{t.ui.staticView}</span><h1>{t.scenes.field.headline}</h1><p>{failed?t.ui.mediaError:t.ui.scrollExplanation}</p><a href="#contact" onClick={contact}>{t.ui.skipStory}</a>{!failed&&<button onClick={toggleStatic}>{t.ui.cinematicView}</button>}</div></div>
        <div className="static-chapters">{chapters.map(c=><article key={c.key} id={'text-'+c.key}>{c.concept&&<span className="concept-marker">{t.ui.concept}</span>}<h2>{t.scenes[c.key as SceneKey].headline}</h2><p>{t.scenes[c.key as SceneKey].body}</p></article>)}</div>
      </section>
      <noscript><style>{'.story-track{display:none!important}.story-static{display:block!important}.story-header{position:absolute}'}</style></noscript>
      <section id="contact" className="story-contact"><p className="closing-intro">{t.scenes.closing.body}</p><h2>{t.scenes.closing.headline}</h2><div className="contact-address"><div><h3>{t.contact.title}</h3><p>{t.contact.body}</p></div><a className="public-email" href={storyShared.emailHref} aria-label={t.ui.emailLinkLabel}>{storyShared.email}<span className="css-arrow" aria-hidden="true"/></a></div></section>
    </main>
    <footer className="story-footer"><div className="story-footer-top"><span>{storyShared.domain}</span><a href="#story" onClick={e=>nav('story',e)}>{t.ui.backToTop}</a></div><div className="story-company"><div><span>{t.footer.company}</span><strong lang="en">{storyShared.legalName}</strong><span>{t.footer.bin} {storyShared.bin}</span><a href={storyShared.emailHref}>{storyShared.email}</a></div><nav aria-label={t.footer.company}><a href={storyShared.registerUrl} target="_blank" rel="noopener noreferrer" aria-label={`${t.footer.register}, ${t.ui.externalLink}`}>{t.footer.register}</a><a href={storyShared.licenceRecordUrl} target="_blank" rel="noopener noreferrer" aria-label={`${t.footer.licence}, ${t.ui.externalLink}`}>{t.footer.licence}</a></nav></div><div className="story-qualifications"><p>{t.footer.illustration}</p><p>{t.footer.eligibility}</p><p>{t.footer.concepts}</p><p>{t.footer.terrainNote}</p></div></footer>
  </div>;
}
