import type { SocialLink } from '../data/portfolio';

type Props = {
  links: SocialLink[];
};

export default function SocialLinks({ links }: Props) {
  return (
    <ul className="flex flex-wrap gap-3" aria-label="Redes sociais">
      {links.map((link) => (
        <li key={link.href}>
          <a
            className="inline-flex rounded-full border border-black/20 bg-white/80 px-4 py-2 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-yellow-200"
            href={link.href}
            target="_blank"
            rel="noreferrer"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
