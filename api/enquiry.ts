import { handleEnquiry, type EnquiryDependencies } from '../packages/enquiries/service.ts';
import { resendDelivery, redisEnquiryGuard } from '../packages/adapters/enquiry.ts';

// No secrets are referenced by frontend code. Missing or invalid setup fails closed.
export function configuredEnquiry(env: NodeJS.ProcessEnv): EnquiryDependencies | null {
  if (env.ENQUIRY_ENABLED !== 'true' || !env.RESEND_API_KEY || !env.ENQUIRY_FROM || !env.ENQUIRY_REDIS_URL || !env.ENQUIRY_REDIS_TOKEN || !env.ENQUIRY_HMAC_SECRET || env.ENQUIRY_HMAC_SECRET.length < 32 || !env.ENQUIRY_ALLOWED_ORIGINS) return null;
  const origins = env.ENQUIRY_ALLOWED_ORIGINS.split(',').map(v=>v.trim()).filter(Boolean);
  try {
    if (new URL(env.ENQUIRY_REDIS_URL).protocol !== 'https:' || !origins.length || origins.some(value=>new URL(value).origin!==value || new URL(value).protocol!=='https:')) return null;
  } catch { return null; }
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(env.ENQUIRY_FROM)) return null;
  return {delivery:resendDelivery(env.RESEND_API_KEY,env.ENQUIRY_FROM),guard:redisEnquiryGuard(env.ENQUIRY_REDIS_URL,env.ENQUIRY_REDIS_TOKEN),secret:env.ENQUIRY_HMAC_SECRET,origins};
}
export default { fetch(request: Request) {
  // Vercel sets this trusted edge header; anonymous fallback shares a strict global bucket.
  const client = process.env.VERCEL ? request.headers.get('x-vercel-forwarded-for') || 'unknown' : 'local';
  return handleEnquiry(request, configuredEnquiry(process.env), client);
} };
