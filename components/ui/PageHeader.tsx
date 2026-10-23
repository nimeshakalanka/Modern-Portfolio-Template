import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
}

export function PageHeader({ eyebrow, title, lede }: PageHeaderProps) {
  return (
    <header className="container-page pt-32 pb-12 sm:pt-40 sm:pb-16">
      <p className="eyebrow animate-fade-up">{eyebrow}</p>
      <h1 className="mt-3 max-w-3xl animate-rise text-h1 font-bold">{title}</h1>
      {lede && <p className="mt-5 max-w-2xl animate-fade-up text-lg text-fg-muted [animation-delay:120ms]">{lede}</p>}
    </header>
  );
}
