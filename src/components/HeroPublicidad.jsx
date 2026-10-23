export const HeroPublicidad = () => {
  return (
    <section className="miContenedor w-175 rounded-2xl p-6 max-w-4xl mx-auto text-white">
      <div>
        <h4 className="mb-3">
          <span className="italic">WORKSHOP</span>{" "}
          <span className="font-bold">ENTRADAS LIMITADAS</span>
        </h4>
      </div>
      <div className="grid lg:grid-cols-2 justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-3">
            ¿POR DÓNDE EMPIEZO A <span className="text-black">PROGRAMAR?</span>
          </h1>
          <p className="text-[11px]">
            Una tarde con diez speakers de Rolling Code School para ordenar tus
            primeros pasos: qué aprender, cómo practicar y cómo mostrar lo que
            sabés.
          </p>
          <button>Comprar entrada</button>
          <button>Ver agenda</button>
        </div>
        <div className="w-75 ms-5 bg-black text-white p-6 rounded-2xl ">
          <h3 className="font-bold">JUE 19/11</h3>
          <h3 className="text-xl">18.00 hs</h3>
          <hr className="my-2 border-t border-white/30" />
          <h4 className="text-sm font-bold">Rolling Code School</h4>
          <p className="text-[11px]">Gral. Paz 576, Entrepiso</p>
          <h4 className="mt-5 text-sm font-bold">Entradas desde $15.000</h4>
          <p className="text-[11px]">Early Bird hasta el 31/10</p>
          <div className="flex justify-around mt-6">
            <p className="text-[11px]">Presencial</p>
            <p className="text-[11px]">Virtual</p>
            <p className="bg- text-[11px]">Cupos limitados</p>
          </div>
        </div>
      </div>
    </section>
  );
};
