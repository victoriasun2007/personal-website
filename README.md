# Victoria Sun — Portfolio

Personal portfolio site. **Next.js 16** (App Router) · TypeScript · Tailwind CSS v4 · MDX case studies.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Where things live

| What | File |
| --- | --- |
| Name, role, bio, email, links, résumé path | [src/lib/site.ts](src/lib/site.ts) |
| Project list (cards on home + `/work`) | [src/content/projects.ts](src/content/projects.ts) |
| Home page | [src/app/page.tsx](src/app/page.tsx) |
| About (education, experience, skills) | [src/app/about/page.tsx](src/app/about/page.tsx) |
| A case study | `src/app/work/(case-studies)/<slug>/page.mdx` |
| Case-study images | `public/projects/<slug>/` |
| Colors / theme tokens | [src/app/globals.css](src/app/globals.css) |

## Case studies

Each project is one MDX file. It uses two components:

- `<CaseStudyHeader slug="…" />` — pulls the title block from `projects.ts`.
- `<Figure src="…" alt="…" caption="…" />` — an image that breaks out wider
  than the text column. Add `priority` on the first one.

The `(case-studies)` folder is a route group: it gives every case study a shared
`prose` layout without adding a segment to the URL (`/work/<slug>`).

### To add a project

1. Add an entry to `projects` in [src/content/projects.ts](src/content/projects.ts) with a unique `slug`.
2. Create `src/app/work/(case-studies)/<slug>/page.mdx` (copy an existing one).
3. Put images in `public/projects/<slug>/` and reference them from `<Figure>`.

## The interactive layer

The site is built around a calm, natural "water" theme — inspired by
[justmckissick.com](https://justmckissick.com) and
[Zainab Kabira's portfolio](https://zainabkabira.com), each built around one
strong personal metaphor. Pieces:

| Piece | File |
| --- | --- |
| Drifting gradient background + pointer ripples | [src/components/water-background.tsx](src/components/water-background.tsx) |
| Custom droplet cursor | [src/components/cursor.tsx](src/components/cursor.tsx) |
| Scroll-reveal, magnetic buttons, rising scroll progress | [src/components/motion.tsx](src/components/motion.tsx) |
| Hero headline animation + scroll cue | [src/components/hero.tsx](src/components/hero.tsx) |
| Light "shallows" / dark "deep water" toggle | [src/components/theme.tsx](src/components/theme.tsx) |
| Case-study title block + breakout `<Figure>` | [src/components/case-study.tsx](src/components/case-study.tsx) |

Built with [Motion](https://motion.dev) (`motion/react`). Everything respects
`prefers-reduced-motion` — animations still happen but shrink to ~0 duration,
and the custom cursor / pointer ripples don't mount. Colors live as CSS custom
properties in `globals.css`; swap `--accent`/`--background`/etc. to reskin.

## Still to do

- [ ] **Résumé** — drop your PDF at `public/resume.pdf`. The nav/footer/about
      links point there. (To hide the links instead, set `resumeUrl: null` in
      `src/lib/site.ts`.)
- [ ] **Raizz images** — the Raizz case study currently shows a gradient
      placeholder. Export screens from `New Raizz App Design.fig` at ~2200px
      wide, save as JPGs in `public/projects/raizz/`, then swap the placeholder
      `<div>` in `raizz/page.mdx` for `<Figure>` calls like the other studies.
- [ ] **Set your domain** — update `url` in `src/lib/site.ts` (used for
      metadata, sitemap, robots).
- [ ] Check project **years** in `projects.ts` (Eventi is set to 2026).
- [ ] The XR Safewear / Opus / Eventi images are rendered from your portfolio
      deck. Replace with clean Figma exports when you have time.

## Deploy (Vercel)

1. Push to GitHub.
2. Import at [vercel.com/new](https://vercel.com/new) — no config needed.
3. Add your custom domain.
