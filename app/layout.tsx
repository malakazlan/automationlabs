import type { Metadata } from "next";
import { display, sans, mono } from "./fonts";
import { site } from "@/lib/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s - ${site.name}` },
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable} h-full`}
    >
      <body className="min-h-full font-sans antialiased">{children}</body>
    </html>
  );
}
