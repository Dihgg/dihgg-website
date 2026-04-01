import { type CollectionEntry } from 'astro:content';
export type { Locale } from '@/i18n/config';

/** Represents a blog post entry in the content collection. */
export type BlogPost = CollectionEntry<'blog'>;
/** Represents a work item entry in the content collection. */
export type WorkItem = CollectionEntry<'work'>;
/** Represents a skill item entry in the content collection. */
export type SkillItem = CollectionEntry<'skills'>;
/** Represents a project item entry in the content collection. */
export type ProjectItem = CollectionEntry<'projects'>;

/**
 * External links.
 */
export type SocialLink = {
  label: string;
  href: string;
  icon: 'GitHub' | 'LinkedIn' | 'Mail';
};