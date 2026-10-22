import { cn } from "@/lib/cn";

/** Accent hue (indigo) used as the centre of the placeholder palette. */
const ACCENT_HUE = 243;

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h;
}

interface GradientPlaceholderProps {
  /** Seeds the colours, so the same project always gets the same artwork. */
  seed: string;
  /** Text drawn in the middle, e.g. initials or a project title. */
  label: string;
  className?: string;
}

/**
 * Abstract artwork used wherever there is no real image yet. Hues stay within ±35° of the
 * accent so placeholders look related but distinguishable. Decorative, so hidden from AT.
 */
export function GradientPlaceholder({ seed, label, className }: GradientPlaceholderProps) {
  const h = hash(seed);
  const hueA = ACCENT_HUE + ((h % 71) - 35);
  const hueB = hueA + 28 + (h % 17);
  const x = 20 + (h % 60);
  const y = 15 + ((h >> 4) % 55);

  return (
    <div
      aria-hidden
      className={cn("@container relative overflow-hidden bg-surface-muted", className)}
      style={{
        backgroundImage: [
          `radial-gradient(circle at ${x}% ${y}%, hsl(${hueB} 90% 72% / 0.85), transparent 55%)`,
          `radial-gradient(circle at ${100 - x}% ${100 - y}%, hsl(${hueA} 85% 60% / 0.9), transparent 60%)`,
          `linear-gradient(135deg, hsl(${hueA} 70% 45%), hsl(${hueB} 75% 30%))`,
        ].join(","),
      }}
    >
      <div className="noise absolute inset-0 mix-blend-overlay" />
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-display text-[clamp(1.5rem,6cqi,3.5rem)] font-extrabold tracking-tight text-white drop-shadow-sm">
          {label}
        </span>
      </div>
    </div>
  );
}
