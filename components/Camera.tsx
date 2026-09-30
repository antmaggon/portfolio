import { ReactNode } from "react";

type CameraProps = {
  id: string;
  label: string;
  children: ReactNode;
};

export default function Camera({ id, label, children }: CameraProps) {
  const headingId = `heading-${id}`;
  return (
    <section id={id} aria-labelledby={headingId}>
      <h2 id={headingId}>{label}</h2>
      {children}
    </section>
  );
}
