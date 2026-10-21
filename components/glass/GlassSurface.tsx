"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import type { GlassHandle, GlassShape } from "@/lib/liquid-glass";
import { cn } from "@/lib/cn";
import { useLiquidGlass } from "./use-liquid-glass";

interface GlassSurfaceProps {
  children: ReactNode;
  className?: string;
  /** Must match the visual shape so the refraction follows the edges. */
  shape?: GlassShape;
  /** Corner radius in px for `rounded`; ignored for `pill`/`circle`. */
  radius?: number;
}

const TINT = { light: 0.22, dark: 0.04 };

/** Runs `callback` when the browser is idle; returns a cancel function. */
function onIdle(callback: () => void): () => void {
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(callback, { timeout: 2500 });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(callback, 1200);
  return () => clearTimeout(id);
}

/**
 * A surface with CSS glassmorphism that upgrades to WebGL liquid glass where supported.
 * The CSS layer is always rendered, so the surface looks complete before, without, or
 * instead of the WebGL canvas. Children are real DOM content and sit above both layers.
 */
export function GlassSurface({ children, className, shape = "rounded", radius = 24 }: GlassSurfaceProps) {
  const enabled = useLiquidGlass();
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const hostRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<GlassHandle | null>(null);
  const [ready, setReady] = useState(false);
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const host = hostRef.current;
    if (!enabled || !host) return;
    let cancelled = false;

    const cancelIdle = onIdle(() => {
      void import("@/lib/liquid-glass").then(({ createGlass }) => {
        if (cancelled) return;
        glassRef.current = createGlass(host, {
          shape,
          radius,
          tintOpacity: document.documentElement.classList.contains("dark") ? TINT.dark : TINT.light,
          onReady: () => setReady(true),
        });
      });
    });

    return () => {
      cancelled = true;
      cancelIdle();
      glassRef.current?.destroy();
      glassRef.current = null;
      setReady(false);
    };
  }, [enabled, shape, radius]);

  // The page snapshot behind the glass goes stale when the theme or route changes.
  useEffect(() => {
    if (!enabled) return;
    glassRef.current?.setTintOpacity(isDark ? TINT.dark : TINT.light);
    void import("@/lib/liquid-glass").then(({ requestRecapture }) => requestRecapture());
  }, [enabled, isDark, pathname]);

  return (
    <div
      data-glass={ready ? "webgl" : "css"}
      className={cn("relative isolate", className)}
      style={shape === "rounded" ? { borderRadius: radius } : undefined}
    >
      <div aria-hidden className="glass pointer-events-none absolute inset-0 -z-10 rounded-[inherit]" />
      <div
        ref={hostRef}
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit] transition-opacity duration-700",
          ready ? "opacity-100" : "opacity-0",
        )}
      />
      {ready && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-[var(--glass-veil)] shadow-[inset_0_0_0_1px_var(--glass-border),inset_0_1px_0_var(--glass-highlight)]"
        />
      )}
      {children}
    </div>
  );
}
