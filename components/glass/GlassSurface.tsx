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
  shape?: GlassShape;
  radius?: number;
}

const TINT = { light: 0.22, dark: 0.04 };
const INTERACTION_EVENTS = ["pointermove", "pointerdown", "keydown", "wheel", "scroll"] as const;

let hasInteracted = false;

function afterFirstInteraction(callback: () => void): () => void {
  let idleId: number | undefined;
  const start = () => {
    hasInteracted = true;
    removeListeners();
    idleId =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(callback, { timeout: 1500 })
        : Number(setTimeout(callback, 300));
  };
  const removeListeners = () => INTERACTION_EVENTS.forEach((type) => window.removeEventListener(type, start));

  if (hasInteracted) start();
  else INTERACTION_EVENTS.forEach((type) => window.addEventListener(type, start, { once: true, passive: true }));

  return () => {
    removeListeners();
    if (idleId === undefined) return;
    if ("cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
    else clearTimeout(idleId);
  };
}

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

    const cancelPending = afterFirstInteraction(() => {
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
      cancelPending();
      glassRef.current?.destroy();
      glassRef.current = null;
      setReady(false);
    };
  }, [enabled, shape, radius]);

  useEffect(() => {
    if (!enabled || !glassRef.current) return;
    glassRef.current.setTintOpacity(isDark ? TINT.dark : TINT.light);
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
