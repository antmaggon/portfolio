export type SocialIconName = "github" | "linkedin" | "email";

export type SocialLink = {
  label: string;
  url: string;
  icon: SocialIconName;
};

export type ProjectItem = {
  name: string;
  // Ruta del logo en public/ (SVG de 512x512).
  logo: string;
  // Resumen de pocas palabras para la tarjeta; vacío = no se muestra.
  summary?: string;
  details: string;
  repoUrl?: string;
  status?: string;
  tags: string[];
};

export type DrumSlide = {
  id: string;
  label: string;
  number: string;
};

export type SiteContent = {
  // Idioma (atributo lang) y ruta de esta versión de la web.
  lang: "es" | "en";
  path: "/" | "/en";
  meta: {
    title: string;
    description: string;
    // Formato de Open Graph: es_ES, en_US…
    ogLocale: string;
    // Texto alternativo de la imagen de compartir (public/og.jpg).
    ogImageAlt: string;
  };
  // Interruptor de idioma: code es lo visible ("ES") y name, el nombre
  // del idioma en su propio idioma, el nombre accesible.
  languageSwitch: {
    ariaLabel: string;
    code: string;
    name: string;
  };
  drum: {
    ariaLabel: string;
    prevLabel: string;
    nextLabel: string;
    slides: DrumSlide[];
    announceLabels: string[];
  };
  presentation: {
    heading: string;
    name: string;
    tagline: string;
    bio: string;
    avatarInitials: string;
    social: SocialLink[];
  };
  projects: {
    heading: string;
    // Se completa con el nombre: "Ver detalles de moduLife".
    openLabel: string;
    closeLabel: string;
    repoLabel: string;
    tagsLabel: string;
    items: ProjectItem[];
  };
  contact: {
    heading: string;
    body: string;
    email: string;
  };
};


export const es: SiteContent = {
  lang: "es",
  path: "/",
  meta: {
    title: "Antonio Magdalena González · Desarrollador junior",
    description: "Portfolio de Antonio Magdalena: desarrollo web y DevOps.",
    ogLocale: "es_ES",
    ogImageAlt: "Ventana de código con el símbolo </> y el nombre antmaggon",
  },
  languageSwitch: {
    ariaLabel: "Idioma",
    code: "ES",
    name: "Español",
  },
  drum: {
    ariaLabel: "Rueda de secciones",
    prevLabel: "Sección anterior",
    nextLabel: "Sección siguiente",
    slides: [
      { id: "presentacion", label: "PRESENTACIÓN", number: "01" },
      { id: "proyectos", label: "PROYECTOS", number: "02" },
      { id: "contacto", label: "CONTACTO", number: "03" },
    ],
    announceLabels: [
      "Sección 1 de 3: Presentación",
      "Sección 2 de 3: Proyectos",
      "Sección 3 de 3: Contacto",
    ],
  },
  presentation: {
    heading: "PRESENTACIÓN",
    name: "Antonio Magdalena",
    tagline: "Desarrollo web e interés en DevOps",
    bio: "Recién graduado en el grado superior de Desarrollo de Aplicaciones Web. Me interesan el desarrollo, las redes, la infraestructura y la seguridad, y practico con un homelab propio. Ahora mismo estoy buscando trabajo.",
    avatarInitials: "AM",
    social: [
      { label: "GitHub", url: "https://github.com/antmaggon", icon: "github" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/antmaggon", icon: "linkedin" },
      { label: "Correo", url: "mailto:antmaggon@proton.me", icon: "email" },
    ],
  },
  projects: {
    heading: "PROYECTOS",
    openLabel: "Ver detalles de",
    closeLabel: "Cerrar",
    repoLabel: "Ver en GitHub",
    tagsLabel: "Tecnologías",
    items: [
      {
        name: "moduLife",
        logo: "/logos/modulife.svg",
        summary: "",
        details:
          "Aplicación local para controlar los aspectos de tu vida que quieras. Cada persona instala o crea los módulos que le interesen, y trae algunos por defecto que se activan o desactivan.",
        repoUrl: "https://github.com/antmaggon/moduLife",
        tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Docker"],
      },
      {
        name: "Homelab",
        logo: "/logos/homelab.svg",
        summary: "",
        details:
          "Servidor propio donde alojo mis aplicaciones y sigo su rendimiento y consumo, y también servidores de juegos y otras cosas de ocio. Ahora mismo lo estoy reconstruyendo desde cero.",
        status: "Reconstruyéndose",
        tags: ["Linux", "Docker", "Tailscale"],
      },
      {
        name: "Este portfolio",
        logo: "/logos/portfolio.svg",
        summary: "",
        details:
          "Hecho con Next.js y Tailwind y desplegado en Vercel: cada cambio va en su rama, con vista previa, y se publica al fusionarlo.",
        repoUrl: "https://github.com/antmaggon/portfolio",
        tags: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
      },
    ],
  },
  contact: {
    heading: "CONTACTO",
    body: "Si buscas un junior en desarrollo o DevOps, escríbeme.",
    email: "antmaggon@proton.me",
  },
};