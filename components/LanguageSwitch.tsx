"use client";

type Version = {
  lang: string;
  path: string;
  code: string;
  name: string;
  // Ids de las cámaras, en el mismo orden en todos los idiomas.
  slideIds: string[];
};

type LanguageSwitchProps = {
  ariaLabel: string;
  current: Version;
  versions: Version[];
};

// Lleva a la misma cámara en el otro idioma. Se lee el hash al hacer clic
// porque Drum lo cambia con replaceState, que no dispara hashchange. Sin
// JavaScript (o si el hash no es de una cámara), va a la raíz del idioma.
export default function LanguageSwitch({ ariaLabel, current, versions }: LanguageSwitchProps) {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>, target: Version) => {
    const index = current.slideIds.indexOf(location.hash.slice(1));
    const id = target.slideIds[index];
    if (index >= 0 && id) e.currentTarget.hash = id;
  };

  return (
    <nav aria-label={ariaLabel} className="lang-switch">
      {versions.map((v, i) => (
        <span key={v.lang} className="lang-switch-item">
          {i > 0 && (
            <span aria-hidden="true" className="lang-switch-sep">
              |
            </span>
          )}
          <a
            href={v.path}
            hrefLang={v.lang}
            lang={v.lang}
            aria-label={v.name}
            aria-current={v.lang === current.lang ? "true" : undefined}
            onClick={(e) => onClick(e, v)}
          >
            {v.code}
          </a>
        </span>
      ))}
    </nav>
  );
}
