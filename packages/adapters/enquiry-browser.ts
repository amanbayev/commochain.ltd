import type { EnquiryPayload } from '../contracts/enquiry.ts';
export async function enquiryAvailability(signal?: AbortSignal): Promise<boolean> {
  try { const response=await fetch('/api/enquiry',{signal,cache:'no-store'}); if(!response.ok)return false; const data=await response.json(); return data.available===true; } catch { return false; }
}
export async function sendEnquiry(payload: EnquiryPayload): Promise<{accepted:boolean;fields?:string[];error?:string}> {
  const response = await fetch('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(15000)});
  const result = await response.json();
  return {accepted:response.status===202 && result.status==='accepted' && result.eventId===payload.eventId,fields:Array.isArray(result.fields)?result.fields:undefined,error:typeof result.error==='string'?result.error:undefined};
}
