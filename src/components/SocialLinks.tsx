import { FaFacebook, FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import type { SocialLink } from '../data/portfolio';
import Pill from './Pill';

const iconMap: Record<SocialLink['icon'], React.ReactNode> = {
  GitHub: <FaGithub />,
  LinkedIn: <FaLinkedin />,
  Twitter: <FaXTwitter />,
  Facebook: <FaFacebook />,
  Mail: null,
};

type Props = {
  links: SocialLink[];
};

export default function SocialLinks({ links }: Props) {
  return (
    <ul className="flex flex-wrap gap-3" aria-label="Redes sociais">
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
