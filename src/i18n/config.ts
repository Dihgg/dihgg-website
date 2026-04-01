export const LOCALES = ['pt-BR', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'pt-BR';
export const EN_LOCALE: Locale = 'en';

export function getAlternateLocale(locale: Locale): Locale {
  return locale === DEFAULT_LOCALE ? EN_LOCALE : DEFAULT_LOCALE;
}

export const SITEMAP_LOCALES: Record<Locale, string> = {
  'pt-BR': 'pt-BR',
  en: 'en'
};
