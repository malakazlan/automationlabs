import Image from "next/image";
import { Waveform } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const ORBIT_NODES = [
  { angle: 0, icon: "icon-calendar", label: "Live calendar" },
  { angle: 60, icon: "icon-area", label: "Service area" },
  { angle: 120, icon: "icon-escalation", label: "Escalation" },
  { angle: 180, icon: "icon-security", label: "Encrypted" },
  { angle: 240, icon: "icon-voice", label: "Your voice" },
  { angle: 300, icon: "icon-services", label: "Services" },
];

const FALLBACK_CARDS = [
  {
    icon: "icon-services",
    title: "Your services and pricing",
    body: "Repairs, installs, maintenance plans, and your price ranges.",
  },
  {
    icon: "icon-area",
    title: "Your service area",
    body: "It checks the caller is inside your zone before booking.",
  },
  {
    icon: "icon-calendar",
    title: "Your live calendar",
    body: "It offers real open slots and writes the job back instantly.",
  },
  {
    icon: "icon-escalation",
    title: "Your escalation rules",
    body: "No heat in winter or a gas smell routes to your on-call tech.",
  },
  {
    icon: "icon-voice",
    title: "Your voice and tone",
    body: "Natural speech and your business name, like your best CSR.",
  },
  {
    icon: "icon-security",
    title: "Encrypted and consent-aware",
    body: "Calls are encrypted and recording is disclosed.",
  },
];

export function Orbit() {
  return (
    <section className="border-y border-ink/10 bg-white py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-cobalt-dark">
              How the AI works
            </span>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              Everything you run, revolving around one agent.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/70">
              Before it answers a single call, the agent knows how you operate. That is the difference between a robot reading a menu and something that actually books jobs.
            </p>
            <p className="mt-4 hidden text-sm text-ink/45 lg:block">Hover the orbit to pause it.</p>
          </Reveal>

          {/* desktop orbit */}
          <Reveal delay={0.06} className="hidden lg:block">
            <div className="orbit">
              <div className="orbit-ring"></div>
              <div className="orbit-ring inner"></div>
              <div className="orbit-center">
                <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-cobalt text-white shadow-xl shadow-cobalt/30">
                  <Waveform weight="fill" className="text-3xl" />
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/80">
                    Your agent
                  </p>
                </div>
              </div>
              <div className="orbit-spin">
                {ORBIT_NODES.map((node) => (
                  <div
                    key={node.angle}
                    className="orbit-node"
                    style={{
                      transform: `rotate(${node.angle}deg) translateY(-165px) rotate(-${node.angle}deg)`,
                    }}
                  >
                    <div className="orbit-counter">
                      <div className="grid h-[68px] w-[68px] place-items-center rounded-2xl border border-ink/10 bg-white shadow-lg shadow-ink/5">
                        <Image
                          src={`/icons/${node.icon}.png`}
                          alt=""
                          width={48}
                          height={48}
                          className="h-12 w-12"
                        />
                      </div>
                      <span className="text-[11px] font-semibold leading-tight text-ink/70">
                        {node.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* mobile / reduced-motion fallback grid */}
        <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:hidden">
          {FALLBACK_CARDS.map((card) => (
            <div
              key={card.title}
              className="flex gap-4 rounded-2xl border border-ink/10 bg-white p-5"
            >
              <Image
                src={`/icons/${card.icon}.png`}
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 flex-shrink-0"
              />
              <div>
                <h3 className="font-semibold text-ink">{card.title}</h3>
                <p className="mt-1 text-sm text-ink/65">{card.body}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
