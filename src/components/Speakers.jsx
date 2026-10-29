import { Reveal } from "./Reveal";
import { BotonFavorito } from "./BotonFavorito";
import { useEnPantalla } from "../hooks/useEnPantalla";
import { useFavoritos } from "../hooks/useFavoritos";
import { CHARLAS, nombreSpeaker } from "../data/talks";

const EASE = "ease-[cubic-bezier(0.22,0.8,0.3,1)]";

const SpeakerCard = ({ charla, indice, favorita, onFavorito }) => {
  const [ref, visible] = useEnPantalla();
  const { speaker } = charla;

  return (
    <li
      ref={ref}
      style={{ transitionDelay: `${(indice % 5) * 80}ms` }}
      className={`shrink-0 basis-[min(74vw,300px)] snap-center transition-all duration-800 ${EASE} motion-reduce:transition-none md:basis-auto ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <article
        className={`group h-full rounded-[32px] border border-(--rc-border) bg-(--rc-surface) p-4 transition duration-450 ${EASE} md:hover:-translate-y-2.5 hover:border-(--rc-red) hover:bg-[#161618] hover:shadow-[0_22px_50px_rgba(224,32,42,0.28)]`}
      >
        <div className="relative aspect-square overflow-hidden rounded-3xl">
          <div className={`h-full w-full transition-transform duration-600 ${EASE} group-hover:scale-108`}>
            <img
              src={speaker.foto}
              alt={`Foto de ${nombreSpeaker(charla)}`}
              loading="lazy"
              className="h-full w-full object-cover object-top"
            />
          </div>
          <BotonFavorito activa={favorita} titulo={charla.titulo} onClick={onFavorito} className="absolute top-3 right-3" />
          <span
            aria-hidden="true"
            className={`absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-2 whitespace-nowrap rounded-full bg-(--rc-red) px-3.5 py-1.5 text-[13px] font-extrabold opacity-0 transition duration-400 ${EASE} group-hover:translate-y-0 group-hover:opacity-100`}
          >
            {charla.hora} hs
          </span>
        </div>
        <h3 className="mt-5 text-[clamp(20px,1.9vw,26px)] font-extrabold leading-tight">
          {speaker.nombre}
          <span className="block">{speaker.apellido}</span>
        </h3>
        <p className="mt-3 rounded-[14px] bg-(--rc-surface-2) px-4 py-2.5 font-extrabold leading-tight transition-colors duration-300 group-hover:bg-(--rc-red)">
          {charla.titulo}
        </p>
        <p className="mt-4 leading-[1.55] text-(--rc-text-soft)">
          {charla.descripcion}
        </p>
      </article>
    </li>
  );
};

export const Speakers = () => {
  const { esFavorita, alternar } = useFavoritos();

  return (
    <section id="speakers" className="mx-auto mt-24 max-w-[1248px] px-6 text-(--rc-white)">
      <Reveal>
        <p className="text-base font-extrabold uppercase tracking-[3px] text-(--rc-red)">
          Speakers
        </p>
        <h2 className="mt-3 text-[clamp(34px,4.5vw,56px)] font-extrabold leading-[1.05] tracking-[-1px]">
          Diez charlas, un mismo objetivo
        </h2>
        <p className="mt-4 text-lg text-(--rc-text-soft)">
          Tocá la estrella para sumar una charla a tu agenda.
        </p>
      </Reveal>

      <ul className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-5">
        {CHARLAS.map((charla, i) => (
          <SpeakerCard
            key={charla.id}
            charla={charla}
            indice={i}
            favorita={esFavorita(charla.id)}
            onFavorito={() => alternar(charla.id)}
          />
        ))}
      </ul>
    </section>
  );
};
