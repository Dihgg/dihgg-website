import Pill from './Pill';
import type {ProjectItem} from '@/types';

type Props = {
  projects: ProjectItem[];
  ctaLabel?: string;
};

export default function ProjectCards({ projects, ctaLabel = 'View project' }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {projects.map((project) => {
        const { name, description, icon, href, stack} = project.data;
        return (
          <article key={name} className="group rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <p className="font-mono text-xs uppercase tracking-wider text-orange-700">{stack}</p>
            <h3 className="mt-2 text-xl font-bold">{name}</h3>
            <p className="mt-2 text-sm text-black/70">{description}</p>
            <div className="mt-3 flex justify-end">
              <Pill
                icon={icon}
                href={href}
                external
              >
                {ctaLabel}
              </Pill>
            </div>
          </article>
        );
      })}
    </div>
  );
}
