import { useEffect, useState } from "react";
import { useEnPantalla } from "../hooks/useEnPantalla";

const estadisticas = [
  { valor: "120", etiqueta: "lugares presenciales" },
  { valor: "10", etiqueta: "charlas de speakers" },
  { valor: "3 h 40", etiqueta: "de 18.00 a 21.40 hs" },
  { valor: "2", etiqueta: "modalidades: presencial y virtual" },
];

const DURACION = 1400;

function Contador({ valor, activo }) {
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    if (!activo) return;
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const inicio = performance.now();
    let id;

    const avanzar = (ahora) => {
      const t = reducido ? 1 : Math.min(1, (ahora - inicio) / DURACION);
      setProgreso(1 - Math.pow(1 - t, 3));
      if (t < 1) id = requestAnimationFrame(avanzar);
    };

    id = requestAnimationFrame(avanzar);
    return () => cancelAnimationFrame(id);
  }, [activo]);

  return valor.replace(/\d+/g, (numero) => Math.round(Number(numero) * progreso));
}

export default function Estadisticas() {
  const [ref, visible] = useEnPantalla(0.4);

  return (
    <section className="mx-auto mt-8 max-w-[1248px] px-6">
      <ul
        ref={ref}
        className="grid grid-cols-2 gap-6 rounded-[28px] border border-(--rc-border) bg-(--rc-surface) p-6 md:grid-cols-4 md:p-8"
      >
        {estadisticas.map(({ valor, etiqueta }) => (
          <li key={etiqueta}>
            <span
              aria-hidden="true"
              className="block text-[clamp(32px,3.5vw,42px)] font-extrabold leading-none tabular-nums text-(--rc-red)"
            >
              <Contador valor={valor} activo={visible} />
            </span>
            <span className="sr-only">{valor}</span>
            <span className="mt-2 block text-base leading-snug text-(--rc-text-soft)">
              {etiqueta}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}