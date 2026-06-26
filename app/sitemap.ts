import type { MetadataRoute } from "next";
import { site } from "@/lib/config/site";
import { getPublishedIndustries } from "@/lib/content/industry";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-06-27");
  const base = [
    "",
    "/how-it-works",
    "/industries",
    "/pricing",
    "/about",
    "/book-a-demo",
    "/tools/missed-call-calculator",
  ].map((p) => ({
    url: new URL(p || "/", site.url).toString(),
    lastModified,
  }));
  const niches = getPublishedIndustries().map((n) => ({
    url: new URL(`/industries/${n.slug}`, site.url).toString(),
    lastModified,
  }));
  return [...base, ...niches];
}
