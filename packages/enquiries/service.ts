import { createHmac } from 'node:crypto';
import { validateEnquiry, type EnquiryPayload } from '../contracts/enquiry.ts';
import type { EnquiryDelivery, EnquiryGuard } from '../adapters/enquiry.ts';
export type EnquiryDependencies = { delivery: EnquiryDelivery; guard: EnquiryGuard; secret: string; origins: string[] };
const json = (status: number, body: object) => Response.json(body, {status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...(status===429?{'Retry-After':'600'}:{}),...(status===409?{'Retry-After':'30'}:{})}});
export async function handleEnquiry(request: Request, dependencies: EnquiryDependencies | null, client = 'unknown'): Promise<Response> {
  if (request.method === 'GET') return json(200,{available:!!dependencies});
  if (request.method !== 'POST') return json(405,{error:'method_not_allowed'});
  if (!dependencies) return json(503,{error:'not_configured'});
  if (!dependencies.origins.includes(request.headers.get('origin') || '')) return json(403,{error:'origin_not_allowed'});
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return json(415,{error:'json_required'});
  const length = Number(request.headers.get('content-length') || 0);
  if (length > 8192) return json(413,{error:'request_too_large'});
  let raw = '';
  try {
    const reader = request.body?.getReader(); if (!reader) return json(400,{error:'invalid_request'});
    const decoder = new TextDecoder('utf-8',{fatal:true}); let size = 0;
    for (;;) { const {done,value} = await reader.read(); if(done) break; size += value.byteLength;
      if(size>8192) { await reader.cancel(); return json(413,{error:'request_too_large'}); } raw += decoder.decode(value,{stream:true}); }
    raw += decoder.decode();
  } catch { return json(400,{error:'invalid_request'}); }
  let data: EnquiryPayload;
  try { data = JSON.parse(raw); } catch { return json(400,{error:'invalid_request'}); }
  const fields = validateEnquiry(data);
  if (fields.length) return json(400,{error:'invalid_fields',fields});
  const hash = (text: string) => createHmac('sha256',dependencies.secret).update(text).digest('hex');
  // Stable canonical ordering. Never persist raw content, email, or the client address.
  const digest = hash(JSON.stringify([data.eventId,data.nonce,data.createdAt,data.name,data.email,data.organisation,data.role,data.message,data.locale,data.consent]));
  try {
    if (!(await dependencies.guard.checkRate(hash(client)))) return json(429,{error:'rate_limited'});
    const claim = await dependencies.guard.acquire(data.eventId,digest);
    if (claim === 'accepted') return json(202,{status:'accepted',eventId:data.eventId});
    if (claim === 'pending' || claim === 'conflict') return json(409,{error:claim});
  } catch { return json(503,{error:'protection_unavailable'}); }
  try {
    await dependencies.delivery.accept(data);
    await dependencies.guard.accepted(data.eventId,digest);
    return json(202,{status:'accepted',eventId:data.eventId});
  } catch { return json(502,{error:'acceptance_unconfirmed'}); }
}
