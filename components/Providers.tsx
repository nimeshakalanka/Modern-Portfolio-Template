"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

const loadMotionFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <LazyMotion features={loadMotionFeatures} strict>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}
