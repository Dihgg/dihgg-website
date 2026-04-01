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

/**
 * Builds the canonical path for a blog post using its locale-aware slug.
 */
export function getBlogPostPath(post: BlogPost) {
  const slugName = getSlugName(post.slug);
  return post.data.locale === 'en' ? `/en/blog/${slugName}/` : `/blog/${slugName}/`;
}

/**
 * Builds a blog index path for a locale and page number.
 * Page 1 always resolves to the locale root blog URL.
 */
export function getBlogPagePath(locale: Locale, page = 1) {
  const base = locale === 'en' ? '/en/blog/' : '/blog/';
  return page <= 1 ? base : `${base}page/${page}/`;
}

/**
 * Resolves safe locale switch URLs for paginated blog index pages.
 * If the alternate locale has fewer pages, the target page is clamped.
 */
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

/**
 * Resolves locale switch URLs for a blog post using the actual translated post
 * when available, or falling back to the locale blog index when it is missing.
 */
export function getLocalizedBlogPostHrefs(post: BlogPost, alternatePost: BlogPost | null) {
  const ptPostPath = post.data.locale === 'pt-BR'
    ? getBlogPostPath(post)
    : (alternatePost ? getBlogPostPath(alternatePost) : getBlogPagePath('pt-BR'));

  const enPostPath = post.data.locale === 'en'
    ? getBlogPostPath(post)
    : (alternatePost ? getBlogPostPath(alternatePost) : getBlogPagePath('en'));

  return { ptPostPath, enPostPath };
}

/**
 * Returns published blog posts for a locale ordered from newest to oldest.
 */
export async function getBlogPosts(locale: Locale) {
  const posts = await getCollection('blog', ({ data }) => !data.draft && data.locale === locale);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/**
 * Calculates how many paginated blog index pages are needed for a total post count.
 */
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

/**
 * Creates locale-aware static paths for paginated blog index routes.
 * The returned props include the alternate locale page count so routes can
 * generate safe switch URLs without duplicating pagination logic.
 */
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

/**
 * Creates locale-aware static paths for blog post routes and pairs each post
 * with its translated equivalent using translationKey.
 */
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