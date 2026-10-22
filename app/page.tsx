import { PageTransition } from "@/components/layout/PageTransition";
import { CtaBand } from "@/components/sections/CtaBand";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { SkillsHighlight } from "@/components/sections/SkillsHighlight";

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <Intro />
      <FeaturedProjects />
      <SkillsHighlight />
      <CtaBand />
    </PageTransition>
  );
}
