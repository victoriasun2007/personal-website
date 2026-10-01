"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import type { Project } from "@/content/projects";

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const { slug, title, summary, year, context, tags, cover, gradient } = project;
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  // pointer position within the card, -0.5..0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), {
    stiffness: 150,
    damping: 18,
  });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-6, 6]), {
    stiffness: 150,
    damping: 18,
  });
  const imgX = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), {
    stiffness: 120,
    damping: 20,
  });
  const imgY = useSpring(useTransform(py, [-0.5, 0.5], [-8, 8]), {
    stiffness: 120,
    damping: 20,
  });

  function onMove(e: React.PointerEvent) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }
  function reset() {
    px.set(0);
    py.set(0);
  }

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <Link
        ref={ref}
        href={`/work/${slug}`}
        data-cursor="pool"
        onPointerMove={onMove}
        onPointerLeave={reset}
        className="group block"
      >
        <motion.div
          style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
          className="flex flex-col gap-4 rounded-2xl border border-border bg-surface/60 p-3 backdrop-blur-sm transition-colors duration-300 group-hover:border-accent/40"
        >
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-xl">
            <motion.div
              style={{ x: imgX, y: imgY, scale: 1.04 }}
              className="absolute inset-0"
            >
              {cover ? (
                <Image
                  src={cover}
                  alt={title}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
                  }}
                >
                  <span className="font-display text-lg italic text-white/70">
                    {title}
                  </span>
                </div>
              )}
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute bottom-3 left-3 flex translate-y-2 items-center gap-1.5 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              Open case study
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 px-2 pb-2">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
                {context}
              </p>
              <span className="shrink-0 text-sm text-muted">{year}</span>
            </div>
            <h3 className="font-display text-xl text-foreground">{title}</h3>
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
        </motion.div>
      </Link>
    </motion.div>
  );
}
