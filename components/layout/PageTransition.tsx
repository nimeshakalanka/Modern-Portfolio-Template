import { ViewTransition, type ReactNode } from "react";

/**
 * Wraps a page's content so route changes crossfade with a small rise (see `.page` in
 * globals.css). Browsers without the View Transitions API simply switch instantly.
 * Lives in each page (not the layout) because layouts persist across navigations.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
