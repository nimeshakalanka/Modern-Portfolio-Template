import { GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

export function EducationTimeline() {
  return (
    <section aria-labelledby="education-title" className="section border-t border-line">
      <div className="container-page">
        <SectionHeading id="education-title" eyebrow="Education" title="Where I've studied" />

        <Stagger as="ol" className="relative mt-12 max-w-3xl space-y-10 border-l-2 border-line pl-8 sm:pl-10">
          {profile.education.map((entry) => (
            <StaggerItem as="li" key={`${entry.institution}-${entry.period}`} className="relative">
              <span
                aria-hidden
                className="absolute top-0.5 -left-[3.05rem] grid size-10 place-items-center rounded-full border-2 border-line bg-surface text-accent sm:-left-[3.55rem]"
              >
                <GraduationCap className="size-5" />
              </span>
              <p className="text-sm font-semibold text-accent">{entry.period}</p>
              <h3 className="mt-1 text-xl font-bold">{entry.qualification}</h3>
              <p className="mt-0.5 font-medium">{entry.institution}</p>
              {entry.details && <p className="mt-2 text-fg-muted">{entry.details}</p>}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
