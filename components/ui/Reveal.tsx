"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Starting vertical offset in px. */
  y?: number;
}

/**
 * Fades content up once when it scrolls into view. `data-reveal` lets the liquid glass
 * snapshot (and the <noscript> rule in the layout) show the content in its final state.
 */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

interface StaggerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}

/** Reveals its <StaggerItem> children one after another when scrolled into view. */
export function Stagger({ children, className, as = "div" }: StaggerProps) {
  const Component = as === "ul" ? motion.ul : as === "ol" ? motion.ol : motion.div;
  return (
    <Component className={className} variants={container} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Component = as === "li" ? motion.li : motion.div;
  return (
    <Component data-reveal className={className} variants={item}>
      {children}
    </Component>
  );
}
