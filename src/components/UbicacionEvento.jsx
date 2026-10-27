import ubicacion from "../assets/iconos/ubicacion.svg";
import { Reveal } from "./Reveal";

const CHIPS = ["Jueves 19/11", "18.00 hs", "Entrepiso"];

const MAPA_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=-65.2147%2C-26.8396%2C-65.2047%2C-26.8336&layer=mapnik&marker=-26.8366%2C-65.2097";

const ABRIR_MAPA_URL =
  "https://www.openstreetmap.org/?mlat=-26.8366&mlon=-65.2097#map=17/-26.8366/-65.2097";

export const UbicacionEvento = () => {
  return (
    <section id="como-llegar" className="mx-auto mt-24 max-w-[1248px] overflow-x-clip px-6 text-(--rc-white)">
      <div className="grid items-center gap-10 lg:grid-cols-[5fr_7fr] lg:gap-12">
        <Reveal desde="izquierda">
          <p className="text-base font-extrabold uppercase tracking-[3px] text-(--rc-red)">
            Cómo llegar
          </p>
          <h2 className="mt-3 text-[clamp(34px,4.5vw,56px)] font-extrabold leading-[1.05] tracking-[-1px]">
            Te esperamos en Rolling Code School
          </h2>

          <address className="mt-5 text-lg not-italic leading-[1.6] text-(--rc-text-soft)">
            Calle Gral. Paz 576, Entrepiso
            <br />
            4000 San Miguel de Tucumán, Tucumán
          </address>

          <ul className="mt-5 flex flex-wrap gap-2.5">
            {CHIPS.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-(--rc-chip-border) bg-(--rc-surface) px-4 py-1.5 text-base font-semibold"
              >
                {chip}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-4">
            <a
              href={ABRIR_MAPA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center rounded-full border-2 border-(--rc-white) px-8 text-lg font-extrabold transition hover:bg-(--rc-white) hover:text-(--rc-black)"
            >
              Abrir en el mapa
              <span className="sr-only"> (se abre en otra pestaña)</span>
            </a>
            <a
              href="#entradas"
              className="inline-flex min-h-[52px] items-center rounded-full bg-(--rc-red) px-8 text-lg font-extrabold transition hover:bg-(--rc-red-dark)"
            >
              Comprar entrada
            </a>
          </div>
        </Reveal>

        <Reveal desde="derecha" retraso={150}>
          <div className="relative aspect-square overflow-hidden rounded-[28px] border border-(--rc-border) bg-(--rc-surface) sm:aspect-[16/11]">
            <iframe
              title="Mapa: Rolling Code School, Gral. Paz 576, San Miguel de Tucumán"
              src={MAPA_URL}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="block h-full w-full border-0 [filter:invert(0.92)_hue-rotate(180deg)_grayscale(0.4)_contrast(0.9)_brightness(0.9)]"
            ></iframe>

            <div className="pointer-events-none absolute bottom-3 left-3 flex max-w-[calc(100%-24px)] items-center gap-3 rounded-[20px] border border-(--rc-border) bg-(--rc-black)/90 px-5 py-3.5 backdrop-blur-md">
              <img src={ubicacion} alt="" className="h-7 w-7 shrink-0" />
              <div>
                <p className="font-extrabold">Rolling Code School</p>
                <p className="text-sm text-(--rc-text-mute)">Gral. Paz 576 · San Miguel de Tucumán</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};