export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string[];
  tags: string[];
  highlights?: string[];
  role?: string;
  year?: string;
  liveUrl?: string;
  repoUrl?: string;
  image?: { src: string; alt: string; width: number; height: number };
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "restaurant-bar-pos",
    title: "Meyola Restaurant & Bar Management",
    summary: "Full-featured point of sale and dining operations management system designed for fast order turnaround and inventory control.",
    description: [
      "A complete hospitality platform developed to handle table floor plans, incoming kitchen tickets, drink orders, and automated bill computation.",
      "Engineered with real-time state synchronization, clean responsive UI components, and detailed transaction reporting to minimize service delays during rush hours.",
    ],
    tags: ["React", "JavaScript", "Tailwind CSS", "Node.js"],
    highlights: ["Real-time table order tracking", "Automated receipt computation and split bills", "Role-based staff permissions"],
    role: "Lead Developer",
    year: "2024",
    repoUrl: "https://github.com/nimeshakalanka/MEYOLA-RESTAURANT-BAR",
    featured: true,
  },
  {
    slug: "kitchen-order-system",
    title: "Kitchen Order & Billing System",
    summary: "High-efficiency kitchen order display and billing workflow system built to streamline food preparation and customer invoicing.",
    description: [
      "Built to address communication bottlenecks between floor staff and kitchen chefs through digital order queues and instant status toggling.",
      "Provides intuitive keyboard navigation, responsive touch support for tablets, and offline-tolerant local state handling.",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: ["Interactive kitchen ticket board", "Fast checkout and print-ready receipts", "State persistence and quick search"],
    role: "Full-Stack Developer",
    year: "2024",
    repoUrl: "https://github.com/nimeshakalanka/kitchen-bill",
    featured: true,
  },
  {
    slug: "lanka-travel-diaries",
    title: "Lanka Travel Diaries",
    summary: "Interactive travel portal highlighting tourist destinations, hidden cultural gems, and itinerary planning across Sri Lanka.",
    description: [
      "A rich visual web guide dedicated to showcasing the scenic landscapes, historical heritage, and coastal attractions of Sri Lanka.",
      "Designed with fluid layouts, curated travel advice, interactive maps, and responsive media galleries for travelers.",
    ],
    tags: ["React", "TypeScript", "CSS"],
    highlights: ["Destination discovery with search & filter", "Mobile-optimized responsive image galleries"],
    role: "Solo Project",
    year: "2024",
    featured: true,
  },
  {
    slug: "modern-portfolio",
    title: "Modern Portfolio & Liquid Glass UI",
    summary: "High-performance personal website engineered with Next.js 16, interactive WebGL glass refraction, and full accessibility.",
    description: [
      "Personal portfolio platform demonstrating modern front-end capabilities: client-side view transitions, fluid typography scales, and a signature liquid glass navigation interface.",
      "Achieves 100% Lighthouse accessibility ratings with complete keyboard navigation, strict WCAG AA contrast, and zero layout shift.",
    ],
    tags: ["Next.js", "TypeScript", "WebGL", "Tailwind CSS"],
    year: "2026",
    repoUrl: "https://github.com/nimeshakalanka/Modern-Portfolio",
  },
];

export const projectTags: string[] = Array.from(new Set(projects.flatMap((p) => p.tags)));

export const featuredProjects: Project[] = projects.filter((p) => p.featured).slice(0, 3);
