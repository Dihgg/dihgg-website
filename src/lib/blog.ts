import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../data/siteContent';

export type BlogPost = CollectionEntry<'blog'>;

export function getBlogPostPath(post: BlogPost) {
  return post.data.locale === 'en' ? `/en/blog/${post.slug}/` : `/blog/${post.slug}/`;
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

  return posts.map((post) => ({
    params: { slug: post.slug },
    props: {
      post,
      alternatePost: alternatePosts.find(
        (candidate) => candidate.data.translationKey === post.data.translationKey
      ) ?? null
    }
  }));
}