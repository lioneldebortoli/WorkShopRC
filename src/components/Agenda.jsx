import { Reveal } from "./Reveal";

export const Agenda = () => {
  const charlas = [
    { hora: "18.00", titulo: "Acreditación y bienvenida", orador: "" },
    { hora: "18.20", titulo: "Tu primer día como developer", orador: "Daniela Cardozo" },
    { hora: "18.40", titulo: "De cero a tu primer proyecto", orador: "Franco Diaz" },
    { hora: "19.00", titulo: "Armá tu portfolio con IA", orador: "Gaston Roger" },
    { hora: "19.20", titulo: "Git y GitHub sin miedo", orador: "Mauro Coniglio" },
    { hora: "19.40", titulo: "Tu primer Backend con Node", orador: "Jose Diaz" },
    { hora: "20.00", titulo: "Preparate para tu primer entrevista", orador: "Tomas Gomez" },
    { hora: "20.20", titulo: "Mi primer trabajo en IT", orador: "Pablo Basso" },
    { hora: "20.40", titulo: "Testing: cómo no romper todo", orador: "Julian Martin" },
    { hora: "21.00", titulo: "Diseño para developers", orador: "Tomas Escudero" },
    { hora: "21.20", titulo: "Tu primera base de datos", orador: "Andres Perlo" },
    { hora: "21.40", titulo: "Preguntas y networking", orador: "" },
  ];

  return (
    <section id="agenda" className="mx-auto mt-24 max-w-[1248px] px-6 text-(--rc-white)">
      <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-6">
        <Reveal>
          <p className="text-base font-extrabold uppercase tracking-[3px] text-(--rc-red)">
            Agenda
          </p>
          <h2 className="mt-3 text-[clamp(34px,4.5vw,56px)] font-extrabold leading-[1.05] tracking-[-1px]">
            Jueves 19 de noviembre
          </h2>
          <p className="mt-5 max-w-[420px] text-lg leading-[1.55] text-(--rc-text-soft)">
            Diez charlas cortas para salir con un plan claro. Al final queda
            tiempo para preguntas y networking.
          </p>
        </Reveal>

        <ol>
          {charlas.map((charla, i) => (
            <Reveal
              as="li"
              key={charla.hora}
              retraso={i * 50}
              className="grid grid-cols-[72px_minmax(0,1fr)] gap-4 border-t border-(--rc-border) py-6 last:border-b md:grid-cols-[96px_minmax(0,1fr)] md:gap-6"
            >
              <span className="text-xl font-extrabold tabular-nums text-(--rc-red) md:text-2xl">
                {charla.hora}
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold md:text-[22px]">{charla.titulo}</h3>
                {charla.orador && (
                  <p className="mt-1 text-base text-(--rc-text-mute)">{charla.orador}</p>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};
