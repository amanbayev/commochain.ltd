import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { Locale } from '../i18n';
import { overviewCopy } from '../content/overview-copy';
import { enquiryCopy } from '../content/enquiry-copy';
import { storyCopy, storyShared } from '../story-i18n';
import { enquiryMailto, formatEnquiry, type Enquiry } from '../lib/enquiry';
import { LinkArrow } from './brand-details';
import { enquiryRoles, validateEnquiry, type EnquiryPayload, type EnquiryRole } from '../../packages/contracts/enquiry';
import { enquiryAvailability, sendEnquiry } from '../../packages/adapters/enquiry-browser';
import { trackPublicEvent } from '../lib/public-events';

export function EnquiryForm({ locale, category='other' }: { locale: Locale; category?: string }) {
  const copy = overviewCopy[locale].enquiry, e = enquiryCopy[locale];
  const [interactive,setInteractive] = useState(false), [online,setOnline] = useState(false);
  const [role,setRole] = useState<EnquiryRole>('other');
  const [prepared,setPrepared] = useState<Enquiry|null>(null);
  const [copyState,setCopyState] = useState<'idle'|'copied'|'failed'>('idle');
  const [status,setStatus] = useState<'idle'|'pending'|'accepted'|'failed'>('idle');
  const [errors,setErrors] = useState<string[]>([]);
  const draftRef=useRef<HTMLTextAreaElement>(null), formRef=useRef<HTMLFormElement>(null), resultRef=useRef<HTMLParagraphElement>(null);
  const attemptRef=useRef<EnquiryPayload|null>(null), locked=useRef(false), started=useRef(false);
  useEffect(()=>{const controller=new AbortController();setInteractive(true);void enquiryAvailability(controller.signal).then(value=>{if(!controller.signal.aborted)setOnline(value);});return()=>controller.abort();},[]);
  useEffect(()=>{if(enquiryRoles.includes(category as EnquiryRole)){setRole(category as EnquiryRole);attemptRef.current=null;setPrepared(null);setStatus('idle');}},[category]);
  const draft=prepared?`${e.role}: ${e.roles[role]}\n${formatEnquiry(prepared,copy)}`:'';
  const mailto=enquiryMailto(storyShared.email,storyCopy[locale].contact.subject,draft);
  const reset=()=>{if(locked.current)return;setPrepared(null);setCopyState('idle');setErrors([]);attemptRef.current=null;setStatus('idle');};
  async function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault(); if(locked.current || status==='accepted')return;
    const data=new FormData(event.currentTarget);
    const values=Object.fromEntries(['name','email','organisation','project'].map(key=>[key,String(data.get(key)||'').trim()])) as Enquiry;
    const payload:EnquiryPayload=attemptRef.current || {...values,message:values.project,role,locale,consent:online?data.get('consent')==='on':true,website:String(data.get('website')||''),eventId:crypto.randomUUID(),nonce:crypto.randomUUID(),createdAt:new Date().toISOString()};
    // Do not include the frontend-only project alias in the API contract.
    const clean:EnquiryPayload={name:payload.name,email:payload.email,organisation:payload.organisation,role:payload.role,message:payload.message,locale:payload.locale,consent:payload.consent,website:payload.website,eventId:payload.eventId,nonce:payload.nonce,createdAt:payload.createdAt};
    const issues=validateEnquiry(clean).map(key=>key==='message'?'project':key);
    setErrors(issues);
    if(issues.length){requestAnimationFrame(()=>formRef.current?.querySelector<HTMLElement>('[aria-invalid=true]')?.focus());return;}
    if(!online){setPrepared(values);setCopyState('idle');requestAnimationFrame(()=>draftRef.current?.focus({preventScroll:true}));return;}
    attemptRef.current=clean;locked.current=true;setStatus('pending');
    try { const result=await sendEnquiry(clean);
      if(result.accepted){setStatus('accepted');trackPublicEvent('enquiry_accepted',locale,role);}
      else {setStatus('failed');setErrors((result.fields||[]).map(key=>key==='message'?'project':key));if(result.error==='not_configured')setOnline(false);}
    } catch {setStatus('failed');} finally {locked.current=false;requestAnimationFrame(()=>resultRef.current?.focus({preventScroll:true}));}
  }
  async function copyDraft(){try{await navigator.clipboard.writeText(draft);setCopyState('copied');}catch{setCopyState('failed');draftRef.current?.focus();draftRef.current?.select();}}
  const error=(key:string)=>errors.includes(key)?<span className="field-error" id={`error-${key}`}>{e.fieldError}</span>:null;
  const props=(key:string)=>({'aria-invalid':errors.includes(key)||undefined,'aria-describedby':errors.includes(key)?`error-${key}`:undefined});
  return <div className="enquiry-panel">
    <form ref={formRef} className="enquiry-form" onSubmit={submit} noValidate onInput={reset} onFocus={()=>{if(!started.current){started.current=true;trackPublicEvent('enquiry_start',locale,role);}}}>
      <h3>{copy.title}</h3><p>{copy.body}</p>
      {!online&&<p className="delivery-notice">{e.unavailable}</p>}
      {errors.length>0&&<p className="submission-error" role="alert">{e.invalid}</p>}
      <fieldset className="enquiry-fields" disabled={!interactive||status==='pending'||status==='accepted'}>
        <label htmlFor="enquiry-name">{copy.name}<input id="enquiry-name" name="name" autoComplete="name" maxLength={100} required {...props('name')}/>{error('name')}</label>
        <label htmlFor="enquiry-email">{copy.email}<input id="enquiry-email" name="email" type="email" autoComplete="email" maxLength={254} required {...props('email')}/>{error('email')}</label>
        <label className="field-wide" htmlFor="enquiry-organisation">{copy.organisation} ({e.optional})<input id="enquiry-organisation" name="organisation" autoComplete="organization" maxLength={160} {...props('organisation')}/>{error('organisation')}</label>
        <label className="field-wide" htmlFor="enquiry-role">{e.role}<select id="enquiry-role" name="role" value={role} onChange={event=>{reset();setRole(event.target.value as EnquiryRole);}} {...props('role')}>{enquiryRoles.map(key=><option value={key} key={key}>{e.roles[key]}</option>)}</select>{error('role')}</label>
        <label className="field-wide" htmlFor="enquiry-project">{copy.project}<textarea id="enquiry-project" name="project" rows={4} minLength={10} maxLength={1500} placeholder={copy.placeholder} required {...props('project')}/>{error('project')}</label>
        <label className="enquiry-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>
        {online&&<label className="field-wide consent-label"><input type="checkbox" name="consent" required {...props('consent')}/><span>{e.consent}{error('consent')}</span></label>}
      </fieldset>
      <button className="enquiry-submit" type="submit" disabled={!interactive||status==='pending'||status==='accepted'} aria-describedby="enquiry-notice">{status==='pending'?e.pending:online?(status==='failed'?e.retry:e.send):copy.submit}<LinkArrow/></button>
      <p className="enquiry-notice" id="enquiry-notice">{online?e.privacy:e.fallbackPrivacy}</p>
      {status!=='idle'&&status!=='pending'&&<p ref={resultRef} tabIndex={-1} role="status" className={status==='failed'?'submission-error':''}>{status==='accepted'?e.accepted:e.failed}</p>}
      {status==='accepted'&&<button type="button" className="text-link" onClick={()=>{formRef.current?.reset();reset();}}>{e.newEnquiry}</button>}
      <p className="form-privacy">{e.emailFallback} <a className="text-link" href={storyShared.emailHref}>{storyShared.email}</a></p>
    </form>
    <noscript><style>{'.enquiry-form{display:none!important}'}</style><p>{e.fallbackPrivacy}</p><a className="text-link" href={storyShared.emailHref}>{storyCopy[locale].ui.emailLinkLabel}: {storyShared.email}</a></noscript>
    {prepared&&<div className="enquiry-result"><p role="status">{copy.prepared}</p><label htmlFor="enquiry-draft">{copy.draft}</label><textarea id="enquiry-draft" ref={draftRef} value={draft} readOnly rows={6}/><div className="enquiry-actions"><a className="text-link" href={mailto}>{storyCopy[locale].ui.emailLinkLabel}<LinkArrow/></a><button type="button" data-copy-state={copyState} onClick={copyDraft}>{copy.copy}</button></div><p role="status">{copyState==='copied'?copy.copied:copyState==='failed'?copy.copyFailed:''}</p></div>}
  </div>;
}
