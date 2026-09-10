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
  role: string;
  /** Short tags, e.g. ["0 → 1", "Mobile", "Design system"]. */
  tags: string[];
  /** Optional cover image in /public/projects/<slug>/. Falls back to a gradient. */
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
    slug: "sample-project",
    title: "Rethinking onboarding for a fintech app",
    summary:
      "Cut time-to-first-transaction by 40% by redesigning account setup around progressive disclosure and clearer trust signals.",
    year: 2025,
    role: "Lead Product Designer",
    tags: ["0 → 1", "Mobile", "Research"],
    gradient: ["#fda4af", "#fbbf24"],
    featured: true,
    published: true,
  },
  {
    slug: "design-system",
    title: "Building a design system from scratch",
    summary:
      "Unified 4 product surfaces on a single token-driven component library, adopted by 12 engineers across 3 teams.",
    year: 2024,
    role: "Design Systems Lead",
    tags: ["Design system", "Tokens", "Docs"],
    gradient: ["#a5b4fc", "#67e8f9"],
    featured: true,
    published: true,
  },
  {
    slug: "dashboard-redesign",
    title: "Analytics dashboard redesign",
    summary:
      "Restructured a dense internal dashboard around user tasks, reducing support tickets about 'where do I find…' by half.",
    year: 2024,
    role: "Product Designer",
    tags: ["Web", "Data viz", "IA"],
    gradient: ["#6ee7b7", "#3b82f6"],
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
