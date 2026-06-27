import {
  PhoneIncoming,
  Ear,
  ClipboardText,
  CalendarCheck,
  ArrowsClockwise,
} from "@phosphor-icons/react/dist/ssr";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CallFlow } from "@/components/sections/CallFlow";
import { Orbit } from "@/components/sections/Orbit";
import { Onboarding } from "@/components/sections/Onboarding";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata = buildMetadata({
  title: "How it works",
  description:
    "See exactly how the AI voice agent answers, qualifies, books, and syncs a real HVAC call, how it learns your business, and how we get you live in 48 hours.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <>
      <section className="pt-[108px] pb-12 sm:pt-[132px]">
        <Container>
          <Reveal className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-cobalt-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cobalt-dark">
              How it works
            </span>
            <h1 className="mt-5 font-display text-[2.7rem] font-semibold leading-[1.0] tracking-tight text-ink sm:text-6xl">
              Watch one call go from ring to booked job.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70 sm:text-xl">
              No menus, no hold music. The agent answers, understands the problem, qualifies the job, books it, and drops it into your CRM. Here is a real one.
            </p>
          </Reveal>
        </Container>
      </section>

      <CallFlow
        heading="Watch one call go from ring to booked job."
        steps={[
          {
            n: "01",
            title: "Answers in two rings",
            icon: <PhoneIncoming weight="fill" className="text-xl text-cobalt-dark" />,
          },
          {
            n: "02",
            title: "Understands the problem",
            icon: <Ear className="text-xl text-cobalt" />,
          },
          {
            n: "03",
            title: "Qualifies the job",
            icon: <ClipboardText className="text-xl text-cobalt" />,
          },
          {
            n: "04",
            title: "Books the appointment",
            icon: <CalendarCheck className="text-xl text-cobalt" />,
          },
          {
            n: "05",
            title: "Confirms and syncs",
            icon: <ArrowsClockwise className="text-xl text-cobalt" />,
          },
        ]}
        transcript={[
          {
            role: "agent",
            text: "Thanks for calling Northline Heating and Air, this is the booking line. How can I help?",
          },
          {
            role: "caller",
            text: "My AC stopped cooling last night and the house is getting warm.",
          },
          {
            role: "agent",
            text: "Sorry to hear that. Is the unit running but blowing warm air, or not turning on at all?",
          },
          {
            role: "caller",
            text: "It runs, but it's blowing warm air. It's a Carrier, maybe eight years old.",
          },
          {
            role: "agent",
            text: "Got it. I have a technician tomorrow between 8 and 10 in the morning, or today at 4 PM. Which works better?",
          },
          { role: "caller", text: "Tomorrow morning is good." },
          {
            role: "agent",
            text: "Booked for tomorrow, 8 to 10 AM. I'll text your confirmation and the technician's name now. Anything else?",
          },
        ]}
        meta={{ label: "AC not cooling", time: "0:51" }}
        footer={{ text: "Job booked, synced to ServiceTitan", time: "Wed 8:00 AM" }}
        note="Sample conversation for illustration. Real calls vary."
      />

      <Orbit />
      <Onboarding />

      <FinalCta
        title="See it handle your kind of calls."
        primary={{ href: "/book-a-demo", label: "Book a demo" }}
        secondary={{ href: "/industries/hvac", label: "See the HVAC page" }}
      />
    </>
  );
}
