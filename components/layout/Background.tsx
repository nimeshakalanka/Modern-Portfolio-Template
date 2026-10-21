/**
 * Soft gradient mesh + film grain behind every page. Blobs are radial gradients rather than
 * blurred shapes, so they render identically in the liquid glass page snapshot.
 */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="mesh-blob absolute -top-[20%] -left-[10%] size-[70vmax]"
        style={{ background: "radial-gradient(circle, var(--mesh-1), transparent 62%)" }}
      />
      <div
        className="mesh-blob absolute -top-[10%] -right-[20%] size-[60vmax] [animation-delay:-8s]"
        style={{ background: "radial-gradient(circle, var(--mesh-2), transparent 60%)" }}
      />
      <div
        className="mesh-blob absolute -bottom-[30%] left-[20%] size-[65vmax] [animation-delay:-16s]"
        style={{ background: "radial-gradient(circle, var(--mesh-3), transparent 60%)" }}
      />
      <div className="noise absolute inset-0" />
    </div>
  );
}
