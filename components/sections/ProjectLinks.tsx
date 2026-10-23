import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import type { Project } from "@/data/projects";

/**
 * Live + GitHub buttons. Each one renders only if the project has that URL.
 * Context is added as visually hidden text so the accessible name starts with the visible label.
 */
export function ProjectLinks({ project }: { project: Project }) {
  return (
    <>
      {project.liveUrl && (
        <ButtonLink href={project.liveUrl}>
          Live
          <span className="sr-only"> site for {project.title} (opens in a new tab)</span>
          <ArrowUpRight aria-hidden className="size-4" />
        </ButtonLink>
      )}
      {project.repoUrl && (
        <ButtonLink href={project.repoUrl} variant="secondary">
          <SocialIcon platform="github" className="size-4" /> GitHub
          <span className="sr-only"> source code for {project.title} (opens in a new tab)</span>
        </ButtonLink>
      )}
    </>
  );
}
