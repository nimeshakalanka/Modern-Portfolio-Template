import Link from "next/link";
import type { Route } from "next";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap select-none " +
  "transition-[transform,background-color,color,box-shadow,border-color] duration-200 ease-out " +
  "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60 motion-reduce:transition-none motion-reduce:active:scale-100";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-fg shadow-card hover:-translate-y-0.5 hover:shadow-float motion-reduce:hover:translate-y-0",
  secondary:
    "border border-line bg-surface text-fg hover:-translate-y-0.5 hover:border-accent hover:text-accent motion-reduce:hover:translate-y-0",
  ghost: "text-fg hover:bg-accent-soft hover:text-accent",
};

const sizes: Record<Size, string> = {
  md: "px-5 text-[0.9375rem]",
  lg: "min-h-12 px-6 text-base",
};

interface StyleProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

export function buttonClasses({ variant = "primary", size = "md", className }: StyleProps = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonLinkProps extends StyleProps {
  href: Route | string;
  children: ReactNode;
  external?: boolean;
  download?: boolean;
  "aria-label"?: string;
}

export function ButtonLink({ href, children, external, download, variant, size, className, ...aria }: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });
  const isExternal = external ?? /^https?:\/\//.test(href);

  if (isExternal || download || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        download={download || undefined}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...aria}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href as Route} className={classes} {...aria}>
      {children}
    </Link>
  );
}

type ButtonProps = StyleProps & ComponentPropsWithoutRef<"button">;

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses({ variant, size, className })} {...props} />;
}
