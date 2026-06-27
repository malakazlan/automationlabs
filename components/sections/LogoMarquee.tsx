import Image from "next/image";
import { Container } from "@/components/ui/Container";

const TOOLS = [
  { slug: "servicetitan", name: "ServiceTitan" },
  { slug: "housecallpro", name: "Housecall Pro" },
  { slug: "jobber", name: "Jobber" },
  { slug: "gohighlevel", name: "GoHighLevel" },
  { slug: "salesforce", name: "Salesforce" },
  { slug: "hubspot", name: "HubSpot" },
  { slug: "googlecalendar", name: "Google Calendar" },
  { slug: "outlook", name: "Outlook" },
  { slug: "quickbooks", name: "QuickBooks" },
];

function Set({ hidden }: { hidden: boolean }) {
  return (
    <>
      {TOOLS.map((t) => (
        <div key={`${hidden}-${t.slug}`} className="flex items-center gap-2.5" aria-hidden={hidden || undefined}>
          <Image src={`/logos/${t.slug}.png`} alt={hidden ? "" : t.name} width={32} height={32} className="h-8 w-8 rounded-md object-contain" />
          <span className="marquee-word">{t.name}</span>
        </div>
      ))}
    </>
  );
}

export function LogoMarquee() {
  return (
    <section className="border-y border-ink/10 bg-white/55 py-9">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">
          Books into the tools you already run
        </p>
        <div className="marquee mt-7">
          <div className="marquee-track">
            <Set hidden={false} />
            <Set hidden={true} />
          </div>
        </div>
      </Container>
    </section>
  );
}
