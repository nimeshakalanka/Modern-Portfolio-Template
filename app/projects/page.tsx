import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { PageHeader } from "@/components/ui/PageHeader";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: `Selected projects by ${profile.name}, with live demos and source code.`,
  alternates: { canonical: "/projects" },
  openGraph: { url: "/projects" },
};

export default function ProjectsPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow={`Projects · ${projects.length}`}
        title="Things I've built"
        lede="Filter by technology, or open a project for the full story, live demo and source code."
      />
      <section aria-labelledby="all-projects" className="container-page pb-24 sm:pb-32">
        <h2 id="all-projects" className="sr-only">
          All projects
        </h2>
        <ProjectGrid />
      </section>
    </PageTransition>
  );
}
