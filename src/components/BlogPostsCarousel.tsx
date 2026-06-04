import Carousel from '@/components/Carousel';
import BlogPostCard from '@/components/BlogPostCard';
import type { BlogPost, Locale } from '@/types';
import type { EmblaOptionsType } from 'embla-carousel';

type BlogPostWithHref = BlogPost & { href: string };

type Props = {
  posts: BlogPostWithHref[];
  locale: Locale;
  ctaLabel: string;
  options?: EmblaOptionsType;
};

export default function BlogPostsCarousel({ posts, locale, ctaLabel, options }: Props) {
  return (
    <Carousel options={options}>
      {posts.map((post) => (
        <BlogPostCard
          key={post.id}
          post={post}
          locale={locale}
          ctaLabel={ctaLabel}
          href={post.href}
        />
      ))}
    </Carousel>
  );
}