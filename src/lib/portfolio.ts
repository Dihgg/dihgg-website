import type { Locale } from '@/types';
import { getCollection } from 'astro:content';

/**
 * Returns work history entries for a locale sorted from most recent to oldest.
 */
export async function getWorkItems(locale: Locale) {
  const items = await getCollection('work', ({ data }) => data.locale === locale);
  return items.sort((a, b) => {
    const aYear = b.data.yearIn;
    const bYear = a.data.yearIn;
    return aYear - bYear;
  });
}

/**
 * Returns skills ordered by their configured display sort order.
 */
export async function getSkills() {
  const items = await getCollection('skills');
  return items.sort((a, b) => a.data.sortOrder - b.data.sortOrder);
}

/**
 * Returns projects for a locale ordered by their configured display sort order.
 */
export async function getProjects(locale: Locale) {
  const items = await getCollection('projects', ({ data }) => data.locale === locale);
  return items.sort((a, b) => a.data.sortOrder - b.data.sortOrder);
}
