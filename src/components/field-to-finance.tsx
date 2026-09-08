import type { Locale } from '../i18n';
import { fieldToFinanceCopy } from '../content/field-to-finance-copy';
import { experienceCopy } from '../content/experience-copy';
import { DisclosureMark } from './brand-details';

export function FieldToFinance({ locale }: { locale: Locale }) {
  const copy = fieldToFinanceCopy[locale];
  const experience = experienceCopy[locale];
  return <div className="field-to-finance">
    <div className="field-hero">
      <img src="/assets/editorial/field-season.webp" srcSet="/assets/editorial/field-season-small.webp 800w, /assets/editorial/field-season.webp 1600w" sizes="(max-width: 767px) 100vw, 90vw" alt="" width="1600" height="900" loading="lazy" decoding="async"/>
      <div className="section-heading">
      <h2 id="protocols-title" tabIndex={-1}>{copy.title}</h2>
      <p className="field-context">{copy.eyebrow}</p>
      </div>
    </div>
    <p className="editorial-caption"><span>{experience.illustration}</span>{experience.fieldCaption}</p>
    <p className="section-lead field-introduction">{copy.body}</p>
    <h3 className="protocol-subheading">{copy.comparisonTitle}</h3>
    <div className="protocol-comparison">{copy.comparison.map((item, index) => <article key={index}>
      <div className="comparison-image"><img src={`/assets/editorial/${index === 0 ? 'field-season' : 'grain-storage'}-small.webp`} alt="" width="800" height="450" loading="lazy" decoding="async"/><span>{experience.illustration}</span></div>
      <div className="comparison-heading"><h4>{item.title}</h4></div>
      <p>{item.body}</p><dl>{experience.comparison.labels.map((label, row) => <div key={label}><dt>{label}</dt><dd>{experience.comparison.values[index][row]}</dd></div>)}</dl>
    </article>)}</div>
    <h3 className="protocol-subheading">{copy.journeyTitle}</h3>
    <ol className="field-journey">{copy.journey.map((item, index) => <li key={index}>
      <span className="journey-marker" aria-hidden="true">0{index + 1}</span>
      <div className="journey-description"><h4>{item.title}</h4><p>{item.body}</p></div>
      <dl className="journey-evidence"><div><dt>{experience.journey.who}</dt><dd>{experience.journey.actors[index]}</dd></div><div><dt>{experience.journey.evidence}</dt><dd>{experience.journey.outputs[index]}</dd></div></dl>
    </li>)}</ol>
    <aside className="instrument-rights"><h3>{copy.rightsTitle}</h3><p>{copy.rights}</p><p className="protocol-risk">{copy.risk}</p></aside>
    <details className="future-protocols protocol-roles"><summary>{copy.rolesTitle}<DisclosureMark/></summary><dl className="role-grid">{copy.roles.map(item => <div key={item.title}><dt>{item.title}</dt><dd>{item.body}</dd></div>)}</dl></details>
  </div>;
}
