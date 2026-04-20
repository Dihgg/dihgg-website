import { PROJECTS_PER_PAGE } from "@/lib/constants";
import Pill from "./Pill";
import type { ProjectItem } from "@/types";
import classNames from "classnames";
import { useState } from "react";

type Props = {
  projects: ProjectItem[];
  classnames?: string[];
  dynamicLoaded?: boolean;
  loadMoreLabel?: string;
};

type ProjectCardProps = ProjectItem["data"] & {
  visible?: boolean;
};

export default function ProjectCards({
  projects,
  classnames = [],
  dynamicLoaded = false,
  loadMoreLabel = "Load more"
}: Props) {

  const [toLoad, setToLoad] = useState(dynamicLoaded ? PROJECTS_PER_PAGE : projects.length);
  const visibleCount = Math.min(toLoad, projects.length);
  const canLoadMore = dynamicLoaded && visibleCount < projects.length;

  function handleLoadMoreProjects() {
    setToLoad((prev) => Math.min(prev + PROJECTS_PER_PAGE, projects.length));
  }

  return (
    <>
      <ul className={classNames("project-cards", classnames)}>
        {projects
          .map<ProjectCardProps>((project, index) => ({
            ...project.data,
            visible: (index + 1) <= visibleCount,
          }))
          .map((project) => {
            const { name, description, links = [], stack } = project;

            return (
              <li className={classNames("project-card", { "project-card--hidden": !project.visible })} key={name}>
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

      {canLoadMore && (
        <div className="mt-8 flex justify-center">
          <Pill
            variant="primary"
            onClick={handleLoadMoreProjects}
          >
            {loadMoreLabel}
          </Pill>
        </div>
      )}
    </>
  );
}
