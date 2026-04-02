import classNames from 'classnames';
import Icon, { isValidIcon } from '@/components/Icon';


type PillProps = {
  icon?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'tag';
  external?: boolean;
} & React.HTMLAttributes<HTMLAnchorElement | HTMLSpanElement | HTMLButtonElement>;

export default function Pill({ icon, href, onClick, variant = 'default', external = false, ...props }: PillProps) {
  const { className, children, ...restProps } = props;
  const classess = classNames('pill', {
    'pill--primary': variant === 'primary',
    'pill--default': variant === 'default',
    'pill--tag': variant === 'tag'
  }, className);

  const content = (
    <>
      {icon && isValidIcon(icon) && 
        <span className="pill__icon" aria-hidden>
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
