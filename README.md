# Portfolio

Personal portfolio website for showcasing product design work.
Built with **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS v4**, and **MDX** case studies.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | What it does                        |
| --------------- | ----------------------------------- |
| `npm run dev`   | Start the dev server                |
| `npm run build` | Production build                    |
| `npm run start` | Serve the production build          |
| `npm run lint`  | Run ESLint                          |

## Making it yours

Everything you'll edit regularly lives in a few places:

- **`src/lib/site.ts`** — your name, role, bio, location, email, social links, and nav.
- **`src/content/projects.ts`** — the project registry. Each entry drives the cards
  on the home and `/work` pages (title, summary, year, role, tags, cover image,
  featured flag).
- **`src/app/work/(case-studies)/<slug>/page.mdx`** — the full case study for each
  project. The folder name must match the `slug` in `projects.ts`.
- **`public/projects/<slug>/`** — images for a case study. Reference them in MDX as
  `![alt](/projects/<slug>/image.png)`.

### Adding a new project

1. Add an entry to the `projects` array in `src/content/projects.ts` with a unique `slug`.
2. Create `src/app/work/(case-studies)/<slug>/page.mdx` (copy `sample-project` as a template).
3. Drop images into `public/projects/<slug>/`.

### Pages

| Route            | File                                                   |
| ---------------- | ------------------------------------------------------ |
| `/`              | `src/app/page.tsx` — hero + selected work              |
| `/work`          | `src/app/work/page.tsx` — all published projects       |
| `/work/<slug>`   | `src/app/work/(case-studies)/<slug>/page.mdx`          |
| `/about`         | `src/app/about/page.tsx` — bio + experience            |

`(case-studies)` is a [route group](https://nextjs.org/docs/app/building-your-application/routing/route-groups) —
it applies a shared layout (`prose` styling + back link) without appearing in the URL.

## Theming

Colors are CSS custom properties in `src/app/globals.css` (`--background`,
`--foreground`, `--muted`, `--border`, `--accent`), with a `prefers-color-scheme`
dark variant. Tailwind reads them via `@theme` (`bg-background`, `text-muted`, …).
Fonts are set in `src/app/layout.tsx` (currently Geist).

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — no configuration needed.
3. Set `site.url` in `src/lib/site.ts` to your production domain (used for
   metadata, sitemap, and robots).

## SEO

- Per-page metadata via the Next.js Metadata API (see each `page.tsx` / MDX `export const metadata`).
- `src/app/sitemap.ts` and `src/app/robots.ts` generate `/sitemap.xml` and `/robots.txt`.
- Open Graph / Twitter card defaults in `src/app/layout.tsx`.
