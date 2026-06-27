import {
  CheckCircle,
  ShieldCheck,
  FileX,
  Gauge,
  Plus,
} from "@phosphor-icons/react/dist/ssr";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageLd } from "@/lib/seo/structured-data";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata = buildMetadata({
  title: "Pricing",
  description:
    "Flat monthly pricing from $1,500/mo, setup quoted on a quick call. 30-day money-back guarantee, no long-term contracts, no per-minute surprises.",
  path: "/pricing",
});

const RECEPTIONIST_FEATURES = [
  "Answers 24/7 in your business name",
  "Books jobs into your CRM",
  "Qualifies every job before booking",
  "Transfers emergencies to your tech",
  "Texts call summaries to your team",
  "Review requests after the job",
  "Ongoing tuning, included",
];

const MULTI_FEATURES = [
  "Everything in AI Receptionist",
  "Per-location numbers and routing",
  "Centralized reporting",
  "Priority support and a named contact",
];

const FAQS = [
  {
    q: "What does setup cost?",
    a: "A one-time fee we quote on a quick call, based on your call flow and integrations. You see the number before you commit.",
  },
  {
    q: "Is there a contract?",
    a: "No long-term contract. Month to month, cancel anytime, with a 30-day money-back guarantee on your first month.",
  },
  {
    q: "Do you charge per call or per minute?",
    a: "No. It is a flat monthly price so your bill does not spike during the busy season, which is exactly when you need it most.",
  },
  {
    q: "What if it does not work for us?",
    a: "If the agent is not booking jobs in your first 30 days, you get your money back. No hard feelings.",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqPageLd(FAQS)} />

      <section className="pt-[108px] pb-16 sm:pt-[132px]">
        <Container className="text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-cobalt-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cobalt-dark">
              Pricing
            </span>
          </Reveal>
          <Reveal>
            <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.0] tracking-tight text-ink sm:text-6xl">
              Simple pricing that pays for itself.
            </h1>
          </Reveal>
          <Reveal>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink/70 sm:text-xl">
              Flat monthly price. No per-minute surprises. It pays for itself with about two recovered jobs a month.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-12">
        <Container className="grid gap-5 lg:grid-cols-2">
          <Reveal className="relative rounded-3xl border-2 border-cobalt bg-white p-8 shadow-xl shadow-cobalt/10">
            <span className="absolute right-6 top-6 rounded-full bg-cobalt px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
              Most popular
            </span>
            <h2 className="font-display text-2xl font-semibold text-ink">AI Receptionist</h2>
            <p className="mt-2 text-sm text-ink/60">Done-for-you. We build, train, and run it.</p>
            <p className="mt-6 font-display text-5xl font-semibold tracking-tight text-ink">
              From <span className="font-mono">$1,500</span>
              <span className="text-2xl text-ink/50">/mo</span>
            </p>
            <p className="mt-2 text-sm text-ink/55">Plus a one-time setup, quoted on a quick call.</p>
            <Button href="/book-a-demo" variant="primary" className="mt-7 w-full">
              Book a demo
            </Button>
            <ul className="mt-8 space-y-3 text-sm text-ink/75">
              {RECEPTIONIST_FEATURES.map((feature) => (
                <li key={feature} className="flex gap-2.5">
                  <CheckCircle weight="fill" className="flex-shrink-0 text-cobalt" /> {feature}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.06} className="rounded-3xl border border-ink/10 bg-paper p-8">
            <h2 className="font-display text-2xl font-semibold text-ink">Multi-location</h2>
            <p className="mt-2 text-sm text-ink/60">
              For franchises and teams running several locations.
            </p>
            <p className="mt-6 font-display text-5xl font-semibold tracking-tight text-ink">Custom</p>
            <p className="mt-2 text-sm text-ink/55">Priced to your locations and call volume.</p>
            <Button
              href="/book-a-demo"
              variant="secondary"
              className="mt-7 w-full bg-white"
            >
              Talk to us
            </Button>
            <ul className="mt-8 space-y-3 text-sm text-ink/75">
              {MULTI_FEATURES.map((feature) => (
                <li key={feature} className="flex gap-2.5">
                  <CheckCircle weight="fill" className="flex-shrink-0 text-cobalt" /> {feature}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <Reveal className="grid gap-6 rounded-3xl border border-ink/10 bg-white p-8 sm:grid-cols-3 sm:p-10">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-cobalt-soft text-cobalt-dark">
                <ShieldCheck weight="duotone" className="text-2xl" />
              </span>
              <p className="text-sm text-ink/75">
                <span className="font-semibold text-ink">30-day money-back</span> guarantee.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-cobalt-soft text-cobalt-dark">
                <FileX weight="duotone" className="text-2xl" />
              </span>
              <p className="text-sm text-ink/75">
                <span className="font-semibold text-ink">No long-term contracts.</span> Cancel anytime.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-cobalt-soft text-cobalt-dark">
                <Gauge weight="duotone" className="text-2xl" />
              </span>
              <p className="text-sm text-ink/75">
                <span className="font-semibold text-ink">No per-minute surprises.</span> Flat monthly.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              Pricing questions.
            </h2>
          </Reveal>
          <Reveal className="mt-8 divide-y divide-ink/10 overflow-hidden rounded-3xl border border-ink/10 bg-white">
            {FAQS.map((faq, i) => (
              <details key={faq.q} className="group p-6 sm:p-7" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-ink">
                  {faq.q}
                  <Plus className="text-cobalt transition-transform group-open:rotate-45" />
                </summary>
                <p className="mt-3 text-ink/65">{faq.a}</p>
              </details>
            ))}
          </Reveal>
        </Container>
      </section>

      <FinalCta
        title="See the price for your call volume."
        primary={{ href: "/book-a-demo", label: "Book a demo" }}
        secondary={{
          href: "/tools/missed-call-calculator",
          label: "Calculate your lost revenue",
        }}
      />
    </>
  );
}
