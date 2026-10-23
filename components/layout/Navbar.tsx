"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GlassSurface } from "@/components/glass/GlassSurface";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";
import { navItems } from "@/lib/site";

const MENU_ID = "mobile-menu";

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuPath(null);
      toggleRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setMenuPath(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:pt-4">
      <nav ref={navRef} aria-label="Main" className="mx-auto max-w-2xl">
        <GlassSurface shape="pill" className="rounded-full">
          <div className="flex items-center justify-between gap-2 p-1.5">
            <Link
              href="/"
              aria-label={`${profile.name}, home`}
              className="grid size-11 shrink-0 place-items-center rounded-full bg-fg font-display text-sm font-extrabold tracking-tight text-bg transition-transform hover:scale-105 motion-reduce:hover:scale-100"
            >
              {profile.initials}
            </Link>

            <ul className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-flex h-11 items-center rounded-full px-4 text-[0.9375rem] font-medium transition-colors",
                        active ? "text-accent" : "text-fg-muted hover:text-fg",
                      )}
                    >
                      {active && (
                        <m.span
                          layoutId="nav-indicator"
                          className="absolute inset-0 rounded-full bg-accent-soft"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-1">
              <ThemeToggle />
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setMenuPath(open ? null : pathname)}
                aria-expanded={open}
                aria-controls={MENU_ID}
                aria-label={open ? "Close menu" : "Open menu"}
                className="grid size-11 place-items-center rounded-full text-fg transition-colors hover:bg-accent-soft hover:text-accent md:hidden"
              >
                {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
              </button>
            </div>
          </div>
        </GlassSurface>

        <AnimatePresence>
          {open && (
            <m.div
              id={MENU_ID}
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="glass mt-2 origin-top rounded-[var(--radius-lg)] p-2 md:hidden"
            >
              <ul>
                {navItems.map((item, index) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        ref={index === 0 ? firstLinkRef : undefined}
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setMenuPath(null)}
                        className={cn(
                          "flex min-h-12 items-center rounded-[var(--radius-md)] px-4 font-display text-lg font-semibold transition-colors",
                          active ? "bg-accent-soft text-accent" : "text-fg hover:bg-accent-soft",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
