import Pill from './Pill';

type Project = {
  name: string;
  description: string;
  stack: string;
  href: string;
};

type Props = {
  projects: Project[];
  ctaLabel?: string;
};

export default function ProjectCards({ projects, ctaLabel = 'View project' }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {projects.map((project) => (
        <article key={project.name} className="group rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
          <p className="font-mono text-xs uppercase tracking-wider text-orange-700">{project.stack}</p>
          <h3 className="mt-2 text-xl font-bold">{project.name}</h3>
          <p className="mt-2 text-sm text-black/70">{project.description}</p>
          <div className="mt-3 flex justify-end">
            <Pill href={project.href} external>{ctaLabel}</Pill>
          </div>
        </article>
      ))}
    </div>
  );
}
