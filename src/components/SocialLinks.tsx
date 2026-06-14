import type { SocialLink } from '@/types';
import Pill from '@/components/Pill';
import classnames from 'classnames';


type Props = {
  links: SocialLink[];
} & React.HTMLAttributes<HTMLUListElement>;

export default function SocialLinks({ links, className, ...props }: Props) {
  return (
    <ul
      {...props}
      className={classnames(className, "flex flex-wrap gap-2")}
    >
      {links.map((link, index) => (
        <li key={link.href}>
          <Pill
            icon={link.icon}
            href={link.href}
            external
            tinted
          >
            {link.label}
          </Pill>
        </li>
      ))}
    </ul>
  );
}
