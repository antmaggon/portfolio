# Diseño del portfolio

## Objetivo
Portfolio personal de Antonio Magdalena, en español (inglés más adelante).

## Diseño
Página única con tres "cámaras" dispuestas en una rueda tipo tambor de
revólver: Presentación (nombre, frase, foto, enlaces y descripción),
Proyectos (moduLife, homelab y este portfolio) y Contacto. La rueda gira
con flechas laterales, teclado y deslizando. El scroll vertical lee el
contenido de la cámara activa; la rueda del ratón no gira el tambor.
Cada cámara tiene su ancla (#proyectos, #contacto). Sin JavaScript, las
tres se ven apiladas. Con prefers-reduced-motion, sin animación.

## Contenido
Los textos van en content/es.ts, tipados, pensados para añadir content/en.ts.
Lo que vaya entre [corchetes] se deja como TODO visible. No inventes contenido.

## Accesibilidad
<section> con <h2>, contraste suficiente, foco visible.

## Flujo de trabajo
- Una rama por paso: base-oscura (hecha), baldas-esqueleto, textos-y-cabecera,
  tarjetas-proyecto, contacto, ajustes-movil.
- Commits pequeños con mensaje claro. Nada directo a main.
- Antes de cada commit: npm run lint y npm run build.
- No añadir dependencias sin avisar.
- Al terminar cada paso, explicar qué se ha cambiado y por qué.

## Textos
Viven en content/es.ts (y content/en.ts cuando llegue el inglés).
Este archivo solo describe el diseño, no los textos.
