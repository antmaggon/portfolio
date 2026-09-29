# Diseño del portfolio

## Objetivo
Portfolio personal de Antonio Magdalena, en español (inglés más adelante).

## Diseño
Página única con scroll vertical. Un contenedor oscuro que engloba 4 "baldas"
apiladas: Cabecera, Sobre mí, Proyectos y Contacto. Cada balda es un bloque
oscuro ligeramente distinto del fondo, con borde fino y un acento de color
propio. Estilo minimalista.

Proyectos: una tarjeta por proyecto con giro 3D (frente y reverso).
El giro funciona con hover, con foco de teclado y con toque en móvil, y
respeta prefers-reduced-motion. Alto fijo por tarjeta; el reverso, corto.

## Contenido
Los textos van en content/es.ts, tipados, pensados para añadir content/en.ts.
Lo que vaya entre [corchetes] se deja como TODO visible. No inventes contenido.

## Accesibilidad
<section> con <h2>, contraste suficiente, foco visible.

## Flujo de trabajo
- Una rama por paso: base-oscura, cabecera-y-sobre-mi, tarjetas-proyecto,
  contacto, ajustes-movil.
- Commits pequeños con mensaje claro. Nada directo a main.
- Antes de cada commit: npm run lint y npm run build.
- No añadir dependencias sin avisar.
- Al terminar cada paso, explicar qué se ha cambiado y por qué.

## Textos
Viven en content/es.ts (y content/en.ts cuando llegue el inglés).
Este archivo solo describe el diseño, no los textos.
