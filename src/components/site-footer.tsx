import { Container } from "@/components/container";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border py-12">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-tight">{site.name}</p>
          <p className="text-sm text-muted">
            {site.role} · {site.location}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="text-muted transition-colors hover:text-foreground"
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {s.label}
            </a>
          ))}
        </div>
      </Container>
      <Container className="mt-8">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {site.name}. Built with Next.js.
        </p>
      </Container>
    </footer>
  );
}
