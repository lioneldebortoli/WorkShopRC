import tomasEscudero from "../assets/speakers/speaker-01-tomas-escudero.jpg";
import francoDiaz from "../assets/speakers/speaker-02-franco-diaz.jpeg";
import gaston from "../assets/speakers/speaker-03-gaston.jpg";
import mauro from "../assets/speakers/speaker-04-mauro.jpg";
import joseDiaz from "../assets/speakers/speaker-05-jose-diaz.jpeg";
import tomasGomez from "../assets/speakers/speaker-06-tomas-gomez.jpeg";
import pabloBasso from "../assets/speakers/speaker-07-pablo-basso.jpeg";
import julianMartin from "../assets/speakers/speaker-08-julian-martin.jpg";
import danielaCardozo from "../assets/speakers/speaker-09-daniela-cardozo.jpeg";
import andresPerlo from "../assets/speakers/speaker-10-andres-perlo.jpeg";

export const CHARLAS = [
  {
    id: "diseno-para-developers",
    hora: "21.00",
    titulo: "Diseño para developers",
    speaker: { nombre: "Tomas", apellido: "Escudero", foto: tomasEscudero },
    descripcion:
      "Qué mira un equipo de diseño antes de que escribas código y cómo leer un mockup para construirlo igual.",
  },
  {
    id: "primer-proyecto",
    hora: "18.40",
    titulo: "De cero a tu primer proyecto",
    speaker: { nombre: "Franco", apellido: "Diaz", foto: francoDiaz },
    descripcion:
      "Un recorrido para pasar de mirar tutoriales a terminar una app simple con HTML, JavaScript y React.",
  },
  {
    id: "portfolio-con-ia",
    hora: "19.00",
    titulo: "Armá tu portfolio con IA",
    speaker: { nombre: "Gaston", apellido: "Roger", foto: gaston },
    descripcion:
      "Cómo usar asistentes de IA para construir y publicar un portfolio que muestre lo que sabés hacer.",
  },
  {
    id: "git-y-github",
    hora: "19.20",
    titulo: "Git y GitHub sin miedo",
    speaker: { nombre: "Mauro", apellido: "Coniglio", foto: mauro },
    descripcion:
      "Los comandos que vas a usar todos los días y cómo trabajar en equipo sin pisar el código de otros.",
  },
  {
    id: "backend-con-node",
    hora: "19.40",
    titulo: "Tu primer backend con Node",
    speaker: { nombre: "Jose", apellido: "Diaz", foto: joseDiaz },
    descripcion:
      "Cómo se arma una API, qué hace una base de datos y por dónde empezar para conectar todo.",
  },
  {
    id: "primera-entrevista",
    hora: "20.00",
    titulo: "Preparate para tu primera entrevista",
    speaker: { nombre: "Tomas", apellido: "Gomez", foto: tomasGomez },
    descripcion:
      "Qué preguntan en una entrevista técnica, cómo practicar y cómo contar tus proyectos con claridad.",
  },
  {
    id: "primer-trabajo",
    hora: "20.20",
    titulo: "Mi primer trabajo en IT",
    speaker: { nombre: "Pablo", apellido: "Basso", foto: pabloBasso },
    descripcion:
      "Una charla en primera persona sobre cómo se consigue el primer puesto y qué se aprende en los primeros meses.",
  },
  {
    id: "testing",
    hora: "20.40",
    titulo: "Testing: cómo no romper todo",
    speaker: { nombre: "Julian", apellido: "Martin", foto: julianMartin },
    descripcion: "Qué es testear, por qué importa y cómo escribir tus primeras pruebas sin complicarte.",
  },
  {
    id: "primer-dia",
    hora: "18.20",
    titulo: "Tu primer día como developer",
    speaker: { nombre: "Daniela", apellido: "Cardozo", foto: danielaCardozo },
    descripcion:
      "Qué esperar de tu primera semana en un equipo, qué herramientas usar y cómo pedir ayuda sin miedo.",
  },
  {
    id: "base-de-datos",
    hora: "21.20",
    titulo: "Tu primera base de datos",
    speaker: { nombre: "Andres", apellido: "Perlo", foto: andresPerlo },
    descripcion: "Qué es una base de datos, para qué sirve y cómo guardar y consultar tus primeros datos.",
  },
];

export const ACTIVIDADES = [
  { id: "acreditacion", hora: "18.00", titulo: "Acreditación y bienvenida" },
  { id: "networking", hora: "21.40", titulo: "Preguntas y networking" },
];

export const nombreSpeaker = (charla) => `${charla.speaker.nombre} ${charla.speaker.apellido}`;

export const porHorario = (a, b) => a.hora.localeCompare(b.hora);
