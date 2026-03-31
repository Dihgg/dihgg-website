import type { ReactNode } from 'react';

type PillProps = {
  label: string;
  icon?: ReactNode;
  href?: string;
  variant?: 'default' | 'primary';
  external?: boolean;
} & React.HTMLAttributes<HTMLAnchorElement | HTMLSpanElement>;

export default function Pill({ label, icon, href, variant = 'default', external = false, ...extraProps }: PillProps) {
  const base =
    'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5';

  const variants = {
    default: 'border-blue-200 bg-white/90 text-slate-900 hover:bg-blue-50',
    primary: 'border-transparent bg-[var(--accent)] text-white hover:brightness-110',
  };

  const className = `${base} ${variants[variant]}`;

  const content = (
    <>
      {icon && <span className="size-4 shrink-0">{icon}</span>}
      {label}
    </>
  );

  if (href) {
    return (
      <a
        className={className}
        href={href}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        {...extraProps}
      >
        {content}
      </a>
    );
  }

  return <span className={className} {...extraProps}>{content}</span>;
}
