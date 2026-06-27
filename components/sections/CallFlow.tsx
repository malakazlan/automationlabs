import type { ReactNode } from "react";
import Link from "next/link";
import {
  Waveform,
  Play,
  CheckCircle,
  Robot,
  User,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export type CallStep = { n: string; title: string; icon?: ReactNode };
export type CallTurn = { role: "agent" | "caller"; text: string };

export function CallFlow({
  eyebrow,
  heading,
  steps,
  transcript,
  meta,
  footer,
  fullLink = false,
  note,
}: {
  eyebrow?: string;
  heading: string;
  steps: CallStep[];
  transcript: CallTurn[];
  meta: { label: string; time: string };
  footer: { text: string; time: string };
  fullLink?: boolean;
  note?: string;
}) {
  return (
    <section id="how" className="border-y border-ink/10 bg-white py-28">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            {eyebrow && (
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-cobalt-dark">
                {eyebrow}
              </span>
            )}
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              {heading}
            </h2>
          </div>
          {fullLink && (
            <Link href="/how-it-works" className="text-sm font-semibold text-cobalt-dark hover:underline">
              See the full walkthrough <ArrowRight className="inline align-middle" />
            </Link>
          )}
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <ol className="space-y-2">
              {steps.map((s, i) => (
                <li
                  key={s.n}
                  className={
                    i === 0
                      ? "rounded-2xl border border-cobalt/30 bg-cobalt-soft p-5"
                      : "rounded-2xl border border-ink/10 bg-paper p-5"
                  }
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-sm font-semibold ${i === 0 ? "text-cobalt-dark" : "text-cobalt"}`}>
                      {s.n}
                    </span>
                    {s.icon}
                    <h3 className="font-display text-lg font-semibold text-ink">{s.title}</h3>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white">
              <div className="flex items-center justify-between gap-3 border-b border-ink/10 bg-paper px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-cobalt text-white">
                    <Waveform weight="fill" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">Sample call</p>
                    <p className="font-mono text-xs text-ink/50">{meta.label}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-cobalt text-white">
                    <Play weight="fill" />
                  </span>
                  <span className="font-mono text-xs text-ink/45">{meta.time}</span>
                </div>
              </div>

              <div className="space-y-4 p-5 sm:p-6">
                {transcript.map((t, i) =>
                  t.role === "agent" ? (
                    <div key={i} className="flex gap-3">
                      <span className="mt-1 grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-cobalt-soft text-cobalt-dark">
                        <Robot weight="fill" className="text-sm" />
                      </span>
                      <div className="rounded-2xl rounded-tl-sm bg-cobalt-soft px-4 py-2.5 text-sm text-ink">
                        {t.text}
                      </div>
                    </div>
                  ) : (
                    <div key={i} className="flex justify-end gap-3">
                      <div className="rounded-2xl rounded-tr-sm bg-paper px-4 py-2.5 text-sm text-ink/80">
                        {t.text}
                      </div>
                      <span className="mt-1 grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-ink/10 text-ink/50">
                        <User weight="fill" className="text-sm" />
                      </span>
                    </div>
                  ),
                )}
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-ink/10 bg-paper px-5 py-3">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <CheckCircle weight="fill" /> {footer.text}
                </span>
                <span className="font-mono text-xs text-ink/45">{footer.time}</span>
              </div>
            </div>
            {note && <p className="mt-3 text-xs text-ink/45">{note}</p>}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
