import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/container";

export default function CaseStudyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="py-12 sm:py-16">
      <Container>
        <Link
          href="/work"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          ← Back to work
        </Link>
        <article
          className="prose prose-neutral mt-8 max-w-2xl dark:prose-invert
            prose-headings:font-semibold prose-headings:tracking-tight
            prose-a:font-medium prose-a:text-foreground prose-img:rounded-xl"
        >
          {children}
        </article>
      </Container>
    </div>
  );
}
