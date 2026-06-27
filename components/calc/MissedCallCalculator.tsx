"use client";

import { useState } from "react";
import { TrendUp } from "@phosphor-icons/react";
import { estimateLostRevenue } from "@/lib/calc/roi";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const num = new Intl.NumberFormat("en-US");

function Slider({
  id,
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
        <span className="font-mono text-lg font-semibold text-cobalt">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-cobalt"
      />
    </div>
  );
}

export function MissedCallCalculator() {
  const [calls, setCalls] = useState(100);
  const [missed, setMissed] = useState(25);
  const [value, setValue] = useState(1500);
  const [close, setClose] = useState(40);

  const r = estimateLostRevenue({
    callsPerWeek: calls,
    missedPct: missed,
    avgJobValue: value,
    closeRate: close,
  });

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
      <div className="rounded-3xl border border-ink/10 bg-white p-7 shadow-xl shadow-ink/5 sm:p-8">
        <div className="space-y-8">
          <Slider id="calls" label="Calls per week" value={calls} display={num.format(calls)} min={20} max={500} step={5} onChange={setCalls} />
          <Slider id="missed" label="Percent of calls missed" value={missed} display={`${missed}%`} min={0} max={60} step={1} onChange={setMissed} />
          <Slider id="value" label="Average job value" value={value} display={usd.format(value)} min={200} max={5000} step={50} onChange={setValue} />
          <Slider id="close" label="Of answered calls, how many book" value={close} display={`${close}%`} min={10} max={80} step={1} onChange={setClose} />
        </div>
        <p className="mt-8 text-xs text-ink/45">
          Estimates only. Based on a 4.33-week month and the close rate you set.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-3xl bg-ink p-8 text-paper">
          <p className="text-sm font-medium text-paper/60">Estimated revenue lost to missed calls</p>
          <p className="mt-2 font-mono text-5xl font-semibold text-cobalt sm:text-6xl">
            {usd.format(r.monthly)}
            <span className="text-2xl text-paper/50">/mo</span>
          </p>
          <p className="mt-3 text-paper/70">
            That is <span className="font-mono font-semibold text-paper">{usd.format(r.annual)}</span> a
            year, from <span className="font-mono font-semibold text-paper">{num.format(Math.round(r.missedPerMonth))}</span> missed calls a month.
          </p>
        </div>
        <div className="rounded-3xl border border-cobalt/30 bg-cobalt-soft p-8">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-cobalt text-white">
              <TrendUp weight="fill" />
            </span>
            <div>
              <p className="font-display text-xl font-semibold text-ink">
                An agent answers the calls you are missing.
              </p>
              <p className="mt-2 text-ink/70">
                Most of that number is recoverable. The agent picks up every call, books the
                job, and syncs it to your CRM.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href="/book-a-demo" className="inline-flex rounded-xl bg-cobalt px-5 py-3 text-sm font-semibold text-white transition hover:bg-cobalt-dark">
                  Book a demo
                </a>
                <a href="/how-it-works" className="inline-flex rounded-xl border border-ink/15 bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink/30">
                  See how it works
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
