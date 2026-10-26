import checkBlanco from "../assets/iconos/check-blanco.svg";
import checkRojo from "../assets/iconos/check-rojo.svg";
import { useState, useEffect } from "react";
import { Reveal } from "./Reveal";
import { useEnPantalla } from "../hooks/useEnPantalla";

const EARLY_BIRD_DEADLINE = new Date(2026, 9, 31, 23, 59, 59).getTime();

function getTimeLeft() {
  const difference = Math.max(EARLY_BIRD_DEADLINE - Date.now(), 0);
  const totalSeconds = Math.floor(difference / 1000);

  return {
    days: Math.floor(totalSeconds / (60 * 60 * 24)),
    hours: Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60)),
    minutes: Math.floor((totalSeconds % (60 * 60)) / 60),
    seconds: totalSeconds % 60,
  };
}

export default function Entradas({ onComprar }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const [selected, setSelected] = useState("early");
  const [confirmedTicket, setConfirmedTicket] = useState(null);
  const [barraRef, barraVisible] = useEnPantalla(0.5);

  function selectCard(id) {
    setSelected(id);
    setConfirmedTicket(null);
  }

  function confirmTicket(id) {
    setSelected(id);
    setConfirmedTicket(id);
    onComprar(id);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
      if (Date.now() >= EARLY_BIRD_DEADLINE) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      id: "early",
      title: "Early Bird",
      price: "$25.000",
      oldPrice: "$35.000",
      badge: "Quedan 38",
      subtitle: "Presencial · precio especial hasta el 31/10",
      features: [
        "Acceso a las 10 charlas",
        "Kit de stickers Rolling Code",
        "Certificado de asistencia",
        "Coffee break y networking con los speakers",
        "Grabación de todas las charlas",
      ],
    },
    {
      id: "general",
      title: "General",
      price: "$35.000",
      badge: "Desde el 1/11",
      subtitle: "Presencial · precio regular",
      features: [
        "Acceso a las 10 charlas",
        "Certificado de asistencia",
        "Coffee break y networking con los speakers",
        "Grabación de todas las charlas",
      ],
    },
    {
      id: "virtual",
      title: "Virtual",
      price: "$15.000",
      badge: "Desde donde estés",
      subtitle: "Transmisión en vivo",
      features: [
        "Transmisión en vivo de las 10 charlas",
        "Chat para hacer preguntas a los speakers",
        "Certificado de asistencia",
        "Grabación disponible por 30 días",
      ],
    },
  ];

  return (
    <section id="entradas" className="mx-auto mt-24 max-w-[1248px] px-6 text-(--rc-white)">
      <Reveal>
        <p className="text-base font-extrabold uppercase tracking-[3px] text-(--rc-red)">
          Entradas
        </p>
        <h2 className="mt-3 text-[clamp(34px,4.5vw,56px)] font-extrabold leading-[1.05] tracking-[-1px]">
          Asegurá tu lugar antes de que suba el precio
        </h2>
      </Reveal>

      <Reveal
        retraso={100}
        className="mt-10 flex flex-col gap-8 rounded-[32px] border border-(--rc-border) bg-[linear-gradient(90deg,#1c0c0d,var(--rc-surface))] p-6 md:p-9 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="lg:max-w-[360px]">
          <p className="text-sm font-extrabold uppercase tracking-[3px] text-(--rc-red)">
            Early Bird
          </p>
          <p className="mt-2 text-[28px] font-extrabold leading-tight">
            El precio especial termina el 31/10
          </p>
          <p className="mt-2 text-base text-(--rc-text-soft)">
            Después la entrada pasa de $25.000 a $35.000.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 md:flex md:gap-3">
          {[
            { value: timeLeft.days, label: "DÍAS" },
            { value: timeLeft.hours, label: "HORAS" },
            { value: timeLeft.minutes, label: "MIN" },
            { value: timeLeft.seconds, label: "SEG" },
          ].map((item) => (
            <div
              key={item.label}
              className="min-w-0 rounded-[18px] border border-(--rc-border) bg-(--rc-black) px-2 py-3 text-center md:min-w-[100px] md:px-3"
            >
              <div className="text-[28px] font-extrabold leading-none tabular-nums md:text-[40px]">
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="mt-1.5 text-xs tracking-[2px] text-(--rc-text-mute)">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-[360px]">
          <div className="flex justify-between text-sm">
            <span className="font-semibold">Quedan 38 de 60 Early Bird</span>
            <span className="text-(--rc-text-mute)">63% vendidas</span>
          </div>
          <div ref={barraRef} className="mt-2 h-2 overflow-hidden rounded-full bg-(--rc-surface-2)">
            <div
              className="h-full rounded-full bg-(--rc-red) transition-[width] delay-300 duration-1200 ease-out motion-reduce:transition-none"
              style={{ width: barraVisible ? "63%" : "0%" }}
            />
          </div>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {cards.slice(0, 2).map((card, i) => (
          <Reveal key={card.id} retraso={i * 120} className="h-full">
            <Card
              card={card}
              selected={selected === card.id}
              confirmed={confirmedTicket === card.id}
              onSelect={() => selectCard(card.id)}
              onBuy={() => confirmTicket(card.id)}
            />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-6">
        <Card
          card={cards[2]}
          selected={selected === "virtual"}
          confirmed={confirmedTicket === "virtual"}
          onSelect={() => selectCard("virtual")}
          onBuy={() => confirmTicket("virtual")}
        />
      </Reveal>
    </section>
  );
}

function Card({ card, selected, confirmed, onSelect, onBuy }) {
  return (
    <div
      onClick={onSelect}
      onKeyDown={(event) => {
        if (
          event.target === event.currentTarget &&
          (event.key === "Enter" || event.key === " ")
        ) {
          event.preventDefault();
          onSelect();
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      className={`relative flex h-full cursor-pointer flex-col rounded-[32px] border p-6 transition-all duration-300 md:p-9 ${
        selected
          ? "border-transparent bg-(image:--rc-gradient) shadow-[0_22px_50px_rgba(224,32,42,0.25)]"
          : "border-(--rc-border) bg-(--rc-surface) hover:border-(--rc-red)"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-2xl font-extrabold">{card.title}</h3>
        {card.badge && (
          <span
            className={`whitespace-nowrap rounded-full px-3.5 py-1 text-sm font-extrabold ${
              selected ? "bg-(--rc-black)" : "border border-(--rc-chip-border) text-(--rc-text-soft)"
            }`}
          >
            {card.badge}
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-end gap-3">
        <span className="text-[clamp(44px,5vw,56px)] font-extrabold leading-none tracking-[-1px]">
          {card.price}
        </span>
        {card.oldPrice && (
          <span className="mb-1 text-xl text-(--rc-pink-soft) line-through opacity-80">
            {card.oldPrice}
          </span>
        )}
      </div>

      <p className={`mt-4 text-base ${selected ? "text-(--rc-pink-soft)" : "text-(--rc-text-mute)"}`}>
        {card.subtitle}
      </p>

      <ul className="mt-6 mb-8 grow space-y-3">
        {card.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-base md:text-lg">
            <img src={selected ? checkBlanco : checkRojo} alt="" className="mt-1 h-5 w-5 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onBuy();
        }}
        className={`mt-auto min-h-[52px] w-full cursor-pointer rounded-full text-lg font-extrabold transition-all duration-300 ${
          selected
            ? "bg-(--rc-white) text-(--rc-black) hover:bg-(--rc-pink-soft)"
            : "border-2 border-(--rc-white) hover:bg-(--rc-white) hover:text-(--rc-black)"
        }`}
      >
        {confirmed ? "Entrada seleccionada" : "Comprar entrada"}
      </button>
    </div>
  );
}