import { describe, it, expect } from "vitest";
import {
  organizationLd,
  serviceLd,
  faqPageLd,
  breadcrumbLd,
} from "@/lib/seo/structured-data";

describe("structured-data", () => {
  it("organization has correct type and no LocalBusiness", () => {
    const ld = organizationLd();
    expect(ld["@type"]).toBe("Organization");
    expect(JSON.stringify(ld)).not.toContain("LocalBusiness");
  });

  it("service embeds provider and name", () => {
    const ld = serviceLd({
      name: "AI Receptionist for HVAC",
      description: "x",
      url: "https://x/y",
    });
    expect(ld["@type"]).toBe("Service");
    expect(ld.provider["@type"]).toBe("Organization");
    expect(ld.name).toContain("HVAC");
  });

  it("faqPage maps questions", () => {
    const ld = faqPageLd([{ q: "Does it work after hours?", a: "Yes." }]);
    expect(ld["@type"]).toBe("FAQPage");
    expect(ld.mainEntity[0]["@type"]).toBe("Question");
    expect(ld.mainEntity[0].acceptedAnswer.text).toBe("Yes.");
  });

  it("breadcrumb numbers positions from 1", () => {
    const ld = breadcrumbLd([
      { name: "Industries", url: "https://x/industries" },
      { name: "HVAC", url: "https://x/industries/hvac" },
    ]);
    expect(ld.itemListElement[0].position).toBe(1);
    expect(ld.itemListElement[1].position).toBe(2);
  });
});
