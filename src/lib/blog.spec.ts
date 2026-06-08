import {
  getBlogPostPath,
  getBlogPagePath,
  getBlogPageCount,
  getLocalizedBlogIndexHrefs,
  getLocalizedBlogPostHrefs,
} from '@/lib/blog';
import type { BlogPost } from '@/types';

function makePost(slug: string, locale: 'en' | 'pt-BR'): BlogPost {
  return {
    id: slug,
    slug,
    collection: 'blog',
    data: { locale, date: new Date(), title: 'Test', description: '' },
    render: async () => ({ Content: null as unknown, headings: [], remarkPluginFrontmatter: {} }),
  } as unknown as BlogPost;
}

// ---------------------------------------------------------------------------
// getBlogPostPath
// ---------------------------------------------------------------------------
describe('getBlogPostPath', () => {
  it('returns an English path for en posts', () => {
    expect(getBlogPostPath(makePost('en/my-post', 'en'))).toBe('/en/blog/my-post/');
  });

  it('returns a Portuguese path for pt-BR posts', () => {
    expect(getBlogPostPath(makePost('pt-BR/meu-post', 'pt-BR'))).toBe('/blog/meu-post/');
  });

  it('handles a slug without a locale prefix', () => {
    expect(getBlogPostPath(makePost('standalone', 'en'))).toBe('/en/blog/standalone/');
  });
});

// ---------------------------------------------------------------------------
// getBlogPagePath
// ---------------------------------------------------------------------------
describe('getBlogPagePath', () => {
  it('returns the base pt-BR blog URL for page 1', () => {
    expect(getBlogPagePath('pt-BR', 1)).toBe('/blog/');
  });

  it('returns the base en blog URL for page 1', () => {
    expect(getBlogPagePath('en', 1)).toBe('/en/blog/');
  });

  it('returns a paginated URL for page > 1', () => {
    expect(getBlogPagePath('pt-BR', 2)).toBe('/blog/page/2/');
    expect(getBlogPagePath('en', 3)).toBe('/en/blog/page/3/');
  });

  it('defaults to page 1 when no page is provided', () => {
    expect(getBlogPagePath('en')).toBe('/en/blog/');
  });
});

// ---------------------------------------------------------------------------
// getBlogPageCount
// ---------------------------------------------------------------------------
describe('getBlogPageCount', () => {
  it('returns 1 for zero posts', () => {
    expect(getBlogPageCount(0)).toBe(1);
  });

  it('returns 1 when total posts equal page size', () => {
    expect(getBlogPageCount(12, 12)).toBe(1);
  });

  it('rounds up for a partial last page', () => {
    expect(getBlogPageCount(13, 12)).toBe(2);
    expect(getBlogPageCount(25, 12)).toBe(3);
  });

  it('uses BLOG_POSTS_PER_PAGE as default page size', () => {
    // 12 posts / 12 per page = 1 page
    expect(getBlogPageCount(12)).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// getLocalizedBlogIndexHrefs
// ---------------------------------------------------------------------------
describe('getLocalizedBlogIndexHrefs', () => {
  it('keeps current page for the active locale', () => {
    const { ptHref, enHref } = getLocalizedBlogIndexHrefs('pt-BR', 3, 5);
    expect(ptHref).toBe('/blog/page/3/');
    expect(enHref).toBe('/en/blog/page/3/');
  });

  it('clamps alternate locale to its last page when current page exceeds it', () => {
    const { enHref } = getLocalizedBlogIndexHrefs('pt-BR', 4, 2);
    expect(enHref).toBe('/en/blog/page/2/');
  });

  it('clamps alternate page to 1 when alternatePageCount is 0', () => {
    const { enHref } = getLocalizedBlogIndexHrefs('pt-BR', 2, 0);
    expect(enHref).toBe('/en/blog/');
  });
});

// ---------------------------------------------------------------------------
// getLocalizedBlogPostHrefs
// ---------------------------------------------------------------------------
describe('getLocalizedBlogPostHrefs', () => {
  it('returns pt post path and alternate en post path', () => {
    const ptPost = makePost('pt-BR/meu-post', 'pt-BR');
    const enPost = makePost('en/my-post', 'en');
    const { ptPostPath, enPostPath } = getLocalizedBlogPostHrefs(ptPost, enPost);
    expect(ptPostPath).toBe('/blog/meu-post/');
    expect(enPostPath).toBe('/en/blog/my-post/');
  });

  it('falls back to locale blog index when alternate post is null', () => {
    const enPost = makePost('en/my-post', 'en');
    const { ptPostPath, enPostPath } = getLocalizedBlogPostHrefs(enPost, null);
    expect(ptPostPath).toBe('/blog/');
    expect(enPostPath).toBe('/en/blog/my-post/');
  });
});
