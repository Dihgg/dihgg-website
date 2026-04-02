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
  
  const { title, description, featuredImage, featuredImageAlt, date } = post.data;
  
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
        {featuredImage && (
          <img
            src={featuredImage}
            alt={featuredImageAlt ?? title}
            className="blog-card__image"
            loading="lazy"
          />
        )}

        <div className="blog-card__content">
          <time dateTime={date.toISOString().slice(0, 10)} className="blog-card__date">
            {formatPostDate(date, locale)}
          </time>
          <a className={titleClassName} href={href}>
            {title}
          </a>
          <p className="blog-card__description">{description}</p>
          <div className="blog-card__cta">
            <Pill href={href}>{ctaLabel}</Pill>
          </div>
        </div>
      </div>
    </li>
  );
}
