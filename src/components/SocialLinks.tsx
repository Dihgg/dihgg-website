import type { SocialLink } from '@/types';
import Pill from '@/components/Pill';


type Props = {
  links: SocialLink[];
  ariaLabel?: string;
};

export default function SocialLinks({ links, ariaLabel = 'Social links' }: Props) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={ariaLabel}>
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
