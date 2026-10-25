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

const SPEAKERS = [
  {
    nombre: "Tomas Escudero",
    foto: tomasEscudero,
    charla: "Diseño para developers",
    descripcion:
      "Qué mira un equipo de diseño antes de que escribas código y cómo leer un mockup para construirlo igual.",
  },
  {
    nombre: "Franco Diaz",
    foto: francoDiaz,
    charla: "De cero a tu primer proyecto",
    descripcion:
      "Un recorrido para pasar de mirar tutoriales a terminar una app simple con HTML, JavaScript y React.",
  },
  {
    nombre: "Gaston",
    foto: gaston,
    charla: "Armá tu portfolio con IA",
    descripcion:
      "Cómo usar asistentes de IA para construir y publicar un portfolio que muestre lo que sabés hacer.",
  },
  {
    nombre: "Mauro",
    foto: mauro,
    charla: "Git y GitHub sin miedo",
    descripcion:
      "Los comandos que vas a usar todos los días y cómo trabajar en equipo sin pisar el código de otros.",
  },
  {
    nombre: "Jose Diaz",
    foto: joseDiaz,
    charla: "Tu primer backend con Node",
    descripcion:
      "Cómo se arma una API, qué hace una base de datos y por dónde empezar para conectar todo.",
  },
  {
    nombre: "Tomas Gomez",
    foto: tomasGomez,
    charla: "Preparate para tu primera entrevista",
    encuadre: "scale-180 origin-[75%_15%]",
    descripcion:
      "Qué preguntan en una entrevista técnica, cómo practicar y cómo contar tus proyectos con claridad.",
  },
  {
    nombre: "Pablo Basso",
    foto: pabloBasso,
    charla: "Mi primer trabajo en IT",
    encuadre: "scale-200 origin-[44%_32%]",
    descripcion:
      "Una charla en primera persona sobre cómo se consigue el primer puesto y qué se aprende en los primeros meses.",
  },
  {
    nombre: "Julian Martin",
    foto: julianMartin,
    charla: "Testing: cómo no romper todo",
    descripcion:
      "Qué es testear, por qué importa y cómo escribir tus primeras pruebas sin complicarte.",
  },
  {
    nombre: "Daniela Cardozo",
    foto: danielaCardozo,
    charla: "Tu primer día como developer",
    descripcion:
      "Qué esperar de tu primera semana en un equipo, qué herramientas usar y cómo pedir ayuda sin miedo.",
  },
  {
    nombre: "Andres Perlo",
    foto: andresPerlo,
    charla: "Tu primera base de datos",
    descripcion:
      "Qué es una base de datos, para qué sirve y cómo guardar y consultar tus primeros datos.",
  },
];

export const Speakers = () => {
  return (
    <section
      id="speakers"
      className="mx-auto mt-24 max-w-[1248px] px-6 text-(--rc-white)"
    >
      <p className="text-base font-extrabold uppercase tracking-[3px] text-(--rc-red)">
        Speakers
      </p>
      <h2 className="mt-3 text-[clamp(34px,4.5vw,56px)] font-extrabold leading-[1.05] tracking-[-1px]">
        Diez charlas, un mismo objetivo
      </h2>

      <ul className="mt-10 grid grid-cols-5 gap-6">
        {SPEAKERS.map((speaker, i) => (
          <li
            key={speaker.nombre}
            className="rounded-[32px] border border-(--rc-border) bg-(--rc-surface) p-4"
          >
            <div className="aspect-square overflow-hidden rounded-3xl">
              <img
                src={speaker.foto}
                alt={`Foto de ${speaker.nombre}`}
                loading="lazy"
                className={`h-full w-full object-cover object-top ${speaker.encuadre ?? ""}`}
              />
            </div>
            <h3 className="mt-5 text-[26px] font-extrabold leading-tight">
              {speaker.nombre}
            </h3>
            <p
              className={`mt-3 rounded-[14px] px-4 py-2.5 font-extrabold leading-tight ${
                i === 0 ? "bg-(--rc-red)" : "bg-(--rc-surface-2)"
              }`}
            >
              {speaker.charla}
            </p>
            <p className="mt-4 leading-[1.55] text-(--rc-text-soft)">
              {speaker.descripcion}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};
