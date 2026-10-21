"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * Light/dark switch. Icons swap with the `dark` class (not JS state), so the server HTML
 * already matches the theme and nothing flickers or mismatches during hydration.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className="grid size-11 place-items-center rounded-full text-fg transition-colors hover:bg-accent-soft hover:text-accent"
    >
      <Sun aria-hidden className="hidden size-5 dark:block" />
      <Moon aria-hidden className="size-5 dark:hidden" />
    </button>
  );
}
