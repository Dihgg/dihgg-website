import classnames from 'classnames';
import Pill from '@/components/Pill';
import { formatPostDate } from '@/lib/date';
import type { BlogPost, Locale } from '@/types';
import { normalize } from '@/lib/utils';
import { STACK_ITEMS_MAX_COUNT } from '@/test/mocks/constants';
import PillStack from './PillStack';

export type BlogPostCardProps = {
  post: BlogPost;
  className?: string;
  locale: Locale;
  ctaLabel: string;
  variant?: 'vertical' | 'horizontal';
  showTags?: boolean;
  href: string;
};

export default function BlogPostCard(props: BlogPostCardProps) {

  const { post, locale, ctaLabel, variant = 'vertical', href, className, showTags } = props;
  
  const { title, description, featuredImage, featuredImageAlt, date, tags } = post.data;


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
          {showTags && (
            <PillStack items={tags} tinted />
          )}          
          <p className="blog-card__description">{description}</p>
          <div className="blog-card__cta">
            <Pill href={href}>{ctaLabel}</Pill>
          </div>
        </div>
      </div>
    </div>
  );
}
