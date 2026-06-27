import { describe, it, expect } from "vitest";
import { estimateLostRevenue } from "@/lib/calc/roi";

describe("estimateLostRevenue", () => {
  it("computes monthly and annual lost revenue", () => {
    const r = estimateLostRevenue({
      callsPerWeek: 100,
      missedPct: 25,
      avgJobValue: 1500,
      closeRate: 40,
    });
    // missed/wk = 25, won/wk = 10, $/wk = 15000, monthly = 15000 * 4.333
    expect(Math.round(r.monthly)).toBe(64995);
    expect(r.annual).toBeCloseTo(r.monthly * 12);
    expect(r.missedPerMonth).toBeGreaterThan(0);
  });

  it("clamps negative and out-of-range inputs to zero", () => {
    const r = estimateLostRevenue({
      callsPerWeek: -5,
      missedPct: 250,
      avgJobValue: -100,
      closeRate: 40,
    });
    expect(r.monthly).toBe(0);
  });
});
