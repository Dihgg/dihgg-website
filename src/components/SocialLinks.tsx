import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa6';
import type { SocialLink } from '@/types';
import Pill from '@/components/Pill';

const iconMap: Record<SocialLink['icon'], React.ReactNode> = {
  GitHub: <FaGithub />,
  LinkedIn: <FaLinkedin />,
  Mail: <FaEnvelope />,
};

type Props = {
  links: SocialLink[];
  ariaLabel?: string;
};

export default function SocialLinks({ links, ariaLabel = 'Social links' }: Props) {
  return (
    <ul className="flex flex-wrap gap-3" aria-label={ariaLabel}>
      {links.map((link) => (
        <li key={link.href}>
          <Pill
            icon={iconMap[link.icon]}
            href={link.href}
            external
          >
            {link.label}
          </Pill>
        </li>
      ))}
    </ul>
  );
}
