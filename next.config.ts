import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Allow MDX files to be treated as pages/components.
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    // Optimized images are cached for 4 hours by default, so swapping a file in
    // public/ under the same name kept serving the old version. Recheck after a
    // minute instead.
    minimumCacheTTL: 60,
  },
};

const withMDX = createMDX({
  options: {
    // Turbopack requires plugins as strings (or [string, options]) so it can
    // serialize them — not imported functions.
    remarkPlugins: [["remark-gfm"]],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
