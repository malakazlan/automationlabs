import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function PricingTeaser() {
  return (
    <section className="py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl rounded-3xl border border-ink/10 bg-white p-10 text-center sm:p-12">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-cobalt-dark">
            Pricing
          </span>
          <p className="mt-5 font-display text-5xl font-semibold tracking-tight text-ink">
            From <span className="font-mono">$1,500</span>
            <span className="text-2xl text-ink/50">/mo</span>
          </p>
          <p className="mt-4 text-ink/65">
            Setup quoted on a quick call. 30-day money-back guarantee. No long-term contracts.
          </p>
          <Button href="/book-a-demo" className="mt-8">
            Book a demo
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
