"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";

type ShapeKind = "circle" | "star" | "flower" | "heart" | "blob";

/**
 * A trail of soft shapes that drifts from the top-right of the hero down
 * toward the work section. Clicking one makes it swell toward you with a
 * fun fact (from `site.funFacts`) written on it.
 *
 * Positions are the shape's center, as % of the hero. `top` past 100% spills
 * into the next section on purpose — the trail leads into the work.
 */
const shapes: {
  kind: ShapeKind;
  color: string;
  size: number;
  /** Wide screens (lg+). */
  top: string;
  right: string;
  /** Narrower screens — kept to the bands above/below the hero text. */
  smTop: string;
  smRight: string;
  /** Where the fact sits on the enlarged shape: text width and vertical nudge, as fractions of its size. */
  text: { w: number; dy: number };
  duration: number;
  tilt: number;
}[] = [
  { kind: "circle", color: "#f2b8c6", size: 62, top: "15%", right: "13%", smTop: "6%", smRight: "12%", text: { w: 0.66, dy: 0 }, duration: 7, tilt: 0 },
  { kind: "star", color: "#f3d27f", size: 46, top: "35%", right: "24%", smTop: "13%", smRight: "34%", text: { w: 0.5, dy: -0.02 }, duration: 8.5, tilt: 14 },
  { kind: "flower", color: "#b7c79c", size: 56, top: "56%", right: "15%", smTop: "84%", smRight: "10%", text: { w: 0.5, dy: 0 }, duration: 9, tilt: -12 },
  { kind: "heart", color: "#c6b5e6", size: 42, top: "77%", right: "30%", smTop: "92%", smRight: "30%", text: { w: 0.56, dy: -0.05 }, duration: 7.5, tilt: 10 },
  { kind: "blob", color: "#9fc2e4", size: 50, top: "101%", right: "41%", smTop: "102%", smRight: "42%", text: { w: 0.62, dy: 0 }, duration: 6.5, tilt: -8 },
];

function Shape({ kind, color }: { kind: ShapeKind; color: string }) {
  switch (kind) {
    case "circle":
      return <circle cx="50" cy="50" r="46" fill={color} />;
    case "star":
      return (
        <path
          d="M50 8 61 37 92 38 68 57 76 88 50 70 24 88 32 57 8 38 39 37Z"
          fill={color}
          stroke={color}
          strokeWidth="10"
          strokeLinejoin="round"
        />
      );
    case "flower":
      return (
        <g fill={color}>
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <circle
              key={a}
              cx={Math.round(50 + 26 * Math.cos((a * Math.PI) / 180))}
              cy={Math.round(50 + 26 * Math.sin((a * Math.PI) / 180))}
              r="20"
            />
          ))}
          <circle cx="50" cy="50" r="22" />
        </g>
      );
    case "heart":
      return (
        <path
          d="M50 88C20 66 6 50 6 32 6 18 17 8 30 8c9 0 16 5 20 12 4-7 11-12 20-12 13 0 24 10 24 24 0 18-14 34-44 56Z"
          fill={color}
        />
      );
    case "blob":
      return (
        <path
          d="M54 6c22 1 40 16 40 40 0 26-16 46-42 48C26 96 6 80 6 54 6 26 28 5 54 6Z"
          fill={color}
        />
      );
  }
}

type Open = {
  index: number;
  /** Center of the enlarged shape, in viewport px. */
  cx: number;
  cy: number;
  big: number;
  /** Where it grows from: offset of the small shape's center, and its scale. */
  fromX: number;
  fromY: number;
  fromScale: number;
};

export function FloatingShapes() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<Open | null>(null);
  const facts = site.funFacts;

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(null);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", close, { passive: true });
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", close);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  function pop(index: number, el: HTMLElement) {
    const r = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const big = Math.min(220, vw * 0.6);
    const sx = r.left + r.width / 2;
    const sy = r.top + r.height / 2;
    // Drift a little toward the middle of the screen — "coming closer" —
    // and never let the enlarged shape hang off an edge.
    const pad = big / 2 + 16;
    const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);
    const cx = clamp(sx + (vw / 2 - sx) * 0.35, pad, vw - pad);
    const cy = clamp(sy + (vh / 2 - sy) * 0.35, pad, vh - pad);
    setOpen({
      index,
      cx,
      cy,
      big,
      fromX: sx - cx,
      fromY: sy - cy,
      fromScale: r.width / big,
    });
  }

  const active = open ? shapes[open.index] : null;

  return (
    <>
      <div className="pointer-events-none absolute inset-0">
        {shapes.slice(0, facts.length).map((s, i) => (
          <div
            key={s.kind}
            className="pointer-events-auto absolute top-(--sm-top) right-(--sm-right) translate-x-1/2 -translate-y-1/2 scale-75 lg:top-(--top) lg:right-(--right) lg:scale-100"
            style={
              {
                "--top": s.top,
                "--right": s.right,
                "--sm-top": s.smTop,
                "--sm-right": s.smRight,
                zIndex: 10,
              } as React.CSSProperties
            }
          >
            <motion.button
              type="button"
              aria-label="Show a fun fact"
              data-cursor="pool"
              onClick={(e) => pop(i, e.currentTarget)}
              className="block opacity-75 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none dark:opacity-60"
              style={{
                width: s.size,
                height: s.size,
                visibility: open?.index === i ? "hidden" : "visible",
              }}
              animate={
                reduced
                  ? undefined
                  : { y: [0, -12, 0], rotate: [-s.tilt / 2, s.tilt / 2, -s.tilt / 2] }
              }
              transition={{
                duration: s.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.6,
              }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.85 }}
            >
              <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
                <Shape kind={s.kind} color={s.color} />
              </svg>
            </motion.button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {open && active ? (
          <div key="pop" className="fixed inset-0 z-[90]" onClick={() => setOpen(null)}>
            <motion.button
              type="button"
              aria-label="Close fun fact"
              data-cursor="pool"
              className="absolute"
              style={{
                left: open.cx - open.big / 2,
                top: open.cy - open.big / 2,
                width: open.big,
                height: open.big,
              }}
              initial={{ x: open.fromX, y: open.fromY, scale: open.fromScale, rotate: -10 }}
              animate={{ x: 0, y: 0, scale: 1, rotate: 0 }}
              exit={{ x: open.fromX, y: open.fromY, scale: open.fromScale, rotate: -10 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <svg
                viewBox="0 0 100 100"
                className="h-full w-full overflow-visible drop-shadow-[0_18px_30px_rgba(0,0,0,0.12)]"
              >
                <Shape kind={active.kind} color={active.color} />
              </svg>
              <motion.p
                role="status"
                className="absolute left-1/2 top-1/2 text-center font-display leading-tight text-[#1b2230]"
                style={{
                  width: open.big * active.text.w,
                  fontSize: 21,
                  x: "-50%",
                  y: `calc(-50% + ${open.big * active.text.dy}px)`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.18, duration: 0.25 } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
              >
                {facts[open.index]}
              </motion.p>
            </motion.button>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
