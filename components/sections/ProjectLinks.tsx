import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import type { Project } from "@/data/projects";

/** Live + GitHub buttons. Each one renders only if the project has that URL. */
export function ProjectLinks({ project }: { project: Project }) {
  return (
    <>
      {project.liveUrl && (
        <ButtonLink href={project.liveUrl} aria-label={`${project.title}: live site (opens in a new tab)`}>
          Live <ArrowUpRight aria-hidden className="size-4" />
        </ButtonLink>
      )}
      {project.repoUrl && (
        <ButtonLink
          href={project.repoUrl}
          variant="secondary"
          aria-label={`${project.title}: source code on GitHub (opens in a new tab)`}
        >
          <SocialIcon platform="github" className="size-4" /> GitHub
        </ButtonLink>
      )}
    </>
  );
}
