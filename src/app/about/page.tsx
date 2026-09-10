import type { Metadata } from "next";
import { Container } from "@/components/container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}, ${site.role}.`,
};

const experience = [
  {
    role: "Senior Product Designer",
    company: "Company Name",
    period: "2023 — Present",
    note: "Lead designer for the core mobile experience.",
  },
  {
    role: "Product Designer",
    company: "Earlier Company",
    period: "2020 — 2023",
    note: "Design systems and web platform.",
  },
];

export default function AboutPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid gap-12 sm:grid-cols-[1fr_1.4fr]">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              About
            </h1>
            <div className="mt-6 space-y-4 text-muted">
              <p>{site.intro}</p>
              <p>
                Based in {site.location}. Currently open to select freelance and
                full-time opportunities.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="text-foreground underline-offset-4 hover:underline"
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    s.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
              Experience
            </h2>
            <ul className="mt-6 divide-y divide-border">
              {experience.map((job) => (
                <li
                  key={`${job.company}-${job.period}`}
                  className="flex flex-col gap-1 py-5 sm:flex-row sm:justify-between sm:gap-8"
                >
                  <div>
                    <p className="font-medium">{job.role}</p>
                    <p className="text-sm text-muted">{job.company}</p>
                    <p className="mt-1 text-sm text-muted">{job.note}</p>
                  </div>
                  <p className="shrink-0 text-sm text-muted">{job.period}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
