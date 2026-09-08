import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { StoryPage } from './components/story-page';
import { isLocale, type Locale } from './i18n';
import { storyCopy } from './story-i18n';
import './story.css';
import './overview.css';
import './motion.css';

const candidate = window.location.pathname.split('/').filter(Boolean)[0]?.replace(/\.html$/, '') || '';
const documentLocale = document.documentElement.lang;
const initialLocale = isLocale(candidate) ? candidate : isLocale(documentLocale) ? documentLocale : 'kk';

function changeLocale(locale: Locale) {
  // Static hosting has no router to remount the video or reset scroll position.
  window.history.replaceState(null, '', `/${locale}${window.location.search}${window.location.hash}`);
  const origin = document.querySelector<HTMLMetaElement>('meta[name="site-origin"]')?.content || window.location.origin;
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (canonical) canonical.href = `${origin}/${locale}`;
  const values: Record<string,string> = {
    'og:title': storyCopy[locale].metadata.title,
    'og:description': storyCopy[locale].metadata.description,
    'og:url': `${origin}/${locale}`,
    'og:locale': { kk: 'kk_KZ', ru: 'ru_RU', en: 'en_US' }[locale],
  };
  for (const [property, content] of Object.entries(values)) {
    document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)?.setAttribute('content', content);
  }
}

const root = document.getElementById('root')!;
const app = <StoryPage initialLocale={initialLocale} onLocaleChange={changeLocale} />;
if (root.children.length) hydrateRoot(root, app);
else createRoot(root).render(app);
