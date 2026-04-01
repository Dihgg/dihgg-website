
import Icon from '@/components/Icon';

export default function StackIcons() {
  const icons = [
    { name: 'Astro', icon: 'astro' },
    { name: 'React', icon: 'react' },
    { name: 'TypeScript', icon: 'typescript' },
    { name: 'Tailwind CSS', icon: 'tailwind' },
    { name: 'Jest', icon: 'jest' }
  ]

  return (
    <ul className="group flex items-center gap-3" aria-label="Technology stack">
      {icons.map(({ name, icon }) => (
        <li key={name} title={name} className="h-4 w-4 text-slate-600 transition-colors group-hover:text-blue-700">
          <Icon name={icon} />
        </li>
      ))}
    </ul>
  );
}