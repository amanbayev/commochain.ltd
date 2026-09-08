import type { MouseEvent } from 'react';
import type { Locale } from '../i18n';
import { overviewCopy } from '../content/overview-copy';
import { storyCopy, storyShared } from '../story-i18n';
import { FieldToFinance } from './field-to-finance';

type Props = { locale: Locale; poster: string; onGrain: (event: MouseEvent<HTMLAnchorElement>) => void };

export function BusinessOverview({ locale, poster, onGrain }: Props) {
  const copy = overviewCopy[locale];
  const shared = storyShared;
  const t = storyCopy[locale];
  return <div className="business-overview">
    <section id="overview" className="overview-section overview-intro" aria-labelledby="overview-title">
      <div className="section-heading">
        <span className="section-eyebrow">01 / {copy.overview.eyebrow}</span>
        <h2 id="overview-title" tabIndex={-1}>{copy.overview.title}</h2>
      </div>
      <div className="overview-intro-grid">
        <p className="section-lead">{copy.overview.body}</p>
        <aside className="launch-note"><span className="status-dot" aria-hidden="true"/><h3>{copy.overview.status}</h3><p>{copy.overview.statusBody}</p></aside>
      </div>
      <div className="overview-audience-heading"><h3>{copy.overview.audienceTitle}</h3><div className="overview-download"><a href={`/downloads/commoditychain-overview-${locale}.html`} download={`commoditychain-overview-${locale}.html`}>{copy.download}<span aria-hidden="true"> ↓</span></a><span>{copy.downloadFormat}</span></div></div>
      <div className="audience-grid">{copy.overview.audiences.map(item => <article key={item.title}><h4>{item.title}</h4><p>{item.body}</p></article>)}</div>
    </section>

    <section id="infrastructure" className="overview-section overview-infrastructure" aria-labelledby="infrastructure-title">
      <div className="section-heading"><span className="section-eyebrow">02 / {copy.process.eyebrow}</span><h2 id="infrastructure-title" tabIndex={-1}>{copy.process.title}</h2><p className="section-lead">{copy.process.body}</p></div>
      <div className="engine-grid">{copy.process.engines.map((item, index) => <article className="engine" key={item.title}><span className="engine-index" aria-hidden="true">0{index + 1}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
      <h3 className="process-title">{copy.process.stepsTitle}</h3>
      <ol className="process-grid">{copy.process.steps.map((item, index) => <li key={item.title}><span className="step-number" aria-hidden="true">0{index + 1}</span><h4>{item.title}</h4><p>{item.body}</p></li>)}</ol>
    </section>

    <section id="assets" className="overview-section overview-grain" aria-labelledby="protocols-title">
      <FieldToFinance locale={locale}/>
      <div className="grain-intro"><div className="section-heading"><span className="section-eyebrow">{copy.grain.eyebrow}</span><h3 id="grain-title">{copy.grain.title}</h3><p className="section-lead">{copy.grain.body}</p><a className="text-link grain-film-link" href="#chapter-grain" onClick={onGrain}>{copy.grain.watch}<span aria-hidden="true"> ↗</span></a></div><figure><img src={poster} alt="" width="1912" height="1080" loading="lazy"/><figcaption>{copy.grain.imageCaption}<span>{t.ui.concept}</span></figcaption></figure></div>
      <dl className="grain-facts">{copy.grain.facts.map(item => <div key={item.title}><dt>{item.title}</dt><dd>{item.body}</dd></div>)}</dl>
      <p className="grain-note">{copy.grain.note}</p>
      <div className="storage-evidence"><h3>{copy.grain.evidenceTitle}</h3><p>{copy.grain.evidenceBody}</p></div>
      <details className="future-protocols"><summary>{copy.grain.structuresTitle}<span aria-hidden="true">+</span></summary><div className="concept-grid">{copy.grain.structures.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></details>
      <details className="future-protocols"><summary>{copy.grain.more}<span aria-hidden="true">+</span></summary><div className="concept-grid">{copy.grain.concepts.map(item => <article key={item.title}><span className="section-eyebrow">{t.ui.concept}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></details>
    </section>

    <section id="company" className="overview-section overview-company" aria-labelledby="company-title">
      <div className="section-heading"><span className="section-eyebrow">04 / {copy.company.eyebrow}</span><h2 id="company-title" tabIndex={-1}>{copy.company.title}</h2><p className="section-lead">{copy.company.body}</p></div>
      <div className="company-records">
        <article><span className="section-eyebrow">{t.footer.company}</span><h3 lang="en">{shared.legalName}</h3><p>{t.footer.bin} {shared.bin}</p><a href={shared.registerUrl} target="_blank" rel="noopener noreferrer">{t.footer.register}<span aria-hidden="true"> ↗</span></a></article>
        <article><span className="section-eyebrow">{copy.company.shareholder}</span><h3 lang="en">Tech Hub Limited</h3><p>{copy.company.shareholderBody}</p><a href={shared.registerUrl} target="_blank" rel="noopener noreferrer">{t.footer.register}<span aria-hidden="true"> ↗</span></a></article>
        <article><span className="section-eyebrow">{copy.company.licence}</span><h3 className="licence-number">AFSA-A-LA-2026-0014</h3><p>{copy.company.recordNote}</p><a href={shared.licenceRecordUrl} target="_blank" rel="noopener noreferrer">{t.footer.licence}<span aria-hidden="true"> ↗</span></a></article>
      </div>
    </section>
  </div>;
}
