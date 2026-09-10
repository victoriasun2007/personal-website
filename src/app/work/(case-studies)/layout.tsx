import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/container";

export default function CaseStudyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="overflow-x-clip py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Link
              href="/work"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              ← Back to work
            </Link>
          </div>
          <article
            className="prose prose-neutral mx-auto mt-8 max-w-2xl dark:prose-invert
              prose-headings:font-semibold prose-headings:tracking-tight
              prose-h2:mt-14 prose-h2:text-xl
              prose-a:font-medium prose-a:text-foreground
              prose-blockquote:border-l-foreground/30 prose-blockquote:font-normal prose-blockquote:not-italic
              prose-img:rounded-xl"
          >
            {children}
          </article>
        </Container>
      </div>
      <nav className="border-t border-border">
        <Container className="py-8">
          <Link
            href="/work"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            ← All work
          </Link>
        </Container>
      </nav>
    </>
  );
}
