import React from 'react';
import { renderToString } from 'react-dom/server';
import { StoryPage } from './components/story-page';
import { type Locale } from './i18n';
export function renderLocale(locale: Locale) {
  return renderToString(<StoryPage initialLocale={locale} />);
}
