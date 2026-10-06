import Camera from "@/components/Camera";
import Drum from "@/components/Drum";
import LanguageSwitch from "@/components/LanguageSwitch";
import ProjectCard from "@/components/ProjectCard";
import SocialIcon from "@/components/SocialIcon";
import type { DrumSlide, SiteContent } from "@/content/es";
import { es } from "@/content/es";
import { en } from "@/content/en";

const versions = [es, en];

function switchVersion(content: SiteContent) {
  return {
    lang: content.lang,
    path: content.path,
    code: content.languageSwitch.code,
    name: content.languageSwitch.name,
    slideIds: content.drum.slides.map((s) => s.id),
  };
}

function cameraLabel(slide: DrumSlide) {
  return `${slide.number} · ${slide.label}`;
}

// La página de cada idioma es la misma; solo cambia el contenido.
export default function HomePage({ content }: { content: SiteContent }) {
  const { drum, presentation, projects, contact } = content;
  const [s0, s1, s2] = drum.slides;

  return (
    <main className="flex-1 flex flex-col">
      {/* Fuera de <Drum>: sus eventos no llegan a los gestos ni al teclado. */}
      <LanguageSwitch
        ariaLabel={content.languageSwitch.ariaLabel}
        current={switchVersion(content)}
        versions={versions.map(switchVersion)}
      />
      <Drum
        tabs={drum.slides}
        ariaLabel={drum.ariaLabel}
        prevLabel={drum.prevLabel}
        nextLabel={drum.nextLabel}
        announceLabels={drum.announceLabels}
      >
        <Camera id={s0.id} label={cameraLabel(s0)}>
          <div className="drum-intro">
            <div aria-hidden="true" className="drum-avatar">
              {presentation.avatarInitials}
            </div>
            <p className="drum-name">{presentation.name}</p>
            <p className="drum-tagline">{presentation.tagline}</p>
            <ul className="drum-social">
              {presentation.social.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    title={link.label}
                  >
                    <SocialIcon name={link.icon} />
                  </a>
                </li>
              ))}
            </ul>
            <p className="drum-bio">{presentation.bio}</p>
          </div>
        </Camera>

        <Camera id={s1.id} label={cameraLabel(s1)}>
          <ul className="drum-projects">
            {projects.items.map((item) => (
              <li key={item.name}>
                <ProjectCard
                  project={item}
                  openLabel={projects.openLabel}
                  closeLabel={projects.closeLabel}
                  repoLabel={projects.repoLabel}
                  tagsLabel={projects.tagsLabel}
                />
              </li>
            ))}
          </ul>
        </Camera>

        <Camera id={s2.id} label={cameraLabel(s2)}>
          <p className="drum-contact-body">{contact.body}</p>
          <p className="drum-contact-email">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        </Camera>
      </Drum>
    </main>
  );
}
