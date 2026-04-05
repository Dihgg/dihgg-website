import classNames from 'classnames';
import Icon, { isValidIcon } from '@/components/Icon';

const tintedIconClassMap: Record<string, string> = {
  'angular': 'text-rose-600',
  'astro': 'text-orange-500',
  'css': 'text-sky-600',
  'docker': 'text-blue-600',
  'express.js': 'text-slate-700',
  'git': 'text-orange-600',
  'html5': 'text-orange-600',
  'java': 'text-red-700',
  'javascript': 'text-amber-500',
  'jest': 'text-rose-700',
  'linux': 'text-stone-700',
  'mysql': 'text-cyan-700',
  'node.js': 'text-lime-600',
  'photoshop': 'text-sky-500',
  'php': 'text-indigo-500',
  'python': 'text-yellow-500',
  'react': 'text-cyan-500',
  'sass': 'text-pink-500',
  'spring boot': 'text-emerald-600',
  'tailwind': 'text-teal-500',
  'typescript': 'text-blue-600',
  'unity': 'text-slate-800',
  'wordpress': 'text-blue-700'
};

type PillProps = {
  icon?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'tag';
  external?: boolean;
  tinted?: boolean;
} & React.HTMLAttributes<HTMLAnchorElement | HTMLSpanElement | HTMLButtonElement>;

export default function Pill({ icon, href, onClick, variant = 'default', external = false, tinted = false, ...props }: PillProps) {
  const { className, children, ...restProps } = props;
  const classess = classNames('pill', `pill--${variant}`, className);

  const iconName = `${icon}`.toLowerCase();
  const content = (
    <>
      {icon && isValidIcon(iconName) &&
        <span aria-hidden className={classNames('pill__icon', { [tintedIconClassMap[iconName]]: tinted })}>
          <Icon name={icon} />
        </span>
      }
      {children}
    </>
  );

  if (onClick) {
    return (
      <button
        className={classess}
        onClick={onClick}
        {...restProps}
      >
        {content}
      </button>
    );
  }
  if (href) {
    return (
      <a
        className={classess}
        href={href}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        {...restProps}
      >
        {content}
      </a>
    );
  }

  return <span className={classess} {...restProps}>{content}</span>;
}
