import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { MdEmail } from "react-icons/md";
import type { SocialLink } from '../data/portfolio';
import Pill from './Pill';

const iconMap: Record<SocialLink['icon'], React.ReactNode> = {
  GitHub: <FaGithub />,
  LinkedIn: <FaLinkedin />,
  Mail: <MdEmail />,
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
            label={link.label}
            icon={iconMap[link.icon]}
            href={link.href}
            external
          />
        </li>
      ))}
    </ul>
  );
}
