import { useEffect, useRef, useState } from "react";
import favicon from "../assets/logo/fav-icon.png";
import { RESPUESTAS, SUGERENCIAS_INICIALES } from "../data/faq";
import { CHARLAS } from "../data/talks";
import { CARGO_SERVICIO, ENTRADAS, FECHA_EVENTO, FIN_EARLY_BIRD } from "../data/entradas";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useFavoritos } from "../hooks/useFavoritos";
import { useEmpujeFooter } from "../hooks/useEmpujeFooter";
import { responder, responderPorId, textoRestante, tiempoRestante } from "../utils/chatbot";
import { EVENTOS, emitir } from "../utils/eventos";

const RETRASO = 700;
const ESPERA_AVISO = 6000;
const MAXIMO_REGISTRO = 50;
const BIENVENIDA = {
  id: "bienvenida",
  autor: "bot",
  texto: "¡Hola! Soy el asistente del workshop. Preguntame lo que quieras o pedime que te cargue entradas.",
  sugerencias: SUGERENCIAS_INICIALES,
};
const CHAT_INICIAL = [BIENVENIDA];
const SIN_REGISTRO = [];
const SIN_COMPRA = null;

const BOTON_ACCION =
  "cursor-pointer rounded-full border border-(--rc-chip-border) bg-(--rc-black) px-3 py-1.5 text-left text-sm font-extrabold text-(--rc-white) transition hover:border-(--rc-red) hover:bg-(--rc-red) hover:text-white";

export const Chatbot = () => {
  const [abierto, setAbierto] = useState(false);
  const [escribiendo, setEscribiendo] = useState(false);
  const [aviso, setAviso] = useState(false);
  const [texto, setTexto] = useState("");
  const [mensajes, setMensajes] = useLocalStorage("rc-chat", CHAT_INICIAL);
  const [visto, setVisto] = useLocalStorage("rc-chat-visto", false);
  const [, setSinRespuesta] = useLocalStorage("rc-chat-sin-respuesta", SIN_REGISTRO);
  const [compra] = useLocalStorage("rc-ultima-compra", SIN_COMPRA);
  const { favoritos, esFavorita, alternar } = useFavoritos();
  const empuje = useEmpujeFooter();
  const finRef = useRef(null);
  const inputRef = useRef(null);
  const temporizador = useRef(null);

  const restante = tiempoRestante(new Date(), FECHA_EVENTO);
  const ultimoBot = [...mensajes].reverse().find((mensaje) => mensaje.autor === "bot");
  const sugerencias = (ultimoBot?.sugerencias?.length ? ultimoBot.sugerencias : SUGERENCIAS_INICIALES)
    .map((id) => RESPUESTAS.find((respuesta) => respuesta.id === id))
    .filter(Boolean);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [mensajes, escribiendo, abierto]);

  useEffect(() => {
    if (!abierto) return;
    inputRef.current?.focus();
    const cerrarConEscape = (e) => {
      if (e.key === "Escape") setAbierto(false);
    };
    window.addEventListener("keydown", cerrarConEscape);
    return () => window.removeEventListener("keydown", cerrarConEscape);
  }, [abierto]);

  useEffect(() => {
    if (visto || abierto) return;
    const id = setTimeout(() => setAviso(true), ESPERA_AVISO);
    return () => clearTimeout(id);
  }, [visto, abierto]);

  useEffect(() => () => clearTimeout(temporizador.current), []);

  const contexto = () => ({
    respuestas: RESPUESTAS,
    charlas: CHARLAS,
    entradas: ENTRADAS,
    ahora: new Date(),
    finEarlyBird: FIN_EARLY_BIRD,
    cargo: CARGO_SERVICIO,
    favoritos,
    compra,
  });

  const abrir = () => {
    setAbierto(true);
    setAviso(false);
    setVisto(true);
  };

  const conversar = (pregunta, resolver) => {
    setMensajes((anteriores) => [...anteriores, { id: crypto.randomUUID(), autor: "usuario", texto: pregunta }]);
    setEscribiendo(true);
    temporizador.current = setTimeout(() => {
      const respuesta = resolver();
      setEscribiendo(false);
      setMensajes((anteriores) => [
        ...anteriores,
        {
          id: crypto.randomUUID(),
          autor: "bot",
          texto: respuesta.texto,
          acciones: respuesta.acciones ?? [],
          sugerencias: respuesta.sugerencias ?? [],
        },
      ]);
      if (respuesta.sinRespuesta) {
        setSinRespuesta((anteriores) => [{ texto: pregunta, fecha: new Date().toISOString() }, ...anteriores].slice(0, MAXIMO_REGISTRO));
      }
    }, RETRASO);
  };

  const preguntarPorId = (id) => {
    const respuesta = RESPUESTAS.find((r) => r.id === id);
    if (respuesta) conversar(respuesta.pregunta, () => responderPorId(id, contexto()));
  };

  const enviar = (e) => {
    e.preventDefault();
    const pregunta = texto.trim();
    if (!pregunta || escribiendo) return;
    setTexto("");
    conversar(pregunta, () => responder(pregunta, contexto()));
  };

  const irA = (id) => {
    setAbierto(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const ejecutar = (accion) => {
    if (accion.tipo === "seccion") irA(accion.id);
    if (accion.tipo === "favorito") alternar(accion.charla);
    if (accion.tipo === "responder") preguntarPorId(accion.respuesta);
    if (accion.tipo === "cargar") {
      setAbierto(false);
      emitir(EVENTOS.cargarEntradas, { id: accion.entrada, cantidad: accion.cantidad });
    }
    if (accion.tipo === "preguntar") {
      setAbierto(false);
      emitir(EVENTOS.preguntar, { charla: accion.charla });
    }
    if (accion.tipo === "ver-entradas") {
      setAbierto(false);
      emitir(EVENTOS.verEntradas);
    }
  };

  const etiqueta = (accion) => {
    if (accion.tipo !== "favorito") return `${accion.etiqueta} →`;
    const quien = accion.nombre ? ` a ${accion.nombre}` : "";
    return esFavorita(accion.charla) ? `Quitar${quien} de mi agenda` : `Sumar${quien} a mi agenda`;
  };

  return (
    <>
      <div
        id="chatbot"
        role="dialog"
        aria-label="Asistente del workshop"
        inert={!abierto}
        style={{ marginBottom: empuje, height: `min(560px, calc(100dvh - ${140 + empuje}px))` }}
        className={`fixed right-5 bottom-24 z-50 flex w-[min(calc(100vw-40px),390px)] origin-bottom-right flex-col overflow-hidden rounded-[28px] border border-(--rc-border) bg-(--rc-surface) text-(--rc-white) shadow-[0_22px_50px_var(--rc-sombra)] transition duration-300 ease-[cubic-bezier(0.22,0.8,0.3,1)] motion-reduce:transition-none md:right-8 md:bottom-28 ${
          abierto ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="siempre-oscuro flex items-center gap-3 bg-(image:--rc-gradient) px-5 py-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--rc-black)">
            <img src={favicon} alt="" className="h-7 w-7" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-extrabold">Asistente del workshop</p>
            <p className="text-sm text-(--rc-pink-soft)">
              {restante ? `Faltan ${textoRestante(restante)} para el workshop` : "Respondemos al instante"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setMensajes(CHAT_INICIAL)}
            disabled={mensajes.length <= 1}
            aria-label="Borrar conversación"
            title="Borrar conversación"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black/25 transition hover:bg-black/45 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
            </svg>
          </button>
        </div>

        <ul aria-live="polite" className="flex-1 space-y-3 overflow-y-auto p-4">
          {mensajes.map((mensaje) => (
            <li key={mensaje.id} className={`flex ${mensaje.autor === "usuario" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[88%] rounded-[18px] px-4 py-2.5 text-[15px] leading-snug ${
                  mensaje.autor === "usuario"
                    ? "rounded-br-md bg-(--rc-red) text-white"
                    : "rounded-bl-md bg-(--rc-surface-2) text-(--rc-text-soft)"
                }`}
              >
                <p className="whitespace-pre-line">{mensaje.texto}</p>
                {mensaje.acciones?.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {mensaje.acciones.map((accion, i) => (
                      <button key={`${accion.tipo}-${i}`} type="button" onClick={() => ejecutar(accion)} className={BOTON_ACCION}>
                        {accion.tipo === "favorito" && (
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="mr-1.5 inline h-4 w-4 align-[-3px] text-(--rc-estrella)"
                            fill={esFavorita(accion.charla) ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinejoin="round"
                          >
                            <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />
                          </svg>
                        )}
                        {etiqueta(accion)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
          {escribiendo && (
            <li className="flex justify-start">
              <span className="flex gap-1 rounded-[18px] rounded-bl-md bg-(--rc-surface-2) px-4 py-3.5" aria-label="Escribiendo">
                {[0, 150, 300].map((retraso) => (
                  <span
                    key={retraso}
                    style={{ animationDelay: `${retraso}ms` }}
                    className="h-2 w-2 animate-bounce rounded-full bg-(--rc-text-mute)"
                  />
                ))}
              </span>
            </li>
          )}
          <li ref={finRef} aria-hidden="true" />
        </ul>

        <div className="border-t border-(--rc-border) p-3">
          <div className="mb-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {sugerencias.map((respuesta) => (
              <button
                key={respuesta.id}
                type="button"
                disabled={escribiendo}
                onClick={() => preguntarPorId(respuesta.id)}
                className="shrink-0 cursor-pointer rounded-full border border-(--rc-chip-border) px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap transition hover:border-(--rc-red) hover:bg-(--rc-red) hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {respuesta.pregunta}
              </button>
            ))}
          </div>

          <form onSubmit={enviar} className="flex gap-2">
            <label htmlFor="chatbot-pregunta" className="sr-only">
              Escribí tu pregunta
            </label>
            <input
              id="chatbot-pregunta"
              ref={inputRef}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Ej: quiero 2 entradas virtuales"
              autoComplete="off"
              className="h-11 min-w-0 flex-1 rounded-full border border-(--rc-chip-border) bg-(--rc-black) px-4 text-[15px] outline-none placeholder:text-(--rc-text-mute) focus:border-(--rc-red)"
            />
            <button
              type="submit"
              aria-label="Enviar pregunta"
              disabled={!texto.trim() || escribiendo}
              className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-(--rc-red) text-white transition hover:bg-(--rc-red-hover) disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {aviso && !abierto && (
        <div
          role="status"
          style={{ marginBottom: empuje }}
          className="fixed right-[84px] bottom-6 z-50 flex max-w-[min(calc(100vw-110px),260px)] items-start gap-2 rounded-[18px] rounded-br-md border border-(--rc-border) bg-(--rc-surface-2) py-3 pr-2 pl-4 text-(--rc-white) shadow-[0_12px_30px_var(--rc-sombra)] md:right-[104px] md:bottom-9"
        >
          <button type="button" onClick={abrir} className="cursor-pointer text-left text-sm font-semibold">
            ¿Tenés dudas sobre el workshop? Preguntame 👋
          </button>
          <button
            type="button"
            aria-label="Cerrar aviso"
            onClick={() => {
              setAviso(false);
              setVisto(true);
            }}
            className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-(--rc-text-mute) hover:bg-black/30 hover:text-(--rc-white)"
          >
            ×
          </button>
        </div>
      )}

      <button
        type="button"
        aria-label={abierto ? "Cerrar asistente" : "Abrir asistente con preguntas frecuentes"}
        aria-expanded={abierto}
        aria-controls="chatbot"
        onClick={() => (abierto ? setAbierto(false) : abrir())}
        style={{ marginBottom: empuje }}
        className="fixed right-5 bottom-5 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-(--rc-red) text-white shadow-[0_12px_30px_rgba(224,32,42,0.45)] transition duration-300 hover:-translate-y-0.5 hover:bg-(--rc-red-hover) motion-reduce:transition-none md:right-8 md:bottom-8"
      >
        {abierto ? (
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
            <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
            <path
              d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A1.5 1.5 0 0 1 4 14.5z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path d="M8.5 9.5h7M8.5 12.5h4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </>
  );
};