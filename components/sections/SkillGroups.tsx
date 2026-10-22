import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { skillGroups } from "@/data/skills";

export function SkillGroups() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section border-t border-line">
      <div className="container-page">
        <SectionHeading
          id="skills-title"
          eyebrow="Skills"
          title="What I work with"
          lede="Grouped by area. I'm always adding to this list."
        />

        <Stagger as="ul" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
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
      </div>
    </section>
  );
}
