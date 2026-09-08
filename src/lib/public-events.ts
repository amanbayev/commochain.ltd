import type { Locale } from '../i18n';
type PublicEvent = 'audience_selection' | 'story_open' | 'story_skip' | 'overview_access' | 'enquiry_start' | 'enquiry_accepted';
// Inert integration hook, not an activated tracking service. Never accepts form values.
export function trackPublicEvent(name: PublicEvent, locale: Locale, category?: 'farmer' | 'warehouse' | 'investor' | 'other') {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('commoditychain:public-event', { detail: { name, locale, ...(category ? { category } : {}) } }));
}
