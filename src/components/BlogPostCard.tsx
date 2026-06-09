import classnames from 'classnames';
import Pill from '@/components/Pill';
import { formatPostDate } from '@/lib/date';
import type { BlogPost, Locale } from '@/types';

type Props = {
  post: BlogPost;
  className?: string;
  locale: Locale;
  ctaLabel: string;
  variant?: 'vertical' | 'horizontal';
  href: string;
};

export default function BlogPostCard({ post, locale, ctaLabel, variant = 'vertical', href, className }: Props) {
  
  const { title, description, featuredImage, featuredImageAlt, date } = post.data;


  return (
    <div className={classnames(className, 'blog-card', {
      'blog-card--horizontal': variant === 'horizontal',
      'blog-card--vertical': variant === 'vertical',
    })}>
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
          <a className={classnames('blog-card__title', {
            'blog-card__title--horizontal': variant === 'horizontal',
            'blog-card__title--vertical': variant === 'vertical',
          })} href={href}>
            {title}
          </a>
          <p className="blog-card__description">{description}</p>
          <div className="blog-card__cta">
            <Pill href={href}>{ctaLabel}</Pill>
          </div>
        </div>
      </div>
    </div>
  );
}
