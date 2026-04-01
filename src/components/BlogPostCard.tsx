import classnames from 'classnames';
import Pill from '@/components/Pill';
import { getBlogPostPath } from '@/lib/blog';
import { formatPostDate } from '@/lib/date';
import type { BlogPost, Locale } from '@/types';

type Props = {
  post: BlogPost;
  locale: Locale;
  ctaLabel: string;
  variant?: 'vertical' | 'horizontal';
};

export default function BlogPostCard({ post, locale, ctaLabel, variant = 'vertical' }: Props) {
  const href = getBlogPostPath(post);

  const cardClassName = classnames('blog-card', {
    'blog-card--vertical': variant === 'vertical',
    'blog-card--horizontal': variant === 'horizontal',
  });

  const titleClassName = classnames('blog-card__title', {
    'blog-card__title--horizontal': variant === 'horizontal',
    'blog-card__title--vertical': variant === 'vertical',
  });

  return (
    <li className={cardClassName}>
      <div className="blog-card__layout">
        {post.data.featuredImage && (
          <img
            src={post.data.featuredImage}
            alt={post.data.featuredImageAlt ?? post.data.title}
            className="blog-card__image"
            loading="lazy"
          />
        )}

        <div className="blog-card__content">
          <time dateTime={post.data.date.toISOString().slice(0, 10)} className="blog-card__date">
            {formatPostDate(post.data.date, locale)}
          </time>
          <a className={titleClassName} href={href}>
            {post.data.title}
          </a>
          <p className="blog-card__description">{post.data.description}</p>
          <div className="blog-card__cta">
            <Pill href={href}>{ctaLabel}</Pill>
          </div>
        </div>
      </div>
    </li>
  );
}
