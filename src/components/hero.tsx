"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const line1 = "Victoria Sun";

export function HeroTitle() {
  const reduced = useReducedMotion();

  return (
    <h1 className="mt-4 font-display text-foreground">
      <span className="block text-5xl leading-[1.05] tracking-tight sm:text-7xl">
        {reduced ? (
          line1
        ) : (
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {line1}
          </motion.span>
        )}
      </span>
    </h1>
  );
}

export function ScrollCue() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 160], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-x-0 bottom-8 flex justify-center"
      aria-hidden
    >
      <div className="flex flex-col items-center gap-2 text-muted">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          scroll
        </span>
        <motion.span
          className="block h-2 w-2 rounded-full bg-accent"
          animate={{ y: [0, 8, 0], opacity: [1, 0.4, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
