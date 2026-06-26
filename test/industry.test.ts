import { describe, it, expect } from "vitest";
import { getIndustry, getPublishedIndustries } from "@/lib/content/industry";

describe("industry loader", () => {
  it("returns hvac by slug", () => {
    const i = getIndustry("hvac");
    expect(i?.slug).toBe("hvac");
    expect(i?.published).toBe(true);
    expect(i?.faqs.length).toBeGreaterThan(0);
  });

  it("returns undefined for unknown slug", () => {
    expect(getIndustry("nope")).toBeUndefined();
  });

  it("published list includes hvac only at launch", () => {
    const pub = getPublishedIndustries().map((i) => i.slug);
    expect(pub).toContain("hvac");
    expect(pub).not.toContain("dental");
  });

  it("no published industry copy contains an em-dash", () => {
    const all = JSON.stringify(getPublishedIndustries());
    expect(all.includes("—") || all.includes("–")).toBe(false);
  });
});
