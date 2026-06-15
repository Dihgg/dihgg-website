import type { Locale } from '@/types';

import classnames from 'classnames';

import Pill from '@/components/Pill';

import "@styles/components/locale-switcher.css";

type Props = {
  currentLocale: Locale;
  ptHref: string;
  enHref: string;
  ariaLabel: string;
};

export default function LocaleSwitcher({ currentLocale, ptHref, enHref, ariaLabel }: Props) {
  return (
    <nav aria-label={ariaLabel} className="locale-switcher">
      <Pill variant={currentLocale === 'pt-BR' ? 'primary' : 'default'} href={ptHref} icon="brazil" title="Português (Brasil)" background>PT</Pill>
      <Pill variant={currentLocale === 'en' ? 'primary' : 'default'} href={enHref} icon="usa" title="English (US)" background>EN</Pill>
    </nav>
  );
}
