import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { StoryPage } from './components/story-page';
import { OverviewDocument } from './components/overview-document';
import { type Locale } from './i18n';
export function renderLocale(locale: Locale) {
  return renderToString(<StoryPage initialLocale={locale} />);
}

export function renderOverviewDocument(locale: Locale, origin: string) {
  return '<!doctype html>' + renderToStaticMarkup(<OverviewDocument locale={locale} origin={origin}/>);
}
