export const Agenda = () => {
  const charlas = [
    { hora: "18.00", titulo: "Acreditación y bienvenida", orador: "" },
    {
      hora: "18.20",
      titulo: "Tu primer día como developer",
      orador: "Daniela Cardozo",
    },
    {
      hora: "18.40",
      titulo: "De cero a tu primer proyecto",
      orador: "Franco Diaz",
    },
    { hora: "19.00", titulo: "Armá tu portfolio con IA", orador: "Gaston" },
    { hora: "19.20", titulo: "Git y GitHub sin miedo", orador: "Mauro" },
    {
      hora: "19.40",
      titulo: "Tu primer Backend con Node",
      orador: "Jose Diaz",
    },
    {
      hora: "20.00",
      titulo: "Preparate para tu primer entrevista",
      orador: "Tomas Gomez",
    },
    { hora: "20.20", titulo: "Mi primer trabajo en IT", orador: "Pablo Basso" },
    {
      hora: "20.40",
      titulo: "Testing: cómo no romper todo",
      orador: "Julian Martin",
    },
    {
      hora: "21.00",
      titulo: "Diseño para developers",
      orador: "Tomas Escudero",
    },
    {
      hora: "21.20",
      titulo: "Tu primera base de datos",
      orador: "Andres Perlo",
    },
    { hora: "21.40", titulo: "Preguntas y networking", orador: "" },
  ];

  return (
    <section id="agenda" className="w-190 mx-auto mt-10">
      <div>
        <h3 className="agenda font-bold">AGENDA</h3>
      </div>
      <div className="grid lg:grid-cols-2 justify-between">
        <div className="text-white">
          <h2 className="text-3xl font-bold w-80">Jueves 19 de noviembre</h2>
          <p className="text-sm w-78">
            Diez charlas cortas para salir con un plan claro. Al final queda
            tiempo para preguntas y networking.
          </p>
        </div>
        <div className="text-white">
          {charlas.map((charla) => (
            <div
              key={charla.hora}
              className="grid grid-cols-[65px_minmax(0,1fr)] gap-4 border-t border-white/30 py-3">
              <h2 className="horario font-bold text-sm">{charla.hora}</h2>
              <div className="min-w-0">
                <h2 className="font-bold text-sm">{charla.titulo}</h2>
                {charla.orador && (
                  <p className="text-[11px] text-white/80 mt-1">
                    {charla.orador}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
