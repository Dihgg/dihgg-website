import type { Project } from '../data/portfolio';

type Props = {
  projects: Project[];
};

export default function ProjectCards({ projects }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {projects.map((project) => (
        <article key={project.name} className="group rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
          <p className="font-mono text-xs uppercase tracking-wider text-orange-700">{project.stack}</p>
          <h3 className="mt-2 text-xl font-bold">{project.name}</h3>
          <p className="mt-2 text-sm text-black/70">{project.description}</p>
          <a
            className="mt-4 inline-block text-sm font-semibold underline decoration-orange-500 decoration-2 underline-offset-4"
            href={project.href}
            target="_blank"
            rel="noreferrer"
          >
            Ver projeto
          </a>
        </article>
      ))}
    </div>
  );
}
