export const TESTIMONIOS = [
  {
    id: "camila-ruiz",
    nombre: "Camila Ruiz",
    rol: "Frontend Developer en una agencia digital",
    texto:
      "Llegué sin saber por dónde arrancar y me fui con una lista clara de qué aprender primero. A los seis meses conseguí mi primer trabajo.",
    edicion: "Workshop 2025",
  },
  {
    id: "hector-herrera",
    nombre: "Hector Herrera",
    rol: "Estudiante de Rolling Code School",
    texto:
      "La charla de Git me sacó el miedo a la terminal. Ese mismo fin de semana subí mi primer proyecto a GitHub.",
    edicion: "Workshop 2025",
  },
  {
    id: "lucia-paz",
    nombre: "Lucía Paz",
    rol: "QA Tester en una startup de pagos",
    texto:
      "Me encantó que los speakers contaran errores reales. Entendí que equivocarse es parte del camino.",
    edicion: "Workshop 2024",
  },
  {
    id: "joaquin-sosa",
    nombre: "Joaquín Sosa",
    rol: "Backend Developer junior",
    texto:
      "El networking del final valió la entrada: conocí a la persona que después me recomendó para mi primera entrevista.",
    edicion: "Workshop 2024",
  },
  {
    id: "valentina-luna",
    nombre: "Valentina Luna",
    rol: "Diseñadora UX que aprende a programar",
    texto:
      "Vengo del diseño y pensé que no era para mí. Salí convencida de que podía hacerlo y me anoté en el curso.",
    edicion: "Workshop 2025",
  },
  {
    id: "nicolas-ibarra",
    nombre: "Nicolás Ibarra",
    rol: "Full Stack Developer en una empresa de software",
    texto:
      "Fui a la virtual desde Salta y se vio perfecto. Las grabaciones me sirvieron para repasar todo con calma.",
    edicion: "Workshop 2024 · Virtual",
  },
];

export const iniciales = (nombre) =>
  nombre
    .split(" ")
    .map((parte) => parte[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
