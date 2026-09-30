export type SocialLink = {
  label: string;
  url: string;
};

export type ProjectItem = {
  name: string;
  description: string;
  url: string;
  tags: string[];
};

export type DrumSlide = {
  id: string;
  label: string;
  number: string;
};

export type SiteContent = {
  meta: {
    title: string;
    description: string;
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
    items: ProjectItem[];
  };
  contact: {
    heading: string;
    body: string;
    email: string;
  };
};


export const es: SiteContent = {
  meta: {
    title: "Antonio Magdalena González · Desarrollador junior",
    description: "Portfolio de Antonio Magdalena: desarrollo web y DevOps.",
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
      { label: "GitHub", url: "https://github.com/antmaggon" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/antmaggon" },
      { label: "Correo", url: "mailto:antmaggon@proton.me" },
    ],
  },
  projects: {
    heading: "PROYECTOS",
    items: [
      {
        name: "moduLife",
        description:
          "Aplicación local para controlar los aspectos de tu vida que quieras. Cada persona instala o crea los módulos que le interesen, y trae algunos por defecto que se activan o desactivan.",
        url: "",
        tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Docker"],
      },
      {
        name: "Homelab",
        description:
          "Servidor propio donde alojo mis aplicaciones y sigo su rendimiento y consumo, y también servidores de juegos y otras cosas de ocio. Ahora mismo lo estoy reconstruyendo desde cero.",
        url: "",
        tags: ["Linux", "Docker", "Tailscale"],
      },
      {
        name: "Este portfolio",
        description:
          "Hecho con Next.js y Tailwind y desplegado en Vercel: cada cambio va en su rama, con vista previa, y se publica al fusionarlo.",
        url: "https://github.com/antmaggon/portfolio",
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