import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-sm leading-5 font-medium text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}
