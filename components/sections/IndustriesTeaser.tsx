import Link from "next/link";
import {
  ArrowRight,
  HouseLine,
  Lightning,
  Wind,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function IndustriesTeaser() {
  return (
    <section className="border-t border-ink/10 bg-white py-28">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-xl font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            Built for the trades that live on the phone.
          </h2>
          <Link href="/industries" className="text-sm font-semibold text-cobalt-dark hover:underline">
            All industries <ArrowRight className="align-middle" />
          </Link>
        </Reveal>
        <Reveal delay={0.06} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/industries/hvac"
            className="lift group rounded-2xl border border-cobalt/30 bg-cobalt-soft p-7"
          >
            <Wind weight="fill" className="text-2xl text-cobalt-dark" />
            <h3 className="mt-4 font-display text-xl font-semibold text-ink">HVAC</h3>
            <p className="mt-1 text-sm text-cobalt-dark">Live now</p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-cobalt-dark">
              View page <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
          <div className="rounded-2xl border border-ink/10 bg-paper p-7 opacity-70">
            <Wrench className="text-2xl text-ink/45" />
            <h3 className="mt-4 font-display text-xl font-semibold text-ink/70">Plumbing</h3>
            <p className="mt-1 text-sm text-ink/45">Coming soon</p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-paper p-7 opacity-70">
            <HouseLine className="text-2xl text-ink/45" />
            <h3 className="mt-4 font-display text-xl font-semibold text-ink/70">Roofing</h3>
            <p className="mt-1 text-sm text-ink/45">Coming soon</p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-paper p-7 opacity-70">
            <Lightning className="text-2xl text-ink/45" />
            <h3 className="mt-4 font-display text-xl font-semibold text-ink/70">Electrical</h3>
            <p className="mt-1 text-sm text-ink/45">Coming soon</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
