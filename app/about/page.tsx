import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import { Bio } from "@/components/sections/Bio";
import { EducationTimeline } from "@/components/sections/EducationTimeline";
import { SkillGroups } from "@/components/sections/SkillGroups";
import { PageHeader } from "@/components/ui/PageHeader";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About",
  description: `About ${profile.name}: background, education and skills. ${profile.tagline}.`,
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

export default function AboutPage() {
  return (
    <PageTransition>
      <PageHeader eyebrow="About" title={`Hi, I'm ${profile.name}.`} lede={profile.tagline} />
      <Bio />
      <EducationTimeline />
      <SkillGroups />
    </PageTransition>
  );
}
