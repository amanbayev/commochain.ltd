export const locales = ['kk', 'ru', 'en', 'zh'] as const;
export type Locale = typeof locales[number];
export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
