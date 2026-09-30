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
    tagline: "Desarrollando web y DevOps",
    bio: "[TODO]",
    avatarInitials: "AM",
    social: [
      { label: "GitHub", url: "[TODO]" },
      { label: "LinkedIn", url: "[TODO]" },
      { label: "[TODO]", url: "[TODO]" },
    ],
  },
  projects: {
    heading: "PROYECTOS",
    items: [
      {
        name: "moduLife",
        description: "[TODO]",
        url: "[TODO]",
        tags: ["[TODO]"],
      },
      {
        name: "Homelab",
        description: "[TODO]",
        url: "[TODO]",
        tags: ["[TODO]"],
      },
      {
        name: "Este portfolio",
        description: "[TODO]",
        url: "[TODO]",
        tags: ["[TODO]"],
      },
    ],
  },
  contact: {
    heading: "CONTACTO",
    body: "[TODO]",
    email: "[TODO]",
  },
};
