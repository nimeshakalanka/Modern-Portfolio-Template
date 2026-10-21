/**
 * Skills grouped by category. TODO: replace with your own skills.
 * The defaults list the technologies this portfolio itself is built with.
 */

export interface SkillGroup {
  category: string;
  description: string;
  skills: string[];
  /** Shown in the skills highlight on the home page. */
  highlight?: boolean;
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    description: "Building responsive, accessible interfaces.",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
    highlight: true,
  },
  {
    category: "Design & UX",
    description: "Turning ideas into clear, usable layouts.",
    skills: ["Responsive Design", "Accessibility (WCAG)", "Design Systems", "Motion Design"],
    highlight: true,
  },
  {
    category: "Tools",
    description: "Shipping and collaborating.",
    skills: ["Git", "GitHub", "VS Code", "Vercel", "ESLint"],
    highlight: true,
  },
];
