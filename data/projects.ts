/**
 * Project showcase data. Add, remove or reorder entries here; no component changes are needed.
 * Every entry below is a placeholder (TODO): replace it with your real projects.
 */

export interface Project {
  /** Unique, URL-safe id. Also seeds the gradient placeholder colours. */
  slug: string;
  title: string;
  /** One or two sentences for the card. */
  summary: string;
  /** Longer description for the detail view, one string per paragraph. */
  description: string[];
  /** Technologies; also used as filter tags on /projects. */
  tags: string[];
  highlights?: string[];
  role?: string;
  year?: string;
  liveUrl?: string;
  repoUrl?: string;
  /** Optional screenshot under /public. Without it a generated gradient placeholder is shown. */
  image?: { src: string; alt: string; width: number; height: number };
  /** Featured projects appear on the home page (the first three are shown). */
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One", // TODO
    summary: "TODO: One or two sentences on what this project does and who it is for.",
    description: [
      "TODO: Describe the problem this project solves and why you built it.",
      "TODO: Explain your approach, the interesting technical decisions, and what you learned.",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: ["TODO: A key feature or result", "TODO: Another key feature or result"],
    role: "Solo project", // TODO
    year: "20XX", // TODO
    liveUrl: "https://example.com", // TODO
    repoUrl: "https://github.com/your-username/project-one", // TODO
    featured: true,
  },
  {
    slug: "project-two",
    title: "Project Two", // TODO
    summary: "TODO: One or two sentences on what this project does and who it is for.",
    description: [
      "TODO: Describe the problem this project solves and why you built it.",
      "TODO: Explain your approach, the interesting technical decisions, and what you learned.",
    ],
    tags: ["React", "JavaScript", "CSS"],
    highlights: ["TODO: A key feature or result"],
    role: "Team of 3", // TODO
    year: "20XX", // TODO
    liveUrl: "https://example.com", // TODO
    repoUrl: "https://github.com/your-username/project-two", // TODO
    featured: true,
  },
  {
    slug: "project-three",
    title: "Project Three", // TODO
    summary: "TODO: One or two sentences on what this project does and who it is for.",
    description: [
      "TODO: Describe the problem this project solves and why you built it.",
      "TODO: Explain your approach, the interesting technical decisions, and what you learned.",
    ],
    tags: ["HTML", "CSS", "JavaScript"],
    highlights: ["TODO: A key feature or result"],
    role: "Coursework", // TODO
    year: "20XX", // TODO
    liveUrl: "https://example.com", // TODO
    repoUrl: "https://github.com/your-username/project-three", // TODO
    featured: true,
  },
  {
    slug: "project-four",
    title: "Project Four", // TODO
    summary: "TODO: One or two sentences on what this project does and who it is for.",
    description: ["TODO: Describe the project, your approach and the outcome."],
    tags: ["TypeScript", "React"],
    year: "20XX", // TODO
    repoUrl: "https://github.com/your-username/project-four", // TODO
  },
];

/** Every unique tag, in first-seen order. */
export const projectTags: string[] = Array.from(new Set(projects.flatMap((p) => p.tags)));

export const featuredProjects: Project[] = projects.filter((p) => p.featured).slice(0, 3);
