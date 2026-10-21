import { PageTransition } from "@/components/layout/PageTransition";
import { PageHeader } from "@/components/ui/PageHeader";

export default function HomePage() {
  return (
    <PageTransition>
      <PageHeader eyebrow="Home" title="Shell check" lede="Temporary page while the layout is built." />
      <div className="h-[150vh]" />
    </PageTransition>
  );
}
