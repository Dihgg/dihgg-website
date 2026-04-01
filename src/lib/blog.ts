import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '@/data/siteContent';
import { BLOG_POSTS_PER_PAGE } from '@/lib/constants';

export type BlogPost = CollectionEntry<'blog'>;
export { BLOG_POSTS_PER_PAGE };

// Extract filename from nested slug (e.g., "pt-BR/primeiro-post" -> "primeiro-post")
function getSlugName(slug: string): string {
  const parts = slug.split('/');
  return parts.length > 1 ? parts[parts.length - 1] : slug;
}

export function getBlogPostPath(post: BlogPost) {
  const slugName = getSlugName(post.slug);
  return post.data.locale === 'en' ? `/en/blog/${slugName}/` : `/blog/${slugName}/`;
}

export function getBlogPagePath(locale: Locale, page = 1) {
  const base = locale === 'en' ? '/en/blog/' : '/blog/';
  return page <= 1 ? base : `${base}page/${page}/`;
}

export function getLocalizedBlogIndexHrefs(
  locale: Locale,
  currentPage: number,
  alternatePageCount: number
) {
  const alternatePage = Math.min(currentPage, Math.max(1, alternatePageCount));
  return {
    ptHref: getBlogPagePath('pt-BR', locale === 'pt-BR' ? currentPage : alternatePage),
    enHref: getBlogPagePath('en', locale === 'en' ? currentPage : alternatePage)
  };
}

export function getLocalizedBlogPostHrefs(post: BlogPost, alternatePost: BlogPost | null) {
  const ptPostPath = post.data.locale === 'pt-BR'
    ? getBlogPostPath(post)
    : (alternatePost ? getBlogPostPath(alternatePost) : getBlogPagePath('pt-BR'));

  const enPostPath = post.data.locale === 'en'
    ? getBlogPostPath(post)
    : (alternatePost ? getBlogPostPath(alternatePost) : getBlogPagePath('en'));

  return { ptPostPath, enPostPath };
}

export async function getBlogPosts(locale: Locale) {
  const posts = await getCollection('blog', ({ data }) => !data.draft && data.locale === locale);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function getBlogPageCount(totalPosts: number, pageSize = BLOG_POSTS_PER_PAGE) {
  return Math.max(1, Math.ceil(totalPosts / pageSize));
}

type BlogPaginationStaticPath = {
  params: {
    page?: string;
  };
};

type BlogPaginateFunction<T extends BlogPaginationStaticPath> = (
  posts: BlogPost[],
  options: {
    pageSize: number;
    params: Record<string, never>;
    props: {
      locale: Locale;
      alternatePageCount: number;
    };
  }
) => T[];

export async function getLocalizedBlogPaginationStaticPaths<T extends BlogPaginationStaticPath>(
  locale: Locale,
  alternateLocale: Locale,
  paginate: BlogPaginateFunction<T>
) {
  const posts = await getBlogPosts(locale);
  const alternatePosts = await getBlogPosts(alternateLocale);

  return paginate(posts, {
    pageSize: BLOG_POSTS_PER_PAGE,
    params: {},
    props: {
      locale,
      alternatePageCount: getBlogPageCount(alternatePosts.length)
    }
  }).filter((entry) => entry.params.page !== '1');
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