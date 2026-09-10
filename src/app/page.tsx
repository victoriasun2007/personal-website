import Link from "next/link";
import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import { featuredProjects } from "@/content/projects";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border py-20 sm:py-28">
        <Container>
          <p className="text-sm font-medium uppercase tracking-widest text-muted">
            {site.role} · {site.location}
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {site.intro}
          </h1>
          <div className="mt-10 flex flex-wrap gap-4 text-sm">
            <Link
              href="/work"
              className="rounded-full bg-foreground px-5 py-2.5 font-medium text-background transition-opacity hover:opacity-90"
            >
              View work
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="rounded-full border border-border px-5 py-2.5 font-medium transition-colors hover:border-foreground/40"
            >
              Get in touch
            </a>
          </div>
        </Container>
      </section>

      {/* Selected work */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold tracking-tight">
              Selected work
            </h2>
            <Link
              href="/work"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              All projects →
            </Link>
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
