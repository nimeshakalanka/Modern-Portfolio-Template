"use client";

import Link from "next/link";
import { m } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/data/projects";
import { ProjectLinks } from "./ProjectLinks";
import { ProjectMedia } from "./ProjectMedia";

interface ProjectCardProps {
  project: Project;
  onOpen?: (project: Project) => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const detailsClass =
    "inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-[0.9375rem] font-medium text-fg-muted transition-colors hover:text-accent";

  return (
    <m.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface shadow-card transition-shadow hover:shadow-float"
    >
      <m.div layoutId={onOpen ? `project-media-${project.slug}` : undefined}>
        <ProjectMedia project={project} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      </m.div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold">{project.title}</h3>
        <p className="mt-2 text-fg-muted">{project.summary}</p>

        <ul aria-label="Technologies" className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          <ProjectLinks project={project} />
          {onOpen ? (
            <button type="button" onClick={() => onOpen(project)} aria-haspopup="dialog" className={detailsClass}>
              Details <span className="sr-only">about {project.title}</span>
              <ArrowRight aria-hidden className="size-4" />
            </button>
          ) : (
            <Link href={`/projects#${project.slug}`} className={detailsClass}>
              Details <span className="sr-only">about {project.title}</span>
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          )}
        </div>
      </div>
    </m.article>
  );
}
