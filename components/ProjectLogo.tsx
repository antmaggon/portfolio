type ProjectLogoProps = {
  name: string;
  logo?: string;
  className?: string;
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

// Decorativo: el nombre del proyecto siempre va al lado.
export default function ProjectLogo({ name, logo, className }: ProjectLogoProps) {
  if (!logo) {
    return (
      <span aria-hidden="true" className={`project-logo project-logo--initials ${className ?? ""}`}>
        {initials(name)}
      </span>
    );
  }

  return (
    // next/image no optimiza los SVG (haría falta dangerouslyAllowSVG) y al
    // ser vectoriales no lo necesitan, así que basta con <img>.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={logo} alt="" width={512} height={512} className={`project-logo ${className ?? ""}`} />
  );
}
