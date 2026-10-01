"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * A soft "water droplet" cursor dot. The background ripples do the rest.
 * Only mounts on fine pointers; hides the native cursor via a body class.
 * Swells over interactive elements (links, buttons, [data-cursor]).
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 900, damping: 40 });
  const dotY = useSpring(y, { stiffness: 900, damping: 40 });

  useEffect(() => {
    const fine =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;

    // one-shot feature detection on mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setActive(
        !!el?.closest("a, button, [data-cursor], input, textarea, select"),
      );
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    const leave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", dn, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    document.addEventListener("pointerleave", leave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", dn);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div
        className="absolute rounded-full bg-accent"
        style={{
          x: dotX,
          y: dotY,
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
        }}
        animate={{
          scale: down ? 1.4 : active ? 2.6 : 1,
          opacity: active ? 0.55 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 24 }}
      />
    </div>
  );
}
