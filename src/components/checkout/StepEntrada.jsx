import Boton from "./Boton";

export default function StepEntrada({ tickets, ticketId, setTicketId, cantidad, setCantidad, onContinuar }) {
  return (
    <>
      <h2 className="text-2xl font-extrabold">Elegí tu entrada</h2>

      <div className="mt-5 space-y-3">
        {tickets.map((t) => {
          const elegida = ticketId === t.id;
          return (
            <button
              key={t.id}
              type="button"
              aria-pressed={elegida}
              onClick={() => setTicketId(t.id)}
              className={`flex w-full cursor-pointer items-center justify-between gap-4 rounded-[18px] border-2 px-5 py-4 text-left ${
                elegida
                  ? "border-(--rc-black) bg-(--rc-black) text-(--rc-white)"
                  : "border-(--rc-input-border) bg-(--rc-white) text-(--rc-black)"
              }`}
            >
              <span>
                <span className="block text-lg font-extrabold">{t.nombre}</span>
                <span className={`block text-sm ${elegida ? "text-(--rc-text-mute)" : "text-(--rc-gray-on-white)"}`}>
                  {t.detalle}
                </span>
              </span>
              <span className="text-xl font-extrabold">${t.precio.toLocaleString("de-DE")}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="font-extrabold">Cantidad</span>
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Quitar una entrada"
            onClick={() => setCantidad(Math.max(1, cantidad - 1))}
            className="h-12 w-12 cursor-pointer rounded-full border-2 border-(--rc-input-border) text-xl font-extrabold"
          >
            −
          </button>
          <span className="w-6 text-center text-xl font-extrabold">{cantidad}</span>
          <button
            type="button"
            aria-label="Agregar una entrada"
            onClick={() => setCantidad(cantidad + 1)}
            className="h-12 w-12 cursor-pointer rounded-full border-2 border-(--rc-input-border) text-xl font-extrabold"
          >
            +
          </button>
        </div>
      </div>

      <Boton onClick={onContinuar} className="mt-6 w-full">
        Continuar
      </Boton>
    </>
  );
}