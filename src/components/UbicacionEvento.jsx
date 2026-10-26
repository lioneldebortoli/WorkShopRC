import ubicacion from "../assets/iconos/ubicacion.svg";
import { Reveal } from "./Reveal";

const CHIPS = ["Jueves 19/11", "18.00 hs", "Entrepiso"];

export const UbicacionEvento = () => {
  return (
    <section id="como-llegar" className="mx-auto mt-24 max-w-[1248px] px-6 text-(--rc-white)">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <Reveal desde="izquierda">
          <p className="text-base font-extrabold uppercase tracking-[3px] text-(--rc-red)">
            Cómo llegar
          </p>
          <h2 className="mt-3 text-[clamp(34px,4.5vw,56px)] font-extrabold leading-[1.05] tracking-[-1px]">
            Te esperamos en Rolling Code School
          </h2>

          <div className="mt-8 flex items-start gap-4">
            <img src={ubicacion} alt="" className="mt-0.5 h-7 w-7 shrink-0" />
            <p>
              <span className="block text-xl font-extrabold">Calle Gral. Paz 576, Entrepiso</span>
              <span className="block text-lg text-(--rc-text-soft) md:text-xl">
                4000 San Miguel de Tucumán, Tucumán
              </span>
            </p>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {CHIPS.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-(--rc-chip-border) px-4 py-1.5 text-base font-semibold"
              >
                {chip}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://maps.app.goo.gl/cWZ9FKJzErykSKCL8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[56px] items-center rounded-full bg-(--rc-red) px-8 text-lg font-extrabold transition hover:bg-(--rc-red-dark)"
            >
              Abrir en Google Maps
            </a>
            <a
              href="#comprar"
              className="inline-flex min-h-[56px] items-center rounded-full border-2 border-(--rc-white) px-8 text-lg font-extrabold transition hover:bg-(--rc-white) hover:text-(--rc-black)"
            >
              Comprar entrada
            </a>
          </div>
        </Reveal>

        <Reveal desde="derecha" retraso={150}>
          <iframe
            title="Mapa de Rolling Code School"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.106067949509!2d-65.20974192556409!3d-26.83657849002518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses!2sar!4v1792877964898!5m2!1ses!2sar"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="h-[320px] w-full rounded-[32px] border border-(--rc-border) md:h-[450px]"
          ></iframe>
        </Reveal>
      </div>
    </section>
  );
};