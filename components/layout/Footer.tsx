import Link from "next/link";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { profile } from "@/data/profile";
import { navItems } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl font-bold">{profile.name}</p>
          <p className="mt-2 max-w-xs text-sm text-fg-muted">{profile.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold">Pages</h2>
          <ul className="mt-2 grid grid-cols-2 gap-x-4 md:grid-cols-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 min-w-11 items-center text-sm text-fg-muted transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold">Connect</h2>
          <ul className="mt-2 flex gap-2">
            {profile.socials.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  {...(social.platform === "email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  className="grid size-11 place-items-center rounded-full border border-line text-fg-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <SocialIcon platform={social.platform} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page flex flex-col gap-2 border-t border-line py-6 text-sm text-fg-muted sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p>Built with Next.js, Tailwind CSS and Motion.</p>
      </div>
    </footer>
  );
}
