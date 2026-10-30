export const CUPOS_EARLY_BIRD = 60;
export const VENDIDAS_EARLY_BIRD = 22;
export const QUEDAN_EARLY_BIRD = CUPOS_EARLY_BIRD - VENDIDAS_EARLY_BIRD;
export const CARGO_SERVICIO = 0.05;
export const FECHA_EVENTO = new Date(2026, 10, 19, 18, 0, 0);
export const FIN_EARLY_BIRD = new Date(2026, 9, 31, 23, 59, 59);

export const ENTRADAS = [
  {
    id: "early",
    nombre: "Early Bird",
    precio: 25000,
    precioAnterior: 35000,
    insignia: `Quedan ${QUEDAN_EARLY_BIRD}`,
    subtitulo: "Presencial · precio especial hasta el 31/10",
    detalle: "Presencial · hasta el 31/10",
    stock: QUEDAN_EARLY_BIRD,
    beneficios: [
      "Acceso a las 10 charlas",
      "Kit de stickers Rolling Code",
      "Certificado de asistencia",
      "Coffee break y networking con los speakers",
      "Grabación de todas las charlas",
    ],
  },
  {
    id: "general",
    nombre: "General",
    precio: 35000,
    insignia: "Desde el 1/11",
    subtitulo: "Presencial · precio regular",
    detalle: "Presencial · desde el 1/11",
    stock: 60,
    beneficios: [
      "Acceso a las 10 charlas",
      "Certificado de asistencia",
      "Coffee break y networking con los speakers",
      "Grabación de todas las charlas",
    ],
  },
  {
    id: "virtual",
    nombre: "Virtual",
    precio: 15000,
    insignia: "Desde donde estés",
    subtitulo: "Transmisión en vivo",
    detalle: "Transmisión en vivo y grabación",
    stock: 300,
    beneficios: [
      "Transmisión en vivo de las 10 charlas",
      "Chat para hacer preguntas a los speakers",
      "Certificado de asistencia",
      "Grabación disponible por 30 días",
    ],
  },
];