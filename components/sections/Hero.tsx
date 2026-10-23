import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import { GlassSurface } from "@/components/glass/GlassSurface";
import { ButtonLink } from "@/components/ui/Button";
import { GradientPlaceholder } from "@/components/ui/GradientPlaceholder";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="container-page grid min-h-[88svh] items-center gap-12 pt-32 pb-16 lg:grid-cols-[1.35fr_1fr] lg:pt-28">
        <div>
          <p className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-medium text-fg-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            {profile.availability}
          </p>

          <p className="mt-8 animate-fade-up font-display text-xl font-semibold text-fg-muted [animation-delay:60ms]">
            Hello, I&apos;m
          </p>
          <h1 id="hero-title" className="mt-2 animate-rise text-display font-extrabold">
            {profile.name}
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-5 animate-fade-up font-display text-xl font-semibold sm:text-2xl [animation-delay:120ms]">
            {profile.tagline}
          </p>
          <p className="mt-4 max-w-xl animate-fade-up text-lg text-fg-muted [animation-delay:180ms]">
            {profile.headline}
          </p>

          <div className="mt-10 animate-fade-up [animation-delay:260ms]">
            <GlassSurface shape="pill" className="inline-flex rounded-full">
              <div className="flex gap-1 p-1.5 sm:gap-1.5">
                <ButtonLink href="/projects" className="sm:min-h-12 sm:px-6 sm:text-base">
                  View Projects <ArrowRight aria-hidden className="size-4" />
                </ButtonLink>
                <ButtonLink href="/contact" variant="ghost" className="sm:min-h-12 sm:px-6 sm:text-base">
                  Contact Me
                </ButtonLink>
              </div>
            </GlassSurface>
          </div>
        </div>

        <div className="relative mx-auto hidden w-full max-w-sm animate-fade-up [animation-delay:200ms] lg:block">
          <div className="rotate-2 overflow-hidden rounded-[var(--radius-xl)] border border-line shadow-float transition-transform duration-500 hover:rotate-0 motion-reduce:transition-none">
            <GradientPlaceholder seed={profile.name} label={profile.initials} className="aspect-[4/5]" />
          </div>
          <p className="glass absolute -bottom-5 -left-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
            <MapPin aria-hidden className="size-4 text-accent" />
            {profile.location}
          </p>
        </div>
      </div>

      <a
        href="#intro"
        className="absolute bottom-6 left-1/2 hidden min-h-11 -translate-x-1/2 items-center gap-2 rounded-full px-4 text-sm text-fg-muted transition-colors hover:text-accent sm:inline-flex"
      >
        <ArrowDown aria-hidden className="size-4 animate-bounce motion-reduce:animate-none" />
        Scroll to learn more
      </a>
    </section>
  );
}
