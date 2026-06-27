"use client";

import Cal from "@calcom/embed-react";

export function CalEmbed() {
  const link = process.env.NEXT_PUBLIC_CALCOM_LINK;
  if (!link) return null;
  return (
    <Cal
      calLink={link}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ theme: "light" }}
    />
  );
}
