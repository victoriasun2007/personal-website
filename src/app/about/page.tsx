import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — ${site.role}, Carnegie Mellon.`,
};

const experience = [
  {
    role: "Product Design Intern",
    org: "AxiLab",
    period: "Summer 2026",
    note: "Sole designer for a full redesign of the Raizz AI sleep app — 160+ screens across 7 feature areas — plus a scalable design system, a PRD for an AI daily-planning feature, and the marketing site front end.",
  },
  {
    role: "Research Assistant",
    org: "Computer-Supported Collaborative Learning, CMU",
    period: "2026 – Present",
    note: "Evaluating human–LLM disagreements in AI-based collaboration assessment: finding failure patterns, refining prompts, and measuring against human-reference baselines.",
  },
  {
    role: "Research Assistant",
    org: "Interactive Structures Lab, CMU",
    period: "2025 – 2026",
    note: "MetaBeads — shape- and stiffness-changing interfaces through beaded metamaterials. Co-author on a paper accepted to ACM UIST 2026.",
  },
  {
    role: "Social Media Team",
    org: "CMU Swim & Dive",
    period: "2025 – Present",
    note: "Content and planning for the team's Instagram.",
  },
];

const skills = [
  {
    label: "Design & product",
    items: [
      "Figma",
      "User research",
      "Product management",
      "PRDs",
      "Design systems",
      "Prototyping",
      "Illustrator",
      "Photoshop",
      "InDesign",
      "SketchUp",
    ],
  },
  {
    label: "Engineering",
    items: ["Python", "Java", "SQL", "HTML / CSS", "R"],
  },
  {
    label: "Languages",
    items: ["English", "Mandarin"],
  },
];

export default function AboutPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          About
        </h1>

        <div className="mt-8 grid gap-12 sm:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4 text-muted">
            <p>{site.intro}</p>
            <p>
              I&apos;m a varsity swimmer at CMU and a 2026 CSCAA Scholar
              All-American — a lot of how I work (long horizons, steady reps,
              caring about the last 2%) comes from the pool. Open-water swimming
              is also where my{" "}
              <Link
                href="/work/xr-safewear"
                className="text-foreground underline-offset-4 hover:underline"
              >
                XR Safewear
              </Link>{" "}
              concept started.
            </p>
            <p>
              Currently open to product design and PM internships. The fastest
              way to reach me is{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-foreground underline-offset-4 hover:underline"
              >
                email
              </a>
              .
            </p>
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
                Education
              </h2>
              <div className="mt-5 border-t border-border pt-5">
                <p className="font-medium">Carnegie Mellon University</p>
                <p className="text-sm text-muted">
                  B.S. Information Systems + additional major in
                  Human-Computer Interaction · Expected 2029
                </p>
                <p className="mt-1 text-sm text-muted">
                  Varsity Swimming · 2026 CSCAA Scholar All-American
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
                Experience
              </h2>
              <ul className="mt-5 divide-y divide-border border-t border-border">
                {experience.map((job) => (
                  <li
                    key={`${job.org}-${job.period}`}
                    className="py-5"
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                      <p className="font-medium">
                        {job.role}
                        <span className="font-normal text-muted">
                          {" "}
                          · {job.org}
                        </span>
                      </p>
                      <p className="shrink-0 text-sm text-muted">
                        {job.period}
                      </p>
                    </div>
                    <p className="mt-1.5 text-sm text-muted">{job.note}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
                Skills
              </h2>
              <dl className="mt-5 space-y-4 border-t border-border pt-5">
                {skills.map((group) => (
                  <div key={group.label} className="sm:flex sm:gap-8">
                    <dt className="w-32 shrink-0 text-sm text-muted">
                      {group.label}
                    </dt>
                    <dd className="mt-1 text-sm sm:mt-0">
                      {group.items.join(", ")}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {site.resumeUrl ? (
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-foreground/40"
              >
                Download résumé (PDF)
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
