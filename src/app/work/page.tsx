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
          <h1 className="font-display text-4xl text-foreground sm:text-5xl">
            Case studies
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            Internship work, self-initiated concepts, and team projects. Some
            work is adapted for NDA, but I&apos;d love to discuss it more.
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
