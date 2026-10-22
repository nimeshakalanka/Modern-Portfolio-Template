import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { skillGroups } from "@/data/skills";

export function SkillsHighlight() {
  const groups = skillGroups.filter((group) => group.highlight);

  return (
    <section aria-labelledby="skills-title" className="section">
      <div className="container-page">
        <SectionHeading
          id="skills-title"
          eyebrow="Toolkit"
          title="Skills I bring"
          lede="The languages, tools and practices I use to turn ideas into working products."
        />

        <Stagger as="ul" className="mt-12 grid gap-6 md:grid-cols-3">
          {groups.map((group) => (
            <StaggerItem
              as="li"
              key={group.category}
              className="rounded-[var(--radius-lg)] border border-line bg-surface p-6 shadow-card"
            >
              <h3 className="text-lg font-bold">{group.category}</h3>
              <p className="mt-1 text-sm text-fg-muted">{group.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <Tag>{skill}</Tag>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>

        <Link
          href="/about#skills"
          className="mt-8 inline-flex min-h-11 items-center gap-2 font-medium text-accent hover:underline"
        >
          All skills and education <ArrowRight aria-hidden className="size-4" />
        </Link>
      </div>
    </section>
  );
}
