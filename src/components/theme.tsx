"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

/**
 * Inline script that sets the theme before first paint (no flash).
 * Rendered in <head> via the root layout.
 */
export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t;}}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

type Mode = "light" | "dark";

function getSystem(): Mode {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    const stored = (() => {
      try {
        return localStorage.getItem(STORAGE_KEY);
      } catch {
        return null;
      }
    })();
    // resolve the real theme once, after mount (avoids hydration mismatch)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode(stored === "light" || stored === "dark" ? stored : getSystem());
  }, []);

  function toggle() {
    const next: Mode = (mode ?? getSystem()) === "dark" ? "light" : "dark";
    setMode(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }

  const isDark = mode === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      data-cursor="pool"
      className={`group relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground ${className}`}
    >
      <span className="sr-only">Toggle theme</span>
      {/* sun / moon — a drop of light vs. deep water */}
      <svg
        viewBox="0 0 24 24"
        width="15"
        height="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        className="transition-transform duration-500 group-hover:rotate-45"
        aria-hidden
      >
        {mode === null ? null : isDark ? (
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        )}
      </svg>
    </button>
  );
}
