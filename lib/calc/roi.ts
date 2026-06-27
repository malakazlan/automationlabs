const WEEKS_PER_MONTH = 4.333;

const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(Number.isFinite(n) ? n : 0, min), max);

export type RoiInput = {
  callsPerWeek: number;
  missedPct: number;
  avgJobValue: number;
  closeRate: number;
};

export type RoiResult = {
  missedPerMonth: number;
  monthly: number;
  annual: number;
};

export function estimateLostRevenue(input: RoiInput): RoiResult {
  const calls = clamp(input.callsPerWeek, 0, 100000);
  const missed = clamp(input.missedPct, 0, 100) / 100;
  const job = clamp(input.avgJobValue, 0, 1000000);
  const close = clamp(input.closeRate, 0, 100) / 100;
  const missedPerWeek = calls * missed;
  const wonPerWeek = missedPerWeek * close;
  const monthly = wonPerWeek * job * WEEKS_PER_MONTH;
  return {
    missedPerMonth: missedPerWeek * WEEKS_PER_MONTH,
    monthly,
    annual: monthly * 12,
  };
}
