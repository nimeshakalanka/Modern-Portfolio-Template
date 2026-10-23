import { PageTransition } from "@/components/layout/PageTransition";
import { CtaBand } from "@/components/sections/CtaBand";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { SkillsHighlight } from "@/components/sections/SkillsHighlight";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";

/** schema.org Person data so search engines understand who the site is about. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.tagline,
  description: profile.headline,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: profile.location },
  sameAs: profile.socials.filter((s) => s.platform !== "email").map((s) => s.href),
};

export default function HomePage() {
  return (
    <PageTransition>
      <script
        type="application/ld+json"
        // Escape "<" so profile text can never close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Intro />
      <FeaturedProjects />
      <SkillsHighlight />
      <CtaBand />
    </PageTransition>
  );
}
