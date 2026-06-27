import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function MissedCallCost() {
  return (
    <section className="py-28">
      <Container>
        <Reveal className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-cobalt-dark">
            The cost of missed calls
          </span>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            A missed call is not a missed call. It is a lost customer.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">
            Most home-services businesses miss one in four calls, and after hours it gets worse. Every one is a job that goes to whoever picks up first.
          </p>
        </Reveal>
        <Reveal delay={0.06} className="mt-14 grid gap-10 border-t border-ink/15 pt-10 sm:grid-cols-3">
          <div>
            <p className="font-mono text-5xl font-semibold text-cobalt">27%</p>
            <p className="mt-3 text-ink/60">of calls go unanswered. Industry estimate.</p>
          </div>
          <div>
            <p className="font-mono text-5xl font-semibold text-cobalt">2</p>
            <p className="mt-3 text-ink/60">rings to answer, every single time.</p>
          </div>
          <div>
            <p className="font-mono text-5xl font-semibold text-cobalt">$1.5k</p>
            <p className="mt-3 text-ink/60">average job value walking away.</p>
          </div>
        </Reveal>
        <Reveal>
          <Button href="/tools/missed-call-calculator" variant="ink" className="mt-10">
            Calculate what missed calls cost you <ArrowRight />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
