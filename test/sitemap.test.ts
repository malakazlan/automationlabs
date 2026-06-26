import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  it("includes home and hvac, excludes unpublished niches", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls.some((u) => u.endsWith("/"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/industries/hvac"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/industries/dental"))).toBe(false);
  });
});
