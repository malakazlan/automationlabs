import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type CtaLink = {
  href: string;
  label: string;
};

export function FinalCta({
  title,
  primary,
  secondary,
}: {
  title: string;
  primary: CtaLink;
  secondary?: CtaLink;
}) {
  return (
    <section className="bg-ink py-24 text-paper">
      <Container className="text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            {title}
          </h2>
        </Reveal>
        <Reveal className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href={primary.href} variant="primary">
            {primary.label}
          </Button>
          {secondary ? (
            <Button
              href={secondary.href}
              variant="secondary"
              className="border-paper/25 bg-transparent text-paper hover:border-paper/50"
            >
              {secondary.label}
            </Button>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
