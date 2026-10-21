import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  id?: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, lede, id, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-2xl", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-h2 font-bold">
        {title}
      </h2>
      {lede && <p className="mt-4 text-fg-muted">{lede}</p>}
    </Reveal>
  );
}
