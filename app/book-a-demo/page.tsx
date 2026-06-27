import {
  PhoneCall,
  CalendarCheck,
  ClockCountdown,
  Tag,
  ShieldCheck,
  Microphone,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { LeadForm } from "@/components/forms/LeadForm";
import { CalEmbed } from "@/components/demo/CalEmbed";
import { VoiceDemoButton } from "@/components/demo/VoiceDemoButton";
import { site } from "@/lib/config/site";

export const metadata = buildMetadata({
  title: "Book a Demo",
  description:
    "Book a 15-minute demo. Hear the AI agent handle a call like one of yours, see it book into your CRM, and get a setup quote for your call volume.",
  path: "/book-a-demo",
});

const POINTS = [
  { icon: <PhoneCall weight="fill" className="text-sm" />, text: "The agent handling a real HVAC call, start to finish." },
  { icon: <CalendarCheck weight="fill" className="text-sm" />, text: "A job booked straight into ServiceTitan, Jobber, or Housecall Pro." },
  { icon: <ClockCountdown weight="fill" className="text-sm" />, text: "Your 48-hour setup plan, with no change to your phone system." },
  { icon: <Tag weight="fill" className="text-sm" />, text: "A clear price for your call volume. No pressure, no contract." },
];

export default function Page() {
  return (
    <section className="pt-[108px] pb-24 sm:pt-[132px]">
      <Container>
        <Reveal className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-cobalt-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cobalt-dark">
            Book a demo
          </span>
          <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.0] tracking-tight text-ink sm:text-6xl">
            See it answer a call like one of yours.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink/70 sm:text-xl">
            Fifteen minutes. We will play a live call, show it booking into your CRM, and give
            you a setup quote for your call volume.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-ink">What you will see</h2>
            <ul className="mt-6 space-y-4">
              {POINTS.map((p, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-cobalt-soft text-cobalt-dark">
                    {p.icon}
                  </span>
                  <p className="text-ink/75">{p.text}</p>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-cobalt text-white">
                  <ShieldCheck weight="fill" />
                </span>
                <p className="text-sm text-ink/75">
                  <span className="font-semibold text-ink">30-day money-back guarantee.</span> No
                  long-term contracts.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-ink/10 bg-paper p-5">
              <p className="text-sm font-semibold text-ink">Prefer to hear it right now?</p>
              <div className="mt-3 flex flex-wrap gap-3">
                <VoiceDemoButton className="inline-flex items-center gap-2 rounded-xl bg-cobalt px-5 py-3 text-sm font-semibold text-white transition hover:bg-cobalt-dark active:scale-[0.97]">
                  <Microphone weight="fill" /> Hear the agent
                </VoiceDemoButton>
                <a href={site.phoneHref} className="inline-flex items-center gap-2 rounded-xl border border-ink/15 px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink/30">
                  <Phone /> {site.phoneDisplay}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-ink/10 bg-white p-7 shadow-xl shadow-ink/5 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-ink">Request your demo</h2>
              <p className="mt-1.5 text-sm text-ink/60">
                We reply within one business day to set a time.
              </p>
              <div className="mt-6">
                <CalEmbed />
                <LeadForm source="book-a-demo" />
              </div>
              <p className="mt-4 text-center text-[11px] text-ink/40">
                When configured, this connects to a Cal.com calendar and saves the lead to your CRM.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
