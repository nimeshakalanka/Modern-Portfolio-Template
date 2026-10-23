import type { Metadata } from "next";
import { ArrowRight, Home } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="container-page grid min-h-[80svh] place-items-center pt-28 pb-20 text-center">
      <div>
        <p className="eyebrow animate-fade-up">Error 404</p>
        <h1 className="mt-4 animate-rise font-display text-[clamp(6rem,4rem+12vw,12rem)] leading-none font-extrabold tracking-tighter">
          4<span className="text-accent">0</span>4
        </h1>
        <p className="mx-auto mt-6 max-w-md animate-fade-up text-lg text-fg-muted [animation-delay:120ms]">
          This page wandered off. It may have moved, or the link might be mistyped.
        </p>
        <div className="mt-10 flex animate-fade-up flex-wrap justify-center gap-3 [animation-delay:200ms]">
          <ButtonLink href="/" size="lg">
            <Home aria-hidden className="size-4" /> Back home
          </ButtonLink>
          <ButtonLink href="/projects" size="lg" variant="secondary">
            View projects <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
