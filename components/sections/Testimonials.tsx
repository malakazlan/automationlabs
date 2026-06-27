import Image from "next/image";
import { Star } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

function Stars() {
  return (
    <div className="flex gap-1 text-cobalt">
      <Star weight="fill" />
      <Star weight="fill" />
      <Star weight="fill" />
      <Star weight="fill" />
      <Star weight="fill" />
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="border-y border-ink/10 bg-white py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            HVAC owners stopped losing calls.
          </h2>
          <p className="mt-4 text-sm text-ink/45">
            Illustrative examples until client stories are published.
          </p>
        </Reveal>
        <Reveal delay={0.06} className="mt-12 grid gap-5 lg:grid-cols-3">
          <figure className="rounded-2xl border border-ink/10 bg-paper p-7">
            <Stars />
            <blockquote className="mt-4 text-ink/80">
              The agent booked eleven jobs in our first week without us lifting a finger.
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <Image
                src="/images/owner-portrait.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="text-sm text-ink/70">
                <span className="font-semibold text-ink">Dustin Vargas</span>
                <br />
                Northline Heating and Air
              </span>
            </figcaption>
          </figure>
          <figure className="rounded-2xl border border-ink/10 bg-paper p-7">
            <Stars />
            <blockquote className="mt-4 text-ink/80">
              Summer rush used to mean voicemail full by noon. Now every caller gets booked.
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-cobalt-soft font-semibold text-cobalt-dark">
                MH
              </span>
              <span className="text-sm text-ink/70">
                <span className="font-semibold text-ink">Marcus Hale</span>
                <br />
                Cedar Ridge Heating and Cooling
              </span>
            </figcaption>
          </figure>
          <figure className="rounded-2xl border border-ink/10 bg-paper p-7">
            <Stars />
            <blockquote className="mt-4 text-ink/80">
              It sounds human. Customers have no idea they booked with an AI, and they show up.
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-cobalt-soft font-semibold text-cobalt-dark">
                RT
              </span>
              <span className="text-sm text-ink/70">
                <span className="font-semibold text-ink">Renee Tran</span>
                <br />
                BluePeak Air Solutions
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
