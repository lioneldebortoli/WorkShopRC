import { CARGO_SERVICIO, ENTRADAS, FECHA_EVENTO, FIN_EARLY_BIRD } from "./entradas";
import { CHARLAS, nombreSpeaker, porHorario } from "./talks";
import { formatearPrecio } from "../utils/formato";
import { textoRestante, tiempoRestante } from "../utils/chatbot";

const seccion = (id, etiqueta) => ({ tipo: "seccion", id, etiqueta });

export const SUGERENCIAS_INICIALES = ["fecha", "precios", "modalidad", "speakers", "ubicacion", "comprar"];

export const RESPUESTAS = [
  {
    id: "fecha",
    pregunta: "¿Cuándo es?",
    claves: ["cuando", "fecha", "dia", "hora", "horario", "jueves", "empieza", "termina", "falta"],
    responder: ({ ahora }) => {
      const restante = tiempoRestante(ahora, FECHA_EVENTO);
      const cuenta = restante ? ` Faltan ${textoRestante(restante)}.` : " ¡Ya pasó! Gracias a todos los que vinieron.";
      return {
        texto: `El workshop es el jueves 19/11, de 18.00 a 21.40 hs. Arranca con la acreditación y cierra con preguntas y networking.${cuenta}`,
        acciones: [seccion("agenda", "Ver agenda")],
      };
    },
    sugerencias: ["agenda", "ubicacion", "comprar"],
  },
  {
    id: "precios",
    pregunta: "¿Cuánto sale?",
    claves: ["precio", "cuesta", "cuanto", "sale", "valor", "costo", "tarifa", "vale"],
    responder: ({ ahora }) => {
      const lineas = ENTRADAS.map((e) => `• ${e.nombre}: ${formatearPrecio(e.precio)} · quedan ${e.stock}`).join("\n");
      const early = tiempoRestante(ahora, FIN_EARLY_BIRD);
      const aviso = early ? `\nEl Early Bird termina en ${textoRestante(early)}.` : "\nEl Early Bird ya terminó.";
      return {
        texto: `${lineas}\nSe suma un ${CARGO_SERVICIO * 100}% de cargo por servicio.${aviso}`,
        acciones: [seccion("entradas", "Ver entradas")],
      };
    },
    sugerencias: ["descuentos", "comprar", "modalidad"],
  },
  {
    id: "modalidad",
    pregunta: "¿Es presencial o virtual?",
    claves: ["modalidad", "presencial", "virtual", "online", "remoto", "streaming", "distancia"],
    responder: () => ({
      texto:
        "Las dos. Presencial en Rolling Code School (120 lugares) o virtual, con transmisión en vivo, chat para preguntar y la grabación disponible por 30 días.",
      acciones: [seccion("entradas", "Ver entradas")],
    }),
    sugerencias: ["precios", "grabacion", "comprar"],
  },
  {
    id: "speakers",
    pregunta: "¿Quiénes dan las charlas?",
    claves: ["speaker", "orador", "quien", "quienes", "profe", "disertante", "expositor"],
    responder: () => ({
      texto: `Son ${CHARLAS.length} speakers de Rolling Code School: ${CHARLAS.map(nombreSpeaker).join(", ")}. Preguntame por cualquiera, por ejemplo "¿a qué hora habla Mauro?".`,
      acciones: [seccion("speakers", "Ver speakers")],
    }),
    sugerencias: ["agenda", "mi-agenda", "preguntas"],
  },
  {
    id: "agenda",
    pregunta: "¿Qué charlas hay?",
    claves: ["agenda", "cronograma", "programa", "charla", "temas", "itinerario"],
    responder: () => ({
      texto: [...CHARLAS].sort(porHorario).map((c) => `• ${c.hora} · ${c.titulo}`).join("\n"),
      acciones: [seccion("agenda", "Ver agenda completa")],
    }),
    sugerencias: ["mi-agenda", "speakers", "preguntas"],
  },
  {
    id: "mi-agenda",
    pregunta: "Mi agenda",
    claves: ["mi agenda", "mis charlas", "favorita", "marcada", "guardada", "estrella"],
    responder: ({ favoritos }) => {
      const mias = CHARLAS.filter((c) => favoritos.includes(c.id)).sort(porHorario);
      return mias.length
        ? {
            texto: `Marcaste ${mias.length === 1 ? "1 charla" : `${mias.length} charlas`}:\n${mias.map((c) => `• ${c.hora} · ${c.titulo} (${nombreSpeaker(c)})`).join("\n")}`,
            acciones: [seccion("agenda", "Ver mi agenda")],
          }
        : {
            texto: "Todavía no marcaste charlas. Tocá la estrella en una charla o un speaker y la sumo a tu agenda.",
            acciones: [seccion("speakers", "Ver speakers")],
          };
    },
    sugerencias: ["agenda", "speakers"],
  },
  {
    id: "ubicacion",
    pregunta: "¿Dónde es?",
    claves: ["donde", "ubicacion", "direccion", "lugar", "llegar", "mapa", "paz", "tucuman"],
    responder: () => ({
      texto: "En Rolling Code School: Gral. Paz 576, Entrepiso, San Miguel de Tucumán.",
      acciones: [seccion("como-llegar", "Ver mapa")],
    }),
    sugerencias: ["fecha", "modalidad"],
  },
  {
    id: "certificado",
    pregunta: "¿Dan certificado?",
    claves: ["certificado", "constancia", "diploma", "certifica"],
    responder: () => ({ texto: "Sí, todas las entradas incluyen certificado de asistencia, también la virtual." }),
    sugerencias: ["grabacion", "precios"],
  },
  {
    id: "grabacion",
    pregunta: "¿Queda grabado?",
    claves: ["grabacion", "grabado", "grabada", "graban", "despues", "repetir"],
    responder: () => ({
      texto: "Sí. Todas las entradas incluyen la grabación de las charlas. Con la virtual queda disponible 30 días.",
    }),
    sugerencias: ["modalidad", "precios"],
  },
  {
    id: "descuentos",
    pregunta: "¿Hay descuentos?",
    claves: ["descuento", "cupon", "promo", "promocion", "oferta", "beca", "estudiante", "rebaja"],
    responder: () => ({
      texto:
        "Sí. Si tenés un cupón, cargalo en «Tu pedido» al comprar. Por ejemplo, ROLLING10 te da 10% de descuento y ESTUDIANTE un 20%.",
      acciones: [seccion("comprar", "Ir a la compra")],
    }),
    sugerencias: ["precios", "comprar"],
  },
  {
    id: "pago",
    pregunta: "¿Cómo pago?",
    claves: ["tarjeta", "visa", "mastercard", "pago", "efectivo", "transferencia", "cuotas", "debito", "credito"],
    responder: () => ({
      texto: "Aceptamos Visa y Mastercard. El pago es de ejemplo: no se cobra nada ni se guardan los datos de la tarjeta.",
      acciones: [seccion("comprar", "Ir a la compra")],
    }),
    sugerencias: ["descuentos", "comprar"],
  },
  {
    id: "comprar",
    pregunta: "Quiero comprar",
    claves: ["comprar", "compra", "entrada", "ticket", "inscrib", "reservar", "anotarme", "anotar"],
    responder: ({ ahora }) => ({
      texto: 'Elegí tu entrada y completá el pago en la sección de compra. También podés pedirme algo como "quiero 2 entradas virtuales" y te las cargo.',
      acciones: [
        { tipo: "cargar", entrada: ahora < FIN_EARLY_BIRD ? "early" : "general", cantidad: 1, etiqueta: `Cargar 1 ${ahora < FIN_EARLY_BIRD ? "Early Bird" : "General"}` },
        { tipo: "cargar", entrada: "virtual", cantidad: 1, etiqueta: "Cargar 1 Virtual" },
      ],
    }),
    sugerencias: ["precios", "descuentos", "pago"],
  },
  {
    id: "mis-entradas",
    pregunta: "Mis entradas",
    claves: ["mis entradas", "mi entrada", "qr", "comprobante", "compre", "descargar"],
    responder: ({ compra }) =>
      compra
        ? {
            texto: `Tenés ${compra.entradas.length === 1 ? "1 entrada" : `${compra.entradas.length} entradas`} a nombre de ${compra.comprador.nombre} (compra ${compra.codigo}). Desde ahí podés ver el QR y descargarlas.`,
            acciones: [{ tipo: "ver-entradas", etiqueta: "Ver mis entradas" }],
          }
        : {
            texto: "Todavía no compraste entradas desde este navegador. Cuando compres, vas a poder ver y descargar tu entrada con QR.",
            acciones: [seccion("entradas", "Ver entradas")],
          },
    sugerencias: ["comprar", "fecha"],
  },
  {
    id: "preguntas",
    pregunta: "Quiero hacer una pregunta",
    claves: ["pregunta", "preguntar", "preguntarle", "consulta", "duda"],
    responder: () => ({
      texto: 'Dejá tu pregunta en «Preguntale a los speakers»: las más votadas se responden en vivo. Si me decís el nombre del speaker (por ejemplo "pregunta para Daniela") te dejo el formulario listo.',
      acciones: [seccion("preguntas", "Ir a preguntas")],
    }),
    sugerencias: ["speakers", "agenda"],
  },
  {
    id: "sponsor",
    pregunta: "¿Cómo ser sponsor?",
    claves: ["sponsor", "patrocin", "auspici", "empresa", "marca"],
    responder: () => ({
      texto: "¡Buenísimo! Completá el formulario «Sumate como Sponsor» con los datos de tu empresa y te contactamos en menos de 24 horas hábiles.",
      acciones: [seccion("sumate-sponsor", "Ir al formulario")],
    }),
    sugerencias: ["fecha", "ubicacion"],
  },
];
