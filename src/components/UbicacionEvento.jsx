import ubicacion from "../assets/iconos/ubicacion.svg";

export const UbicacionEvento = () => {
  return (
    <section className="text-white mt-10 w-190 mx-auto">
      <div className="grid lg:grid-cols-2 justify-between">
        <div>
          <div className="w-70">
            <h4 className="comoLlegar font-bold">CÓMO LLEGAR</h4>
            <h2 className="font-bold text-3xl">
              Te esperamos en Rolling Code School
            </h2>
          </div>
          <div>
            <div className="flex items-start gap-3 mt-4">
              <img src={ubicacion} alt="" className="w-7 h-7 shrink-0 " />
              <div className="text-sm">
                <h4 className="font-bold">Calle Gral. Paz 576, Entrepiso</h4>
                <p>4000 San Miguel de Tucumán, Tucumán</p>
              </div>
            </div>
            <div className="flex my-4 text-[11px]">
              <p className="border border-white/20 rounded-full py-1 px-3 me-3">
                Jueves 19/11
              </p>
              <p className="border border-white/20 rounded-full py-1 px-3 me-3">
                18.00 hs
              </p>
              <p className="border border-white/20 rounded-full py-1 px-3">
                Entrepiso
              </p>
            </div>
          </div>
          <div>
            <a href="https://maps.app.goo.gl/cWZ9FKJzErykSKCL8" className="mapa font-bold text-[11px] rounded-full px-4 py-3">Abrir en Google Maps
            </a>
            <a href="#compra-segura" className="ms-3 font-bold text-[11px] rounded-full border border-white px-4 py-3">Comprar entrada
            </a>
          </div>
        </div>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.106067949509!2d-65.20974192556409!3d-26.83657849002518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses!2sar!4v1792877964898!5m2!1ses!2sar"
            width="390"
            height="280"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="rounded-2xl"
          ></iframe>
        </div>
      </div>
    </section>
  );
};
