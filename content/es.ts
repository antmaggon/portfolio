export type ProjectItem = {
  name: string;
  description: string;
  url: string;
};

export type SiteContent = {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    name: string;
    tagline: string;
  };
  about: {
    heading: string;
    body: string;
  };
  projects: {
    heading: string;
    items: ProjectItem[];
  };
  contact: {
    heading: string;
    body: string;
  };
};

export const es: SiteContent = {
  meta: {
    title: "Antonio Magdalena Gonzalez · Desarrollador junior",
    description: "Portfolio de Antonio Magdalena: desarrollo web y DevOps.",
  },
  hero: {
    name: "Antonio Magdalena",
    tagline: "Desarrollador junior · DevOps",
  },
  about: {
    heading: "Sobre mí",
    body: "[TODO]",
  },
  projects: {
    heading: "Proyectos",
    items: [],
  },
  contact: {
    heading: "Contacto",
    body: "[TODO]",
  },
};
