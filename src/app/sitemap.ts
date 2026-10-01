import type { MetadataRoute } from "next";
import { publishedProjects } from "@/content/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/about", "/resume"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));

  const projectRoutes = publishedProjects.map((p) => ({
    url: `${site.url}/work/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...routes, ...projectRoutes];
}
