import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { MissedCallCalculator } from "@/components/calc/MissedCallCalculator";

export const metadata = buildMetadata({
  title: "Missed-Call Revenue Calculator",
  description:
    "See how much revenue missed calls cost your HVAC business each month and year, and how much an AI agent could recover.",
  path: "/tools/missed-call-calculator",
});

export default function Page() {
  return (
    <section className="pt-[108px] pb-24 sm:pt-[132px]">
      <Container>
        <Reveal className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-cobalt-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cobalt-dark">
            Free calculator
          </span>
          <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.0] tracking-tight text-ink sm:text-6xl">
            What are missed calls costing you?
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink/70 sm:text-xl">
            Move the sliders to match your business. We will estimate the revenue walking out
            the door, and what an agent could recover.
          </p>
        </Reveal>
        <div className="mt-14">
          <Reveal delay={0.06}>
            <MissedCallCalculator />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
