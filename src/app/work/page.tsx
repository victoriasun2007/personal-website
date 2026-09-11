import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/motion";
import { publishedProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected product design case studies.",
};

export default function WorkPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Work
          </p>
          <h1 className="mt-4 font-display text-4xl text-foreground sm:text-5xl">
            Case studies
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            Internship work, self-initiated concepts, and team projects. Some
            details are adapted for NDA — happy to walk through the rest over a
            call.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          {publishedProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
