export const Agenda = () => {
  return (
    <section id="agenda">
      <div>
        <h3 className="agenda font-bold">AGENDA</h3>
      </div>
      <div className="grid lg:grid-cols-2 justify-between">
        <div className="text-white">
          <h2 className="text-3xl font-bold">Jueves 19 de noviembre</h2>
          <p className="text-sm">Diez charlas cortas para salir con un plan claro. Al final queda tiempo para preguntas y networkign.</p>
        </div>
        <div className="flex flex-col-2 gap-6">
          <div className="horario font-bold">
            <h2 className="my-4">18.00</h2>
            <h2 className="mb-8">18.20</h2>
            <h2 className="mb-7">18.40</h2>
            <h2 className="mb-7">19.00</h2>
            <h2 className="mb-7">19.20</h2>
            <h2 className="mb-7">19.40</h2>
            <h2 className="mb-7">20.00</h2>
            <h2 className="mb-7">20.20</h2>
            <h2 className="mb-7">20.40</h2>
            <h2 className="mb-7">21.00</h2>
            <h2 className="mb-6">21.20</h2>
            <h2>21.40</h2>
          </div>
          <div className="text-sm text-white">
            <hr className="my-2 border-t border-white/30" />
            <h2 className="font-bold">Acreditación y bienvenida</h2>
            <hr className="my-2 border-t border-white/30" />
            <h2 className="font-bold">Tu primer día como developer</h2>
            <p className="text-[11px]">Daniela Cardozo</p>
            <hr className="my-2 border-t border-white/30" />
            <h2 className="font-bold">De cero a tu primer proyecto</h2>
            <p className="text-[11px]">Franco Diaz</p>
            <hr className="my-2 border-t border-white/30" />
            <h2 className="font-bold">Armá tu portfolio con IA</h2>
            <p className="text-[11px]">Gaston</p>
            <hr className="my-2 border-t border-white/30" />
            <h2 className="font-bold">Git y GitHub sin miedo</h2>
            <p className="text-[11px]">Mauro</p>
            <hr className="my-2 border-t border-white/30" />
            <h2 className="font-bold">Tu primer Backend con Node</h2>
            <p className="text-[11px]">Jose Diaz</p>
            <hr className="my-2 border-t border-white/30" />
            <h2 className="font-bold">Preparate para tu primer entrevista</h2>
            <p className="text-[11px]">Tomas Gomez</p>
            <hr className="my-2 border-t border-white/30" />
            <h2 className="font-bold">Mi primer trabajo en IT</h2>
            <p className="text-[11px]">Pablo Basso</p>
            <hr className="my-2 border-t border-white/30" />
            <h2 className="font-bold">Testing: cómo no romper todo</h2>
            <p className="text-[11px]">Julian Martin</p>
            <hr className="my-2 border-t border-white/30" />
            <h2 className="font-bold">Diseño para developers</h2>
            <p className="text-[11px]">Tomas Escudero</p>
            <hr className="my-2 border-t border-white/30" />
            <h2 className="font-bold">Tu primera base de datos</h2>
            <p className="text-[11px]">Andres Perlo</p>
            <hr className="my-2 border-t border-white/30" />
            <h2 className="font-bold">Preguntas y networking</h2>
            <hr className="my-2 border-t border-white/30" />
          </div>
        </div>
      </div>
    </section>
  );
};
