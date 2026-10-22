import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import { GlassSurface } from "@/components/glass/GlassSurface";
import { ButtonLink } from "@/components/ui/Button";
import { GradientPlaceholder } from "@/components/ui/GradientPlaceholder";
import { profile } from "@/data/profile";

/**
 * Above-the-fold intro. Entrance animations are CSS (see `animate-*` in globals.css) so they
 * start before hydration and never delay the largest contentful paint.
 */
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
              <div className="flex flex-wrap gap-1.5 p-1.5">
                <ButtonLink href="/projects" size="lg">
                  View Projects <ArrowRight aria-hidden className="size-4" />
                </ButtonLink>
                <ButtonLink href="/contact" size="lg" variant="ghost">
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
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full px-3 py-2 text-sm text-fg-muted transition-colors hover:text-accent sm:inline-flex"
      >
        <ArrowDown aria-hidden className="size-4 animate-bounce motion-reduce:animate-none" />
        Scroll to learn more
      </a>
    </section>
  );
}
