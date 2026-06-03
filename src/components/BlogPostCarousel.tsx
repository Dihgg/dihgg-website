import React, { useRef } from 'react';
import Slider, {type Settings} from 'react-slick';
import type { BlogPost, Locale } from '@/types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BlogPostCard from './BlogPostCard';

interface Props {
  posts: (BlogPost & { href: string })[];
  locale: Locale;
  ctaLabel: string;
  settings?: Settings;
}

export default function BlogPostCarousel({ posts, locale, ctaLabel, settings = {} }: Props) {
  const sliderRef = useRef<Slider>(null);

  // Carousel configuration
  const sliderSettings: Settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    centerMode: true,
    centerPadding: '16px',
    dotsClass: 'blog-carousel__dots',
    customPaging: (index: number) => (
      <button className="blog-carousel__dot" aria-label={`Go to slide ${index + 1}`} />
    ),
    ...settings,
  };

  return (
    <div className="blog-carousel">
      <Slider ref={sliderRef} {...sliderSettings}>
        {posts.map((post, index) => (
          <div key={post.slug} className="blog-carousel__slide">
            <BlogPostCard
                post={post} 
                locale={locale} 
                ctaLabel={ctaLabel}
                href={post.href}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
