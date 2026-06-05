import React, { useEffect, useState, type ReactNode } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';
import { useBreakpoint } from '@/hooks/breakpoints';

/**
 * Generic carousel wrapper powered by Embla.
 *
 * `children` are treated as slide content and wrapped in the internal slide element.
 * Dragging is disabled from the `md` breakpoint and above.
 */
interface Props {
  /** Optional Embla options merged with component defaults. */
  options?: EmblaOptionsType;
  /** Accessible label prefix for dot navigation buttons. */
  goToSlideLabel?: string;
  /** Slide contents rendered in order. */
  children: ReactNode;
}

/**
 * Renders a responsive Embla carousel with dot navigation.
 */
export default function Carousel({ children, options = {}, goToSlideLabel = 'Go to slide' }: Props) {
  const slides = React.Children.toArray(children);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const isMd = useBreakpoint('md');

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    loop: false,
    watchDrag: !isMd,
    ...options,
  });

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    emblaApi.reInit({ watchDrag: !isMd });
  }, [emblaApi, isMd]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const onInit = () => setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    onInit();
    onSelect();
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('reInit', onInit);
      emblaApi.off('reInit', onSelect);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="carousel">
      <div className="carousel__viewport" ref={emblaRef}>
        <div className="carousel__container">
          {slides.map((slide, index) => (
            <div className="carousel__slide" key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      {scrollSnaps.length > 1 && (
        <div className="carousel__dots">
          {scrollSnaps.map((_, index) => (
            <button
              type="button"
              key={index}
              className={`carousel__dot${selectedIndex === index ? ' is-active' : ''}`}
              aria-label={`${goToSlideLabel} ${index + 1}`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
