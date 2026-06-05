import { useEffect, useState } from 'react';

/** Tailwind breakpoint names supported by this utility. */
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** Direction for breakpoint comparison: 'larger' for min-width, 'smaller' for max-width. */
type Direction = 'larger' | 'smaller';

/**
 * Returns a breakpoint value from Tailwind CSS custom properties.
 */
const retrieveTailwindBreakpoint = (breakpoint: Breakpoint): string => {
  const cssVar = `--breakpoint-${breakpoint}`;
  return getComputedStyle(document.documentElement)
    .getPropertyValue(cssVar)
    .trim();
}

/**
 * Builds a media query string for a Tailwind breakpoint.
 * @param breakpoint - The breakpoint to query
 * @param direction - 'larger' for min-width (≥), 'smaller' for max-width (<)
 */
const buildMediaQuery = (breakpoint: Breakpoint, direction: Direction): string => {
  const value = retrieveTailwindBreakpoint(breakpoint);
  
  if (direction === 'larger') {
    return `(min-width: ${value})`;
  } else {
    // For max-width, subtract 1 pixel to create the upper boundary (e.g., md-smaller = < 768px)
    const numValue = parseInt(value, 10);
    return `(max-width: ${numValue - 1}px)`;
  }
}

/**
 * React hook that tracks whether the viewport matches a Tailwind breakpoint.
 * @param breakpoint - The breakpoint to check against
 * @param direction - 'larger' (default) checks if viewport is this breakpoint or larger; 'smaller' checks if smaller
 * 
 * @example
 * // Check if viewport is md or larger (≥ 768px)
 * const isMdOrLarger = useBreakpoint('md', 'larger');
 * 
 * @example
 * // Check if viewport is smaller than md (< 768px)
 * const isSmallerThanMd = useBreakpoint('md', 'smaller');
 */
export function useBreakpoint(breakpoint: Breakpoint, direction: Direction = 'larger'): boolean {
  const [matches, setMatches] = useState(() =>
    window.matchMedia(buildMediaQuery(breakpoint, direction)).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(buildMediaQuery(breakpoint, direction));
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);

    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener('change', onChange);

    return () => mediaQuery.removeEventListener('change', onChange);
  }, [breakpoint, direction]);

  return matches;
}
