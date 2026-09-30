"use client";

import {
  Children,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

const SIDE_ANGLE = 42;
// Duración de un giro. Se pasa al CSS como --spin-time.
const SPIN_MS = 800;
// Margen antes del siguiente giro en cola: la animación CSS arranca un
// fotograma después del clic, y si el giro siguiente llega mientras aún
// corre, el navegador no anima el cambio y la cámara salta.
const SPIN_MARGIN_MS = 80;
const DRAG_THRESHOLD = 50;
// Movimiento mínimo de rueda o trackpad para girar, y silencio necesario
// antes de aceptar otro giro (así la inercia del trackpad gira solo una vez).
const WHEEL_THRESHOLD = 10;
const WHEEL_QUIET_MS = 250;

type Tab = {
  id: string;
  label: string;
  number: string;
};

type DrumProps = {
  children: ReactNode;
  tabs: Tab[];
  ariaLabel: string;
  prevLabel: string;
  nextLabel: string;
  announceLabels: string[];
};

function getOffset(i: number, activeIndex: number, total: number): number {
  const raw = ((i - activeIndex) % total + total) % total;
  return raw > Math.floor(total / 2) ? raw - total : raw;
}

// ¿Puede esta tarjeta desplazar su propio contenido en ese sentido?
function canScrollInside(el: Element, deltaY: number): boolean {
  if (el.scrollHeight <= el.clientHeight) return false;
  return deltaY > 0
    ? el.scrollTop + el.clientHeight < el.scrollHeight - 1
    : el.scrollTop > 0;
}

// false en el servidor y durante la hidratación, true después.
const subscribeNoop = () => () => {};
function useHydrated() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

export default function Drum({
  children,
  tabs,
  ariaLabel,
  prevLabel,
  nextLabel,
  announceLabels,
}: DrumProps) {
  const slides = Children.toArray(children);
  const total = slides.length;

  // Guardamos también la posición anterior para saber qué cámara da la
  // vuelta de un lado al otro y no animarla cruzando por delante.
  const [{ activeIndex, prevIndex }, setPosition] = useState({
    activeIndex: 0,
    prevIndex: 0,
  });
  const pointerStartX = useRef<number | null>(null);
  // Mientras gira no empieza otro giro: si a mitad de camino las cámaras
  // cambiaran de destino, se superpondrían. El último giro pedido espera
  // en cola y se hace al terminar el actual.
  const spinningUntil = useRef(0);
  const queued = useRef<number | null>(null);
  const queueTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const drumRef = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();

  const goTo = useCallback((next: number) => {
    setPosition((p) => ({ activeIndex: next, prevIndex: p.activeIndex }));
  }, []);

  const spin = useCallback(
    (idx: number) => {
      const next = ((idx % total) + total) % total;
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      spinningUntil.current = performance.now() + (reduced ? 0 : SPIN_MS + SPIN_MARGIN_MS);
      goTo(next);
      history.replaceState(null, "", `#${tabs[next].id}`);
    },
    [total, tabs, goTo]
  );

  const navigate = useCallback(
    (idx: number) => {
      const wait = spinningUntil.current - performance.now();
      if (wait <= 0) {
        spin(idx);
        return;
      }
      queued.current = idx;
      clearTimeout(queueTimer.current);
      queueTimer.current = setTimeout(() => {
        const target = queued.current;
        queued.current = null;
        if (target !== null) spin(target);
      }, wait);
    },
    [spin]
  );

  useEffect(() => () => clearTimeout(queueTimer.current), []);

  useEffect(() => {
    const readHash = () => {
      const hash = window.location.hash.slice(1);
      const idx = tabs.findIndex((t) => t.id === hash);
      if (idx >= 0) goTo(idx);
    };
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, [tabs, goTo]);

  // El listener de rueda es nativo (necesita preventDefault), así que lee
  // el índice y navigate actuales desde una ref.
  const latest = useRef({ activeIndex, navigate });
  useEffect(() => {
    latest.current = { activeIndex, navigate };
  });

  useEffect(() => {
    const el = drumRef.current;
    if (!el) return;
    let locked = false;
    let quietTimer: ReturnType<typeof setTimeout> | undefined;

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // zoom con Ctrl + rueda
      const vertical = Math.abs(e.deltaY) >= Math.abs(e.deltaX);
      const delta = vertical ? e.deltaY : e.deltaX;
      // Si la tarjeta activa tiene más contenido del que cabe, la rueda
      // primero lo desplaza y solo gira al llegar al final.
      const card = (e.target as Element).closest(".drum-slide > section");
      if (vertical && card && canScrollInside(card, delta)) return;

      e.preventDefault();
      clearTimeout(quietTimer);
      quietTimer = setTimeout(() => (locked = false), WHEEL_QUIET_MS);
      if (locked || Math.abs(delta) < WHEEL_THRESHOLD) return;
      locked = true;
      const { activeIndex, navigate } = latest.current;
      navigate(activeIndex + (delta > 0 ? 1 : -1));
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      clearTimeout(quietTimer);
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      navigate(activeIndex - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      navigate(activeIndex + 1);
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Un clic que empieza en un botón o enlace es suyo, no un arrastre.
    if ((e.target as HTMLElement).closest("button, a")) return;
    pointerStartX.current = e.clientX;
    if (e.pointerType === "touch" || e.pointerType === "pen") {
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return;
    const delta = pointerStartX.current - e.clientX;
    if (Math.abs(delta) > DRAG_THRESHOLD) {
      navigate(activeIndex + (delta > 0 ? 1 : -1));
    }
    pointerStartX.current = null;
  };

  const onPointerCancel = () => {
    pointerStartX.current = null;
  };

  return (
    <>
      <noscript
        dangerouslySetInnerHTML={{
          __html:
            "<style>.drum{height:auto!important;overflow:visible!important}.drum-slide>section{max-height:none!important}.drum-track{display:flex!important;flex-direction:column;gap:2rem}.drum-slide{height:auto!important;transform:none!important;opacity:1!important;filter:none!important}.drum-arrow,.drum-tabs{display:none!important}</style>",
        }}
      />
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        ref={drumRef}
        className="drum"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        style={
          {
            "--index": activeIndex,
            "--side-angle": `${SIDE_ANGLE}deg`,
            "--spin-time": `${SPIN_MS}ms`,
          } as React.CSSProperties
        }
      >
        <button
          type="button"
          className="drum-arrow drum-arrow--prev"
          onClick={() => navigate(activeIndex - 1)}
          aria-label={prevLabel}
        >
          <Chevron direction="left" />
        </button>

        <div className="drum-track">
          {slides.map((child, i) => {
            const offset = getOffset(i, activeIndex, total);
            const prevOffset = getOffset(i, prevIndex, total);
            // La cámara que da la vuelta (de -1 a +1 o al revés) sale por
            // su lado y entra por el contrario, siguiendo el giro.
            const wraps = Math.abs(offset - prevOffset) > 1;
            const step = offset > prevOffset ? -1 : 1;
            // Sin JS (o antes de hidratar) las tres cámaras son usables.
            const hidden = hydrated && i !== activeIndex;
            return (
              <div
                key={i}
                role="group"
                aria-roledescription="slide"
                className={
                  wraps
                    ? `drum-slide drum-slide--wrap-${step < 0 ? "next" : "prev"}`
                    : "drum-slide"
                }
                style={
                  {
                    "--offset": offset,
                    "--prev-offset": prevOffset,
                    "--exit-offset": prevOffset + step,
                    "--enter-offset": offset - step,
                  } as React.CSSProperties
                }
                aria-hidden={hidden || undefined}
                inert={hidden}
              >
                {child}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="drum-arrow drum-arrow--next"
          onClick={() => navigate(activeIndex + 1)}
          aria-label={nextLabel}
        >
          <Chevron direction="right" />
        </button>

        <div aria-live="polite" className="drum-announce sr-only">
          {announceLabels[activeIndex]}
        </div>

        <div className="drum-tabs">
          {tabs.map((tab, i) => (
            <button
              type="button"
              key={tab.id}
              className="drum-tab"
              aria-current={i === activeIndex ? "true" : undefined}
              onClick={() => navigate(i)}
            >
              <span className="drum-tab-text">
                {tab.number} · {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
