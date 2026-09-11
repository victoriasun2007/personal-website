/**
 * Project registry.
 *
 * Each entry powers the cards on the home + work pages. The full case study
 * lives in an MDX file at:  src/app/work/(case-studies)/<slug>/page.mdx
 * Keep `slug` in sync with that folder name.
 */
export type Project = {
  slug: string;
  title: string;
  summary: string;
  year: number;
  /** Company, course, or "Self-initiated". */
  context: string;
  role: string;
  /** Short tags, e.g. ["Product design", "Mobile", "0 → 1"]. */
  tags: string[];
  /** Cover image in /public/projects/<slug>/. Falls back to the gradient. */
  cover?: string;
  /** Two hex colors for the fallback gradient placeholder. */
  gradient: [string, string];
  /** Show on the home page "Selected work" section. */
  featured?: boolean;
  /** Set false for work-in-progress entries you don't want linked yet. */
  published?: boolean;
};

export const projects: Project[] = [
  {
    slug: "raizz",
    title: "Redesigning Raizz, an AI sleep app",
    summary:
      "Sole designer on a full mobile redesign for an AI sleep-tech startup — 160+ screens across 7 feature areas, plus a scalable design system and new AI-driven features.",
    year: 2026,
    context: "AxiLab — Product Design Intern",
    role: "Sole product designer",
    tags: ["Product design", "Mobile", "Design system", "AI"],
    gradient: ["#3b4a2f", "#20271a"],
    featured: true,
    published: true,
  },
  {
    slug: "xr-safewear",
    title: "XR Safewear — AR goggles for open-water swimming",
    summary:
      "A concept for mixed-reality swim goggles that make open water feel safe: real-time navigation, shark alerts, bone-conduction audio, and a heads-up display — grounded in swimmer interviews.",
    year: 2024,
    context: "Self-initiated concept",
    role: "Research, product & UX design",
    tags: ["Concept", "AR / wearable", "User research", "0 → 1"],
    cover: "/projects/xr-safewear/cover.jpg",
    gradient: ["#1e3a5f", "#0b1c33"],
    featured: true,
    published: true,
  },
  {
    slug: "opus",
    title: "Opus — a gamified planning app",
    summary:
      "A productivity app that helps students beat procrastination by turning goals, dailies, and focus sessions into a game — with an AI helper that breaks big goals into steps.",
    year: 2024,
    context: "Self-initiated concept",
    role: "End-to-end product & visual design",
    tags: ["Concept", "Mobile", "Gamification", "AI"],
    cover: "/projects/opus/cover.jpg",
    gradient: ["#f9a8d4", "#312e81"],
    featured: true,
    published: true,
  },
  {
    slug: "eventi",
    title: "Eventi — connecting students to campus life",
    summary:
      "A centralized platform that brings campus and Pittsburgh events into one place, using gamification and a buddy system to lower the social friction of going out.",
    year: 2026,
    context: "Team of 4 — CMU",
    role: "Product lead, incl. app design",
    tags: ["Team", "Mobile", "Gamification", "Strategy"],
    cover: "/projects/eventi/cover.jpg",
    gradient: ["#bae6fd", "#f472b6"],
    featured: false,
    published: true,
  },
];

export const featuredProjects = projects.filter(
  (p) => p.featured && p.published !== false,
);

export const publishedProjects = projects.filter((p) => p.published !== false);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
