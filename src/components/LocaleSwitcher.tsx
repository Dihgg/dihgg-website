import classnames from 'classnames';
import type { Locale } from '@/types';

type Props = {
  currentLocale: Locale;
  ptHref: string;
  enHref: string;
  ariaLabel: string;
};

const linkClasses = (current: Locale, target: Locale) =>
  classnames(
    'locale-switcher-link',
    {
      'locale-switcher-link--active': current === target,
      'locale-switcher-link--inactive': current !== target,
    }
  );

export default function LocaleSwitcher({ currentLocale, ptHref, enHref, ariaLabel }: Props) {
  return (
    <nav aria-label={ariaLabel} className="locale-switcher">
      <a href={ptHref} className={linkClasses(currentLocale, 'pt-BR')}>PT</a>
      <a href={enHref} className={linkClasses(currentLocale, 'en')}>EN</a>
    </nav>
  );
}
