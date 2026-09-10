import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * Global MDX component overrides. Applies to every `.mdx` file in the app.
 * Typography is handled by the `prose` wrapper in the case-study layout; this
 * file swaps in real components and safe defaults.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: ({ href = "", children, ...props }) => {
      const isInternal = href.startsWith("/") || href.startsWith("#");
      if (isInternal) {
        return (
          <Link href={href} {...props}>
            {children}
          </Link>
        );
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    },
    // Plain <img> so a not-yet-added image degrades gracefully instead of
    // throwing. Swap for next/image once you have real assets with known dims.
    img: ({ src = "", alt = "", ...props }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={typeof src === "string" ? src : ""}
        alt={alt}
        loading="lazy"
        className="w-full rounded-xl border border-black/5 bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.03]"
        {...props}
      />
    ),
  };
}
