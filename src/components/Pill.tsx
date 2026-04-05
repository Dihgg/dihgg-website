import classNames from 'classnames';
import Icon from '@/components/Icon';

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
