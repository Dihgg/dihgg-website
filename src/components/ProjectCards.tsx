import { PROJECTS_PER_PAGE } from "@/lib/constants";
import Pill from "./Pill";
import type { ProjectItem } from "@/types";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { se } from "date-fns/locale";

type Props = {
  projects: ProjectItem[];
  classnames?: string[];
  loadMore?: boolean;
  loadMoreLabel?: string;
};

type ProjectCardProps = ProjectItem["data"] & {
  visible?: boolean;
};

export default function ProjectCards({
  projects,
  classnames = [],
  loadMore = false,
  loadMoreLabel = "Load more",
}: Props) {
  const [filteredProjects, setFilteredProjects] = useState<ProjectCardProps[]>(
    [],
  );
  const [loaded, setLoaded] = useState(loadMore ? PROJECTS_PER_PAGE : projects.length);

  const tags = [
    ...new Set(projects.flatMap((project) => project.data.stack.map((stack) => stack.toLowerCase()))),
  ].sort();

  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  function handleSelectTag(tag: string) {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  }

  function handleLoadMoreProjects() {
    setLoaded((prev) => prev + PROJECTS_PER_PAGE);
  }

  useEffect(() => {
    setFilteredProjects(
      projects
        .map<ProjectCardProps>((project) => ({
          ...project.data,
        }))
        .filter(({ stack }) =>
          selectedTag ? stack.map((s) => s.toLowerCase()).includes(selectedTag) : true,
        ),
    );
  }, [selectedTag]);

  useEffect(() => {
    setLoaded(loadMore ? PROJECTS_PER_PAGE : projects.length);
  }, [filteredProjects]);

  return (
    <>
      <nav className="my-6">
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag}>
              <Pill
                variant={tag === selectedTag ? "primary" : "default"}
                onClick={() => handleSelectTag(tag)}
              >
                {tag}
              </Pill>
            </li>
          ))}
        </ul>
      </nav>
      <ul className={classNames("project-cards", classnames)}>
        {filteredProjects
          .map((project, index) => ({ ...project, visible: index < loaded }))
          .filter(({ visible }) => visible)
          .map((project) => {
            const { name, description, links = [], stack = [] } = project;

            return (
              <li
                className={classNames("project-card", {
                  "project-card--hidden": !project.visible,
                })}
                key={name}
              >
                <article key={name}>
                  <ul className="project-card__stack">
                    {stack.map((item) => (
                      <li key={item}>
                        <Pill key={item} variant="tag">
                          {item}
                        </Pill>
                      </li>
                    ))}
                  </ul>
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

      {loaded < filteredProjects.length && (
        <div className="mt-8 flex justify-center">
          <Pill variant="primary" onClick={handleLoadMoreProjects}>
            {loadMoreLabel}
          </Pill>
        </div>
      )}
    </>
  );
}
