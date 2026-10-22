import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="section pt-0">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-[var(--radius-xl)] border border-line bg-surface px-6 py-14 text-center shadow-card sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(60% 80% at 50% 0%, var(--accent-soft), transparent 70%)" }}
          />
          <div className="relative">
            <p className="eyebrow">Let&apos;s work together</p>
            <h2 id="cta-title" className="mx-auto mt-3 max-w-xl text-h2 font-bold">
              Have a project or opportunity in mind?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-fg-muted">
              I&apos;m always happy to talk about internships, collaborations and new ideas.
            </p>
            <ButtonLink href="/contact" size="lg" className="mt-8">
              Get in touch <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
