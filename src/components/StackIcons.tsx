import {
  SiAstro,
  SiJest,
  SiReact,
  SiTailwindcss,
  SiTypescript
} from 'react-icons/si';

export default function StackIcons() {
  const iconClassName = 'h-4 w-4 text-slate-600 transition-colors group-hover:text-blue-700';

  return (
    <ul className="group flex items-center gap-3" aria-label="Technology stack">
      <li title="Astro">
        <SiAstro className={iconClassName} />
      </li>
      <li title="React">
        <SiReact className={iconClassName} />
      </li>
      <li title="TypeScript">
        <SiTypescript className={iconClassName} />
      </li>
      <li title="Tailwind CSS">
        <SiTailwindcss className={iconClassName} />
      </li>
      <li title="Jest">
        <SiJest className={iconClassName} />
      </li>
    </ul>
  );
}