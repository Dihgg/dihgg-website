import { defineCollection, z } from 'astro:content';
import { LOCALES } from '@/i18n/config';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    featuredImage: z.string().optional(),
    featuredImageAlt: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    locale: z.enum(LOCALES),
    translationKey: z.string()
  })
});

const work = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    logo: z.string(),
    role: z.string(),
    yearIn: z.number(),
    yearOut: z.number().optional(),
    summary: z.string(),
    locale: z.enum(LOCALES)
  })
});

const skills = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    category: z.string(),
    sortOrder: z.number().default(0)
  })
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    stack: z.string(),
    links: z.array(z.object({
      label: z.string(),
      href: z.string().url(),
      icon: z.string().optional()
    })).optional(),
    locale: z.enum(LOCALES),
    sortOrder: z.number().default(0)
  })
});

export const collections = { blog, work, skills, projects };
