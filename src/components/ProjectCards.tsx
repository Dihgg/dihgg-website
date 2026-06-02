import { PROJECTS_PER_PAGE, STACK_ITEMS_MAX_COUNT } from "@/lib/constants";
import { normalize } from "@/lib/utils";
import Pill from "./Pill";
import type { ProjectItem } from "@/types";
import classNames from "classnames";
import { createContext, useContext, useEffect, useState } from "react";

type Props = {
  projects: ProjectItem[];
  classnames?: string[];
  loadMore?: boolean;
  filtering?: boolean;
  loadMoreLabel?: string;
  projectsFilterLabel?: string;
  showFullStack?: boolean;
};

type ProjectTag = {
  label: string;
  normalized: string;
};

type ProjectCardData = ProjectItem["data"];

const ProjectContext = createContext<{
  selectedCategory?: string;
  showFullStack?: boolean;
  project?: ProjectCardData;
}>({});

function ProjectCategories() {
  const { project, selectedCategory } = useContext(ProjectContext);
  if (!project) {
    return null;
  }
  const { categories } = project;

  return (
    <ul className="project-card__categories">
      {[...categories].sort((a, b) => {
        const aNorm = normalize(normalize(a));
        const bNorm = normalize(normalize(b));
        if (aNorm === selectedCategory) return -1;
        if (bNorm === selectedCategory) return 1;
        return 0;
      }).map((item, index) => (
        <li
          key={normalize(item)}
          className={classNames({
            "hidden sm:flex": index > 1,
          })}
        >
          <Pill
            variant="tag"
            icon={normalize(item)}
            className={classNames({
              "pill--tag--active": normalize(item) === selectedCategory,
            })}
          >
            {item.toLocaleLowerCase()}
          </Pill>
        </li>
      ))}
      {categories.length > 2 && (
        <li>
          <Pill variant="tag" className="flex sm:hidden">
            ...
          </Pill>
        </li>
      )}
    </ul>
  );
}

function ProjectStack() {
  const { project, showFullStack } = useContext(ProjectContext);
  if (!project) {
    return null;
  }
  
  const { stack } = project;
  
  if (stack.length === 0) {
    return null;
  }
  const visibleStack = showFullStack ? stack : stack.slice(0, STACK_ITEMS_MAX_COUNT);
  return (
    <div className="project-card__stack">
      <span className="project-card__stack__label">Stack:</span>
      <ul className="project-card__stack__list">
        {visibleStack.map((item) => (
          <li key={item}>
            <Pill variant="tag--small" icon={normalize(item)} tinted>
              {item.toLocaleLowerCase()}
            </Pill>
          </li>
        ))}
        {stack.length > 3 && !showFullStack && (
          <li>
            <Pill variant="tag--small" tinted>
              +{stack.length - 3}
            </Pill>
          </li>
        )}
      </ul>
    </div>
  );
}

function ProjectCard() {
  const { project } = useContext(ProjectContext);
  if (!project) {
    return null;
  }
  const { name, description, image, links = [] } = project;

  return (
    <article className="project-card">
      <div className="project-card__content">
        <ProjectCategories />
        <h3 className="project-card__title">{name}</h3>
        <p className="project-card__description">{description}</p>
        <ProjectStack />
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
      </div>
      {image && (
        <img src={image} alt="" className="project-card__background" aria-hidden />
      )}
    </article>
  );
}

export default function ProjectCards({
  projects,
  classnames = [],
  filtering = false,
  loadMore = false,
  loadMoreLabel = "Load more",
  projectsFilterLabel = "Filter by category",
  showFullStack = false
}: Props) {
  const [loaded, setLoaded] = useState(
    loadMore ? PROJECTS_PER_PAGE : projects.length,
  );
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  const categories = Array.from(
    projects
      .flatMap((project) => project.data.categories)
      .reduce((map, tag) => {
        const normalizedTag = normalize(tag);
        if (!map.has(normalizedTag)) {
          map.set(normalizedTag, { label: tag, normalized: normalizedTag });
        }

        return map;
      }, new Map<string, ProjectTag>())
      .values(),
  ).sort((firstTag, secondTag) =>
    firstTag.label.localeCompare(secondTag.label),
  );

  const filteredProjects: ProjectCardData[] = projects
    .map((project) => project.data)
    .filter(({ categories }) =>
      selectedCategory ? categories.some((tag) => normalize(tag) === selectedCategory) : true,
    );

  const visibleProjects: ProjectCardData[] = filteredProjects.slice(0, loaded);
  const canLoadMore = loadMore && loaded < filteredProjects.length;

  function handleSelectTag(tag: string) {
    setSelectedCategory((prev) => (prev === tag ? undefined : tag));
  }

  function handleLoadMoreProjects() {
    setLoaded((prev) =>
      Math.min(prev + PROJECTS_PER_PAGE, filteredProjects.length),
    );
  }

  useEffect(() => {
    setLoaded(loadMore ? PROJECTS_PER_PAGE : projects.length);
  }, [selectedCategory, loadMore, projects]);

  return (
    <>
      {filtering && (
        <nav className="text-center my-6 gap-4 flex flex-col items-center md:items-start">
          <span className="font-semibold text-black-60">
            {projectsFilterLabel}:
          </span>
          <ul className="flex flex-wrap gap-2 justify-center">
            {categories.map((tag) => (
              <li key={tag.normalized}>
                <Pill
                  variant={tag.normalized === selectedCategory ? "primary" : "default"}
                  onClick={() => handleSelectTag(tag.normalized)}
                  aria-pressed={tag.normalized === selectedCategory}
                  icon={tag.normalized}
                >
                  {tag.label.toLocaleLowerCase()}
                </Pill>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <ul className={classNames("project-cards", classnames)}>
        {visibleProjects.map((project: ProjectCardData) => {
          const { name } = project;

          return (
            <li key={name}>
              <ProjectContext.Provider
                value={{
                  selectedCategory,
                  showFullStack,
                  project
                }}
              >
                <ProjectCard />
              </ProjectContext.Provider>
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
