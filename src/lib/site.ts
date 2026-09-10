/**
 * Central place for site-wide copy and links.
 * Edit these values to make the site yours.
 */
export const site = {
  name: "Victoria Sun",
  role: "Product Designer",
  // Used for <title> templates, Open Graph, and the RSS/sitemap base URL.
  url: "https://example.com",
  description:
    "Product designer focused on turning complex problems into clear, humane interfaces.",
  location: "San Francisco, CA",
  email: "victoria.sun.2007@gmail.com",
  // Short intro shown on the home page.
  intro:
    "I'm a product designer who cares about the whole arc of a product — from the first messy problem statement to the pixels people tap every day. I work across research, interaction, and visual design.",
  socials: [
    { label: "Email", href: "mailto:victoria.sun.2007@gmail.com" },
    { label: "LinkedIn", href: "https://linkedin.com/in/your-handle" },
    { label: "Dribbble", href: "https://dribbble.com/your-handle" },
    { label: "Read.cv", href: "https://read.cv/your-handle" },
  ],
} as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
] as const;
