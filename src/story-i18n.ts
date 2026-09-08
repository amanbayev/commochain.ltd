import copy from './content/commochain-copy.kk-ru-en.json';
import { type Locale } from './i18n';

// The supplied draft stays intact. Only public display values are exported to the page.
export const storyCopy = copy.locales;
export const storyShared = copy.shared;
export const storyLocaleOrder = copy.shared.localeOrder as Locale[];
export type SceneKey = keyof typeof copy.locales.en.scenes;
