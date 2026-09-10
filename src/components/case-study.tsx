import { notFound } from "next/navigation";
import { getProject } from "@/content/projects";

/**
 * Renders the standard case-study title block from the project registry.
 * Use at the top of each case study MDX file: <CaseStudyHeader slug="…" />
 */
export function CaseStudyHeader({ slug }: { slug: string }) {
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <header className="not-prose mb-12 border-b border-border pb-10">
      <p className="text-sm font-medium uppercase tracking-widest text-muted">
        {project.tags.join(" · ")}
      </p>
      <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {project.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{project.summary}</p>
      <dl className="mt-8 grid grid-cols-2 gap-6 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-muted">Role</dt>
          <dd className="mt-1 font-medium">{project.role}</dd>
        </div>
        <div>
          <dt className="text-muted">Year</dt>
          <dd className="mt-1 font-medium">{project.year}</dd>
        </div>
      </dl>
    </header>
  );
}
