import { cn } from "@/lib/cn";

const ACCENT_HUE = 243;

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h;
}

interface GradientPlaceholderProps {
  seed: string;
  label: string;
  className?: string;
}

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
        <span
          className={cn(
            "font-display font-extrabold tracking-tight text-white drop-shadow-sm",
            label.length <= 3 ? "text-[clamp(2.5rem,24cqi,8rem)]" : "text-[clamp(1.5rem,6cqi,3.5rem)]",
          )}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
