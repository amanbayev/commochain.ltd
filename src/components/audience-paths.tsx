import { useEffect, useRef, useState, type MouseEvent } from 'react';
import type { Locale } from '../i18n';
import { overviewCopy } from '../content/overview-copy';
import { experienceCopy } from '../content/experience-copy';
import { nextAudienceIndex } from '../lib/experience-navigation';
import { LinkArrow } from './brand-details';
import { trackPublicEvent } from '../lib/public-events';
const categories = ['farmer', 'warehouse', 'investor'] as const;

export function AudiencePaths({ locale, onContact }: { locale: Locale; onContact: (event: MouseEvent<HTMLAnchorElement>, role?: string) => void }) {
  const copy = experienceCopy[locale].audience;
  const audiences = overviewCopy[locale].overview.audiences;
  const [active, setActive] = useState(0);
  const [interactive, setInteractive] = useState(false);
  const [vertical, setVertical] = useState(false);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  useEffect(() => {
    const narrow = window.matchMedia('(max-width: 767px)');
    const sync = () => setVertical(narrow.matches);
    sync(); setInteractive(true); narrow.addEventListener('change', sync);
    return () => narrow.removeEventListener('change', sync);
  }, []);
  const select = (index: number) => { setActive(index); trackPublicEvent('audience_selection', locale, categories[index]); };
  return <div className="audience-paths">
    <div className="audience-tabs" role="tablist" aria-label={copy.label} aria-orientation={vertical ? 'vertical' : 'horizontal'}>
      {copy.items.map((item, index) => <button type="button" role="tab" id={`audience-tab-${index}`} aria-controls={`audience-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} disabled={!interactive} key={index} ref={node => { tabs.current[index] = node; }} onClick={() => select(index)} onKeyDown={event => {
        const next = nextAudienceIndex(event.key, index, copy.items.length, vertical);
        if (next === null) return;
        event.preventDefault(); select(next); tabs.current[next]?.focus();
      }}>{item.label}<span className="audience-tab-indicator" aria-hidden="true"/></button>)}
    </div>
    {copy.items.map((item, index) => <div className="audience-panel" id={`audience-panel-${index}`} role="tabpanel" aria-labelledby={`audience-tab-${index}`} tabIndex={0} hidden={active !== index} key={index}>
      <div><h4>{audiences[index].title}</h4><p>{audiences[index].body}</p><a className="audience-cta" href="#contact" onClick={event=>onContact(event,categories[index])}>{item.cta}<LinkArrow/></a></div>
      <div className="audience-checklist"><h5>{copy.prepare}</h5><ul>{item.checklist.map((text, row) => <li key={text}><span aria-hidden="true">0{row + 1}</span>{text}</li>)}</ul></div>
    </div>)}
    <noscript><style>{'.audience-tabs{display:none!important}.audience-panel[hidden]{display:grid!important}.audience-panel{border-bottom:1px solid #acb5a3}'}</style></noscript>
  </div>;
}
