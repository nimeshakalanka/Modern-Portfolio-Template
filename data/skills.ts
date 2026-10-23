export interface SkillGroup {
  category: string;
  description: string;
  skills: string[];
  highlight?: boolean;
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    description: "Building responsive, accessible interfaces.",
    skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
    highlight: true,
  },
  {
    category: "Design & UX",
    description: "Crafting clear, intuitive, and accessible user experiences.",
    skills: ["Responsive Design", "Accessibility (WCAG)", "Design Systems", "Motion Design"],
    highlight: true,
  },
  {
    category: "Tools & Backend",
    description: "Development environments, tooling, and deployment pipelines.",
    skills: ["Git", "GitHub", "Node.js", "VS Code", "Vercel", "ESLint"],
    highlight: true,
  },
];
