import { describe, it, expect } from "vitest";
import { leadSchema } from "@/lib/leads/schema";

describe("leadSchema", () => {
  it("accepts a valid lead", () => {
    const r = leadSchema.safeParse({
      name: "Dana Reyes",
      email: "dana@x.com",
      phone: "612-555-0199",
      company: "Northline",
      industry: "hvac",
    });
    expect(r.success).toBe(true);
  });

  it("rejects bad email and short phone", () => {
    const r = leadSchema.safeParse({ name: "A", email: "nope", phone: "1" });
    expect(r.success).toBe(false);
  });
});
