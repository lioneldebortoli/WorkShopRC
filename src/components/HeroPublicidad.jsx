export const HeroPublicidad = () => {
  return (
    <section className="max-w-4xl mx-auto">
      <div>
        <h4>
          <span className="italic">WORKSHOP</span>{" "}
          <span className="font-bold">ENTRADAS LIMITADAS</span>
        </h4>
      </div>
      <div className="grid lg:grid-cols-2 justify-between">
        <div>
          <h1 className="text-4xl font-bold">¿POR DÓNDE EMPIEZO A PROGRAMAR?</h1>
          <p>
            Una tarde con diez speakers de Rolling Code School para ordenar tus
            primeros pasos: qué aprender, cómo practicar y cómo mostrar lo que
            sabés.
          </p>
          <button>Comprar entrada</button>
          <button>Ver agenda</button>
        </div>
        <div>
          <h3>JUE 19/11</h3>
          <h3>18.00 hs</h3>
          <h4>Rolling Code School</h4>
          <p>Gral. Paz 576, Entrepiso</p>
          <h4>Entradas desde $15.000</h4>
          <p>Early Bird hasta el 31/10</p>
          <p>Presencial</p>
          <p>Virtual</p>
          <p>Cupos limitados</p>
        </div>
      </div>
    </section>
  );
};
