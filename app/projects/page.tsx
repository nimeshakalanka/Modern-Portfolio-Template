import { PageTransition } from "@/components/layout/PageTransition";
import { PageHeader } from "@/components/ui/PageHeader";

export default function ProjectsPage() {
  return (
    <PageTransition>
      <PageHeader eyebrow="Projects" title="Projects" />
    </PageTransition>
  );
}
