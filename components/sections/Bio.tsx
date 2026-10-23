import Image from "next/image";
import { Download, Mail } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { GradientPlaceholder } from "@/components/ui/GradientPlaceholder";
import { profile } from "@/data/profile";

export function Bio() {
  return (
    <section aria-labelledby="bio-title" className="pb-20 sm:pb-28">
      <div className="container-page grid items-start gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
        <div className="mx-auto w-full max-w-sm animate-rise md:sticky md:top-28">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] border border-line shadow-float">
            {profile.photo ? (
              <Image
                src={profile.photo.src}
                alt={profile.photo.alt}
                fill
                priority
                sizes="(min-width: 768px) 384px, 100vw"
                className="object-cover"
              />
            ) : (
              <GradientPlaceholder seed={profile.name} label={profile.initials} className="size-full" />
            )}
          </div>
        </div>

        <div className="animate-fade-up [animation-delay:120ms]">
          <h2 id="bio-title" className="text-h2 font-bold">
            My story
          </h2>
          <div className="mt-5 space-y-5 text-lg text-fg-muted">
            {profile.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {profile.facts.map((fact) => (
              <div key={fact.label} className="rounded-[var(--radius-md)] border border-line bg-surface p-4">
                <dt className="text-sm text-fg-muted">{fact.label}</dt>
                <dd className="mt-1 font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={profile.cvPath} download size="lg">
              <Download aria-hidden className="size-4" /> Download CV
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="secondary">
              <Mail aria-hidden className="size-4" /> Contact me
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
