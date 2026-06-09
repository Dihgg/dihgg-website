import {
  getBlogPosts,
  getBlogPostPath,
  getBlogPagePath,
  getBlogPageCount,
  getLocalizedBlogIndexHrefs,
  getLocalizedBlogPaginationStaticPaths,
  getLocalizedBlogPostHrefs,
  getLocalizedBlogStaticPaths,
} from '@/lib/blog';
import type { BlogPost } from '@/types';
import { getCollection } from 'astro:content';

jest.mock('astro:content', () => ({
  getCollection: jest.fn(),
}));

const mockGetCollection = getCollection as jest.MockedFunction<typeof getCollection>;

function makePost(
  slug: string,
  locale: 'en' | 'pt-BR',
  options: Partial<BlogPost['data']> = {}
): BlogPost {
  return {
    id: slug,
    slug,
    collection: 'blog',
    data: {
      locale,
      date: new Date('2024-01-01T00:00:00.000Z'),
      title: 'Test',
      description: '',
      draft: false,
      tags: [],
      translationKey: slug,
      ...options,
    },
    render: async () => ({ Content: null as unknown, headings: [], remarkPluginFrontmatter: {} }),
  } as unknown as BlogPost;
}

beforeEach(() => {
  mockGetCollection.mockReset();
});

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

  it('keeps current page for English and clamps Portuguese when needed', () => {
    const { ptHref, enHref } = getLocalizedBlogIndexHrefs('en', 4, 2);
    expect(ptHref).toBe('/blog/page/2/');
    expect(enHref).toBe('/en/blog/page/4/');
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

  it('uses the translated pt-BR post path for an English post when available', () => {
    const enPost = makePost('en/my-post', 'en');
    const ptPost = makePost('pt-BR/meu-post', 'pt-BR');
    const { ptPostPath, enPostPath } = getLocalizedBlogPostHrefs(enPost, ptPost);
    expect(ptPostPath).toBe('/blog/meu-post/');
    expect(enPostPath).toBe('/en/blog/my-post/');
  });

  it('falls back to the English blog index when a pt-BR post has no translation', () => {
    const ptPost = makePost('pt-BR/meu-post', 'pt-BR');
    const { ptPostPath, enPostPath } = getLocalizedBlogPostHrefs(ptPost, null);
    expect(ptPostPath).toBe('/blog/meu-post/');
    expect(enPostPath).toBe('/en/blog/');
  });
});

// ---------------------------------------------------------------------------
// getBlogPosts
// ---------------------------------------------------------------------------
describe('getBlogPosts', () => {
  it('filters drafts and sorts posts from newest to oldest for the locale', async () => {
    const olderEnPost = makePost('en/older-post', 'en', {
      date: new Date('2024-01-01T00:00:00.000Z'),
      translationKey: 'older',
    });
    const newerEnPost = makePost('en/newer-post', 'en', {
      date: new Date('2024-02-01T00:00:00.000Z'),
      translationKey: 'newer',
    });
    const ptPost = makePost('pt-BR/post-pt', 'pt-BR', {
      date: new Date('2024-03-01T00:00:00.000Z'),
      translationKey: 'pt',
    });
    const draftEnPost = makePost('en/draft-post', 'en', {
      draft: true,
      date: new Date('2024-04-01T00:00:00.000Z'),
      translationKey: 'draft',
    });

    mockGetCollection.mockImplementation(async (_collection, filter) => {
      const posts = [olderEnPost, newerEnPost, ptPost, draftEnPost];
      return filter ? posts.filter((post) => filter(post)) : posts;
    });

    await expect(getBlogPosts('en')).resolves.toEqual([newerEnPost, olderEnPost]);
    expect(mockGetCollection).toHaveBeenCalledWith('blog', expect.any(Function));
  });
});

// ---------------------------------------------------------------------------
// getLocalizedBlogPaginationStaticPaths
// ---------------------------------------------------------------------------
describe('getLocalizedBlogPaginationStaticPaths', () => {
  it('passes locale pagination props and removes the explicit page 1 entry', async () => {
    const enPosts = [
      makePost('en/first', 'en', { translationKey: 'first' }),
      makePost('en/second', 'en', { translationKey: 'second' }),
    ];
    const ptPosts = [makePost('pt-BR/primeiro', 'pt-BR', { translationKey: 'first' })];

    mockGetCollection.mockImplementation(async (_collection, filter) => {
      const posts = [...enPosts, ...ptPosts];
      return filter ? posts.filter((post) => filter(post)) : posts;
    });

    const paginate = jest.fn((posts, options) => {
      expect(posts).toEqual(enPosts);
      expect(options).toEqual({
        pageSize: 12,
        params: {},
        props: {
          locale: 'en',
          alternatePageCount: 1,
        },
      });

      return [
        { params: { page: '1' } },
        { params: { page: '2' } },
        { params: {} },
      ];
    });

    await expect(getLocalizedBlogPaginationStaticPaths('en', 'pt-BR', paginate)).resolves.toEqual([
      { params: { page: '2' } },
      { params: {} },
    ]);
  });
});

// ---------------------------------------------------------------------------
// getLocalizedBlogStaticPaths
// ---------------------------------------------------------------------------
describe('getLocalizedBlogStaticPaths', () => {
  it('pairs translated posts by translationKey and falls back to null when missing', async () => {
    const enFirst = makePost('en/first-post', 'en', { translationKey: 'shared-1' });
    const enSecond = makePost('en/second-post', 'en', { translationKey: 'shared-2' });
    const ptFirst = makePost('pt-BR/primeiro-post', 'pt-BR', { translationKey: 'shared-1' });

    mockGetCollection.mockImplementation(async (_collection, filter) => {
      const posts = [enFirst, enSecond, ptFirst];
      return filter ? posts.filter((post) => filter(post)) : posts;
    });

    await expect(getLocalizedBlogStaticPaths('en', 'pt-BR')).resolves.toEqual([
      {
        params: { slug: 'first-post' },
        props: {
          post: enFirst,
          alternatePost: ptFirst,
        },
      },
      {
        params: { slug: 'second-post' },
        props: {
          post: enSecond,
          alternatePost: null,
        },
      },
    ]);
  });
});
