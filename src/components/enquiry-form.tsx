import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { Locale } from '../i18n';
import { overviewCopy } from '../content/overview-copy';
import { storyCopy, storyShared } from '../story-i18n';
import { enquiryMailto, formatEnquiry, type Enquiry } from '../lib/enquiry';

export function EnquiryForm({ locale }: { locale: Locale }) {
  const copy = overviewCopy[locale].enquiry;
  const [interactive, setInteractive] = useState(false);
  useEffect(() => { setInteractive(true); }, []);
  const [prepared, setPrepared] = useState<Enquiry | null>(null);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const draftRef = useRef<HTMLTextAreaElement>(null);
  const draft = prepared ? formatEnquiry(prepared, copy) : '';
  const mailto = enquiryMailto(storyShared.email, storyCopy[locale].contact.subject, draft);

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    for (const key of ['name', 'email', 'organisation', 'project']) {
      const input = form.elements.namedItem(key) as HTMLInputElement | HTMLTextAreaElement;
      input.setCustomValidity(input.value.trim() ? '' : copy[key as keyof Enquiry]);
    }
    if (!form.reportValidity()) return;
    const values = Object.fromEntries(['name', 'email', 'organisation', 'project'].map(key => [key, String(data.get(key) || '').trim()])) as Enquiry;
    setPrepared(values);
    setCopyState('idle');
    // The visitor reviews a draft before explicitly opening their mail app.
    requestAnimationFrame(() => draftRef.current?.focus({ preventScroll: true }));
  }

  async function copyDraft() {
    try { await navigator.clipboard.writeText(draft); setCopyState('copied'); }
    catch { setCopyState('failed'); draftRef.current?.focus(); draftRef.current?.select(); }
  }

  return <div className="enquiry-panel">
    <form className="enquiry-form" onSubmit={prepare} onInput={event => {
      const input = event.target;
      if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) input.setCustomValidity('');
      setPrepared(null); setCopyState('idle');
    }}>
      <h3>{copy.title}</h3><p>{copy.body}</p>
      <fieldset className="enquiry-fields" disabled={!interactive}>
        <label htmlFor="enquiry-name">{copy.name}<input id="enquiry-name" name="name" autoComplete="name" maxLength={100} required/></label>
        <label htmlFor="enquiry-email">{copy.email}<input id="enquiry-email" name="email" type="email" autoComplete="email" maxLength={254} required/></label>
        <label className="field-wide" htmlFor="enquiry-organisation">{copy.organisation}<input id="enquiry-organisation" name="organisation" autoComplete="organization" maxLength={160} required/></label>
        <label className="field-wide" htmlFor="enquiry-project">{copy.project}<textarea id="enquiry-project" name="project" rows={4} maxLength={1500} placeholder={copy.placeholder} required/></label>
      </fieldset>
      <button className="enquiry-submit" type="submit" disabled={!interactive} aria-describedby="enquiry-notice">{copy.submit}<span className="css-arrow" aria-hidden="true"/></button>
      <p className="enquiry-notice" id="enquiry-notice">{copy.notice}</p>
    </form>
    <noscript><style>{'.enquiry-form{display:none!important}'}</style><a className="text-link" href={storyShared.emailHref}>{storyCopy[locale].ui.emailLinkLabel}: {storyShared.email}</a></noscript>
    {prepared && <div className="enquiry-result">
      <p role="status">{copy.prepared}</p>
      <label htmlFor="enquiry-draft">{copy.draft}</label><textarea id="enquiry-draft" ref={draftRef} value={draft} readOnly rows={6}/>
      <div className="enquiry-actions"><a className="text-link" href={mailto}>{storyCopy[locale].ui.emailLinkLabel}<span aria-hidden="true"> ↗</span></a><button onClick={copyDraft}>{copy.copy}</button></div>
      <p role="status">{copyState === 'copied' ? copy.copied : copyState === 'failed' ? copy.copyFailed : ''}</p>
    </div>}
  </div>;
}
