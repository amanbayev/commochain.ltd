import type { Locale } from '../i18n';
import { overviewCopy } from '../content/overview-copy';
import { fieldToFinanceCopy } from '../content/field-to-finance-copy';
import { storyCopy, storyShared } from '../story-i18n';
import { experienceCopy } from '../content/experience-copy';

// A self-contained reading/printing download. No scripts, external fonts or images.
const documentStyle = `
  *{box-sizing:border-box}body{margin:0;background:#f0eee6;color:#18221e;font:16px/1.8 system-ui,sans-serif}
  main{max-width:980px;margin:auto;padding:48px 36px}header{border-bottom:2px solid #8b7740;padding-bottom:26px}
  h1,h2{font-family:Georgia,serif;font-weight:400;line-height:1.25}h1{font-size:42px;margin:20px 0}h2{font-size:30px;margin:36px 0 18px}
  h3{font-size:19px;line-height:1.5;margin:22px 0 9px}p{margin:9px 0}a{color:#254f3d;overflow-wrap:anywhere}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:14px 30px}.grid article{border-top:1px solid #b5bdad}
  aside{border-top:1px solid #8b7740;background:#e6e4d8;padding:18px 24px;margin:24px 0}
  li{padding:0 0 14px 8px}li h3{margin-bottom:4px}.note,footer{font-size:14px}footer{border-top:1px solid #b5bdad;margin-top:32px;padding-top:22px}
  @media(max-width:600px){main{padding:28px 22px}.grid{grid-template-columns:1fr}h1{font-size:32px}h2{font-size:26px}}
  @media print{@page{margin:18mm}body{background:white;font-size:11pt;line-height:1.6}main{max-width:none;padding:0}h1{font-size:26pt}h2{font-size:20pt;break-after:avoid}h3{font-size:13pt;break-after:avoid}article,aside,li{break-inside:avoid}a{color:inherit}.note,footer{font-size:10pt}}
`;

export function OverviewDocument({ locale, origin }: { locale: Locale; origin: string }) {
  const copy = overviewCopy[locale];
  const field = fieldToFinanceCopy[locale];
  const t = storyCopy[locale];
  return <html lang={locale}><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><meta name="robots" content="noindex, nofollow"/><title>{`${storyShared.brand} | ${copy.nav.overview}`}</title><style>{documentStyle}</style></head><body><main>
    <header><a href={`${origin}/${locale}`}>{storyShared.brand}</a><h1>{field.headline}</h1><p>{copy.hero}</p></header>
    <p>{copy.overview.body}</p><aside><h3>{copy.overview.status}</h3><p>{copy.overview.statusBody}</p></aside>
    <h3>{experienceCopy[locale].reading.definitionTitle}</h3><p>{experienceCopy[locale].reading.definitionBody}</p>
    <h2>{copy.process.title}</h2><p>{copy.process.body}</p><div className="grid">{copy.process.engines.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
    <h2>{field.title}</h2><p>{field.body}</p><h3>{field.comparisonTitle}</h3><div className="grid">{field.comparison.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
    <h2>{field.journeyTitle}</h2><ol>{field.journey.map(item => <li key={item.title}><h3>{item.title}</h3><p>{item.body}</p></li>)}</ol>
    <aside><h3>{field.rightsTitle}</h3><p>{field.rights}</p><p className="note">{field.risk}</p></aside>
    <h2>{field.rolesTitle}</h2><div className="grid">{field.roles.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
    <h2>{copy.grain.title}</h2><p>{copy.grain.body}</p><h3>{copy.grain.evidenceTitle}</h3><p>{copy.grain.evidenceBody}</p><p className="note">{copy.grain.note}</p>
    <h2>{copy.grain.structuresTitle}</h2>{copy.grain.structures.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}
    <h2>{copy.grain.more}</h2>{copy.grain.concepts.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}
    <h2>{copy.company.title}</h2><p>{copy.company.body}</p><h3>{copy.company.partnershipTitle}</h3><p>{copy.company.partnershipBody}</p><p>{copy.company.shareholderBody}</p><p>{t.footer.bin} {storyShared.bin} · <a href={storyShared.registerUrl}>{t.footer.register}</a></p><p><a href={storyShared.licenceRecordUrl}>{copy.company.licence}: AFSA-A-LA-2026-0014</a></p><p>{copy.company.recordNote}</p>
    <h2>{copy.enquiry.title}</h2><p>{copy.enquiry.nextBody}</p><p><a href={storyShared.emailHref}>{storyShared.email}</a></p>
    <footer><p>{t.footer.illustration}</p><p>{t.footer.eligibility}</p><p>{t.footer.concepts}</p><p>{t.footer.terrainNote}</p></footer>
  </main></body></html>;
}
