import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

export function Intro() {
  return (
    <section id="intro" aria-labelledby="intro-title" className="section">
      <div className="container-page grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">About me</p>
          <h2 id="intro-title" className="mt-3 text-h2 font-bold">
            A short introduction
          </h2>
          <p className="mt-5 max-w-[68ch] text-lg text-fg-muted">{profile.shortBio}</p>
          <ButtonLink href="/about" variant="secondary" className="mt-8">
            More about me <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </Reveal>

        <Stagger as="div" className="self-center">
          <dl className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {profile.facts.map((fact) => (
              <StaggerItem key={fact.label} className="rounded-[var(--radius-lg)] border border-line bg-surface p-5 shadow-card">
                <dt className="text-sm text-fg-muted">{fact.label}</dt>
                <dd className="mt-1 font-display text-xl font-bold">{fact.value}</dd>
              </StaggerItem>
            ))}
          </dl>
        </Stagger>
      </div>
    </section>
  );
}
