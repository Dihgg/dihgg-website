import { render, screen } from '@testing-library/react';
import BlogPostCard from './BlogPostCard';
import type { BlogPost } from '@/types';

function makePost(overrides: Partial<BlogPost['data']> = {}): BlogPost {
  return {
    id: 'test-post',
    slug: 'en/test-post',
    collection: 'blog',
    data: {
      title: 'Test Post Title',
      description: 'A short description of the post.',
      date: new Date(Date.UTC(2024, 5, 15)), // June 15, 2024
      locale: 'en',
      draft: false,
      featuredImage: undefined,
      featuredImageAlt: undefined,
      ...overrides,
    },
    render: async () => ({ Content: null as unknown, headings: [], remarkPluginFrontmatter: {} }),
  } as unknown as BlogPost;
}

const defaultProps = {
  post: makePost(),
  locale: 'en' as const,
  ctaLabel: 'Read more',
  href: '/en/blog/test-post/',
};

describe('BlogPostCard', () => {
  it('renders the post title as a link', () => {
    render(<BlogPostCard {...defaultProps} />);
    expect(screen.getByRole('link', { name: 'Test Post Title' })).toHaveAttribute(
      'href',
      '/en/blog/test-post/'
    );
  });

  it('renders the post description', () => {
    render(<BlogPostCard {...defaultProps} />);
    expect(screen.getByText('A short description of the post.')).toBeInTheDocument();
  });

  it('renders the CTA label as a link', () => {
    render(<BlogPostCard {...defaultProps} />);
    expect(screen.getByRole('link', { name: 'Read more' })).toBeInTheDocument();
  });

  it('formats the date for the en locale', () => {
    render(<BlogPostCard {...defaultProps} />);
    expect(screen.getByText('Jun 15, 2024')).toBeInTheDocument();
  });

  it('formats the date for the pt-BR locale', () => {
    render(
      <BlogPostCard {...defaultProps} locale="pt-BR" post={makePost({ locale: 'pt-BR' })} />
    );
    expect(screen.getByText('15/06/2024')).toBeInTheDocument();
  });

  it('renders the featured image when provided', () => {
    const post = makePost({ featuredImage: '/images/cover.jpg', featuredImageAlt: 'Cover' });
    render(<BlogPostCard {...defaultProps} post={post} />);
    const img = screen.getByRole('img', { name: 'Cover' });
    expect(img).toHaveAttribute('src', '/images/cover.jpg');
  });

  it('does not render an image when featuredImage is not provided', () => {
    render(<BlogPostCard {...defaultProps} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders title as alt text for the image when featuredImageAlt is not provided', () => {
    const post = makePost({ featuredImage: '/images/cover.jpg', featuredImageAlt: undefined });
    render(<BlogPostCard {...defaultProps} post={post} />);
    const img = screen.getByRole('img', { name: 'Test Post Title' });
    expect(img).toHaveAttribute('src', '/images/cover.jpg');
  });

  it('applies the horizontal variant class', () => {
    const { container } = render(<BlogPostCard {...defaultProps} variant="horizontal" />);
    expect(container.firstChild).toHaveClass('blog-card--horizontal');
  });

  it('applies the vertical variant class by default', () => {
    const { container } = render(<BlogPostCard {...defaultProps} />);
    expect(container.firstChild).toHaveClass('blog-card--vertical');
  });
});
