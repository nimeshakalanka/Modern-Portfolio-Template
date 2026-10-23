"use client";

import { useSyncExternalStore } from "react";

const QUERIES = ["(prefers-reduced-motion: reduce)", "(pointer: fine) and (min-width: 768px)"] as const;

let webglSupport: boolean | undefined;

function hasWebGL(): boolean {
  if (webglSupport === undefined) {
    const gl = document.createElement("canvas").getContext("webgl");
    webglSupport = Boolean(gl);
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  }
  return webglSupport;
}

function isEnabled(): boolean {
  if (process.env.NEXT_PUBLIC_LIQUID_GLASS === "off") return false;
  if (new URLSearchParams(window.location.search).get("glass") === "off") return false;
  if (window.matchMedia(QUERIES[0]).matches) return false;
  if (!window.matchMedia(QUERIES[1]).matches) return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData) return false;
  return hasWebGL();
}

function subscribe(onChange: () => void): () => void {
  const lists = QUERIES.map((query) => window.matchMedia(query));
  lists.forEach((list) => list.addEventListener("change", onChange));
  return () => lists.forEach((list) => list.removeEventListener("change", onChange));
}

export function useLiquidGlass(): boolean {
  return useSyncExternalStore(subscribe, isEnabled, () => false);
}
