import type { Locale } from '@/types';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import StackIcons from '@/components/StackIcons';

type Props = {
  currentLocale: Locale;
  ptHref: string;
  enHref: string;
  switcherAriaLabel: string;
  madeWithLabel: string;
};

export default function SiteFooter({ currentLocale, ptHref, enHref, switcherAriaLabel, madeWithLabel }: Props) {

  return (
    <footer className="mt-20 border-t border-blue-100 bg-white/50 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8">
        <div className="flex justify-center">
          <LocaleSwitcher
            currentLocale={currentLocale}
            ptHref={ptHref}
            enHref={enHref}
            ariaLabel={switcherAriaLabel}
          />
        </div>

        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-slate-600 md:flex-row md:text-left">
          <p>&copy; {'{Dihgg}'} {new Date().getFullYear()}</p>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">{madeWithLabel}</span>
            <StackIcons />
          </div>
        </div>
      </div>
    </footer>
  );
}
