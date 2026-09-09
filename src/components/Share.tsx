import { useEffect, useRef, useState } from 'react';
import { translations } from '@/data/translations';
import type { Locale } from '@/types';
import Pill from '@/components/Pill';

import '@styles/components/share.css';

type Props = {
  locale: Locale;
  title: string;
  url: string;
  description: string;
};

export default function Share({ locale, title, url, description }: Props) {
  const {
    shareTitle,
    shareCopyLabel,
    shareCopiedLabel,
    shareCopyErrorLabel,
    shareNativeLabel,
    shareNativeErrorLabel
  } = translations[locale];

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(`${title} - ${description}`);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [canCopy, setCanCopy] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [copyLabel, setCopyLabel] = useState<string>(shareCopyLabel);
  const [status, setStatus] = useState('');

  useEffect(() => {
    setCanCopy(typeof navigator.clipboard?.writeText === 'function');
    setCanShare(typeof navigator.share === 'function');

    return () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    };
  }, []);

  function resetCopyLabelAfterDelay() {
    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }

    resetTimer.current = setTimeout(() => {
      setCopyLabel(shareCopyLabel);
      resetTimer.current = null;
    }, 2000);
  }

  async function onClickShare() {
    if (!canShare) {
      return;
    }

    try {
      await navigator.share({ title, text: description, url });
    } catch (error) {
      // Closing the native share sheet is an expected user action, not an error.
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        setStatus(shareNativeErrorLabel);
      }
    }
  }

  async function onClickCopy() {
    if (!canCopy) {
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopyLabel(shareCopiedLabel);
      setStatus(shareCopiedLabel);
    } catch {
      setCopyLabel(shareCopyErrorLabel);
      setStatus(shareCopyErrorLabel);
    }

    resetCopyLabelAfterDelay();
  }

  const externalActions = [
    {
      icon: 'twitter',
      label: 'Twitter',
      href: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    },
    {
      icon: 'linkedin',
      label: 'LinkedIn',
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`,
    },
    {
      icon: 'whatsapp',
      label: 'WhatsApp',
      href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
    },
  ];

  return (
    <section className="share" aria-label={shareTitle}>
      <h2 className="share__title">{shareTitle}</h2>
      <div className="share__actions">
        {canCopy && (
          <Pill
            icon="copy"
            title={shareCopyLabel}
            onClick={onClickCopy}
            className="share__action"
            tinted
            background
          >
            {copyLabel}
          </Pill>
        )}
        {canShare && (
          <Pill
            icon="share"
            title={shareNativeLabel}
            onClick={onClickShare}
            className="share__action"
            tinted
            background
          >
            {shareNativeLabel}
          </Pill>
        )}
        {externalActions.map(({ icon, label, href }) => (
          <Pill
            key={label}
            icon={icon}
            title={label}
            href={href}
            className="share__action"
            external
            tinted
            background
          >
            {label}
          </Pill>
        ))}
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {status}
      </p>
    </section>
  );
}
