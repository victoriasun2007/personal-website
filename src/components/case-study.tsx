import Image from "next/image";
import { notFound } from "next/navigation";
import { getProject } from "@/content/projects";
import { Reveal } from "@/components/motion";

/**
 * Standard case-study title block, driven by the project registry.
 * Use at the top of each case study MDX file: <CaseStudyHeader slug="…" />
 */
export function CaseStudyHeader({ slug }: { slug: string }) {
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <header className="not-prose mb-10">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
        {project.tags.join("  ·  ")}
      </p>
      <h1 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl">
        {project.title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">{project.summary}</p>
      <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-muted">Context</dt>
          <dd className="mt-1 font-medium">{project.context}</dd>
        </div>
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

/**
 * A figure that breaks out wider than the reading column, rising in on scroll.
 * <Figure src="/projects/…/x.jpg" alt="…" caption="…" />
 */
export function Figure({
  src,
  alt,
  caption,
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
}) {
  return (
    <Reveal className="not-prose my-12 lg:relative lg:left-1/2 lg:w-[74vw] lg:max-w-5xl lg:-translate-x-1/2">
      <figure>
        <Image
          src={src}
          alt={alt}
          width={2160}
          height={1080}
          priority={priority}
          className="h-auto w-full rounded-xl border border-border bg-surface"
          sizes="(min-width: 1024px) 74vw, 100vw"
        />
        {caption ? (
          <figcaption className="mt-3 text-center text-sm text-muted">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    </Reveal>
  );
}
