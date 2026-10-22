import Image from "next/image";
import { GradientPlaceholder } from "@/components/ui/GradientPlaceholder";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";

interface ProjectMediaProps {
  project: Project;
  className?: string;
  sizes: string;
  priority?: boolean;
}

/** The project screenshot, or generated artwork when there is none. Fixed 16:10 box: no layout shift. */
export function ProjectMedia({ project, className, sizes, priority }: ProjectMediaProps) {
  return (
    <div className={cn("relative aspect-[16/10] overflow-hidden", className)}>
      {project.image ? (
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <GradientPlaceholder seed={project.slug} label={project.title} className="size-full" />
      )}
    </div>
  );
}
