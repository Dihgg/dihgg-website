import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../data/siteContent';

export type WorkItem = CollectionEntry<'work'>;
export type SkillItem = CollectionEntry<'skills'>;
export type ProjectItem = CollectionEntry<'projects'>;

// Work items
export async function getWorkItems(locale: Locale) {
  const items = await getCollection('work', ({ data }) => data.locale === locale);
  return items.sort((a, b) => {
    // Try to parse years from period for sorting (most recent first)
    const aYear = parseInt(b.data.period.split('-')[0]);
    const bYear = parseInt(a.data.period.split('-')[0]);
    return aYear - bYear;
  });
}

// Skills
export async function getSkills() {
  const items = await getCollection('skills');
  return items.sort((a, b) => a.data.sortOrder - b.data.sortOrder);
}

// Projects
export async function getProjects(locale: Locale) {
  const items = await getCollection('projects', ({ data }) => data.locale === locale);
  return items.sort((a, b) => a.data.sortOrder - b.data.sortOrder);
}
