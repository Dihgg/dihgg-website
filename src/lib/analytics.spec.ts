import {
  ANALYTICS_EVENT_NAME,
  getAnalyticsLabel,
  initAnalyticsTracking,
  trackAnalyticsClick,
  type Gtag,
} from '@/lib/analytics';

function createTrackedLink(label = 'blog-header') {
  const link = document.createElement('a');
  link.href = '/blog/';
  link.dataset.ga = label;
  const child = document.createElement('span');
  link.appendChild(child);
  document.body.appendChild(link);

  return { link, child };
}

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('getAnalyticsLabel', () => {
  it('extracts and trims the label from the nearest tracked parent', () => {
    const { child } = createTrackedLink('  blog-header  ');

    expect(getAnalyticsLabel(child)).toBe('blog-header');
  });

  it('returns null for untracked and empty labels', () => {
    expect(getAnalyticsLabel(document.body)).toBeNull();
    expect(getAnalyticsLabel(createTrackedLink('  ').link)).toBeNull();
  });
});

describe('trackAnalyticsClick', () => {
  it('sends a named interaction event with its label and destination', () => {
    const gtag = jest.fn() as jest.MockedFunction<Gtag>;
    const { child, link } = createTrackedLink();

    expect(trackAnalyticsClick(new MouseEvent('click', { bubbles: true }), gtag)).toBe(false);

    const event = new MouseEvent('click', { bubbles: true });
    child.dispatchEvent(event);

    expect(trackAnalyticsClick(event, gtag)).toBe(true);
    expect(gtag).toHaveBeenCalledWith('event', ANALYTICS_EVENT_NAME, {
      interaction_name: 'blog-header',
      link_url: link.href,
    });
  });

  it('does nothing when analytics is unavailable', () => {
    const { child } = createTrackedLink();
    const event = new MouseEvent('click', { bubbles: true });
    child.dispatchEvent(event);

    expect(trackAnalyticsClick(event)).toBe(false);
  });
});

describe('initAnalyticsTracking', () => {
  it('tracks delegated clicks and removes the listener during cleanup', () => {
    const gtag = jest.fn() as jest.MockedFunction<Gtag>;
    const cleanup = initAnalyticsTracking(document, gtag);
    const { child } = createTrackedLink('projects-header');

    child.click();
    expect(gtag).toHaveBeenCalledTimes(1);

    cleanup();
    child.click();
    expect(gtag).toHaveBeenCalledTimes(1);
  });

  it('installs no listener when analytics is unavailable', () => {
    const addEventListener = jest.spyOn(document, 'addEventListener');

    initAnalyticsTracking(document, undefined);

    expect(addEventListener).not.toHaveBeenCalled();
    addEventListener.mockRestore();
  });
});
