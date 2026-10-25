import { useEffect, useRef, useState } from "react";
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
    hora: "21.00",
    charla: "Diseño para developers",
    descripcion:
      "Qué mira un equipo de diseño antes de que escribas código y cómo leer un mockup para construirlo igual.",
  },
  {
    nombre: "Franco Diaz",
    foto: francoDiaz,
    hora: "18.40",
    charla: "De cero a tu primer proyecto",
    descripcion:
      "Un recorrido para pasar de mirar tutoriales a terminar una app simple con HTML, JavaScript y React.",
  },
  {
    nombre: "Gaston",
    foto: gaston,
    hora: "19.00",
    charla: "Armá tu portfolio con IA",
    descripcion:
      "Cómo usar asistentes de IA para construir y publicar un portfolio que muestre lo que sabés hacer.",
  },
  {
    nombre: "Mauro",
    foto: mauro,
    hora: "19.20",
    charla: "Git y GitHub sin miedo",
    descripcion:
      "Los comandos que vas a usar todos los días y cómo trabajar en equipo sin pisar el código de otros.",
  },
  {
    nombre: "Jose Diaz",
    foto: joseDiaz,
    hora: "19.40",
    charla: "Tu primer backend con Node",
    descripcion:
      "Cómo se arma una API, qué hace una base de datos y por dónde empezar para conectar todo.",
  },
  {
    nombre: "Tomas Gomez",
    foto: tomasGomez,
    hora: "20.00",
    charla: "Preparate para tu primera entrevista",
    encuadre: "scale-180 origin-[75%_15%]",
    descripcion:
      "Qué preguntan en una entrevista técnica, cómo practicar y cómo contar tus proyectos con claridad.",
  },
  {
    nombre: "Pablo Basso",
    foto: pabloBasso,
    hora: "20.20",
    charla: "Mi primer trabajo en IT",
    encuadre: "scale-200 origin-[44%_32%]",
    descripcion:
      "Una charla en primera persona sobre cómo se consigue el primer puesto y qué se aprende en los primeros meses.",
  },
  {
    nombre: "Julian Martin",
    foto: julianMartin,
    hora: "20.40",
    charla: "Testing: cómo no romper todo",
    descripcion:
      "Qué es testear, por qué importa y cómo escribir tus primeras pruebas sin complicarte.",
  },
  {
    nombre: "Daniela Cardozo",
    foto: danielaCardozo,
    hora: "18.20",
    charla: "Tu primer día como developer",
    descripcion:
      "Qué esperar de tu primera semana en un equipo, qué herramientas usar y cómo pedir ayuda sin miedo.",
  },
  {
    nombre: "Andres Perlo",
    foto: andresPerlo,
    hora: "21.20",
    charla: "Tu primera base de datos",
    descripcion:
      "Qué es una base de datos, para qué sirve y cómo guardar y consultar tus primeros datos.",
  },
];

const EASE = "ease-[cubic-bezier(0.22,0.8,0.3,1)]";

const SpeakerCard = ({ speaker, indice }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <li
      ref={ref}
      style={{ transitionDelay: `${(indice % 5) * 80}ms` }}
      className={`shrink-0 basis-[min(74vw,300px)] snap-center transition-all duration-800 ${EASE} motion-reduce:transition-none md:basis-auto ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <article
        className={`group h-full rounded-[32px] border border-(--rc-border) bg-(--rc-surface) p-4 transition duration-450 ${EASE} md:hover:-translate-y-2.5 hover:border-(--rc-red) hover:bg-[#161618] hover:shadow-[0_22px_50px_rgba(224,32,42,0.28)]`}
      >
        <div className="relative aspect-square overflow-hidden rounded-3xl">
          <div className={`h-full w-full transition-transform duration-600 ${EASE} group-hover:scale-108`}>
            <img
              src={speaker.foto}
              alt={`Foto de ${speaker.nombre}`}
              loading="lazy"
              className={`h-full w-full object-cover object-top ${speaker.encuadre ?? ""}`}
            />
          </div>
          <span
            aria-hidden="true"
            className={`absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-2 whitespace-nowrap rounded-full bg-(--rc-red) px-3.5 py-1.5 text-[13px] font-extrabold opacity-0 transition duration-400 ${EASE} group-hover:translate-y-0 group-hover:opacity-100`}
          >
            {speaker.hora} hs
          </span>
        </div>
        <h3 className="mt-5 text-[clamp(20px,1.9vw,26px)] font-extrabold leading-tight">
          {speaker.nombre}
        </h3>
        <p className="mt-3 rounded-[14px] bg-(--rc-surface-2) px-4 py-2.5 font-extrabold leading-tight transition-colors duration-300 group-hover:bg-(--rc-red)">
          {speaker.charla}
        </p>
        <p className="mt-4 leading-[1.55] text-(--rc-text-soft)">
          {speaker.descripcion}
        </p>
      </article>
    </li>
  );
};

export const Speakers = () => {
  return (
    <section id="speakers" className="mx-auto mt-24 max-w-[1248px] px-6 text-(--rc-white)">
      <p className="text-base font-extrabold uppercase tracking-[3px] text-(--rc-red)">
        Speakers
      </p>
      <h2 className="mt-3 text-[clamp(34px,4.5vw,56px)] font-extrabold leading-[1.05] tracking-[-1px]">
        Diez charlas, un mismo objetivo
      </h2>

      <ul className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-5">
        {SPEAKERS.map((speaker, i) => (
          <SpeakerCard key={speaker.nombre} speaker={speaker} indice={i} />
        ))}
      </ul>
    </section>
  );
};
