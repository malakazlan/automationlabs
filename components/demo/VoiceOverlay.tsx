"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils/cn";

const SCRIPT: { s: "Speaking" | "Listening"; t: string }[] = [
  { s: "Speaking", t: "Hi, I am the Simple Automation Labs agent. Ask me how we handle your calls." },
  { s: "Listening", t: "How fast can you go live?" },
  { s: "Speaking", t: "Most HVAC teams are answering within 48 hours, with no change to your phone system." },
  { s: "Listening", t: "Does it book into ServiceTitan?" },
  { s: "Speaking", t: "Yes. It books the job into ServiceTitan while the caller is still on the line." },
];

export function VoiceOverlay() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("Connecting");
  const [line, setLine] = useState("");
  const [listening, setListening] = useState(false);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("sal:open-voice", onOpen);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("sal:open-voice", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      clearTimers();
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    setStatus("Connecting");
    setLine("");
    setListening(false);
    let i = 0;
    const step = () => {
      if (i >= SCRIPT.length) {
        setStatus("Ready");
        setLine("Ask me anything.");
        setListening(false);
        return;
      }
      const turn = SCRIPT[i];
      setStatus(turn.s);
      setLine(turn.t);
      setListening(turn.s === "Listening");
      i += 1;
      timers.current.push(window.setTimeout(step, 2800));
    };
    timers.current.push(window.setTimeout(step, 900));
    return () => {
      clearTimers();
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={cn("voice-overlay open", listening && "listening")}
      role="dialog"
      aria-modal="true"
      aria-label="Voice agent demo"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="relative w-full max-w-md rounded-3xl border border-ink/10 bg-white p-8 text-center shadow-2xl">
        <button
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-ink/50 hover:bg-ink/5"
          aria-label="Close"
          onClick={() => setOpen(false)}
        >
          <X size={18} />
        </button>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cobalt-dark">
          Talk to our agent
        </p>
        <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
          Simple Automation Labs
        </h3>
        <div className="mt-7 flex justify-center">
          <div className="voice-orb">
            <div className="voice-core">
              <div className="voice-eq">
                <span /><span /><span /><span /><span />
              </div>
            </div>
          </div>
        </div>
        <p className="mt-7 text-sm font-semibold text-cobalt-dark">{status}</p>
        <p className="mx-auto mt-2 min-h-[52px] max-w-xs text-ink/70">{line}</p>
        <button
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink/30"
          onClick={() => setOpen(false)}
        >
          End demo
        </button>
        <p className="mt-5 text-xs text-ink/45">
          Preview of the live voice agent. Full two-way voice connects in production.
        </p>
      </div>
    </div>
  );
}
