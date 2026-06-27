import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const METRICS = [
  { value: "12", label: "HVAC teams live" },
  { value: "96%", label: "of calls answered" },
  { value: "48h", label: "average time to live" },
  { value: "2", label: "rings to answer" },
];

export function ResultsBand() {
  return (
    <section className="bg-ink py-20 text-paper">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            What that adds up to.
          </h2>
          <span className="rounded bg-white/10 px-2 py-1 text-[11px] font-medium text-paper/60">
            Illustrative figures
          </span>
        </Reveal>
        <Reveal delay={0.06} className="mt-10 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-4">
          {METRICS.map((metric) => (
            <div key={metric.label}>
              <p className="font-mono text-4xl font-semibold text-cobalt sm:text-5xl">{metric.value}</p>
              <p className="mt-2 text-sm text-paper/60">{metric.label}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
