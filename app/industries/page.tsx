import Link from "next/link";
import {
  Wind,
  Wrench,
  HouseLine,
  Lightning,
  Garage,
  Bug,
  ArrowRight,
  ClipboardText,
  Path,
  PlugsConnected,
} from "@phosphor-icons/react/dist/ssr";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata = buildMetadata({
  title: "Industries",
  description:
    "AI voice agents for the trades that live on the phone. HVAC is live now, with plumbing, roofing, electrical and more on the way.",
  path: "/industries",
});

const COMING_SOON = [
  { icon: Wrench, title: "Plumbing", body: "Burst pipes do not wait for business hours." },
  { icon: HouseLine, title: "Roofing", body: "Storm season floods the phones in hours." },
  { icon: Lightning, title: "Electrical", body: "Emergencies that need routing now." },
  { icon: Garage, title: "Garage Door", body: "High-intent calls that close fast." },
  { icon: Bug, title: "Pest Control", body: "Recurring plans and fast call-backs." },
];

const ENGINE_CARDS = [
  {
    icon: ClipboardText,
    title: "Your job types",
    body: "Repairs, installs, maintenance, emergencies, priced your way.",
  },
  {
    icon: Path,
    title: "Your call flow",
    body: "What to ask, when to book, and when to hand off to a human.",
  },
  {
    icon: PlugsConnected,
    title: "Your software",
    body: "It books into the CRM and calendar your team already uses.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <section className="pt-[108px] pb-16 sm:pt-[132px]">
        <Container>
          <Reveal className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-cobalt-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cobalt-dark">
              Industries
            </span>
            <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.0] tracking-tight text-ink sm:text-6xl">
              Built for the trades that live on the phone.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70 sm:text-xl">
              Any business that books jobs over the phone loses money to missed calls. We start where the pain is sharpest and the proof is real: HVAC.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/industries/hvac"
              className="lift group rounded-2xl border border-cobalt/30 bg-cobalt-soft p-7"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-cobalt text-white">
                  <Wind weight="duotone" className="text-2xl" />
                </span>
                <span className="rounded-full bg-cobalt px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                  Live now
                </span>
              </div>
              <h2 className="mt-5 font-display text-xl font-semibold text-ink">HVAC</h2>
              <p className="mt-1.5 text-sm text-ink/65">
                Answer every service call, book the job, handle the busy-season rush.
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-cobalt-dark">
                View page{" "}
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>

            {COMING_SOON.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="rounded-2xl border border-ink/10 bg-white p-7 opacity-80"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-paper text-ink/50">
                      <Icon weight="duotone" className="text-2xl" />
                    </span>
                    <span className="rounded-full border border-ink/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink/45">
                      Coming soon
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-xl font-semibold text-ink/75">
                    {card.title}
                  </h2>
                  <p className="mt-1.5 text-sm text-ink/55">{card.body}</p>
                </div>
              );
            })}
          </Reveal>
        </Container>
      </section>

      <section className="border-y border-ink/10 bg-white py-20">
        <Container>
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              One engine, tuned per trade.
            </h2>
            <p className="mt-4 text-lg text-ink/70">
              The agent is the same. What changes is what it knows: the jobs, the questions, the urgency, the way you book.
            </p>
          </Reveal>
          <Reveal className="mt-10 grid gap-4 sm:grid-cols-3">
            {ENGINE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="rounded-2xl border border-ink/10 bg-paper p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-cobalt-soft text-cobalt-dark">
                    <Icon weight="duotone" className="text-2xl" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-ink/65">{card.body}</p>
                </div>
              );
            })}
          </Reveal>
        </Container>
      </section>

      <section className="py-24">
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Run one of these trades?
            </h2>
          </Reveal>
          <Reveal>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink/70">
              HVAC is live today. If you are in another trade, book a demo and we will tell you where you stand on the list.
            </p>
          </Reveal>
          <Reveal className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/book-a-demo" variant="primary">
              Book a demo
            </Button>
            <Button href="/industries/hvac" variant="secondary" className="bg-white">
              See the HVAC page
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
