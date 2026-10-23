"use client";

import { AnimatePresence, LayoutGroup, m } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { projects, projectTags, type Project } from "@/data/projects";
import { cn } from "@/lib/cn";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

const ALL = "All";

/** Filterable project grid with a detail modal. `/projects#<slug>` opens a project directly. */
export function ProjectGrid() {
  const [activeTag, setActiveTag] = useState(ALL);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const visible = activeTag === ALL ? projects : projects.filter((p) => p.tags.includes(activeTag));
  const openProject = projects.find((p) => p.slug === openSlug) ?? null;

  // Deep link: the hash is only readable in the browser, so sync it after mount.
  useEffect(() => {
    const syncFromHash = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      setOpenSlug(projects.some((p) => p.slug === slug) ? slug : null);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const open = useCallback((project: Project) => {
    setOpenSlug(project.slug);
    history.replaceState(null, "", `#${project.slug}`);
  }, []);

  const close = useCallback(() => {
    setOpenSlug(null);
    history.replaceState(null, "", window.location.pathname);
  }, []);

  return (
    <LayoutGroup>
      <div role="group" aria-label="Filter projects by technology" className="flex flex-wrap gap-2">
        {[ALL, ...projectTags].map((tag) => {
          const active = tag === activeTag;
          return (
            <button
              key={tag}
              type="button"
              aria-pressed={active}
              onClick={() => setActiveTag(tag)}
              className={cn(
                "relative min-h-11 rounded-full border px-4 text-[0.9375rem] font-medium transition-colors",
                active
                  ? "border-transparent text-accent-fg"
                  : "border-line bg-surface text-fg-muted hover:border-accent hover:text-accent",
              )}
            >
              {active && (
                <m.span
                  layoutId="filter-indicator"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{tag}</span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-fg-muted">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        {activeTag !== ALL && ` built with ${activeTag}`}
      </p>

      <m.ul layout className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <m.li
              key={project.slug}
              id={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 350, damping: 32 }}
            >
              <ProjectCard project={project} onOpen={open} />
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>

      <AnimatePresence>
        {openProject && <ProjectModal key={openProject.slug} project={openProject} onClose={close} />}
      </AnimatePresence>
    </LayoutGroup>
  );
}
