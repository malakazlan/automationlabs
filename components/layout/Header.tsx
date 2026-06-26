"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { List, X, Waveform, Phone } from "@phosphor-icons/react";
import { site } from "@/lib/config/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setSolid(!e.isIntersecting),
      { rootMargin: "-70px 0px 0px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} className="absolute top-0 h-px w-full" aria-hidden />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          solid && "border-b border-ink/10 bg-paper/85 backdrop-blur",
        )}
      >
        <div className="mx-auto flex h-[70px] max-w-[1200px] items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-ink"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-cobalt text-white">
              <Waveform weight="fill" />
            </span>
            {site.name}
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-ink/65 lg:flex">
            {site.nav.map((n) => (
              <Link key={n.href} href={n.href} className="transition-colors hover:text-ink">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={site.phoneHref}
              className="hidden text-sm font-medium text-ink/65 transition-colors hover:text-ink sm:block"
            >
              <Phone className="inline" /> {site.phoneDisplay}
            </a>
            <Button href={site.ctaHref} className="px-4 py-2.5">
              {site.ctaLabel}
            </Button>
            <button
              className="text-ink lg:hidden"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <List size={22} />}
            </button>
          </div>
        </div>
        {open && (
          <div className="border-t border-ink/10 bg-paper px-5 py-4 lg:hidden">
            <nav className="flex flex-col gap-3 text-sm font-medium text-ink/80">
              {site.nav.map((n) => (
                <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-1">
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
