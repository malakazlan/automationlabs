import Link from "next/link";
import { Waveform } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/config/site";

export function Footer() {
  return (
    <footer className="bg-ink pb-10 text-paper/55">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5 font-display text-lg font-semibold text-paper">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-cobalt text-white">
              <Waveform weight="fill" />
            </span>
            {site.name}
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            AI voice agents for home-services businesses across the US. Answer every call,
            book every job.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-paper">Product</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/how-it-works" className="hover:text-paper">How it works</Link></li>
            <li><Link href="/industries" className="hover:text-paper">Industries</Link></li>
            <li><Link href="/pricing" className="hover:text-paper">Pricing</Link></li>
            <li><Link href="/book-a-demo" className="hover:text-paper">Book a demo</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-paper">Contact</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a href={`mailto:${site.email}`} className="hover:text-paper">{site.email}</a></li>
            <li><a href={site.phoneHref} className="hover:text-paper">{site.phoneDisplay}</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-[1200px] border-t border-paper/10 px-5 pt-6 text-xs sm:px-8">
        © 2026 {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
