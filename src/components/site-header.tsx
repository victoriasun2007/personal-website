import Link from "next/link";
import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          data-cursor="pool"
          className="group text-sm font-semibold tracking-tight"
        >
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
            {site.name}
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm sm:gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-cursor="pool"
              className="text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          {site.resumeUrl ? (
            <Link
              href="/resume"
              data-cursor="pool"
              className="text-muted transition-colors hover:text-foreground"
            >
              Résumé
            </Link>
          ) : null}
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}
