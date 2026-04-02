import classNames from 'classnames';
import Icon from '@/components/Icon';


type PillProps = {
  icon?: string;
  href?: string;
  variant?: 'default' | 'primary' | 'tag';
  external?: boolean;
} & React.HTMLAttributes<HTMLAnchorElement | HTMLSpanElement>;

export default function Pill({ icon, href, variant = 'default', external = false, ...props }: PillProps) {
  const { className, children, ...restProps } = props;
  const classess = classNames('pill', {
    'pill--primary': variant === 'primary',
    'pill--default': variant === 'default',
    'pill--tag': variant === 'tag'
  }, className);

  const content = (
    <>
      {icon && 
        <span className="pill__icon" aria-hidden>
          <Icon name={icon} />
        </span>
      }
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
