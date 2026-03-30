import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../data/siteContent';

export type BlogPost = CollectionEntry<'blog'>;

// Extract filename from nested slug (e.g., "pt-BR/primeiro-post" -> "primeiro-post")
function getSlugName(slug: string): string {
  const parts = slug.split('/');
  return parts.length > 1 ? parts[parts.length - 1] : slug;
}

export function getBlogPostPath(post: BlogPost) {
  const slugName = getSlugName(post.slug);
  return post.data.locale === 'en' ? `/en/blog/${slugName}/` : `/blog/${slugName}/`;
}

export async function getAllBlogPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getBlogPosts(locale: Locale) {
  const posts = await getCollection('blog', ({ data }) => !data.draft && data.locale === locale);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getLocalizedBlogStaticPaths(locale: Locale, alternateLocale: Locale) {
  const [posts, alternatePosts] = await Promise.all([
    getBlogPosts(locale),
    getBlogPosts(alternateLocale)
  ]);

  return posts.map((post) => {
    const slugName = getSlugName(post.slug);
    const alternatePost = alternatePosts.find(
      (candidate) => candidate.data.translationKey === post.data.translationKey
    ) ?? null;
    
    return {
      params: { slug: slugName },
      props: {
        post,
        alternatePost
      }
    };
  });
}