"use client";

import type { ReactNode } from "react";

export function VoiceDemoButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event("sal:open-voice"))}
    >
      {children}
    </button>
  );
}
