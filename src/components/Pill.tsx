import type { ReactNode } from 'react';
import classnames from 'classnames';

type PillProps = {
  icon?: ReactNode;
  href?: string;
  variant?: 'default' | 'primary';
  external?: boolean;
} & React.HTMLAttributes<HTMLAnchorElement | HTMLSpanElement>;

export default function Pill({ icon, href, variant = 'default', external = false, ...props }: PillProps) {
  const { className, children, ...restProps } = props;
  const classess = classnames('pill', {
    'pill--primary': variant === 'primary',
    'pill--default': variant === 'default'
  }, className);

  const content = (
    <>
      {icon && <span className="pill__icon">{icon}</span>}
      {children}
    </>
  );

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
