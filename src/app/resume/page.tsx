import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Reveal, Magnetic } from "@/components/motion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${site.name}.`,
};

export default function ResumePage() {
  // To update: replace public/resume.pdf — the preview and download follow it.
  const pdf = site.resumeUrl;
  if (!pdf) notFound();

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="font-display text-4xl text-foreground sm:text-5xl">
              Résumé
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Magnetic>
                <a
                  href={pdf}
                  download={`${site.name} Resume.pdf`}
                  data-cursor="pool"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-contrast transition-shadow hover:shadow-[0_0_0_4px_rgb(var(--glow)/0.18)]"
                >
                  Download PDF
                  <span aria-hidden>↓</span>
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href={pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pool"
                  className="inline-block rounded-full border border-border px-6 py-3 font-medium transition-colors hover:border-accent/50"
                >
                  Open in new tab
                </a>
              </Magnetic>
            </div>
          </div>
        </Reveal>

        {/* Phones don't reliably render PDFs inline, so the preview is for
            tablet/desktop; the buttons above cover everyone else. */}
        <Reveal delay={0.1} className="mt-12 hidden sm:block">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-border bg-white shadow-xl shadow-black/5">
            <iframe
              src={`${pdf}#toolbar=0&navpanes=0&view=FitH`}
              title={`${site.name} résumé`}
              className="aspect-[8.5/11] w-full"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
