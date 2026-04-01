import classnames from 'classnames';
import type { Locale } from '@/data/translations';

type Props = {
  currentLocale: Locale;
  ptHref: string;
  enHref: string;
  ariaLabel: string;
};

export default function LocaleSwitcher({ currentLocale, ptHref, enHref, ariaLabel }: Props) {
  const linkClass = (locale: Locale) =>
    classnames(
      'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] transition',
      {
        'border-transparent bg-(--accent) text-white': currentLocale === locale,
        'border-blue-200 bg-white/80 text-slate-700 hover:bg-blue-50': currentLocale !== locale,
      }
    );

  return (
    <nav aria-label={ariaLabel} className="flex items-center gap-2">
      <a href={ptHref} className={linkClass('pt-BR')}>PT</a>
      <a href={enHref} className={linkClass('en')}>EN</a>
    </nav>
  );
}
