import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type IntegrationGroup = {
  label: string;
  items: { slug: string; name: string }[];
};

const GROUPS: IntegrationGroup[] = [
  {
    label: "Field service",
    items: [
      { slug: "servicetitan", name: "ServiceTitan" },
      { slug: "housecallpro", name: "Housecall Pro" },
      { slug: "jobber", name: "Jobber" },
    ],
  },
  {
    label: "CRM and marketing",
    items: [
      { slug: "gohighlevel", name: "GoHighLevel" },
      { slug: "salesforce", name: "Salesforce" },
      { slug: "hubspot", name: "HubSpot" },
    ],
  },
  {
    label: "Calendar and books",
    items: [
      { slug: "googlecalendar", name: "Google Calendar" },
      { slug: "outlook", name: "Outlook" },
      { slug: "quickbooks", name: "QuickBooks" },
    ],
  },
];

export function Integrations() {
  return (
    <section className="border-y border-ink/10 bg-white py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            Works with your stack.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            The agent books into the software you already run. No rip and replace, no new phone system.
          </p>
        </Reveal>
        <Reveal delay={0.06} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map((group) => (
            <div key={group.label} className="rounded-2xl border border-ink/10 bg-paper p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">{group.label}</p>
              <div className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <div key={item.slug} className="flex items-center gap-2.5">
                    <Image
                      src={`/logos/${item.slug}.png`}
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 rounded object-contain"
                    />
                    <span className="font-semibold tracking-tight text-ink">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="rounded-2xl border border-cobalt/30 bg-cobalt-soft p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-cobalt-dark">And more</p>
            <p className="mt-3 text-ink/70">
              Keep your phone number as is. We connect new systems on request.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
