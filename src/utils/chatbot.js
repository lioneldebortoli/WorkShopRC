import { formatearPrecio, normalizarTexto } from "./formato";

const SALUDOS = ["hola", "buenas", "buen", "holis", "hey", "buenos"];
const GRACIAS = ["gracias", "genial", "perfecto", "joya", "barbaro", "copado", "ok", "dale"];
const DESPEDIDAS = ["chau", "adios", "nos vemos", "hasta luego", "saludos"];
const INTENCION_COMPRA = ["quiero", "comprar", "compro", "necesito", "reservar", "sacar", "dame", "agrega", "carga"];
const NUMEROS = { un: 1, una: 1, uno: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10 };
const TIPOS_ENTRADA = [
  { id: "virtual", claves: ["virtual", "online", "remot", "streaming", "vivo"] },
  { id: "early", claves: ["early", "bird", "anticipad"] },
  { id: "general", claves: ["general"] },
  { id: "presencial", claves: ["presencial", "fisic"] },
];

export const palabrasDe = (texto) => normalizarTexto(texto).split(/[^a-z0-9]+/).filter(Boolean);

export const distancia = (a, b) => {
  const fila = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let diagonal = fila[0];
    fila[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const arriba = fila[j];
      fila[j] = Math.min(fila[j] + 1, fila[j - 1] + 1, diagonal + (a[i - 1] === b[j - 1] ? 0 : 1));
      diagonal = arriba;
    }
  }
  return fila[b.length];
};

const tolerancia = (clave) => (clave.length >= 7 ? 2 : clave.length >= 4 ? 1 : 0);

export const coincide = (palabra, clave) => {
  if (palabra.startsWith(clave)) return 2;
  const margen = tolerancia(clave);
  if (!margen || palabra.length < clave.length - 1) return 0;
  const parecida = Math.min(distancia(palabra, clave), distancia(palabra.slice(0, clave.length), clave));
  return parecida <= margen ? 1 : 0;
};

export const puntuar = (respuesta, mensaje) => {
  const texto = normalizarTexto(mensaje);
  const palabras = palabrasDe(mensaje);
  return respuesta.claves.reduce((total, clave) => {
    if (clave.includes(" ")) return total + (texto.includes(clave) ? 3 : 0);
    return total + Math.max(0, ...palabras.map((palabra) => coincide(palabra, clave)));
  }, 0);
};

export const buscarRespuestas = (mensaje, respuestas) =>
  respuestas
    .map((respuesta) => ({ respuesta, puntos: puntuar(respuesta, mensaje) }))
    .filter(({ puntos }) => puntos > 0)
    .sort((a, b) => b.puntos - a.puntos);

export const detectarSpeakers = (mensaje, charlas) => {
  const palabras = palabrasDe(mensaje).filter((palabra) => palabra.length >= 4);
  const parecido = (palabra, nombre) => {
    const limpio = normalizarTexto(nombre);
    return palabra === limpio || (limpio.length >= 5 && distancia(palabra, limpio) <= 1);
  };
  const porApellido = charlas.filter((charla) => palabras.some((palabra) => parecido(palabra, charla.speaker.apellido)));
  const conNombre = porApellido.filter((charla) => palabras.some((palabra) => parecido(palabra, charla.speaker.nombre)));
  if (conNombre.length) return conNombre;
  if (porApellido.length) return porApellido;
  return charlas.filter((charla) => palabras.some((palabra) => parecido(palabra, charla.speaker.nombre)));
};

export const detectarCompra = (mensaje, earlyBirdVigente = true) => {
  const palabras = palabrasDe(mensaje);
  const tipo = TIPOS_ENTRADA.find(({ claves }) => palabras.some((palabra) => claves.some((clave) => coincide(palabra, clave) === 2)));
  if (!tipo) return null;

  const numero = palabras.map((palabra) => (/^\d{1,3}$/.test(palabra) ? Number(palabra) : NUMEROS[palabra])).find(Boolean);
  const conIntencion = palabras.some((palabra) => INTENCION_COMPRA.some((clave) => coincide(palabra, clave) === 2));
  if (!numero && !conIntencion) return null;

  const id = tipo.id === "presencial" ? (earlyBirdVigente ? "early" : "general") : tipo.id;
  return { id, cantidad: numero || 1 };
};

const esSolo = (mensaje, lista) => {
  const texto = normalizarTexto(mensaje);
  const palabras = palabrasDe(mensaje);
  return palabras.length > 0 && palabras.length <= 4 && lista.some((frase) => (frase.includes(" ") ? texto.includes(frase) : palabras.includes(frase)));
};

export const tipoDeCharla = (mensaje) => {
  if (esSolo(mensaje, DESPEDIDAS)) return "despedida";
  if (esSolo(mensaje, GRACIAS)) return "gracias";
  if (esSolo(mensaje, SALUDOS)) return "saludo";
  return null;
};

export const tiempoRestante = (desde, hasta) => {
  const diferencia = hasta - desde;
  if (diferencia <= 0) return null;
  const horas = Math.floor(diferencia / 3600000);
  return { dias: Math.floor(horas / 24), horas: horas % 24 };
};

export const textoRestante = (restante) => {
  if (!restante) return "";
  if (restante.dias === 0) return restante.horas <= 1 ? "menos de una hora" : `${restante.horas} horas`;
  return restante.dias === 1 ? "1 día" : `${restante.dias} días`;
};

const SUGERENCIAS_GENERALES = ["fecha", "precios", "speakers", "comprar"];

const armar = (respuesta, contexto) => ({
  ...respuesta.responder(contexto),
  sugerencias: respuesta.sugerencias ?? [],
});

export const responderPorId = (id, contexto) => {
  const respuesta = contexto.respuestas.find((r) => r.id === id);
  return respuesta ? armar(respuesta, contexto) : null;
};

const responderSpeakers = (encontradas, mensaje) => {
  const quierePreguntar = palabrasDe(mensaje).some((palabra) => coincide(palabra, "pregunt") === 2);
  const nombre = (c) => `${c.speaker.nombre} ${c.speaker.apellido}`;

  if (encontradas.length === 1) {
    const [charla] = encontradas;
    const preguntar = { tipo: "preguntar", charla: charla.id, etiqueta: `Hacerle una pregunta a ${charla.speaker.nombre}` };
    const favorito = { tipo: "favorito", charla: charla.id };
    return {
      texto: `${nombre(charla)} da «${charla.titulo}» a las ${charla.hora} hs. ${charla.descripcion}`,
      acciones: quierePreguntar ? [preguntar, favorito] : [favorito, preguntar],
      sugerencias: ["mi-agenda", "agenda"],
    };
  }

  return {
    texto: `Encontré ${encontradas.length} speakers:\n${encontradas.map((c) => `• ${nombre(c)}: «${c.titulo}» a las ${c.hora} hs`).join("\n")}`,
    acciones: encontradas.map((c) => ({ tipo: "favorito", charla: c.id, nombre: nombre(c) })),
    sugerencias: ["speakers", "mi-agenda"],
  };
};

export const responder = (mensaje, contexto) => {
  const { respuestas, charlas, entradas, ahora, finEarlyBird, cargo } = contexto;

  const charla = tipoDeCharla(mensaje);
  if (charla === "saludo")
    return {
      texto: "¡Hola! ¿En qué te ayudo? Preguntame por fechas, precios o speakers, o pedime que te cargue entradas.",
      sugerencias: SUGERENCIAS_GENERALES,
    };
  if (charla === "gracias") return { texto: "¡De nada! Si necesitás algo más, acá estoy.", sugerencias: SUGERENCIAS_GENERALES };
  if (charla === "despedida") return { texto: "¡Nos vemos el jueves 19/11! 👋", sugerencias: ["fecha", "ubicacion"] };

  const pedido = detectarCompra(mensaje, ahora < finEarlyBird);
  if (pedido) {
    const entrada = entradas.find((e) => e.id === pedido.id);
    const cantidad = Math.min(pedido.cantidad, entrada.stock);
    const subtotal = entrada.precio * cantidad;
    const limite = pedido.cantidad > entrada.stock ? ` Solo quedan ${entrada.stock}, así que te cargo ese máximo.` : "";
    return {
      texto: `Te preparo ${cantidad} ${cantidad === 1 ? "entrada" : "entradas"} ${entrada.nombre}: ${formatearPrecio(subtotal)} + ${formatearPrecio(Math.round(subtotal * cargo))} de cargo por servicio.${limite}`,
      acciones: [{ tipo: "cargar", entrada: entrada.id, cantidad, etiqueta: `Cargar ${cantidad} ${entrada.nombre}` }],
      sugerencias: ["descuentos", "pago"],
    };
  }

  const speakers = detectarSpeakers(mensaje, charlas);
  if (speakers.length) return responderSpeakers(speakers, mensaje);

  const encontradas = buscarRespuestas(mensaje, respuestas);
  const [primera, segunda] = encontradas;
  if (primera && (primera.puntos >= 2 || !segunda || segunda.puntos < primera.puntos)) {
    return { ...armar(primera.respuesta, contexto), id: primera.respuesta.id };
  }

  const opciones = encontradas.length ? encontradas.slice(0, 2).map(({ respuesta }) => respuesta) : [];
  return {
    texto: opciones.length
      ? "No estoy seguro de haberte entendido. ¿Quisiste preguntar por alguna de estas?"
      : "No tengo esa respuesta todavía. Probá con alguna de estas preguntas o escribí sobre fecha, precios, modalidad, speakers o ubicación.",
    acciones: opciones.map((r) => ({ tipo: "responder", respuesta: r.id, etiqueta: r.pregunta })),
    sugerencias: opciones.length ? [] : SUGERENCIAS_GENERALES,
    sinRespuesta: true,
  };
};
