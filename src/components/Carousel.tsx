import React, { useRef, type ReactNode } from 'react';
import Slider, {type Settings} from 'react-slick';
import type { BlogPost, Locale } from '@/types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
  locale: Locale;
  ctaLabel: string;
  settings?: Settings;
  children: ReactNode;
}

export default function Carousel({ children, locale, ctaLabel, settings = {} }: Props) {
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
    dotsClass: 'carousel__dots',
    customPaging: (index: number) => (
      <button className="carousel__dot" aria-label={`Go to slide ${index + 1}`} />
    ),
    ...settings,
  };

  return (
    <div className="carousel">
      <Slider ref={sliderRef} {...sliderSettings}>
        {children}
      </Slider>
    </div>
  );
}
