import { useState, useEffect } from "react";

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

export default function Entradas() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const [selected, setSelected] = useState("early");
  const [confirmedTicket, setConfirmedTicket] = useState(null);

  function selectCard(id) {
    setSelected(id);
    setConfirmedTicket(null);
  }

  function confirmTicket(id) {
    setSelected(id);
    setConfirmedTicket(id);
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
    <section id="entradas" className="bg-black text-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
       
        <div className="mb-10">
          <p className="text-red-500 text-sm font-semibold tracking-widest mb-2">
            ENTRADAS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Asegurá tu lugar antes de que suba el precio
          </h2>
        </div>

        
        <div className="bg-gradient-to-r from-red-950 to-zinc-950 border border-zinc-800 rounded-2xl p-5 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-red-500 text-xs font-bold tracking-wider mb-1">
              EARLY BIRD
            </p>
            <p className="font-semibold text-lg">
              El precio especial termina el 31/10
            </p>
            <p className="text-zinc-400 text-sm mt-1">
              Después la entrada pasa de $25.000 a $35.000.
            </p>
          </div>

          
          <div className="flex items-center gap-2 sm:gap-3">
            {[
              { value: timeLeft.days, label: "DÍAS" },
              { value: timeLeft.hours, label: "HORAS" },
              { value: timeLeft.minutes, label: "MIN" },
              { value: timeLeft.seconds, label: "SEG" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-zinc-950 rounded-xl px-3 sm:px-4 py-3 text-center min-w-[62px] sm:min-w-[70px]"
              >
                <div className="text-2xl font-bold">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="text-xs text-zinc-400 mt-1">{item.label}</div>
              </div>
            ))}
          </div>

          
          <div className="w-full md:w-48">
            <div className="flex justify-between text-xs text-zinc-400 mb-1">
              <span>Quedan 38 de 60 Early Bird</span>
              <span>63% vendidas</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 rounded-full"
                style={{ width: "63%" }}
              />
            </div>
          </div>
        </div>

       
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {cards.slice(0, 2).map((card) => (
            <Card
              key={card.id}
              card={card}
              selected={selected === card.id}
              confirmed={confirmedTicket === card.id}
              onSelect={() => selectCard(card.id)}
              onBuy={() => confirmTicket(card.id)}
            />
          ))}
        </div>

       
        <Card
          card={cards[2]}
          selected={selected === "virtual"}
          confirmed={confirmedTicket === "virtual"}
          onSelect={() => selectCard("virtual")}
          onBuy={() => confirmTicket("virtual")}
          fullWidth
        />
       
      </div>
    </section>
  );
}

function Card({
  card,
  selected,
  confirmed,
  onSelect,
  onBuy,
  fullWidth = false,
}) {
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
      className={`
        relative flex h-full flex-col rounded-2xl p-6 cursor-pointer transition-all duration-300
        border-2
        ${
          selected
            ? "border-red-500 bg-gradient-to-br from-red-700 to-red-900 shadow-lg shadow-red-900/20"
            : "border-zinc-800 bg-zinc-900 hover:border-red-500/70"
        }
        ${fullWidth ? "mt-0" : ""}
      `}
    >
      
      {card.badge && (
        <span
          className={`absolute top-4 right-4 text-xs px-3 py-1 rounded-full font-medium
            ${
              selected
                ? "bg-red-500/30 text-red-200"
                : "bg-zinc-800 text-zinc-300"
            }`}
        >
          {card.badge}
        </span>
      )}

      <h3 className="text-xl font-bold mb-1">{card.title}</h3>

      <div className="flex items-end gap-2 mb-2">
        <span className="text-3xl font-bold">{card.price}</span>
        {card.oldPrice && (
          <span className="text-zinc-400 line-through text-lg mb-1">
            {card.oldPrice}
          </span>
        )}
      </div>

      <p className="text-sm text-zinc-300 mb-5">{card.subtitle}</p>

      <ul className="mb-6 flex-grow space-y-2.5">
        {card.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <span className="text-red-400 mt-0.5">✓</span>
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
        className={`
          mt-auto w-full py-3 rounded-full font-semibold transition-all duration-300
          ${
            selected
              ? "bg-white text-black hover:bg-zinc-100"
              : "bg-transparent border border-zinc-600 text-white hover:border-red-50 hover:text-red-50"
          }
        `}
      >
        {confirmed ? "Entrada seleccionada" : "Comprar entrada"}
      </button>
    </div>
  );
}
