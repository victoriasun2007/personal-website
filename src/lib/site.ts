/**
 * Central place for site-wide copy and links.
 * Edit these values to make the site yours.
 */
export const site = {
  name: "Victoria Sun",
  role: "Design, Product & Data",
  // Used for <title> templates, Open Graph, and the sitemap/robots base URL.
  // Set this to your real domain before deploying.
  url: "https://victoriasun.com",
  description:
    "Victoria Sun is a product designer and aspiring PM studying Information Systems + HCI at Carnegie Mellon. She works across research, interaction, and visual design.",
  location: "Pittsburgh, PA",
  email: "victoria.sun.2007@gmail.com",
  // Drop the PDF at public/resume.pdf (or change this path). Set to null to hide.
  resumeUrl: "/resume.pdf",
  // Written on the floating hero shapes, in order: circle, star, flower,
  // heart, blob. Keep them short — they have to fit inside the shape.
  funFacts: [
    "Competitive swimmer for 10+\u00a0years",
    "UIST 2026 co\u2011author",
    "Self\u2011taught Gel\u2011X nail artist",
    "Fluent in Chinese",
    "Love exploring new things",
  ],
  socials: [
    { label: "Email", href: "mailto:victoria.sun.2007@gmail.com" },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/victoria-sun-171192359",
    },
  ],
} as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
] as const;
