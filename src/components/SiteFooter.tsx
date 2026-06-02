import type { Locale } from '@/types';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import StackIcons from '@/components/StackIcons';
import Logo from '@/components/Logo';
import { useEffect, useState } from 'react';

export type FooterProps = {
  currentLocale: Locale;
  ptHref: string;
  enHref: string;
  switcherAriaLabel: string;
  madeWithLabel: string;
};

export default function SiteFooter({ currentLocale, ptHref, enHref, switcherAriaLabel, madeWithLabel }: FooterProps) {

  const [ year, setYear ] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__content__item justify-center">
          <LocaleSwitcher
            currentLocale={currentLocale}
            ptHref={ptHref}
            enHref={enHref}
            ariaLabel={switcherAriaLabel}
          />
        </div>

        <div className="footer__content__bottom">
          <div className="footer__content__item gap-1">
            <span>&copy;</span>
            <Logo />
            <span>{year}</span>
          </div>

          <div className="footer__content__item gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">{madeWithLabel}</span>
            <StackIcons />
          </div>
        </div>
      </div>
    </footer>
  );
}
