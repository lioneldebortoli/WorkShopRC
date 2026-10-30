import { useCallback, useId, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { Toast } from "./Toast";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEvento } from "../hooks/useEvento";
import { EVENTOS } from "../utils/eventos";
import { CHARLAS, nombreSpeaker, porHorario } from "../data/talks";

const MAXIMO = 300;
const MINIMO = 10;
const SIN_PREGUNTAS = [];
const SIN_VOTOS = [];
const CHARLAS_ORDENADAS = [...CHARLAS].sort(porHorario);
const VACIO = { nombre: "", charla: "", texto: "" };

const ESTILO_CAMPO =
  "w-full rounded-[14px] border bg-(--rc-black) px-4 text-(--rc-white) outline-none transition placeholder:text-(--rc-placeholder) focus:border-(--rc-red)";

const formatearFecha = (iso) =>
  new Date(iso).toLocaleString("es-AR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

const buscarCharla = (id) => CHARLAS.find((charla) => charla.id === id);

export const PreguntasSpeakers = () => {
  const id = useId();
  const [datos, setDatos] = useState(VACIO);
  const preguntaRef = useRef(null);
  const [errores, setErrores] = useState({});
  const [filtro, setFiltro] = useState("todas");
  const [orden, setOrden] = useState("nuevas");
  const [toast, setToast] = useState("");
  const [preguntas, setPreguntas] = useLocalStorage("rc-preguntas", SIN_PREGUNTAS);
  const [misVotos, setMisVotos] = useLocalStorage("rc-mis-votos", SIN_VOTOS);
  const cerrarToast = useCallback(() => setToast(""), []);

  useEvento(EVENTOS.preguntar, ({ charla }) => {
    setDatos((actuales) => ({ ...actuales, charla }));
    setErrores((actuales) => ({ ...actuales, charla: "" }));
    document.getElementById("preguntas").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => preguntaRef.current?.focus({ preventScroll: true }), 600);
  });

  const cambiar = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
    setErrores({ ...errores, [name]: "" });
  };

  const enviar = (e) => {
    e.preventDefault();
    const nuevos = {};
    const texto = datos.texto.trim();

    if (!datos.charla) nuevos.charla = "Elegí la charla a la que va la pregunta.";
    if (!texto) nuevos.texto = "Escribí tu pregunta.";
    else if (texto.length < MINIMO) nuevos.texto = `La pregunta tiene que tener al menos ${MINIMO} caracteres.`;
    else if (texto.length > MAXIMO) nuevos.texto = `La pregunta puede tener hasta ${MAXIMO} caracteres.`;

    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    setPreguntas((anteriores) => [
      {
        id: crypto.randomUUID(),
        nombre: datos.nombre.trim() || "Anónimo",
        charla: datos.charla,
        texto,
        fecha: new Date().toISOString(),
        votos: 0,
      },
      ...anteriores,
    ]);
    setDatos(VACIO);
    setToast(`¡Listo! Tu pregunta para ${nombreSpeaker(buscarCharla(datos.charla))} quedó enviada.`);
  };

  const votar = (idPregunta) => {
    const yaVoto = misVotos.includes(idPregunta);
    setPreguntas((anteriores) =>
      anteriores.map((p) => (p.id === idPregunta ? { ...p, votos: Math.max(0, p.votos + (yaVoto ? -1 : 1)) } : p))
    );
    setMisVotos((anteriores) => (yaVoto ? anteriores.filter((v) => v !== idPregunta) : [...anteriores, idPregunta]));
  };

  const lista = preguntas
    .filter((p) => filtro === "todas" || p.charla === filtro)
    .sort((a, b) => (orden === "votadas" ? b.votos - a.votos || b.fecha.localeCompare(a.fecha) : b.fecha.localeCompare(a.fecha)));

  const borde = (campo) => (errores[campo] ? "border-(--rc-error)" : "border-(--rc-chip-border)");

  return (
    <section id="preguntas" className="mx-auto mt-24 max-w-[1248px] px-6 text-(--rc-white)">
      <Reveal>
        <p className="text-base font-extrabold uppercase tracking-[3px] text-(--rc-red)">Preguntas</p>
        <h2 className="mt-3 text-[clamp(34px,4.5vw,56px)] font-extrabold leading-[1.05] tracking-[-1px]">
          Preguntale a los speakers
        </h2>
        <p className="mt-4 max-w-[640px] text-lg text-(--rc-text-soft)">
          Dejá tu pregunta antes del workshop. Las más votadas se responden en vivo.
        </p>
      </Reveal>

      <div className="mt-10 grid items-start gap-6 lg:grid-cols-[5fr_7fr]">
        <Reveal retraso={100} className="rounded-[28px] border border-(--rc-border) bg-(--rc-surface) p-6 md:p-8">
          <form onSubmit={enviar} noValidate className="space-y-5">
            <div>
              <label htmlFor={`${id}-nombre`} className="mb-2 block text-xs font-extrabold tracking-[1.5px] uppercase">
                Tu nombre <span className="font-semibold tracking-normal normal-case text-(--rc-text-mute)">(opcional)</span>
              </label>
              <input
                id={`${id}-nombre`}
                name="nombre"
                value={datos.nombre}
                onChange={cambiar}
                maxLength={40}
                autoComplete="given-name"
                placeholder="Si lo dejás vacío, aparece como Anónimo"
                className={`${ESTILO_CAMPO} h-12 border-(--rc-chip-border)`}
              />
            </div>

            <div>
              <label htmlFor={`${id}-charla`} className="mb-2 block text-xs font-extrabold tracking-[1.5px] uppercase">
                Charla <span className="text-(--rc-red)" aria-hidden="true">*</span>
              </label>
              <select
                id={`${id}-charla`}
                name="charla"
                value={datos.charla}
                onChange={cambiar}
                aria-invalid={errores.charla ? "true" : undefined}
                aria-describedby={errores.charla ? `${id}-charla-error` : undefined}
                className={`${ESTILO_CAMPO} h-12 cursor-pointer ${borde("charla")} ${datos.charla ? "" : "text-(--rc-placeholder)"}`}
              >
                <option value="" disabled>
                  Elegí una charla
                </option>
                {CHARLAS_ORDENADAS.map((charla) => (
                  <option key={charla.id} value={charla.id} className="text-(--rc-white)">
                    {charla.hora} · {charla.titulo} ({nombreSpeaker(charla)})
                  </option>
                ))}
              </select>
              {errores.charla && (
                <p id={`${id}-charla-error`} className="mt-1.5 text-sm font-semibold text-(--rc-error)">
                  {errores.charla}
                </p>
              )}
            </div>

            <div>
              <label htmlFor={`${id}-texto`} className="mb-2 block text-xs font-extrabold tracking-[1.5px] uppercase">
                Tu pregunta <span className="text-(--rc-red)" aria-hidden="true">*</span>
              </label>
              <textarea
                ref={preguntaRef}
                id={`${id}-texto`}
                name="texto"
                rows={4}
                value={datos.texto}
                onChange={cambiar}
                placeholder="¿Qué te gustaría preguntarle?"
                aria-invalid={errores.texto ? "true" : undefined}
                aria-describedby={`${id}-texto-contador${errores.texto ? ` ${id}-texto-error` : ""}`}
                className={`${ESTILO_CAMPO} resize-y py-3 ${borde("texto")}`}
              />
              <div className="flex justify-between gap-4">
                {errores.texto && (
                  <p id={`${id}-texto-error`} className="mt-1.5 text-sm font-semibold text-(--rc-error)">
                    {errores.texto}
                  </p>
                )}
                <p
                  id={`${id}-texto-contador`}
                  className={`mt-1.5 ml-auto text-sm tabular-nums ${datos.texto.length > MAXIMO ? "text-(--rc-error)" : "text-(--rc-text-mute)"}`}
                >
                  {datos.texto.length}/{MAXIMO}
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="text-white flex min-h-[56px] w-full cursor-pointer items-center justify-center rounded-full bg-(--rc-red) px-4 text-lg font-extrabold transition duration-300 hover:-translate-y-0.5 hover:bg-(--rc-red-hover) hover:shadow-[0_12px_30px_rgba(224,32,42,0.45)] motion-reduce:transition-none"
            >
              Enviar pregunta
            </button>
          </form>
        </Reveal>

        <div>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <p className="font-extrabold">
              {lista.length === 1 ? "1 pregunta" : `${lista.length} preguntas`}
            </p>
            <div className="flex flex-wrap gap-3">
              <label className="text-sm">
                <span className="sr-only">Filtrar por speaker</span>
                <select
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                  className="h-11 cursor-pointer rounded-full border border-(--rc-chip-border) bg-(--rc-surface) px-4 outline-none focus:border-(--rc-red)"
                >
                  <option value="todas">Todos los speakers</option>
                  {CHARLAS_ORDENADAS.map((charla) => (
                    <option key={charla.id} value={charla.id}>
                      {nombreSpeaker(charla)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm">
                <span className="sr-only">Ordenar preguntas</span>
                <select
                  value={orden}
                  onChange={(e) => setOrden(e.target.value)}
                  className="h-11 cursor-pointer rounded-full border border-(--rc-chip-border) bg-(--rc-surface) px-4 outline-none focus:border-(--rc-red)"
                >
                  <option value="nuevas">Más nuevas</option>
                  <option value="votadas">Más votadas</option>
                </select>
              </label>
            </div>
          </div>

          {lista.length === 0 ? (
            <div className="mt-4 rounded-[28px] border border-dashed border-(--rc-chip-border) px-6 py-12 text-center">
              <p className="text-xl font-extrabold">Todavía no hay preguntas</p>
              <p className="mt-2 text-(--rc-text-soft)">
                {filtro === "todas" ? "¡Hacé la primera!" : "Nadie le preguntó a este speaker todavía."}
              </p>
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {lista.map((pregunta) => {
                const charla = buscarCharla(pregunta.charla);
                const votada = misVotos.includes(pregunta.id);
                return (
                  <li key={pregunta.id} className="rounded-[22px] border border-(--rc-border) bg-(--rc-surface) p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-sm text-(--rc-text-mute)">
                          <span className="font-extrabold text-(--rc-white)">{pregunta.nombre}</span> ·{" "}
                          {formatearFecha(pregunta.fecha)}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-(--rc-red)">
                          Para {charla ? `${nombreSpeaker(charla)} · ${charla.titulo}` : "una charla"}
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-pressed={votada}
                        aria-label={`${votada ? "Quitar me gusta" : "Me gusta"} (${pregunta.votos})`}
                        onClick={() => votar(pregunta.id)}
                        className={`flex min-h-11 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-3.5 font-extrabold transition ${
                          votada
                            ? "border-(--rc-red) bg-(--rc-red)/15 text-(--rc-white)"
                            : "border-(--rc-chip-border) text-(--rc-text-soft) hover:border-(--rc-red)"
                        }`}
                      >
                        <span aria-hidden="true" className={votada ? "text-(--rc-red)" : ""}>
                          {votada ? "♥" : "♡"}
                        </span>
                        <span className="tabular-nums">{pregunta.votos}</span>
                      </button>
                    </div>
                    <p className="mt-3 leading-[1.55] break-words text-(--rc-text-soft)">{pregunta.texto}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <Toast mensaje={toast} onCerrar={cerrarToast} />
    </section>
  );
};
