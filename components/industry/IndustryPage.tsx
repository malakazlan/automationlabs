import Image from "next/image";
import {
  PhoneIncoming,
  Wind,
  CaretRight,
  PlayCircle,
  Ear,
  ClipboardText,
  CalendarCheck,
  ArrowsClockwise,
  Plus,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { Industry } from "@/lib/content/industry";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Tilt } from "@/components/ui/Tilt";
import { VoiceDemoButton } from "@/components/demo/VoiceDemoButton";
import { CallFlow } from "@/components/sections/CallFlow";
import { WholeFrontOffice } from "@/components/sections/WholeFrontOffice";
import { Integrations } from "@/components/sections/Integrations";
import { ResultsBand } from "@/components/sections/ResultsBand";
import { Comparison } from "@/components/sections/Comparison";
import { DemoBand } from "@/components/sections/DemoBand";
import { FinalCta } from "@/components/sections/FinalCta";

export function IndustryPage({ industry }: { industry: Industry }) {
  const i = industry;
  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden pt-[108px] pb-20 sm:pt-[132px]">
        <Container className="relative grid items-center gap-12 lg:grid-cols-[1.02fr_.98fr]">
          <Reveal>
            <nav className="flex items-center gap-2 text-xs font-medium text-ink/45">
              <Link href="/industries" className="hover:text-ink">Industries</Link>
              <CaretRight />
              <span className="text-ink/70">{i.name}</span>
            </nav>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-cobalt-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cobalt-dark">
              {i.hero.eyebrow}
            </span>
            <h1 className="mt-5 font-display text-[2.7rem] font-semibold leading-[1.0] tracking-tight text-ink sm:text-6xl">
              {i.hero.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70 sm:text-xl">
              {i.hero.subhead}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/book-a-demo">Book a demo</Button>
              <VoiceDemoButton className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink/15 bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-[transform,border-color] duration-200 hover:border-ink/30 active:scale-[0.97]">
                <PlayCircle weight="fill" className="text-cobalt" /> Hear the agent
              </VoiceDemoButton>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Tilt className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-2xl shadow-ink/10">
              <div className="relative h-[360px] w-full sm:h-[460px]">
                <Image
                  src={`/images/${i.slug}-hero.png`}
                  alt={`${i.name} technician at work`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-ink/10 bg-white px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-cobalt-soft text-cobalt-dark">
                    <Wind weight="fill" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">Tune-up booked</p>
                    <p className="font-mono text-xs text-ink/55">ServiceTitan, Wed 8:00 AM</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  Live
                </span>
              </div>
            </Tilt>
          </Reveal>
        </Container>
      </section>

      {/* pain stat band */}
      <section className="border-y border-ink/10 bg-white py-12">
        <Container className="grid gap-8 sm:grid-cols-3">
          {i.painStats.map((s, idx) => (
            <Reveal key={s.value} delay={idx * 0.05}>
              <p className="font-mono text-4xl font-semibold text-cobalt">{s.value}</p>
              <p className="mt-2 text-sm text-ink/60">{s.label}</p>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* problem */}
      <section className="py-28">
        <Container>
          <Reveal className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-cobalt-dark">
              The {i.name} problem
            </span>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              {i.problem.heading}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">{i.problem.body}</p>
          </Reveal>
        </Container>
      </section>

      <CallFlow
        eyebrow="How it works"
        heading={`Watch one ${i.name} call go from ring to booked job.`}
        steps={[
          { n: "01", title: "Answers in two rings", icon: <PhoneIncoming className="text-xl text-cobalt" /> },
          { n: "02", title: "Understands the problem", icon: <Ear className="text-xl text-cobalt" /> },
          { n: "03", title: "Qualifies the job", icon: <ClipboardText className="text-xl text-cobalt" /> },
          { n: "04", title: "Books the appointment", icon: <CalendarCheck className="text-xl text-cobalt" /> },
          { n: "05", title: "Confirms and syncs your CRM", icon: <ArrowsClockwise className="text-xl text-cobalt" /> },
        ]}
        transcript={[
          { role: "agent", text: "Thanks for calling Northline Heating and Air. How can I help?" },
          { role: "caller", text: "My AC stopped cooling and the house is getting warm." },
          { role: "agent", text: "Is it running but blowing warm air, or not turning on at all?" },
          { role: "caller", text: "It runs but blows warm. It's a Carrier, about eight years old." },
          { role: "agent", text: "I can get a tech out tomorrow 8 to 10 AM, or today at 4 PM. Which works?" },
          { role: "caller", text: "Tomorrow morning is good." },
        ]}
        meta={{ label: "AC not cooling", time: "0:51" }}
        footer={{ text: "Job booked, synced to ServiceTitan", time: "Wed 8:00 AM" }}
        note="Sample conversation for illustration. Real calls vary."
      />

      <WholeFrontOffice />
      <Integrations />
      <ResultsBand />

      {/* proof */}
      <section className="py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
          <Reveal>
            <blockquote className="font-display text-3xl font-medium leading-[1.15] tracking-tight text-ink sm:text-4xl">
              &ldquo;Summer rush used to mean voicemail full by noon. Now every caller gets
              answered and booked. We added a second crew.&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-ink/70">
              <span className="font-semibold text-ink">Marcus Hale</span>, Owner, Cedar Ridge
              Heating and Cooling{" "}
              <span className="ml-1 rounded bg-ink/5 px-1.5 py-0.5 text-[11px] font-medium text-ink/50">
                Illustrative
              </span>
            </figcaption>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-ink/15 pt-8">
              {i.outcomes.map((o) => (
                <div key={o.caption}>
                  <p className="font-mono text-3xl font-semibold text-cobalt">{o.metric}</p>
                  <p className="mt-1 text-sm text-ink/60">{o.caption}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="relative h-[320px] overflow-hidden rounded-3xl border border-ink/10 sm:h-[420px]">
              <Image
                src="/images/technician-on-phone.png"
                alt={`${i.name} technician taking a call`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <Comparison />

      {/* FAQ */}
      <section className="py-28">
        <Container>
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              {i.name} questions, answered.
            </h2>
          </Reveal>
          <Reveal className="mt-10 divide-y divide-ink/10 overflow-hidden rounded-3xl border border-ink/10 bg-white">
            {i.faqs.map((f, idx) => (
              <details key={f.q} className="group p-6 sm:p-7" open={idx === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-ink">
                  {f.q}
                  <Plus className="text-cobalt transition-transform group-open:rotate-45" />
                </summary>
                <p className="mt-3 text-ink/65">{f.a}</p>
              </details>
            ))}
          </Reveal>
        </Container>
      </section>

      <DemoBand
        heading={`Hear it handle a ${i.name} call.`}
        body="Start a voice chat in your browser or call the demo line. Ask it to book a repair."
        callLabel="Repair, sample call"
        time="00:51"
        className="border-t border-ink/10 bg-white pb-28 pt-10"
      />

      <FinalCta
        title="Stop sending after-hours callers to your competitors."
        primary={{ href: "/book-a-demo", label: "Book a demo" }}
        secondary={{ href: "/tools/missed-call-calculator", label: "Calculate your lost revenue" }}
      />
    </>
  );
}
