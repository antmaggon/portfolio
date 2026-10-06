import type { Metadata } from "next";
import type { SiteContent } from "@/content/es";
import { es } from "@/content/es";
import { en } from "@/content/en";

const versions = [es, en];

// Metadata de cada idioma. La imagen de compartir es la misma para los dos
// (public/og.jpg); metadataBase hace que todas las URL salgan absolutas.
export function siteMetadata(content: SiteContent): Metadata {
  const image = {
    url: "/og.jpg",
    width: 1200,
    height: 630,
    type: "image/jpeg",
    alt: content.meta.ogImageAlt,
  };

  return {
    metadataBase: new URL("https://antmaggon.vercel.app"),
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical: content.path,
      languages: {
        ...Object.fromEntries(versions.map((v) => [v.lang, v.path])),
        "x-default": es.path,
      },
    },
    openGraph: {
      type: "website",
      url: content.path,
      title: content.meta.title,
      description: content.meta.description,
      locale: content.meta.ogLocale,
      alternateLocale: versions
        .filter((v) => v.lang !== content.lang)
        .map((v) => v.meta.ogLocale),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.description,
      images: [image],
    },
  };
}
