import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";

// Definidas una sola vez: las usan los root layouts de los dos idiomas.
export const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});
