export type SocialPlatform = "github" | "linkedin" | "email";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
  handle: string;
}

export interface EducationEntry {
  institution: string;
  qualification: string;
  period: string;
  details?: string;
}

export interface Fact {
  label: string;
  value: string;
}

export interface Profile {
  name: string;
  initials: string;
  tagline: string;
  headline: string;
  shortBio: string;
  bio: string[];
  location: string;
  email: string;
  availability: string;
  responseTime: string;
  cvPath: string;
  photo?: { src: string; alt: string };
  facts: Fact[];
  socials: SocialLink[];
  education: EducationEntry[];
}

export const profile: Profile = {
  name: "Nimesh Akalanka Hettiarachchi",
  initials: "NA",
  tagline: "Information Systems Undergraduate | Web Developer",
  headline: "I design and build fast, accessible websites and software that solve real problems.",
  shortBio:
    "Information systems undergraduate and developer passionate about crafting responsive, accessible user interfaces and modern full-stack web applications.",
  bio: [
    "I am an Information Systems undergraduate focused on building robust, user-friendly digital products. My journey in tech started with a curiosity about how software shapes businesses, and has grown into a love for clean frontend architecture and scalable systems.",
    "I work primarily with React, Next.js, TypeScript, and modern CSS tooling. I care deeply about performance, accessible design, fluid animations, and writing structured, maintainable code.",
  ],
  location: "Colombo, Sri Lanka",
  email: "akalankanime@gmail.com",
  availability: "Open to internships and freelance opportunities",
  responseTime: "Usually replies within 24-48 hours",
  cvPath: "/cv-placeholder.pdf",
  facts: [
    { label: "Studying", value: "BSc (Hons) Information Systems" },
    { label: "Focus", value: "Full-Stack Web Development" },
    { label: "Based in", value: "Colombo, Sri Lanka" },
  ],
  socials: [
    {
      platform: "github",
      label: "GitHub",
      href: "https://github.com/nimeshakalanka",
      handle: "@nimeshakalanka",
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/nimeshakalanka",
      handle: "in/nimeshakalanka",
    },
    {
      platform: "email",
      label: "Email",
      href: "mailto:akalankanime@gmail.com",
      handle: "akalankanime@gmail.com",
    },
  ],
  education: [
    {
      institution: "University",
      qualification: "BSc (Hons) in Information Systems",
      period: "2023 – Present",
      details: "Focusing on enterprise application development, software engineering principles, databases, and UX design.",
    },
    {
      institution: "Secondary Education",
      qualification: "G.C.E. Advanced Level",
      period: "2020 – 2022",
      details: "Physical Science stream with coursework in mathematics and physics.",
    },
  ],
};
