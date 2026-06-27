import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceLd } from "@/lib/seo/structured-data";
import { site } from "@/lib/config/site";
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { MissedCallCost } from "@/components/sections/MissedCallCost";
import { CallFlow } from "@/components/sections/CallFlow";
import { WholeFrontOffice } from "@/components/sections/WholeFrontOffice";
import { ResultsBand } from "@/components/sections/ResultsBand";
import { DemoBand } from "@/components/sections/DemoBand";
import { Testimonials } from "@/components/sections/Testimonials";
import { Comparison } from "@/components/sections/Comparison";
import { Integrations } from "@/components/sections/Integrations";
import { Onboarding } from "@/components/sections/Onboarding";
import { IndustriesTeaser } from "@/components/sections/IndustriesTeaser";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata = buildMetadata({
  title: "AI Voice Agents That Answer Every Call",
  description: site.description,
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd
        data={serviceLd({
          name: "AI Voice Receptionist",
          description: site.description,
          url: site.url,
        })}
      />
      <Hero />
      <LogoMarquee />
      <MissedCallCost />
      <CallFlow
        eyebrow="How it works"
        heading="From ring to booked job in one call."
        fullLink
        steps={[
          { n: "01", title: "Answers in two rings" },
          { n: "02", title: "Understands and qualifies the job" },
          { n: "03", title: "Books the appointment on the call" },
          { n: "04", title: "Confirms by text and syncs your CRM" },
        ]}
        transcript={[
          { role: "agent", text: "Thanks for calling Northline Heating and Air. How can I help?" },
          { role: "caller", text: "My AC stopped cooling and the house is getting warm." },
          { role: "agent", text: "Is the unit running but blowing warm air, or not turning on at all?" },
          { role: "caller", text: "It runs but blows warm. It's a Carrier, about eight years old." },
          { role: "agent", text: "I can get a tech out tomorrow 8 to 10 AM. Does that work?" },
          { role: "caller", text: "Tomorrow morning is good." },
        ]}
        meta={{ label: "AC not cooling", time: "0:51" }}
        footer={{ text: "Job booked, synced to ServiceTitan", time: "Wed 8:00 AM" }}
      />
      <WholeFrontOffice />
      <ResultsBand />
      <DemoBand />
      <Testimonials />
      <Comparison />
      <Integrations />
      <Onboarding />
      <IndustriesTeaser />
      <PricingTeaser />
      <FinalCta
        title="Your phone is ringing. Make sure someone answers."
        primary={{ href: "/book-a-demo", label: "Book a demo" }}
        secondary={{ href: "#demo", label: "Hear the agent" }}
      />
    </>
  );
}
