"use client";

import { m } from "motion/react";
import { Check, X } from "lucide-react";
import { useRef } from "react";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/data/projects";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { ProjectLinks } from "./ProjectLinks";
import { ProjectMedia } from "./ProjectMedia";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, onClose);
  const titleId = `project-title-${project.slug}`;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
      <m.div
        aria-hidden
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.18 } }}
        onClick={onClose}
      />
      <m.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24, transition: { duration: 0.18, ease: "easeIn" } }}
        transition={{ type: "spring", stiffness: 380, damping: 34 }}
        className="relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-t-[var(--radius-xl)] border border-line bg-surface shadow-float sm:rounded-[var(--radius-xl)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="glass absolute top-3 right-3 z-10 grid size-11 place-items-center rounded-full text-fg transition-colors hover:text-accent"
        >
          <X aria-hidden className="size-5" />
        </button>

        <m.div layoutId={`project-media-${project.slug}`}>
          <ProjectMedia project={project} sizes="(min-width: 672px) 672px, 100vw" />
        </m.div>

        <div className="p-6 sm:p-8">
          {(project.year || project.role) && (
            <p className="eyebrow">{[project.year, project.role].filter(Boolean).join(" · ")}</p>
          )}
          <h2 id={titleId} className="mt-2 text-h2 font-bold">
            {project.title}
          </h2>

          <div className="mt-4 space-y-4 text-fg-muted">
            {project.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {project.highlights && project.highlights.length > 0 && (
            <>
              <h3 className="mt-6 text-lg font-bold">Highlights</h3>
              <ul className="mt-3 space-y-2">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-accent" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <h3 className="mt-6 text-lg font-bold">Built with</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <ProjectLinks project={project} />
          </div>
        </div>
      </m.div>
    </div>
  );
}
