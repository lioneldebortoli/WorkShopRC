import calendario from "../assets/iconos/calendario.svg";
import ubicacion from "../assets/iconos/ubicacion.svg";
import entrada from "../assets/iconos/entrada.svg";
import { Reveal } from "./Reveal";

const DATOS = [
  { icono: calendario, titulo: "JUE 19/11", detalle: "18.00 hs", grande: true },
  { icono: ubicacion, titulo: "Rolling Code School", detalle: "Gral. Paz 576, Entrepiso" },
  { icono: entrada, titulo: "Entradas desde $15.000", detalle: "Early Bird hasta el 31/10" },
];

export const HeroPublicidad = () => {
  return (
    <section id="inicio" className="mt-12 overflow-x-clip px-6">
      <div className="miContenedor siempre-oscuro mx-auto max-w-[1312px] rounded-[40px] px-6 py-12 text-(--rc-white) lg:px-14 lg:py-16">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[7fr_5fr]">
          <Reveal desde="izquierda">
            <p className="text-lg uppercase md:text-[26px]">
              <span className="font-light italic">Workshop</span>{" "}
              <span className="font-extrabold">Entradas limitadas</span>
            </p>
            <h1 className="mt-4 text-[32px] font-extrabold min-[360px]:text-[clamp(40px,6vw,88px)] leading-[1.02] tracking-[-1.5px]">
              ¿POR DÓNDE EMPIEZO A{" "}
              <span className="text-(--rc-black)">PROGRAMAR?</span>
            </h1>
            <p className="mt-6 max-w-[580px] text-lg leading-[1.55] text-(--rc-pink-soft) md:text-xl">
              Una tarde con diez speakers de Rolling Code School para ordenar tus
              primeros pasos: qué aprender, cómo practicar y cómo mostrar lo que
              sabés.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#comprar"
                className="inline-flex min-h-[60px] items-center rounded-full bg-(--rc-black) px-9 text-lg font-extrabold transition hover:bg-(--rc-surface-2)"
              >
                Comprar entrada
              </a>
              <a
                href="#agenda"
                className="inline-flex min-h-[60px] items-center rounded-full border-2 border-(--rc-white) px-9 text-lg font-extrabold transition hover:bg-(--rc-white) hover:text-(--rc-red)"
              >
                Ver agenda
              </a>
            </div>
          </Reveal>

          <Reveal desde="derecha" retraso={150}>
            <aside
              aria-label="Datos del evento"
              className="rounded-[32px] bg-(--rc-black) p-5 motion-safe:animate-flotar min-[360px]:p-7 md:p-9"
            >
              <ul>
                {DATOS.map((dato) => (
                  <li
                    key={dato.titulo}
                    className="flex items-center gap-4 border-b border-white/15 py-5 first:pt-0 min-[360px]:gap-5"
                  >
                    <img src={dato.icono} alt="" className="h-8 w-8 shrink-0 min-[360px]:h-9 min-[360px]:w-9" />
                    {dato.grande ? (
                      <p className="leading-none">
                        <span className="block text-[26px] font-extrabold min-[360px]:text-[32px]">{dato.titulo}</span>
                        <span className="mt-1 block text-[30px] min-[360px]:text-[38px]">{dato.detalle}</span>
                      </p>
                    ) : (
                      <p>
                        <span className="block text-xl font-extrabold min-[360px]:text-2xl">{dato.titulo}</span>
                        <span className="block text-lg text-(--rc-text-soft) min-[360px]:text-xl">{dato.detalle}</span>
                      </p>
                    )}
                  </li>
                ))}
              </ul>
              <ul className="mt-6 flex flex-wrap gap-2 text-base font-semibold">
                <li className="rounded-full border border-(--rc-chip-border) px-4 py-1.5">Presencial</li>
                <li className="rounded-full border border-(--rc-chip-border) px-4 py-1.5">Virtual</li>
                <li className="rounded-full bg-(--rc-red) px-4 py-1.5 font-extrabold">Cupos limitados</li>
              </ul>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
};