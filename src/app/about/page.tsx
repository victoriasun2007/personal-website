import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}, Information Systems + HCI at Carnegie Mellon.`,
};

const glance = [
  { label: "Studying", value: "Information Systems + HCI at CMU" },
  { label: "Previously", value: "Product Design at AxiLab" },
  { label: "Currently", value: "Human–AI interaction research" },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
      {children}
    </h2>
  );
}

export default function AboutPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <h1 className="max-w-3xl font-display text-3xl leading-tight text-foreground sm:text-4xl">
            A little more about me
          </h1>
        </Reveal>

        <div className="mt-12 grid gap-14 sm:grid-cols-[1fr_1.3fr]">
          <Reveal className="space-y-4 text-muted">
            <p>
              I started with art. I loved painting and studied art in high
              school, where I began exploring my own ideas through concept design
              projects. Those projects became a way to connect something I
              enjoyed with small problems I encountered in everyday life, turning
              my ideas into concepts people could actually use.
            </p>
            <p>
              At Carnegie Mellon, I’ve been exploring that connection through
              design, technology, and research. I still enjoy the creative part of
              imagining what something could be, but I’m just as interested in
              figuring out how to make it work and who it could help.
            </p>
          </Reveal>

          <Reveal>
            <SectionLabel>At a glance</SectionLabel>
            <dl className="mt-5 divide-y divide-border border-t border-border">
              {glance.map((row) => (
                <div key={row.label} className="flex gap-6 py-4">
                  <dt className="w-28 shrink-0 text-sm text-muted">{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
              {site.resumeUrl ? (
                <div className="flex gap-6 py-4">
                  <dt className="w-28 shrink-0 text-sm text-muted">Link</dt>
                  <dd>
                    <Link
                      href="/resume"
                      data-cursor="pool"
                      className="text-accent underline-offset-4 hover:underline"
                    >
                      View résumé →
                    </Link>
                  </dd>
                </div>
              ) : null}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
