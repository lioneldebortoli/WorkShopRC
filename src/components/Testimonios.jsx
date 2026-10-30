import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { TESTIMONIOS, iniciales } from "../data/testimonials";

const INTERVALO = 5000;
const DESLIZAMIENTO_MINIMO = 50;

const consultar = (consulta) => window.matchMedia(consulta).matches;
const calcularPorVista = () => (consultar("(min-width: 1024px)") ? 3 : consultar("(min-width: 768px)") ? 2 : 1);

function usePantalla() {
  const [porVista, setPorVista] = useState(calcularPorVista);
  const [reducido, setReducido] = useState(() => consultar("(prefers-reduced-motion: reduce)"));

  useEffect(() => {
    const actualizar = () => {
      setPorVista(calcularPorVista());
      setReducido(consultar("(prefers-reduced-motion: reduce)"));
    };
    window.addEventListener("resize", actualizar);
    const movimiento = window.matchMedia("(prefers-reduced-motion: reduce)");
    movimiento.addEventListener("change", actualizar);
    return () => {
      window.removeEventListener("resize", actualizar);
      movimiento.removeEventListener("change", actualizar);
    };
  }, []);

  return { porVista, reducido };
}

const FLECHA =
  "flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-(--rc-chip-border) bg-(--rc-surface-2) text-xl transition hover:border-(--rc-red) hover:bg-(--rc-red) hover:text-white";

export const Testimonios = () => {
  const { porVista, reducido } = usePantalla();
  const [indice, setIndice] = useState(0);
  const [pausado, setPausado] = useState(false);
  const inicioToque = useRef(null);

  const ultimo = Math.max(TESTIMONIOS.length - porVista, 0);
  const actual = Math.min(indice, ultimo);

  const anterior = () => setIndice(actual === 0 ? ultimo : actual - 1);
  const siguiente = () => setIndice(actual === ultimo ? 0 : actual + 1);

  useEffect(() => {
    if (pausado || reducido) return;
    const id = setInterval(() => setIndice((i) => (Math.min(i, ultimo) >= ultimo ? 0 : Math.min(i, ultimo) + 1)), INTERVALO);
    return () => clearInterval(id);
  }, [pausado, reducido, ultimo]);

  const empezarToque = (e) => {
    inicioToque.current = e.clientX;
  };

  const terminarToque = (e) => {
    if (inicioToque.current === null) return;
    const distancia = e.clientX - inicioToque.current;
    inicioToque.current = null;
    if (Math.abs(distancia) < DESLIZAMIENTO_MINIMO) return;
    if (distancia < 0) siguiente();
    else anterior();
  };

  return (
    <section id="testimonios" className="mx-auto mt-24 max-w-[1248px] px-6 text-(--rc-white)">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-base font-extrabold uppercase tracking-[3px] text-(--rc-red)">Testimonios</p>
          <h2 className="mt-3 text-[clamp(34px,4.5vw,56px)] font-extrabold leading-[1.05] tracking-[-1px]">
            Lo que cuentan quienes ya vinieron
          </h2>
        </div>
        <div className="flex gap-3">
          <button type="button" aria-label="Testimonio anterior" onClick={anterior} className={FLECHA}>
            ←
          </button>
          <button type="button" aria-label="Testimonio siguiente" onClick={siguiente} className={FLECHA}>
            →
          </button>
        </div>
      </Reveal>

      <div
        aria-roledescription="carrusel"
        aria-label="Testimonios de asistentes"
        className="mt-10 overflow-hidden"
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
        onFocus={() => setPausado(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setPausado(false);
        }}
        onPointerDown={empezarToque}
        onPointerUp={terminarToque}
        onPointerCancel={() => {
          inicioToque.current = null;
        }}
      >
        <ul
          aria-live={pausado ? "polite" : "off"}
          className={`-mx-3 flex touch-pan-y ${reducido ? "" : "transition-transform duration-500 ease-[cubic-bezier(0.22,0.8,0.3,1)]"}`}
          style={{ transform: `translateX(-${(actual * 100) / porVista}%)` }}
        >
          {TESTIMONIOS.map((testimonio, i) => {
            const visible = i >= actual && i < actual + porVista;
            return (
              <li
                key={testimonio.id}
                role="group"
                aria-roledescription="testimonio"
                aria-label={`${i + 1} de ${TESTIMONIOS.length}`}
                aria-hidden={!visible}
                className="shrink-0 px-3"
                style={{ width: `${100 / porVista}%` }}
              >
                <figure className="flex h-full flex-col rounded-[28px] border border-(--rc-border) bg-(--rc-surface) p-6 md:p-7">
                  <span aria-hidden="true" className="text-5xl leading-none font-extrabold text-(--rc-red)">
                    “
                  </span>
                  <blockquote className="mt-2 grow text-lg leading-[1.55] text-(--rc-text-soft)">{testimonio.texto}</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-(--rc-border) pt-5">
                    <span
                      aria-hidden="true"
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-(image:--rc-gradient) font-extrabold text-white"
                    >
                      {iniciales(testimonio.nombre)}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-extrabold">{testimonio.nombre}</span>
                      <span className="block text-sm text-(--rc-text-mute)">{testimonio.rol}</span>
                      <span className="mt-1 inline-block rounded-full border border-(--rc-chip-border) px-2.5 py-0.5 text-xs font-semibold text-(--rc-text-soft)">
                        {testimonio.edicion}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: ultimo + 1 }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir a la posición ${i + 1} de ${ultimo + 1}`}
            aria-current={i === actual ? "true" : undefined}
            onClick={() => setIndice(i)}
            className="flex h-11 w-7 cursor-pointer items-center justify-center"
          >
            <span className={`block h-2.5 rounded-full transition-all ${i === actual ? "w-6 bg-(--rc-red)" : "w-2.5 bg-(--rc-chip-border)"}`} />
          </button>
        ))}
      </div>
    </section>
  );
};
