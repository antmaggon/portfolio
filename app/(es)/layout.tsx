import type { Metadata } from "next";
import "../globals.css";
import { plexMono, spaceGrotesk } from "../fonts";
import { es } from "@/content/es";
import { siteMetadata } from "@/lib/metadata";

// Root layout de la versión en español: cada idioma tiene el suyo para que
// <html lang> salga correcto desde el servidor.
export const metadata: Metadata = siteMetadata(es);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={es.lang}
      className={`${spaceGrotesk.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
