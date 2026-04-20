import Pill from "./Pill";
import type { ProjectItem } from "@/types";
import classNames from "classnames";

type Props = {
  projects: ProjectItem[];
  classnames?: string[];
};

export default function ProjectCards({
  projects,
  classnames = []
}: Props) {
  return (
    <ul className={classNames("project-cards", classnames)}>
      {projects.map((project) => {
        const { name, description, links = [], stack } = project.data;

        return (
          <li className="project-card">
            <article key={name}>
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
                      tinted
                      external
                    >
                      {link.label}
                    </Pill>
                  ))}
                </div>
              )}
            </article>
          </li>
        );
      })}
    </ul>
  );
}
