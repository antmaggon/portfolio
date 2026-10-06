import type { SiteContent } from "@/content/es";

export const en: SiteContent = {
  lang: "en",
  path: "/en",
  meta: {
    title: "Antonio Magdalena González · Junior Developer",
    description: "Antonio Magdalena's portfolio: web development and DevOps.",
    ogLocale: "en_US",
    ogImageAlt: "Code window with the </> symbol and the name antmaggon",
  },
  languageSwitch: {
    ariaLabel: "Language",
    code: "EN",
    name: "English",
  },
  drum: {
    ariaLabel: "Section wheel",
    prevLabel: "Previous section",
    nextLabel: "Next section",
    slides: [
      { id: "about", label: "ABOUT", number: "01" },
      { id: "projects", label: "PROJECTS", number: "02" },
      { id: "contact", label: "CONTACT", number: "03" },
    ],
    announceLabels: [
      "Section 1 of 3: About",
      "Section 2 of 3: Projects",
      "Section 3 of 3: Contact",
    ],
  },
  presentation: {
    heading: "ABOUT",
    name: "Antonio Magdalena",
    tagline: "Web development, with an interest in DevOps",
    bio: "Recent graduate with a Higher National Diploma in Web Application Development. I'm interested in development, networking, infrastructure and security, and I practice with my own homelab. I'm currently looking for a job.",
    avatarInitials: "AM",
    social: [
      { label: "GitHub", url: "https://github.com/antmaggon", icon: "github" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/antmaggon", icon: "linkedin" },
      { label: "Email", url: "mailto:antmaggon@proton.me", icon: "email" },
    ],
  },
  projects: {
    heading: "PROJECTS",
    openLabel: "View details for",
    closeLabel: "Close",
    repoLabel: "View on GitHub",
    tagsLabel: "Technologies",
    items: [
      {
        name: "moduLife",
        logo: "/logos/modulife.svg",
        summary: "",
        details:
          "A local app to keep track of whichever areas of your life you want. Each person installs or creates the modules they're interested in, and it comes with a few default ones that can be turned on or off.",
        repoUrl: "https://github.com/antmaggon/moduLife",
        tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Docker"],
      },
      {
        name: "Homelab",
        logo: "/logos/homelab.svg",
        summary: "",
        details:
          "My own server, where I host my apps and monitor their performance and resource usage, along with game servers and other things for fun. I'm currently rebuilding it from scratch.",
        status: "Rebuilding",
        tags: ["Linux", "Docker", "Tailscale"],
      },
      {
        name: "This portfolio",
        logo: "/logos/portfolio.svg",
        summary: "",
        details:
          "Built with Next.js and Tailwind and deployed on Vercel: every change goes on its own branch, with a preview, and is published when it's merged.",
        repoUrl: "https://github.com/antmaggon/portfolio",
        tags: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
      },
    ],
  },
  contact: {
    heading: "CONTACT",
    body: "If you're hiring a junior for development or DevOps, get in touch.",
    email: "antmaggon@proton.me",
  },
};
