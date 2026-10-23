"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

// Animation features load in a separate chunk, keeping them out of the hydration critical path.
const loadMotionFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {/* strict: only the lightweight `m` components may be used, so nothing re-bundles all features. */}
      <LazyMotion features={loadMotionFeatures} strict>
        {/* "user": follow prefers-reduced-motion (transforms off, opacity kept). */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}
