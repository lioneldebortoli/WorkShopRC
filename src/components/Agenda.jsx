import { useState } from "react";
import { Reveal } from "./Reveal";
import { BotonFavorito } from "./BotonFavorito";
import { useFavoritos } from "../hooks/useFavoritos";
import { ACTIVIDADES, CHARLAS, nombreSpeaker, porHorario } from "../data/talks";

const PESTANAS = [
  { id: "todas", texto: "Todas las charlas" },
  { id: "mia", texto: "Mi agenda" },
];

export const Agenda = () => {
  const [pestana, setPestana] = useState("todas");
  const { favoritos, esFavorita, alternar } = useFavoritos();

  const misCharlas = CHARLAS.filter((charla) => esFavorita(charla.id)).sort(porHorario);
  const items = pestana === "todas" ? [...CHARLAS, ...ACTIVIDADES].sort(porHorario) : misCharlas;

  return (
    <section id="agenda" className="mx-auto mt-24 max-w-[1248px] px-6 text-(--rc-white)">
      <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-6">
        <Reveal>
          <p className="text-base font-extrabold uppercase tracking-[3px] text-(--rc-red)">
            Agenda
          </p>
          <h2 className="mt-3 text-[clamp(34px,4.5vw,56px)] font-extrabold leading-[1.05] tracking-[-1px]">
            Jueves 19 de noviembre
          </h2>
          <p className="mt-5 max-w-[420px] text-lg leading-[1.55] text-(--rc-text-soft)">
            Diez charlas cortas para salir con un plan claro. Marcá con la estrella las que no te querés
            perder y armá tu propia agenda.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-(--rc-chip-border) px-4 py-1.5 font-semibold">
            <span className="text-(--rc-estrella)" aria-hidden="true">★</span>
            {favoritos.length === 1 ? "1 charla marcada" : `${favoritos.length} charlas marcadas`}
          </p>
        </Reveal>

        <div>
          <div role="tablist" aria-label="Filtrar agenda" className="mb-4 inline-flex rounded-full border border-(--rc-border) bg-(--rc-surface) p-1">
            {PESTANAS.map(({ id, texto }) => (
              <button
                key={id}
                type="button"
                role="tab"
                id={`pestana-${id}`}
                aria-selected={pestana === id}
                aria-controls="agenda-lista"
                onClick={() => setPestana(id)}
                className={`min-h-11 cursor-pointer rounded-full px-4 text-sm font-extrabold transition sm:px-5 sm:text-base ${
                  pestana === id ? "bg-(--rc-red) text-white" : "text-(--rc-text-soft) hover:text-(--rc-white)"
                }`}
              >
                {texto}
                {id === "mia" && ` (${favoritos.length})`}
              </button>
            ))}
          </div>

          <div id="agenda-lista" role="tabpanel" aria-labelledby={`pestana-${pestana}`}>
            {items.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-(--rc-chip-border) px-6 py-12 text-center">
                <p className="text-4xl text-(--rc-estrella)" aria-hidden="true">☆</p>
                <p className="mt-3 text-xl font-extrabold">Todavía no marcaste charlas</p>
                <p className="mx-auto mt-2 max-w-[360px] text-(--rc-text-soft)">
                  Tocá la estrella de las charlas que te interesan y aparecen acá, ordenadas por horario.
                </p>
                <button
                  type="button"
                  onClick={() => setPestana("todas")}
                  className="mt-6 inline-flex min-h-[48px] cursor-pointer items-center rounded-full border-2 border-(--rc-white) px-6 font-extrabold transition hover:bg-(--rc-white) hover:text-(--rc-black)"
                >
                  Ver todas las charlas
                </button>
              </div>
            ) : (
              <ol>
                {items.map((item, i) => (
                  <Reveal
                    as="li"
                    key={item.id}
                    retraso={i * 50}
                    className="grid grid-cols-[64px_minmax(0,1fr)_auto] items-start gap-3 border-t border-(--rc-border) py-6 last:border-b md:grid-cols-[96px_minmax(0,1fr)_auto] md:gap-6"
                  >
                    <span className="text-xl font-extrabold tabular-nums text-(--rc-red) md:text-2xl">
                      {item.hora}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold md:text-[22px]">{item.titulo}</h3>
                      {item.speaker && (
                        <p className="mt-1 text-base text-(--rc-text-mute)">{nombreSpeaker(item)}</p>
                      )}
                    </div>
                    {item.speaker ? (
                      <BotonFavorito activa={esFavorita(item.id)} titulo={item.titulo} onClick={() => alternar(item.id)} />
                    ) : (
                      <span className="w-10" aria-hidden="true" />
                    )}
                  </Reveal>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
