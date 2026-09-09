import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Share from './Share';

const props = {
  locale: 'en' as const,
  title: 'A useful post',
  description: 'Post description',
  url: 'https://dihgg.com/en/blog/useful-post/',
};

function setNavigatorApi(name: 'clipboard' | 'share', value: unknown) {
  Object.defineProperty(navigator, name, {
    configurable: true,
    value,
  });
}

afterEach(() => {
  setNavigatorApi('clipboard', undefined);
  setNavigatorApi('share', undefined);
  jest.restoreAllMocks();
});

describe('Share', () => {
  it('keeps external fallbacks available when browser APIs are unsupported', () => {
    render(<Share {...props} />);

    expect(screen.queryByRole('button', { name: 'Copy link' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Share' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'X' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'WhatsApp' })).toBeInTheDocument();
  });

  it('copies the URL and announces success', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    setNavigatorApi('clipboard', { writeText });
    render(<Share {...props} />);

    await userEvent.click(screen.getByRole('button', { name: 'Copy link' }));

    expect(writeText).toHaveBeenCalledWith(props.url);
    expect(screen.getByRole('status')).toHaveTextContent('Copied');
    expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument();
  });

  it('catches clipboard rejection and announces the failure', async () => {
    setNavigatorApi('clipboard', {
      writeText: jest.fn().mockRejectedValue(new Error('Permission denied')),
    });
    render(<Share {...props} />);

    await userEvent.click(screen.getByRole('button', { name: 'Copy link' }));

    expect(screen.getByRole('status')).toHaveTextContent('Could not copy the link');
  });

  it('passes the post metadata to the native share API', async () => {
    const share = jest.fn().mockResolvedValue(undefined);
    setNavigatorApi('share', share);
    render(<Share {...props} />);

    await userEvent.click(screen.getByRole('button', { name: 'Share' }));

    expect(share).toHaveBeenCalledWith({
      title: props.title,
      text: props.description,
      url: props.url,
    });
  });

  it('announces native sharing failures without leaking a rejection', async () => {
    setNavigatorApi('share', jest.fn().mockRejectedValue(new Error('Share failed')));
    render(<Share {...props} />);

    await userEvent.click(screen.getByRole('button', { name: 'Share' }));

    expect(screen.getByRole('status')).toHaveTextContent('Could not share the post');
  });

  it('treats cancellation of native sharing as a silent user action', async () => {
    setNavigatorApi(
      'share',
      jest.fn().mockRejectedValue(new DOMException('Cancelled', 'AbortError')),
    );
    render(<Share {...props} />);

    await userEvent.click(screen.getByRole('button', { name: 'Share' }));

    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });
});
