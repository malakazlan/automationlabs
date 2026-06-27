import { PhoneIncoming, Microphone, PhoneCall, PlayCircle } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { VoiceDemoButton } from "@/components/demo/VoiceDemoButton";
import { site } from "@/lib/config/site";

const BARS = [70, 95, 50, 100, 60, 85, 45, 80];

export function DemoBand({
  heading = "Talk to the agent right now.",
  body = "Start a voice chat in your browser or call the demo line. Ask it anything a customer would.",
  callLabel = "Sample call",
  time = "00:42",
  className = "py-28",
}: {
  heading?: string;
  body?: string;
  callLabel?: string;
  time?: string;
  className?: string;
}) {
  return (
    <section id="demo" className={className}>
      <Container>
        <Reveal className="overflow-hidden rounded-3xl bg-ink text-paper">
          <div className="grid gap-10 p-10 sm:p-14 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div>
              <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                {heading}
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-paper/70">{body}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <VoiceDemoButton className="inline-flex items-center gap-2 rounded-xl bg-cobalt px-6 py-3.5 text-sm font-semibold text-white transition-[transform,background-color] duration-200 hover:bg-cobalt-dark active:scale-[0.97]">
                  <Microphone weight="fill" /> Start voice demo
                </VoiceDemoButton>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-2 rounded-xl border border-paper/25 px-6 py-3.5 text-sm font-semibold text-paper transition hover:border-paper/50"
                >
                  <PhoneCall /> Call the demo line
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-paper/15 bg-white/[0.04] p-6">
              <div className="flex items-center justify-between border-b border-paper/15 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-cobalt/20 text-cobalt">
                    <PhoneIncoming weight="fill" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-paper">Call in progress</p>
                    <p className="font-mono text-xs text-paper/50">{callLabel}</p>
                  </div>
                </div>
                <span className="font-mono text-xs text-cobalt">{time}</span>
              </div>
              <div className="mt-6 flex h-20 items-end justify-center gap-1.5" aria-hidden="true">
                {BARS.map((h, i) => (
                  <span
                    key={i}
                    className="bar w-2 rounded-full bg-cobalt"
                    style={{ height: `${h}%`, animationDelay: `${(i % 6) * 0.05}s` }}
                  />
                ))}
              </div>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-paper">
                <PlayCircle weight="fill" className="text-2xl text-cobalt" /> Play a sample call
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
