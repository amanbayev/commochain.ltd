import type { Locale } from '../i18n';
import { overviewCopy } from '../content/overview-copy';
import { experienceCopy } from '../content/experience-copy';

export function EngineDiagram({ locale }: { locale: Locale }) {
  const engines = overviewCopy[locale].process.engines;
  const copy = experienceCopy[locale].architecture;
  return <figure className="engine-diagram" aria-describedby="engine-model-note">
    <figcaption id="engine-model-note" className="diagram-caption"><span className="diagram-dot" aria-hidden="true"/>{copy.note}</figcaption>
    {[{ engine: engines[1], steps: copy.protocols, kind: 'protocols' }, { engine: engines[0], steps: copy.market, kind: 'market' }].map(({ engine, steps, kind }, index) => <div className="engine-lane-group" key={kind}>
      {index === 1 && <div className="engine-connection"><span aria-hidden="true"/>{copy.connection}<span aria-hidden="true"/></div>}
      <article className={`engine-lane engine-lane-${kind}`}>
        <div className="engine-identity"><h3>{engine.title}</h3><p>{engine.body}</p></div>
        <ol className="engine-nodes" aria-label={engine.title}>{steps.map((step, stepIndex) => <li key={step}><span aria-hidden="true">{String(stepIndex + 1).padStart(2, '0')}</span><p>{step}</p></li>)}</ol>
      </article>
    </div>)}
    <div className="engine-foundation"><p>{copy.foundation}</p><ul>{copy.roles.map(role => <li key={role}>{role}</li>)}</ul></div>
  </figure>;
}
