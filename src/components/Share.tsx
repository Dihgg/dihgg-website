import { translations } from '@/data/translations'
import type { Locale } from '@/types';
import Pill from '@/components/Pill';
import { useState } from 'react';

type Props = {
    locale: Locale
    title: string;
    url: string;
    description: string;
}

export default function Share({
    locale,
    title,
    url,
    description
}: Props) {
    const {
        shareTitle,
        shareCopyLabel,
        shareCopiedLabel,
        shareNativeLabel,
    } = translations[locale];

    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(`${title} - ${description}`);

    const [copy, setCopy] = useState<string>(shareCopyLabel);

    const onClickShare = async () => {
        await navigator.share({
            title,
            text: description,
            url
        })
    }

    const onClickCopy = async () => {
        await navigator.clipboard.writeText(url);
        setCopy(shareCopiedLabel);
        setTimeout(() => setCopy(shareCopyLabel), 2000);
    }

    const BUTTONS = [
        { icon: 'copy', title: 'copy', onClick: onClickCopy, label: copy },
        { icon: 'share', title: 'native share', onClick: onClickShare, label: shareNativeLabel },
        { icon: 'twitter', title: 'twitter', href: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedText}` },
        { icon: 'linkedin', title: 'linkedin', href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}` },
        { icon: 'whatsapp', title: 'whatsapp', href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}` }
    ];

    return (
        <section className="share" aria-label={shareTitle}>
            <h2 className="share__title">{shareTitle}</h2>
            <div className="share__actions">
                {
                    BUTTONS.map(({ icon, title, href, onClick, label }) => (
                        <Pill
                            key={title}
                            icon={icon}
                            title={title}
                            href={href}
                            onClick={onClick}
                            className="share__action"
                            external
                        >
                            {label}
                        </Pill>
                    ))
                }
            </div>
        </section>
    );
}