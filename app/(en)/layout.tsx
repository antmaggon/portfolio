import type { Metadata } from "next";
import "../globals.css";
import { plexMono, spaceGrotesk } from "../fonts";
import { en } from "@/content/en";
import { siteMetadata } from "@/lib/metadata";

// Root layout de la versión en inglés: cada idioma tiene el suyo para que
// <html lang> salga correcto desde el servidor.
export const metadata: Metadata = siteMetadata(en);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={en.lang}
      className={`${spaceGrotesk.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
