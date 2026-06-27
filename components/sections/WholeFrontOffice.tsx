import {
  BellRinging,
  CalendarCheck,
  ChatText,
  ClipboardText,
  MoonStars,
  PhoneIncoming,
  PhoneTransfer,
  Star,
} from "@phosphor-icons/react/dist/ssr";
import type { ComponentType } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type IconComponent = ComponentType<{ weight?: "duotone"; className?: string }>;

type Tile = {
  icon: IconComponent;
  title: string;
  body: string;
};

const TILES: Tile[] = [
  { icon: PhoneIncoming, title: "Answer every call", body: "Two-ring pickup, 24/7, in your business name." },
  { icon: ClipboardText, title: "Qualify the job", body: "Make, model, urgency, and service area." },
  { icon: CalendarCheck, title: "Book the appointment", body: "Real open slots, locked in on the call." },
  { icon: PhoneTransfer, title: "Route and dispatch", body: "Emergencies go straight to your on-call tech." },
  { icon: BellRinging, title: "Follow up and remind", body: "Confirmations and reminders cut no-shows." },
  { icon: Star, title: "Request reviews", body: "Asks happy customers for a Google review." },
  { icon: ChatText, title: "Summarize to your team", body: "Transcript and summary after every call." },
  { icon: MoonStars, title: "Work after hours", body: "Nights, weekends, holidays, peak season." },
];

export function WholeFrontOffice() {
  return (
    <section className="py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            Not just answering. Your whole front office.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            The agent runs the front desk end to end, so your team stays on the tools and nothing slips through.
          </p>
        </Reveal>
        <Reveal delay={0.06} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TILES.map((tile) => {
            const Icon = tile.icon;
            return (
              <div key={tile.title} className="rounded-2xl border border-ink/10 bg-white p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-cobalt-soft text-cobalt-dark">
                  <Icon weight="duotone" className="text-2xl" />
                </span>
                <h3 className="mt-4 font-semibold text-ink">{tile.title}</h3>
                <p className="mt-1 text-sm text-ink/65">{tile.body}</p>
              </div>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
