import calendario from "../assets/iconos/calendario.svg";
import ubicacion from "../assets/iconos/ubicacion.svg";
import entrada from "../assets/iconos/entrada.svg";

export const HeroPublicidad = () => {
  return (
    <section className="miContenedor mt-10 w-190 rounded-2xl py-8 px-6 max-w-4xl mx-auto text-white">
      <div>
        <h4 className="mb-3">
          <span className="italic">WORKSHOP</span>{" "}
          <span className="font-bold">ENTRADAS LIMITADAS</span>
        </h4>
      </div>
      <div className="grid lg:grid-cols-2 justify-between">
        <div>
          <h1 className="text-5xl font-bold mb-4">
            ¿POR DÓNDE EMPIEZO A <span className="text-black">PROGRAMAR?</span>
          </h1>
          <div className="w-76">
          <p className="text-[11px]">
            Una tarde con diez speakers de Rolling Code School para ordenar tus
            primeros pasos: qué aprender, cómo practicar y cómo mostrar lo que
            sabés.
          </p>
          </div>
          <div className="mt-6">
            <a href="#compra-segura" className="bg-black font-bold text-[11px] rounded-full px-4 py-1.5">
              Comprar entrada
            </a>
            <a href="#agenda" className="ms-2 font-bold text-[11px] rounded-full border border-white px-4 py-1.5">
              Ver agenda
            </a>
          </div>
        </div>
        <div className=" w-75 ms-5 bg-black text-white p-6 rounded-2xl mb-7">
          <div className="flex items-center gap-2">
            <img src={calendario} alt="" className="w-5 h-5" />
            <h3 className="flex flex-col font-bold">
              JUE 19/11 <span className="font-normal">18.00hs</span>
            </h3>
          </div>
          <hr className="my-2 border-t border-white/30" />
         <div className="flex items-center gap-2">
            <img src={ubicacion} alt="" className="w-5 h-5" />
            <h3 className="flex flex-col font-bold text-sm">Rolling Code School<span className="font-normal text-[11px]">Gral. Paz 576, Entrepiso</span>
            </h3>
          </div>
          <hr className="my-2 border-t border-white/15" />
         <div className="flex items-center gap-2">
            <img src={entrada} alt="" className="w-5 h-5" />
            <h3 className="flex flex-col font-bold text-sm">Entradas desde $15.000<span className="font-normal text-[11px]">Early Bird hasta el 31/10</span>
            </h3>
          </div>
          <div className="flex justify-around mt-6 font-bold text-[10px]">
            <p className="border border-white/20 rounded-full py-1 px-3">
              Presencial
            </p>
            <p className="border border-white/20 rounded-full py-1 px-3">
              Virtual
            </p>
            <p className="cupos rounded-full py-1 px-3">
              Cupos limitados
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
