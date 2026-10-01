import { Container } from "@/components/container";
import { site } from "@/lib/site";

export function SiteFooter() {
  const links = [
    ...site.socials,
    ...(site.resumeUrl
      ? [{ label: "Résumé", href: "/resume" } as const]
      : []),
  ];

  return (
    <footer className="relative z-10 mt-24 border-t border-border/60 py-14">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-lg text-foreground">{site.name}</p>
          <p className="text-sm text-muted">
            {site.role} · {site.location}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {links.map((s) => (
            <a
              key={s.label}
              href={s.href}
              data-cursor="pool"
              className="text-muted transition-colors hover:text-foreground"
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {s.label}
            </a>
          ))}
        </div>
      </Container>
      <Container className="mt-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted/70">
          © {new Date().getFullYear()} {site.name}
        </p>
      </Container>
    </footer>
  );
}
