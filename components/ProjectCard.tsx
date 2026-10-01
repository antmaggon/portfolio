"use client";

import { useId, useRef } from "react";
import type { ProjectItem } from "@/content/es";
import ProjectLogo from "@/components/ProjectLogo";

type ProjectCardProps = {
  project: ProjectItem;
  openLabel: string;
  closeLabel: string;
  repoLabel: string;
  tagsLabel: string;
};

export default function ProjectCard({
  project,
  openLabel,
  closeLabel,
  repoLabel,
  tagsLabel,
}: ProjectCardProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cardRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const pressedOnBackdrop = useRef(false);
  const { name, logo, summary, details, repoUrl, status, tags } = project;

  // Un clic en el fondo llega con el propio <dialog> como target; dentro del
  // panel el target es el contenido, porque el relleno está en un div interior.
  // También tiene que empezar en el fondo: si se selecciona texto del panel y
  // se suelta fuera, el clic llega al <dialog> y no debe cerrarlo.
  const onDialogPointerDown = (e: React.PointerEvent<HTMLDialogElement>) => {
    pressedOnBackdrop.current = e.target === e.currentTarget;
  };

  const onDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (pressedOnBackdrop.current && e.target === e.currentTarget) {
      e.currentTarget.close();
    }
    pressedOnBackdrop.current = false;
  };

  // El navegador devuelve el foco al elemento enfocado antes de abrir, pero
  // Safari no enfoca los botones al hacer clic: lo devolvemos a mano.
  const onDialogClose = () => cardRef.current?.focus();

  return (
    <>
      <button
        ref={cardRef}
        type="button"
        className="drum-project-card"
        aria-label={`${openLabel} ${name}`}
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
      >
        <ProjectLogo name={name} logo={logo} className="drum-project-logo" />
        <span className="drum-project-name">{name}</span>
        {summary && <span className="drum-project-summary">{summary}</span>}
      </button>

      <dialog
        ref={dialogRef}
        className="project-dialog"
        aria-labelledby={titleId}
        onPointerDown={onDialogPointerDown}
        onClick={onDialogClick}
        onClose={onDialogClose}
      >
        <div className="project-dialog-body">
          <div className="project-dialog-header">
            <ProjectLogo name={name} logo={logo} className="project-dialog-logo" />
            <h3 id={titleId}>{name}</h3>
            <button
              type="button"
              className="project-dialog-close"
              onClick={() => dialogRef.current?.close()}
            >
              {closeLabel}
            </button>
          </div>

          {status && <p className="project-dialog-status">{status}</p>}
          <p className="project-dialog-details">{details}</p>

          <ul className="drum-tags" aria-label={tagsLabel}>
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>

          {repoUrl && (
            <a
              className="project-dialog-repo"
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {repoLabel}
            </a>
          )}
        </div>
      </dialog>
    </>
  );
}
