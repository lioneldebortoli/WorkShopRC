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
  { nombre: "Tomas Escudero", foto: tomasEscudero, charla: "Diseño para developers",
    descripcion: "Qué mira un equipo de diseño antes de que escribas código y cómo leer un mockup para construirlo igual." },
  { nombre: "Franco Diaz", foto: francoDiaz, charla: "De cero a tu primer proyecto",
    descripcion: "Un recorrido para pasar de mirar tutoriales a terminar una app simple con HTML, JavaScript y React." },
  { nombre: "Gaston", foto: gaston, charla: "Armá tu portfolio con IA",
    descripcion: "Cómo usar asistentes de IA para construir y publicar un portfolio que muestre lo que sabés hacer." },
  { nombre: "Mauro", foto: mauro, charla: "Git y GitHub sin miedo",
    descripcion: "Los comandos que vas a usar todos los días y cómo trabajar en equipo sin pisar el código de otros." },
  { nombre: "Jose Diaz", foto: joseDiaz, charla: "Tu primer backend con Node",
    descripcion: "Cómo se arma una API, qué hace una base de datos y por dónde empezar para conectar todo." },
  { nombre: "Tomas Gomez", foto: tomasGomez, charla: "Preparate para tu primera entrevista",
    descripcion: "Qué preguntan en una entrevista técnica, cómo practicar y cómo contar tus proyectos con claridad." },
  { nombre: "Pablo Basso", foto: pabloBasso, charla: "Mi primer trabajo en IT",
    descripcion: "Una charla en primera persona sobre cómo se consigue el primer puesto y qué se aprende en los primeros meses." },
  { nombre: "Julian Martin", foto: julianMartin, charla: "Testing: cómo no romper todo",
    descripcion: "Qué es testear, por qué importa y cómo escribir tus primeras pruebas sin complicarte." },
  { nombre: "Daniela Cardozo", foto: danielaCardozo, charla: "Tu primer día como developer",
    descripcion: "Qué esperar de tu primera semana en un equipo, qué herramientas usar y cómo pedir ayuda sin miedo." },
  { nombre: "Andres Perlo", foto: andresPerlo, charla: "Tu primera base de datos",
    descripcion: "Qué es una base de datos, para qué sirve y cómo guardar y consultar tus primeros datos." },
];

export const Speakers = () => {
    return (
    <section id="speakers">
      <p>Speakers</p>
      <h2>Diez charlas, un mismo objetivo</h2>

      <ul>
        {SPEAKERS.map((speaker) => (
          <li key={speaker.nombre}>
            <img src={speaker.foto} alt={`Foto de ${speaker.nombre}`} loading="lazy" />
            <h3>{speaker.nombre}</h3>
            <p>{speaker.charla}</p>
            <p>{speaker.descripcion}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};