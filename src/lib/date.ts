import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import type { Locale } from '../data/translations';

const localeMap = {
  'pt-BR': ptBR,
  'en': enUS
} as const;

const formatMap = {
  'pt-BR': 'dd/MM/yyyy',
  'en': 'MMM d, yyyy'
} as const;

/**
 * Format a blog post date in UTC using date-fns locale formatting.
 * Accepts either a Locale key or a BCP-47 string from siteContent.dateLocale.
 */
export function formatPostDate(date: Date, locale: Locale | string): string {
  // Normalise: dateLocale strings like 'en-US' map back to our Locale keys
  const key: Locale = (locale === 'en-US' || locale === 'en') ? 'en' : 'pt-BR';

  // Use UTC date parts to avoid timezone-shift (dates are stored as midnight UTC)
  const utcDate = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  );

  return format(utcDate, formatMap[key], { locale: localeMap[key] });
}
