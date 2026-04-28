import { PROJECTS_PER_PAGE } from "@/lib/constants";
import { normalize } from "@/lib/utils";
import Pill from "./Pill";
import type { ProjectItem } from "@/types";
import classNames from "classnames";
import { useEffect, useState } from "react";

type Props = {
  projects: ProjectItem[];
  classnames?: string[];
  loadMore?: boolean;
  filtering?: boolean;
  loadMoreLabel?: string;
  projectsFilterLabel?: string;
};

type ProjectCardData = ProjectItem["data"];

type ProjectTag = {
  label: string;
  value: string;
};

export default function ProjectCards({
  projects,
  classnames = [],
  filtering = false,
  loadMore = false,
  loadMoreLabel = "Load more",
  projectsFilterLabel = "Filter by category",
}: Props) {
  const [loaded, setLoaded] = useState(
    loadMore ? PROJECTS_PER_PAGE : projects.length,
  );
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tags = Array.from(
    projects
      .flatMap((project) => project.data.stack)
      .reduce((map, tag) => {
        const normalizedTag = normalize(tag);

        if (!map.has(normalizedTag)) {
          map.set(normalizedTag, { label: tag, value: normalizedTag });
        }

        return map;
      }, new Map<string, ProjectTag>())
      .values(),
  ).sort((firstTag, secondTag) =>
    firstTag.label.localeCompare(secondTag.label),
  );

  const filteredProjects: ProjectCardData[] = projects
    .map((project) => project.data)
    .filter(({ stack }) =>
      selectedTag ? stack.some((tag) => normalize(tag) === selectedTag) : true,
    );

  const visibleProjects = filteredProjects.slice(0, loaded);
  const canLoadMore = loadMore && loaded < filteredProjects.length;

  function handleSelectTag(tag: string) {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  }

  function handleLoadMoreProjects() {
    setLoaded((prev) =>
      Math.min(prev + PROJECTS_PER_PAGE, filteredProjects.length),
    );
  }

  useEffect(() => {
    setLoaded(loadMore ? PROJECTS_PER_PAGE : projects.length);
  }, [selectedTag, loadMore, projects]);

  return (
    <>
      {filtering && (
        <nav className="text-center my-6 gap-4 flex flex-col items-center md:items-start">
          <span className="font-semibold text-black-60">
            {projectsFilterLabel}:
          </span>
          <ul className="flex flex-wrap gap-2 justify-center">
            {tags.map((tag) => (
              <li key={tag.value}>
                <Pill
                  variant={tag.value === selectedTag ? "primary" : "default"}
                  onClick={() => handleSelectTag(tag.value)}
                  aria-pressed={tag.value === selectedTag}
                  icon={tag.value}
                >
                  {tag.label.toLocaleLowerCase()}
                </Pill>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <ul className={classNames("project-cards", classnames)}>
        {visibleProjects.map((project) => {
          const { name, description, links = [], stack = [] } = project;

          return (
            <li key={name}>
              <article className="project-card">
                <ul className="project-card__stack">
                  {[...stack].sort((a, b) => {
                    const aNorm = normalize(a);
                    const bNorm = normalize(b);
                    if (aNorm === selectedTag) return -1;
                    if (bNorm === selectedTag) return 1;
                    return 0;
                  }).map((item, index) => (
                    <li
                      key={item}
                      className={classNames({
                        "hidden sm:flex": index > 1,
                      })}
                    >
                      <Pill
                        variant="tag"
                        icon={normalize(item)}
                        className={classNames({
                          "pill--tag--active": normalize(item) === selectedTag,
                        })}
                      >
                        {item.toLocaleLowerCase()}
                      </Pill>
                    </li>
                  ))}
                  {stack.length > 2 && (
                    <li>
                      <Pill variant="tag" className="flex sm:hidden">
                        ...
                      </Pill>
                    </li>
                  )}
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

      {canLoadMore && (
        <div className="mt-8 flex justify-center">
          <Pill variant="primary" onClick={handleLoadMoreProjects}>
            {loadMoreLabel}
          </Pill>
        </div>
      )}
    </>
  );
}
