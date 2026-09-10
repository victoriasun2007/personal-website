import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  const { slug, title, summary, year, context, tags, cover, gradient } =
    project;

  return (
    <Link
      href={`/work/${slug}`}
      className="group flex flex-col gap-4 rounded-2xl border border-border p-3 transition-colors hover:border-foreground/30"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
        {cover ? (
          <Image
            src={cover}
            alt={title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
            style={{
              backgroundImage: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
            }}
          />
        )}
      </div>

      <div className="flex flex-col gap-2 px-2 pb-2">
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-xs font-medium uppercase tracking-widest text-muted">
            {context}
          </p>
          <span className="shrink-0 text-sm text-muted">{year}</span>
        </div>
        <h3 className="text-base font-semibold tracking-tight">{title}</h3>
        <p className="text-sm leading-relaxed text-muted">{summary}</p>
        <ul className="mt-1 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
