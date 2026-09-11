"use client";

import { useEffect, useRef } from "react";

type Ripple = { x: number; y: number; t: number; strength: number };

/**
 * Fixed, behind-everything water layer:
 *  - slow drifting light "caustics" built from blurred radial gradients (CSS)
 *  - a canvas that emits expanding rings where the pointer moves / clicks
 * Both go quiet under prefers-reduced-motion.
 */
export function WaterBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const el: HTMLCanvasElement = canvas;
    const ctx: CanvasRenderingContext2D = context;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    const ripples: Ripple[] = [];
    let raf = 0;
    let lastEmit = 0;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = width * dpr;
      el.height = height * dpr;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function accent() {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue("--glow")
        .trim();
      return v || "22 137 155";
    }

    function emit(x: number, y: number, strength: number) {
      if (ripples.length > 28) ripples.shift();
      ripples.push({ x, y, t: performance.now(), strength });
      if (!raf) raf = requestAnimationFrame(frame);
    }

    function frame(now: number) {
      ctx.clearRect(0, 0, width, height);
      const rgb = accent();
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        const age = (now - r.t) / 1000;
        const life = 2.6;
        if (age > life) {
          ripples.splice(i, 1);
          continue;
        }
        const p = age / life;
        const radius = 8 + p * 190 * r.strength;
        const alpha = (1 - p) * 0.18 * r.strength;
        ctx.beginPath();
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rgb} / ${alpha})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
        if (p < 0.5) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, radius * 0.55, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${rgb} / ${alpha * 0.6})`;
          ctx.stroke();
        }
      }
      if (ripples.length > 0) {
        raf = requestAnimationFrame(frame);
      } else {
        raf = 0;
      }
    }

    function onMove(e: PointerEvent) {
      const now = performance.now();
      if (now - lastEmit < 90) return;
      lastEmit = now;
      emit(e.clientX, e.clientY, 0.5);
    }
    function onDown(e: PointerEvent) {
      emit(e.clientX, e.clientY, 1);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* base wash */}
      <div className="absolute inset-0 bg-background" />
      {/* drifting caustic blobs */}
      <div className="absolute -left-[20vw] -top-[20vh] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle_at_center,rgb(var(--glow)/0.20),transparent_65%)] blur-2xl [animation:drift_26s_ease-in-out_infinite] motion-reduce:animate-none" />
      <div className="absolute right-[-15vw] top-[10vh] h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle_at_center,rgb(var(--glow)/0.14),transparent_60%)] blur-2xl [animation:drift_34s_ease-in-out_infinite_reverse] motion-reduce:animate-none" />
      <div className="absolute bottom-[-25vh] left-[25vw] h-[75vh] w-[75vh] rounded-full bg-[radial-gradient(circle_at_center,rgb(var(--glow)/0.12),transparent_62%)] blur-3xl [animation:drift_30s_ease-in-out_infinite] motion-reduce:animate-none" />
      {/* horizon light */}
      <div className="absolute inset-x-0 top-0 h-[45vh] bg-[linear-gradient(to_bottom,rgb(var(--glow)/0.10),transparent)]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
