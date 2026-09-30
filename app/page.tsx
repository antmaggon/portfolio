import { es } from "@/content/es";
import Camera from "@/components/Camera";
import Drum from "@/components/Drum";
import type { DrumSlide } from "@/content/es";

function cameraLabel(slide: DrumSlide) {
  return `${slide.number} · ${slide.label}`;
}

export default function Home() {
  const { drum, presentation, projects, contact } = es;
  const [s0, s1, s2] = drum.slides;

  return (
    <main className="flex-1 flex flex-col">
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
                  <a href={link.url}>{link.label}</a>
                </li>
              ))}
            </ul>
            <p className="drum-bio">{presentation.bio}</p>
          </div>
        </Camera>

        <Camera id={s1.id} label={cameraLabel(s1)}>
          <ul className="drum-projects">
            {projects.items.map((item) => (
              <li key={item.name} className="drum-project-card">
                <a href={item.url}>
                  <strong>{item.name}</strong>
                </a>
                <p>{item.description}</p>
                <ul className="drum-tags">
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
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
