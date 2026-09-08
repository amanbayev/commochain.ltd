export const enquiryRoles = ['farmer', 'investor', 'warehouse', 'other'] as const;
export type EnquiryRole = typeof enquiryRoles[number];
export type EnquiryPayload = {
  name: string; email: string; organisation: string; role: EnquiryRole; message: string;
  locale: 'en' | 'ru' | 'kk'; consent: boolean; website: string;
  eventId: string; nonce: string; createdAt: string;
};
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export function validateEnquiry(value: unknown, now = Date.now()): string[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return ['request'];
  const v = value as Record<string, unknown>, errors: string[] = [];
  const limits = { name: [1,100], email: [3,254], organisation: [0,160], message: [10,1500] };
  for (const [key, [min, max]] of Object.entries(limits)) {
    const item = v[key];
    if (typeof item !== 'string' || item.trim().length < min || item.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(item)) errors.push(key);
  }
  if (typeof v.email !== 'string' || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(v.email) || /[\r\n]/.test(v.email)) errors.push('email');
  if (!enquiryRoles.includes(v.role as EnquiryRole)) errors.push('role');
  if (!['en','ru','kk'].includes(v.locale as string)) errors.push('locale');
  if (v.consent !== true) errors.push('consent');
  if (v.website !== '') errors.push('website');
  for (const key of ['eventId','nonce']) if (typeof v[key] !== 'string' || !uuid.test(v[key] as string)) errors.push('request');
  const timestamp = typeof v.createdAt === 'string' ? Date.parse(v.createdAt) : NaN;
  if (!Number.isFinite(timestamp) || timestamp > now + 30_000 || now - timestamp > 600_000) errors.push('request');
  if (Object.keys(v).some(key=>!['name','email','organisation','role','message','locale','consent','website','eventId','nonce','createdAt'].includes(key))) errors.push('request');
  return [...new Set(errors)];
}
