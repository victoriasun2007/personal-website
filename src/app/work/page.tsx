import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import { publishedProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected product design case studies.",
};

export default function WorkPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Work
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          A few projects I can talk about publicly. Reach out if you&apos;d like
          to see more, including NDA work.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {publishedProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
