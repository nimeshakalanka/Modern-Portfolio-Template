/**
 * Owner details. Every value marked TODO is a placeholder: replace it with your own information.
 * This file is the single source of truth for personal content across the site.
 */

export type SocialPlatform = "github" | "linkedin" | "email";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
  /** Short visible handle, e.g. "@username". */
  handle: string;
}

export interface EducationEntry {
  institution: string;
  qualification: string;
  /** Display string, e.g. "2023 – Present". */
  period: string;
  details?: string;
}

export interface Fact {
  label: string;
  value: string;
}

export interface Profile {
  name: string;
  /** Used for the logo monogram and image placeholders. */
  initials: string;
  tagline: string;
  /** One sentence shown in the hero under the tagline. */
  headline: string;
  /** 2–3 sentences, shown on the home page. */
  shortBio: string;
  /** Longer bio for the About page, one string per paragraph. */
  bio: string[];
  location: string;
  email: string;
  availability: string;
  responseTime: string;
  /** Path under /public. */
  cvPath: string;
  /** Optional portrait under /public. Leave undefined to show the gradient placeholder. */
  photo?: { src: string; alt: string };
  facts: Fact[];
  socials: SocialLink[];
  education: EducationEntry[];
}

export const profile: Profile = {
  name: "Your Name", // TODO
  initials: "YN", // TODO
  tagline: "Information Systems Undergraduate | Web Developer", // TODO
  headline: "I design and build fast, accessible websites that are a pleasure to use.", // TODO
  shortBio:
    "TODO: Write 2–3 sentences about yourself: what you study, what you enjoy building, and what you are looking for next.",
  bio: [
    "TODO: Introduce yourself in a few sentences: where you study, what drew you to technology, and what kind of problems you like solving.",
    "TODO: Describe how you work: the tools you reach for, how you approach design and code quality, and what you are learning right now.",
  ],
  location: "Your City, Country", // TODO
  email: "you@example.com", // TODO
  availability: "Open to internships and freelance work", // TODO
  responseTime: "Usually replies within 48 hours", // TODO
  cvPath: "/cv-placeholder.pdf", // TODO: replace public/cv-placeholder.pdf with your CV
  facts: [
    { label: "Studying", value: "Your Degree" }, // TODO
    { label: "Focus", value: "Web Development" }, // TODO
    { label: "Based in", value: "Your City" }, // TODO
  ],
  socials: [
    {
      platform: "github",
      label: "GitHub",
      href: "https://github.com/your-username", // TODO
      handle: "@your-username",
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/your-username", // TODO
      handle: "in/your-username",
    },
    {
      platform: "email",
      label: "Email",
      href: "mailto:you@example.com", // TODO
      handle: "you@example.com",
    },
  ],
  education: [
    {
      institution: "Your University", // TODO
      qualification: "BSc (Hons) in Your Degree", // TODO
      period: "20XX – Present", // TODO
      details: "TODO: Relevant modules, achievements or societies.",
    },
    {
      institution: "Your School or College", // TODO
      qualification: "Your Qualification", // TODO
      period: "20XX – 20XX", // TODO
      details: "TODO: Subjects and results, or delete this entry.",
    },
  ],
};
