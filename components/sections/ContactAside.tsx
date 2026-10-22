import { Clock, MapPin } from "lucide-react";
import { GlassSurface } from "@/components/glass/GlassSurface";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { profile } from "@/data/profile";

export function ContactAside() {
  return (
    <aside aria-label="Contact details" className="space-y-6">
      <GlassSurface radius={32} className="rounded-[var(--radius-xl)]">
        <div className="p-6 sm:p-8">
          <p className="flex items-center gap-2 font-semibold">
            <span aria-hidden className="size-2.5 rounded-full bg-success" />
            {profile.availability}
          </p>
          <ul className="mt-5 space-y-3 text-fg-muted">
            <li className="flex items-center gap-3">
              <MapPin aria-hidden className="size-5 shrink-0 text-accent" />
              {profile.location}
            </li>
            <li className="flex items-center gap-3">
              <Clock aria-hidden className="size-5 shrink-0 text-accent" />
              {profile.responseTime}
            </li>
          </ul>
        </div>
      </GlassSurface>

      <div>
        <h2 className="text-lg font-bold">Find me online</h2>
        <ul className="mt-3 space-y-2">
          {profile.socials.map((social) => (
            <li key={social.platform}>
              <a
                href={social.href}
                {...(social.platform === "email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                className="group flex min-h-14 items-center gap-4 rounded-[var(--radius-md)] border border-line bg-surface px-4 transition-colors hover:border-accent"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                  <SocialIcon platform={social.platform} />
                </span>
                <span className="min-w-0">
                  <span className="block font-medium group-hover:text-accent">{social.label}</span>
                  <span className="block truncate text-sm text-fg-muted">{social.handle}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
