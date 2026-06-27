import Image from "next/image";
import {
  Wrench,
  Wind,
  HandPointing,
  LockKey,
} from "@phosphor-icons/react/dist/ssr";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata = buildMetadata({
  title: "About",
  description:
    "We build and run AI voice agents for home-services businesses. Not a no-code reseller, a team that builds, trains, and tunes the agent on your business.",
  path: "/about",
});

const VALUES = [
  {
    icon: Wrench,
    title: "Built, not bolted on",
    body: "We build and train the agent on your services, pricing, and call flow. Not a generic bot with your name on it.",
  },
  {
    icon: Wind,
    title: "We speak the trades",
    body: "We know dispatch, peak season, and how a good CSR qualifies and books a job.",
  },
  {
    icon: HandPointing,
    title: "Done for you",
    body: "You forward your calls. We handle setup, integration, and ongoing tuning.",
  },
  {
    icon: LockKey,
    title: "Your data, handled right",
    body: "Calls are encrypted, recording is disclosed, and customer information is treated with care.",
  },
];

const STATS = [
  { value: "12", label: "HVAC teams live" },
  { value: "96%", label: "of calls answered" },
  { value: "48h", label: "average time to live" },
  { value: "24/7", label: "coverage, every day" },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-[108px] pb-16 sm:pt-[132px]">
        <Container>
          <Reveal className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-cobalt-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cobalt-dark">
              About us
            </span>
            <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.0] tracking-tight text-ink sm:text-6xl">
              We build the AI that answers your phone.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70 sm:text-xl">
              Simple Automation Labs builds and runs AI voice agents for home-services businesses. We are not a no-code reseller. We build the agent, train it on how you work, and keep tuning it after you go live.
            </p>
          </Reveal>
          <Reveal delay={0.06} className="mt-12 overflow-hidden rounded-3xl border border-ink/10">
            <div className="relative h-[300px] w-full sm:h-[440px]">
              <Image
                src="/images/about-team.png"
                alt="The Simple Automation Labs team"
                fill
                sizes="(min-width: 640px) 1136px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <Reveal className="max-w-3xl">
            <h2 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl">
              Most missed calls are not a people problem. They are a coverage problem.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/70">
              <p>
                Trades businesses run on the phone. But nobody can answer every call during a heat wave, after hours, or while they are up a ladder. The calls that slip through go straight to a competitor.
              </p>
              <p>
                We started Simple Automation Labs to fix that with an agent that sounds human, knows your business, and books the job. Built for you, run by us, tuned until it earns its keep.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-y border-ink/10 bg-white py-20">
        <Container>
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              Why teams pick us.
            </h2>
          </Reveal>
          <Reveal className="mt-10 grid gap-4 sm:grid-cols-2">
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="rounded-2xl border border-ink/10 bg-paper p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-cobalt-soft text-cobalt-dark">
                    <Icon weight="duotone" className="text-2xl" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{value.title}</h3>
                  <p className="mt-2 text-ink/65">{value.body}</p>
                </div>
              );
            })}
          </Reveal>
        </Container>
      </section>

      <section className="bg-ink py-20 text-paper">
        <Container>
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              The work so far.
            </h2>
            <span className="rounded bg-white/10 px-2 py-1 text-[11px] font-medium text-paper/60">
              Illustrative figures
            </span>
          </Reveal>
          <Reveal className="mt-10 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-mono text-4xl font-semibold text-cobalt sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-paper/60">{stat.label}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="py-24">
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Let us answer your next call.
            </h2>
          </Reveal>
          <Reveal className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/book-a-demo" variant="primary">
              Book a demo
            </Button>
            <Button href="/how-it-works" variant="secondary" className="bg-white">
              See how it works
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
