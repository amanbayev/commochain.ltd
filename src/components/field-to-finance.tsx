import type { Locale } from '../i18n';
import { fieldToFinanceCopy } from '../content/field-to-finance-copy';

export function FieldToFinance({ locale }: { locale: Locale }) {
  const copy = fieldToFinanceCopy[locale];
  return <div className="field-to-finance">
    <div className="section-heading">
      <span className="section-eyebrow">03 / {copy.eyebrow}</span>
      <h2 id="protocols-title" tabIndex={-1}>{copy.title}</h2>
      <p className="section-lead">{copy.body}</p>
    </div>
    <h3 className="protocol-subheading">{copy.comparisonTitle}</h3>
    <div className="protocol-comparison">{copy.comparison.map(item => <article key={item.title}><h4>{item.title}</h4><p>{item.body}</p></article>)}</div>
    <h3 className="protocol-subheading">{copy.journeyTitle}</h3>
    <ol className="field-journey">{copy.journey.map((item, index) => <li key={item.title}><span aria-hidden="true">0{index + 1}</span><h4>{item.title}</h4><p>{item.body}</p></li>)}</ol>
    <aside className="instrument-rights"><h3>{copy.rightsTitle}</h3><p>{copy.rights}</p><p className="protocol-risk">{copy.risk}</p></aside>
    <details className="future-protocols protocol-roles"><summary>{copy.rolesTitle}<span aria-hidden="true">+</span></summary><dl className="role-grid">{copy.roles.map(item => <div key={item.title}><dt>{item.title}</dt><dd>{item.body}</dd></div>)}</dl></details>
  </div>;
}
