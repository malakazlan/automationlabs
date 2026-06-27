import Image from "next/image";
import {
  PhoneIncoming,
  PlayCircle,
  CheckCircle,
  ArrowsClockwise,
} from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Tilt } from "@/components/ui/Tilt";
import { VoiceDemoButton } from "@/components/demo/VoiceDemoButton";

const BARS = [50, 90, 35, 100, 55, 80, 40, 72, 48, 85];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[118px] pb-20 sm:pt-[140px]">
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-cobalt-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cobalt-dark">
            AI voice agents for home services
          </span>
          <h1 className="mt-6 font-display text-[2.9rem] font-semibold leading-[0.98] tracking-tight text-ink sm:text-[4.5rem]">
            Answer every call.
            <br />
            Book every job.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70 sm:text-xl">
            An AI voice agent that answers in two rings, sounds human, and books the job
            straight into your CRM. Around the clock.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/book-a-demo">Book a demo</Button>
            <VoiceDemoButton className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink/15 bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-[transform,border-color] duration-200 hover:border-ink/30 active:scale-[0.97]">
              <PlayCircle weight="fill" className="text-cobalt" /> Hear the agent
            </VoiceDemoButton>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="relative pb-12 sm:pb-0">
          <Tilt className="overflow-hidden rounded-3xl border border-ink/10 shadow-2xl shadow-ink/10">
            <div className="relative h-[400px] w-full sm:h-[520px]">
              <Image
                src="/images/home-hero.png"
                alt="HVAC technician whose calls are handled by the AI agent"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Tilt>

          <div className="absolute bottom-0 left-2 w-[280px] rounded-2xl border border-ink/10 bg-white/95 p-4 shadow-xl shadow-ink/10 backdrop-blur sm:-bottom-7 sm:left-7 sm:w-[340px] sm:p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-cobalt text-white">
                  <PhoneIncoming weight="fill" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">Incoming call, answering</p>
                  <p className="text-[11px] text-ink/55">Northline Heating and Air</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
              </span>
            </div>
            <div className="mt-3.5 flex h-8 items-end gap-1" aria-hidden="true">
              {BARS.map((h, i) => (
                <span
                  key={i}
                  className="bar w-1.5 rounded-full bg-cobalt"
                  style={{ height: `${h}%`, animationDelay: `${(i % 6) * 0.05}s` }}
                />
              ))}
            </div>
            <div className="mt-3.5 flex items-center justify-between rounded-xl bg-cobalt-soft px-3 py-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink">
                <CheckCircle weight="fill" className="text-cobalt" /> Booked, synced to ServiceTitan
              </span>
              <span className="font-mono text-[11px] text-cobalt-dark">Tue 8 AM</span>
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-[11px] text-ink/45">
              <ArrowsClockwise className="text-cobalt" /> Summary texted to your team
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
