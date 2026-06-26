import { Phone } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/config/site";

export function StickyCallBar() {
  return (
    <a
      href={site.phoneHref}
      className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-center gap-2 border-t border-ink/10 bg-cobalt py-3 text-sm font-semibold text-white sm:hidden"
    >
      <Phone weight="fill" /> Call us now
    </a>
  );
}
