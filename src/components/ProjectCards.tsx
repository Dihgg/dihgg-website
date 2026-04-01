import Pill from './Pill';
import type {ProjectItem} from '@/types';

type Props = {
  projects: ProjectItem[];
  ctaLabel?: string;
};

export default function ProjectCards({ projects, ctaLabel = 'View project' }: Props) {
  return (
    <div className="project-cards">
      {projects.map((project) => {
        const { name, description, links = [], stack } = project.data;

        return (
          <article key={name} className="project-card">
            <p className="project-card__stack">{stack}</p>
            <h3 className="project-card__title">{name}</h3>
            <p className="project-card__description">{description}</p>
            {links.length > 0 && (
              <div className="project-card__links">
                {links.map((link) => (
                  <Pill
                    key={`${name}-${link.label}-${link.href}`}
                    icon={link.icon}
                    href={link.href}
                    external
                  >
                    {link.label}
                  </Pill>
                ))}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
