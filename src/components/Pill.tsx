import classNames from 'classnames';
import Icon, { getIconConfig } from '@/components/Icon';

import "@styles/components/pill.css";

export type PillProps = {
  icon?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'tag' | 'tag--small';
  external?: boolean;
  tinted?: boolean;
  background?: boolean;
} & React.HTMLAttributes<HTMLAnchorElement | HTMLSpanElement | HTMLButtonElement>;

export default function Pill({ icon, href, onClick, variant = 'default', external = false, tinted = false, background = false, ...props }: PillProps) {
  const { className, children, style, ...restProps } = props;
  const classess = classNames(
    'pill',
    `pill--${variant}`,
    {
      'pill--background': background,
    },
    className
  );
  const iconConfig = getIconConfig(icon);

  const mergedStyle = {
    ...style,
    ...(background && iconConfig && iconConfig.background ? { '--pill-background': iconConfig.background } : undefined),
  } as React.CSSProperties;

  const content = (
    <>
      {icon && <Icon name={icon} tinted={tinted} />}
      {children}
    </>
  );

  if (onClick) {
    return (
      <button
        className={classess}
        onClick={onClick}
        style={mergedStyle}
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
        style={mergedStyle}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        {...restProps}
      >
        {content}
      </a>
    );
  }

  return <span className={classess} style={mergedStyle} {...restProps}>{content}</span>;
}
