import Link from "next/link";
import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import { Reveal, Magnetic } from "@/components/motion";
import { HeroTitle, ScrollCue } from "@/components/hero";
import { FloatingShapes } from "@/components/floating-shapes";
import { featuredProjects } from "@/content/projects";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[88vh] items-center py-24">
        <FloatingShapes />
        <Container>
          <Reveal>
            <p className="font-display text-xl italic text-muted sm:text-2xl">
              {site.role} · {site.location}
            </p>
          </Reveal>

          <HeroTitle />

          <Reveal delay={0.15}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
              I enjoy turning ideas into real, useful products, especially when
              the work can make an impact on people’s lives. I study Information
              Systems and HCI at Carnegie Mellon, and my work brings together
              design, research, and technology.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-wrap items-center gap-4 text-sm">
              <Magnetic>
                <Link
                  href="/work"
                  data-cursor="pool"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-contrast transition-shadow hover:shadow-[0_0_0_4px_rgb(var(--glow)/0.18)]"
                >
                  Dive in
                  <span aria-hidden>↓</span>
                </Link>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href={`mailto:${site.email}`}
                  data-cursor="pool"
                  className="inline-block rounded-full border border-border px-6 py-3 font-medium transition-colors hover:border-accent/50"
                >
                  Say hello
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </Container>

        <ScrollCue />
      </section>

      {/* Selected work */}
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl italic text-foreground sm:text-3xl">
              Selected work
            </h2>
            <Link
              href="/work"
              data-cursor="pool"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              Everything →
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <p className="font-display text-2xl leading-snug text-foreground sm:text-4xl">
              Looking for summer 2027 internships. I’d love to connect!
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8">
              <Magnetic strength={0.2}>
                <a
                  href={`mailto:${site.email}`}
                  data-cursor="pool"
                  className="inline-block font-display text-xl italic text-accent underline-offset-8 hover:underline sm:text-2xl"
                >
                  {site.email}
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
