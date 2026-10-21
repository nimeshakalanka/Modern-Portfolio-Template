import { PageTransition } from "@/components/layout/PageTransition";
import { PageHeader } from "@/components/ui/PageHeader";

export default function AboutPage() {
  return (
    <PageTransition>
      <PageHeader eyebrow="About" title="About" />
    </PageTransition>
  );
}
