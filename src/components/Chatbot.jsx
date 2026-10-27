import { useEffect, useRef, useState } from "react";
import favicon from "../assets/logo/fav-icon.png";

const RESPUESTAS = [
  {
    id: "fecha",
    pregunta: "¿Cuándo es?",
    claves: ["cuando", "fecha", "dia", "hora", "horario", "jueves"],
    texto: "El workshop es el jueves 19/11, de 18.00 a 21.40 hs. Arranca con la acreditación y cierra con preguntas y networking.",
  },
  {
    id: "precios",
    pregunta: "¿Cuánto sale?",
    claves: ["precio", "cuesta", "cuanto", "sale", "valor", "costo", "early", "general", "pagar"],
    texto: "Early Bird: $25.000 (presencial, hasta el 31/10). General: $35.000 (presencial, desde el 1/11). Virtual: $15.000. Se suma un 5% de cargo por servicio.",
  },
  {
    id: "modalidad",
    pregunta: "¿Es presencial o virtual?",
    claves: ["modalidad", "presencial", "virtual", "online", "remoto", "vivo", "grabacion"],
    texto: "Las dos. Presencial en Rolling Code School (120 lugares), o virtual con transmisión en vivo, chat para preguntar y la grabación disponible por 30 días.",
  },
  {
    id: "speakers",
    pregunta: "¿Quiénes dan las charlas?",
    claves: ["speaker", "charla", "orador", "quien", "quienes", "profe"],
    texto: "Son 10 speakers de Rolling Code School: Tomas Escudero, Franco Diaz, Gaston, Mauro, Jose Diaz, Tomas Gomez, Pablo Basso, Julian Martin, Daniela Cardozo y Andres Perlo.",
    seccion: { id: "speakers", texto: "Ver speakers" },
  },
  {
    id: "ubicacion",
    pregunta: "¿Dónde es?",
    claves: ["donde", "ubicacion", "direccion", "lugar", "llegar", "mapa", "paz"],
    texto: "En Rolling Code School: Gral. Paz 576, Entrepiso, San Miguel de Tucumán.",
    seccion: { id: "como-llegar", texto: "Ver mapa" },
  },
  {
    id: "certificado",
    pregunta: "¿Dan certificado?",
    claves: ["certificado", "constancia", "diploma"],
    texto: "Sí, todas las entradas incluyen certificado de asistencia, también la virtual.",
  },
  {
    id: "sponsor",
    pregunta: "¿Cómo ser sponsor?",
    claves: ["sponsor", "patrocin", "auspici", "empresa", "marca"],
    texto: "¡Buenísimo! Completá el formulario \"Sumate como Sponsor\" con los datos de tu empresa y te contactamos en menos de 24 horas hábiles.",
    seccion: { id: "sumate-sponsor", texto: "Ir al formulario" },
  },
  {
    id: "comprar",
    pregunta: "Quiero comprar",
    claves: ["comprar", "compra", "entrada", "ticket", "tarjeta", "inscrib"],
    texto: "¡Genial! Elegí tu entrada y completá el pago en la sección de compra. Aceptamos Visa y Mastercard.",
    seccion: { id: "entradas", texto: "Ir a entradas" },
  },
];

const BIENVENIDA = {
  id: 0,
  autor: "bot",
  texto: "¡Hola! Soy el asistente del workshop. ¿Qué querés saber?",
};

const NO_ENTIENDO =
  "No tengo esa respuesta todavía. Probá con alguna de las preguntas de abajo o escribí sobre fecha, precios, modalidad, speakers o ubicación.";

const normalizar = (texto) =>
  texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const buscarRespuesta = (mensaje) => {
  const palabras = normalizar(mensaje).split(/[^a-z0-9]+/);
  let mejor = null;
  let puntos = 0;
  RESPUESTAS.forEach((respuesta) => {
    const coincidencias = respuesta.claves.filter((clave) =>
      palabras.some((palabra) => palabra.startsWith(clave))
    ).length;
    if (coincidencias > puntos) {
      mejor = respuesta;
      puntos = coincidencias;
    }
  });
  return mejor;
};

export const Chatbot = () => {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState([BIENVENIDA]);
  const [escribiendo, setEscribiendo] = useState(false);
  const [texto, setTexto] = useState("");
  const finRef = useRef(null);
  const inputRef = useRef(null);
  const siguienteId = useRef(1);
  const temporizador = useRef(null);

  useEffect(() => () => clearTimeout(temporizador.current), []);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [mensajes, escribiendo]);

  useEffect(() => {
    if (!abierto) return;
    inputRef.current?.focus();
    const cerrarConEscape = (e) => {
      if (e.key === "Escape") setAbierto(false);
    };
    window.addEventListener("keydown", cerrarConEscape);
    return () => window.removeEventListener("keydown", cerrarConEscape);
  }, [abierto]);

const preguntar = (pregunta, respuesta) => {
    const idPregunta = siguienteId.current++;
    setMensajes((anteriores) => [...anteriores, { id: idPregunta, autor: "usuario", texto: pregunta }]);
    setEscribiendo(true);
    temporizador.current = setTimeout(() => {
      const idRespuesta = siguienteId.current++;
      setEscribiendo(false);
      setMensajes((anteriores) => [
        ...anteriores,
        respuesta
          ? { id: idRespuesta, autor: "bot", texto: respuesta.texto, seccion: respuesta.seccion }
          : { id: idRespuesta, autor: "bot", texto: NO_ENTIENDO },
      ]);
    }, 700);
  };

  const enviar = (e) => {
    e.preventDefault();
    const pregunta = texto.trim();
    if (!pregunta || escribiendo) return;
    setTexto("");
    preguntar(pregunta, buscarRespuesta(pregunta));
  };

  const irA = (id) => {
    setAbierto(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div
        id="chatbot"
        role="dialog"
        aria-label="Asistente del workshop"
        inert={!abierto}
        className={`fixed right-5 bottom-24 z-50 flex h-[min(520px,calc(100dvh-140px))] w-[min(calc(100vw-40px),380px)] origin-bottom-right flex-col overflow-hidden rounded-[28px] border border-(--rc-border) bg-(--rc-surface) text-(--rc-white) shadow-[0_22px_50px_rgba(0,0,0,0.6)] transition duration-300 ease-[cubic-bezier(0.22,0.8,0.3,1)] motion-reduce:transition-none md:right-8 md:bottom-28 ${
          abierto ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 bg-(image:--rc-gradient) px-5 py-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--rc-black)">
            <img src={favicon} alt="" className="h-7 w-7" />
          </span>
          <div>
            <p className="font-extrabold">Asistente del workshop</p>
            <p className="text-sm text-(--rc-pink-soft)">Respondemos al instante</p>
          </div>
        </div>

        <ul aria-live="polite" className="flex-1 space-y-3 overflow-y-auto p-4">
          {mensajes.map((mensaje) => (
            <li key={mensaje.id} className={`flex ${mensaje.autor === "usuario" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-[18px] px-4 py-2.5 text-[15px] leading-snug ${
                  mensaje.autor === "usuario"
                    ? "rounded-br-md bg-(--rc-red)"
                    : "rounded-bl-md bg-(--rc-surface-2) text-(--rc-text-soft)"
                }`}
              >
                <p>{mensaje.texto}</p>
                {mensaje.seccion && (
                  <button
                    type="button"
                    onClick={() => irA(mensaje.seccion.id)}
                    className="mt-2 cursor-pointer font-extrabold text-(--rc-white) underline underline-offset-4 hover:text-[#ff2d3a]"
                  >
                    {mensaje.seccion.texto} →
                  </button>
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
            {RESPUESTAS.map((respuesta) => (
              <button
                key={respuesta.id}
                type="button"
                disabled={escribiendo}
                onClick={() => preguntar(respuesta.pregunta, respuesta)}
                className="shrink-0 cursor-pointer rounded-full border border-(--rc-chip-border) px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap transition hover:border-(--rc-red) hover:bg-(--rc-red) disabled:cursor-not-allowed disabled:opacity-50"
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
              placeholder="Escribí tu pregunta..."
              autoComplete="off"
              className="h-11 min-w-0 flex-1 rounded-full border border-(--rc-chip-border) bg-(--rc-black) px-4 text-[15px] outline-none placeholder:text-(--rc-text-mute) focus:border-(--rc-red)"
            />
            <button
              type="submit"
              aria-label="Enviar pregunta"
              disabled={!texto.trim() || escribiendo}
              className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-(--rc-red) transition hover:bg-[#ff2d3a] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      <button
        type="button"
        aria-label={abierto ? "Cerrar asistente" : "Abrir asistente con preguntas frecuentes"}
        aria-expanded={abierto}
        aria-controls="chatbot"
        onClick={() => setAbierto((valor) => !valor)}
        className="fixed right-5 bottom-5 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-(--rc-red) text-(--rc-white) shadow-[0_12px_30px_rgba(224,32,42,0.45)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ff2d3a] motion-reduce:transition-none md:right-8 md:bottom-8"
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