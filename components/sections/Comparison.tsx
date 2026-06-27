import { CheckCircle, Minus } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

function MinusCell() {
  return (
    <td className="px-6 py-4 text-center">
      <Minus className="text-lg text-ink/25" />
    </td>
  );
}

function TextCell({ children }: { children: string }) {
  return <td className="px-6 py-4 text-center text-xs text-ink/50">{children}</td>;
}

function GreenCheckCell() {
  return (
    <td className="px-6 py-4 text-center">
      <CheckCircle weight="fill" className="text-lg text-emerald-600" />
    </td>
  );
}

function CobaltCheckCell() {
  return (
    <td className="bg-cobalt-soft px-6 py-4 text-center">
      <CheckCircle weight="fill" className="text-xl text-cobalt" />
    </td>
  );
}

export function Comparison() {
  return (
    <section className="py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            Why not just voicemail or an answering service?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            An honest comparison. The agent does what the cheap options cannot, for less than a part-time hire.
          </p>
        </Reveal>
        <Reveal delay={0.06} className="mt-12 overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-xl shadow-ink/5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr>
                  <th className="px-6 py-5 text-sm font-medium text-ink/45">Capability</th>
                  <th className="px-6 py-5 text-center text-sm font-medium text-ink/45">Voicemail</th>
                  <th className="px-6 py-5 text-center text-sm font-medium text-ink/45">Receptionist</th>
                  <th className="px-6 py-5 text-center text-sm font-medium text-ink/45">Answering service</th>
                  <th className="bg-cobalt px-6 py-5 text-center align-top">
                    <span className="block text-sm font-semibold text-white">Simple Automation Labs</span>
                    <span className="mt-1.5 inline-block rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                      Recommended
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-ink/10">
                  <td className="px-6 py-4 text-sm font-medium text-ink">Answers 24/7</td>
                  <MinusCell />
                  <TextCell>Business hours</TextCell>
                  <GreenCheckCell />
                  <CobaltCheckCell />
                </tr>
                <tr className="border-t border-ink/10">
                  <td className="px-6 py-4 text-sm font-medium text-ink">Picks up in two rings</td>
                  <MinusCell />
                  <TextCell>If free</TextCell>
                  <TextCell>Often holds</TextCell>
                  <CobaltCheckCell />
                </tr>
                <tr className="border-t border-ink/10">
                  <td className="px-6 py-4 text-sm font-medium text-ink">Books into your CRM</td>
                  <MinusCell />
                  <TextCell>Manually</TextCell>
                  <TextCell>Sometimes</TextCell>
                  <CobaltCheckCell />
                </tr>
                <tr className="border-t border-ink/10">
                  <td className="px-6 py-4 text-sm font-medium text-ink">Knows your pricing and area</td>
                  <MinusCell />
                  <TextCell>If trained</TextCell>
                  <MinusCell />
                  <CobaltCheckCell />
                </tr>
                <tr className="border-t border-ink/10">
                  <td className="px-6 py-4 text-sm font-medium text-ink">Scales during peak season</td>
                  <MinusCell />
                  <MinusCell />
                  <TextCell>Limited</TextCell>
                  <CobaltCheckCell />
                </tr>
                <tr className="border-t border-ink/10 bg-paper/60">
                  <td className="px-6 py-5 text-sm font-semibold text-ink">Typical monthly cost</td>
                  <td className="px-6 py-5 text-center font-mono text-xs text-ink/55">Free</td>
                  <td className="px-6 py-5 text-center font-mono text-xs text-ink/55">$3,500+</td>
                  <td className="px-6 py-5 text-center font-mono text-xs text-ink/55">$1-2/min</td>
                  <td className="bg-cobalt-soft px-6 py-5 text-center font-mono text-sm font-semibold text-cobalt-dark">
                    From $1,500
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
