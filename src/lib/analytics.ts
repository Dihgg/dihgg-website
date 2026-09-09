export const ANALYTICS_EVENT_NAME = 'ui_interaction';

export type Gtag = (
  command: 'event',
  eventName: string,
  parameters: {
    interaction_name: string;
    link_url?: string;
  }
) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

function getTrackedElement(target: EventTarget | null): HTMLElement | null {
  return target instanceof Element
    ? target.closest<HTMLElement>('[data-ga]')
    : null;
}

/** Returns the configured analytics label for a clicked element or its parent. */
export function getAnalyticsLabel(target: EventTarget | null): string | null {
  const label = getTrackedElement(target)?.dataset.ga?.trim();
  return label || null;
}

/** Sends one GA event for a tracked click. Returns whether an event was sent. */
export function trackAnalyticsClick(event: Event, gtag?: Gtag): boolean {
  if (!gtag) {
    return false;
  }

  const trackedElement = getTrackedElement(event.target);
  const interactionName = getAnalyticsLabel(trackedElement);

  if (!trackedElement || !interactionName) {
    return false;
  }

  const link = trackedElement.closest<HTMLAnchorElement>('a[href]');

  gtag('event', ANALYTICS_EVENT_NAME, {
    interaction_name: interactionName,
    ...(link ? { link_url: link.href } : {}),
  });

  return true;
}

/** Installs delegated click tracking and returns a cleanup function. */
export function initAnalyticsTracking(
  documentRef: Document = document,
  gtag: Gtag | undefined = window.gtag
): () => void {
  if (!gtag) {
    return () => undefined;
  }

  const handleClick = (event: Event) => {
    trackAnalyticsClick(event, gtag);
  };

  documentRef.addEventListener('click', handleClick);
  return () => documentRef.removeEventListener('click', handleClick);
}
