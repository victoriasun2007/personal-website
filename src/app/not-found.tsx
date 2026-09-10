import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <section className="py-32">
      <Container>
        <p className="text-sm font-medium uppercase tracking-widest text-muted">
          404
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          This page doesn&apos;t exist.
        </h1>
        <Link
          href="/"
          className="mt-6 inline-block text-sm text-muted transition-colors hover:text-foreground"
        >
          ← Back home
        </Link>
      </Container>
    </section>
  );
}
