import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { featuredProjects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function FeaturedProjects() {
  return (
    <section aria-labelledby="featured-title" className="section">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="featured-title"
            eyebrow="Selected work"
            title="Featured projects"
            lede="A few things I have designed and built recently."
          />
          <ButtonLink href="/projects" variant="secondary">
            See all projects <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>

        <Stagger as="ul" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <StaggerItem as="li" key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
