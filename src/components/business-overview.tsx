import type { MouseEvent } from 'react';
import type { Locale } from '../i18n';
import { overviewCopy } from '../content/overview-copy';
import { publicSiteCopy, companyFacts } from '../content/public-site-copy';
import { fieldToFinanceCopy } from '../content/field-to-finance-copy';
import { storyCopy, storyShared, type SceneKey } from '../story-i18n';
import { EngineDiagram } from './engine-diagram';
import { AudiencePaths } from './audience-paths';
import { experienceCopy } from '../content/experience-copy';
import { BrandMonogram, DisclosureMark, LinkArrow } from './brand-details';
import { EditorialPhoto } from './editorial-photo';
import media from '../content/story-media.json';
import timing from '../content/story-timing.json';
import { trackPublicEvent } from '../lib/public-events';

type Props = { locale: Locale; onStory: (event: MouseEvent<HTMLAnchorElement>) => void; onContact: (event: MouseEvent<HTMLAnchorElement>, role?: string) => void };

export function BusinessOverview({ locale, onStory, onContact }: Props) {
  const p = publicSiteCopy[locale], copy = overviewCopy[locale], field = fieldToFinanceCopy[locale], experience = experienceCopy[locale], t = storyCopy[locale];
  return <div className="business-overview public-overview">
    <section id="overview" className="public-hero" aria-labelledby="overview-title">
      <div className="hero-message"><h2 id="overview-title" tabIndex={-1}>{p.hero}</h2><p className="hero-intro">{p.intro}</p>
        <div className="hero-actions"><a className="audience-cta" href="#contact" onClick={onContact}>{p.primary}<LinkArrow/></a><a className="text-link" href="#infrastructure">{p.secondary}<LinkArrow down/></a></div>
        <p className="hero-stage">{p.stage}</p>
      </div>
      <figure className="hero-scene"><img src={media.poster} alt="" fetchPriority="high" width="1600" height="900"/><figcaption>{p.heroImage}</figcaption><a id="open-story" className="story-invitation" href="#cinema" onClick={onStory}>{p.story}<LinkArrow/></a></figure>
    </section>
    <section className="credibility-strip" aria-label={p.stage}>
      <div><h2>{p.licenceLabel}</h2><a href={storyShared.licenceRecordUrl} target="_blank" rel="noopener noreferrer">{companyFacts.licence}<LinkArrow/></a><p lang="en">{companyFacts.institution}</p></div>
      <div><h2>{p.stageLabel}</h2><p>{p.stageBody}</p></div>
      <div><h2>{p.shareholderLabel}</h2><p>{p.shareholderShort}</p><a className="text-link" href="#company">{t.footer.company}<LinkArrow down/></a></div>
    </section>
    <section id="assets" className="overview-section public-applications" aria-labelledby="protocols-title">
      <div className="section-heading split-heading"><h2 id="protocols-title" tabIndex={-1}>{p.applications}</h2><p className="section-lead">{p.applicationsIntro}</p></div>
      <div className="application-pair">{field.comparison.map((item, index) => <article key={item.title}>
        <figure><EditorialPhoto subject={index === 0 ? 'field' : 'grain'}/><figcaption>{experience.illustration} · {index === 0 ? experience.fieldCaption : experience.grainCaption}</figcaption></figure>
        <h3>{item.title}</h3><p>{item.body}</p>
      </article>)}</div>
      <details className="supporting-detail comparison-detail"><summary>{experience.reading.comparisonDetails}<DisclosureMark/></summary><div className="comparison-register">{field.comparison.map((item, index) => <div key={item.title}><h4>{item.title}</h4><dl>{experience.comparison.labels.map((label, row) => <div key={label}><dt>{label}</dt><dd>{experience.comparison.values[index][row]}</dd></div>)}</dl></div>)}</div></details>
      <p className="application-permissions">{p.permissions}</p>
    </section>
    <section id="verification" className="overview-section public-verification" aria-labelledby="verification-title">
      <div className="verification-opening"><div className="section-heading"><h2 id="verification-title" tabIndex={-1}>{p.verification}</h2><p className="section-lead">{p.verificationIntro}</p><p className="methodology-note">{p.methodology}</p></div>
        <ol className="verification-register">{p.evidence.map((item, index) => <li key={item.title}><span aria-hidden="true">0{index + 1}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}</ol></div>
      <div className="evidence-boundaries"><article><h3>{p.storageTitle}</h3><p>{p.storageBody}</p><p>{p.storageDocuments}</p></article><article><h3>{p.solanaTitle}</h3><p>{p.solanaBody}</p></article></div>
    </section>
    <section id="infrastructure" className="overview-section public-lifecycle" aria-labelledby="infrastructure-title">
      <div className="section-heading"><h2 id="infrastructure-title" tabIndex={-1}>{field.journeyTitle}</h2><p className="section-lead">{field.body}</p></div>
      <ol className="field-journey">{field.journey.map((item, index) => <li key={item.title}><span className="journey-marker" aria-hidden="true">0{index + 1}</span><div className="journey-description"><h3>{item.title}</h3><p>{item.body}</p></div></li>)}</ol>
      <aside className="instrument-rights"><h3>{field.rightsTitle}</h3><p>{field.rights}</p><p className="protocol-risk">{field.risk}</p></aside>
      <details className="supporting-detail journey-detail"><summary>{experience.reading.journeyDetails}<DisclosureMark/></summary><ol className="evidence-register">{field.journey.map((item, index) => <li key={item.title}><h4>{item.title}</h4><dl className="journey-evidence"><div><dt>{experience.journey.who}</dt><dd>{experience.journey.actors[index]}</dd></div><div><dt>{experience.journey.evidence}</dt><dd>{experience.journey.outputs[index]}</dd></div></dl></li>)}</ol></details>
      <details className="supporting-detail"><summary>{field.rolesTitle}<DisclosureMark/></summary><dl className="role-grid">{field.roles.map(item => <div key={item.title}><dt>{item.title}</dt><dd>{item.body}</dd></div>)}</dl></details>
    </section>
    <section id="participation" className="overview-section overview-intro public-participation" aria-labelledby="participation-title">
      <div className="section-heading"><h2 id="participation-title" tabIndex={-1}>{p.participation}</h2></div><AudiencePaths locale={locale} onContact={onContact}/>
      <div className="overview-download"><a href={`/downloads/commoditychain-overview-${locale}.html`} download={`commoditychain-overview-${locale}.html`} onClick={()=>trackPublicEvent('overview_access', locale)}>{copy.download}<LinkArrow down/></a><span>{copy.downloadFormat}</span></div>
    </section>
    <section id="company" className="overview-section overview-company" aria-labelledby="company-title">
      <div className="section-heading"><h2 id="company-title" tabIndex={-1}>{p.company}</h2></div>
      <article className="innovation-partnership" aria-labelledby="partnership-title"><BrandMonogram className="partnership-watermark"/><div className="partnership-identity"><img className="techhub-logo" src="/assets/techhub-transparent.png" alt="C Tech" width="1949" height="807" loading="lazy"/><span className="partner-name" lang="en">AIFC TechHub</span></div><div className="partnership-content"><h3 id="partnership-title">{p.partnershipTitle}</h3><p>{p.shareholderBody}</p><p className="partnership-qualification">{p.partnershipNote}</p></div></article>
      <div className="company-records"><article><h3 lang="en">{companyFacts.legalName}</h3><p>{t.footer.bin} {companyFacts.bin}</p><p>{p.stageBody}</p><a href={storyShared.registerUrl} target="_blank" rel="noopener noreferrer">{t.footer.register}<LinkArrow/></a></article>
        <article className="licence-record"><h3>{p.licenceLabel}</h3><p className="licence-number">{companyFacts.licence}</p><p>{p.scope}</p><dl className="licence-dates"><div><dt>{p.institution}</dt><dd lang="en">{companyFacts.institution}</dd></div><div><dt>{p.issued}</dt><dd><time dateTime={companyFacts.issued}>{companyFacts.issued}</time></dd></div><div><dt>{p.expires}</dt><dd><time dateTime={companyFacts.expires}>{companyFacts.expires}</time></dd></div></dl><p>{p.certificateNote}</p><a href={storyShared.licenceRecordUrl} target="_blank" rel="noopener noreferrer">{t.footer.licence}<LinkArrow/></a></article></div>
    </section>
    <section id="faq" className="overview-section public-faq" aria-labelledby="faq-title"><div className="section-heading"><h2 id="faq-title" tabIndex={-1}>{p.faq}</h2></div><div>{p.questions.map(item => <details className="supporting-detail" key={item.title}><summary>{item.title}<DisclosureMark/></summary><p>{item.body}</p></details>)}</div></section>
  </div>;
}

export function DeeperOverview({ locale, onStory }: Pick<Props, 'locale' | 'onStory'>) {
  const p = publicSiteCopy[locale], copy = overviewCopy[locale], experience = experienceCopy[locale], t = storyCopy[locale];
  return <section id="deeper" className="business-overview overview-section overview-infrastructure public-deeper" aria-labelledby="deeper-title"><div className="section-heading"><h2 id="deeper-title" tabIndex={-1}>{p.deeper}</h2></div>
    <details className="supporting-detail infrastructure-detail"><summary>{copy.process.title}<DisclosureMark/></summary><div className="detail-content"><p>{copy.process.body}</p><EngineDiagram locale={locale}/><h3>{experience.reading.definitionTitle}</h3><p>{experience.reading.definitionBody}</p><ol className="process-grid">{copy.process.steps.map(item=><li key={item.title}><h4>{item.title}</h4><p>{item.body}</p></li>)}</ol></div></details>
    <details className="supporting-detail grain-detail"><summary>{experience.reading.grainDetails}<DisclosureMark/></summary><div className="detail-content"><p>{copy.grain.body}</p><dl className="grain-facts">{copy.grain.facts.map(item=><div key={item.title}><dt>{item.title}</dt><dd>{item.body}</dd></div>)}</dl><h3>{copy.grain.evidenceTitle}</h3><p>{copy.grain.evidenceBody}</p><h3>{copy.grain.structuresTitle}</h3>{copy.grain.structures.map(item=><article key={item.title}><h4>{item.title}</h4><p>{item.body}</p></article>)}</div></details>
    <details className="supporting-detail"><summary>{p.future}<DisclosureMark/></summary><div className="detail-content"><p>{p.futureNote}</p>{copy.grain.concepts.map(item=><article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></details>
    <details id="full-story-text" className="supporting-detail"><summary>{p.transcript}<DisclosureMark/></summary><div className="detail-content">{timing.captions.map(item=><article key={item.key}><h3>{t.scenes[item.key as SceneKey].headline}</h3><p>{t.scenes[item.key as SceneKey].body}</p></article>)}</div></details>
    <div className="deeper-return"><a className="text-link" href="#cinema" onClick={onStory}>{p.story}<LinkArrow/></a></div>
  </section>;
}
