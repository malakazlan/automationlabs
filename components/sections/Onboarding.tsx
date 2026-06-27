import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    num: "01",
    title: "Discovery and call-flow mapping",
    body: "We learn your services, pricing, service area, and how you want calls handled.",
  },
  {
    num: "02",
    title: "We build and train your agent",
    body: "We configure the agent, connect your CRM and calendar, and test on real scenarios.",
  },
  {
    num: "03",
    title: "Go live and keep tuning",
    body: "Forward your calls. We review transcripts with you and sharpen it over the first weeks.",
  },
];

export function Onboarding() {
  return (
    <section className="py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-cobalt-dark">
              How we work
            </span>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              Live in 48 hours, tuned with you after.
            </h2>
            <div className="mt-10 space-y-8">
              {STEPS.map((step) => (
                <div key={step.num} className="flex gap-5">
                  <span className="font-mono text-2xl font-semibold text-cobalt/40">{step.num}</span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1 text-ink/65">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.06} className="overflow-hidden rounded-3xl border border-ink/10">
            <div className="relative h-[320px] sm:h-[460px]">
              <Image
                src="/images/dispatch-desk.png"
                alt="Dispatch desk with headset and laptop"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
