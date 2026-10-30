import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import Boton from "./Boton";
import TicketEntrada from "./TicketEntrada";
import { formatearPrecio } from "../../utils/formato";

const FLECHA = "h-11 w-11 shrink-0 cursor-pointer rounded-full border-2 border-(--rc-input-border) text-lg font-extrabold disabled:cursor-not-allowed disabled:opacity-40";

export default function StepListo({ compra, onNuevaCompra }) {
  const [indice, setIndice] = useState(0);
  const [descargando, setDescargando] = useState(false);
  const [errorDescarga, setErrorDescarga] = useState("");
  const ticketRef = useRef(null);

  const { comprador, entradas, resumen } = compra;
  const entrada = entradas[Math.min(indice, entradas.length - 1)];
  const cantidad = entradas.length;

  const descargar = async () => {
    setDescargando(true);
    setErrorDescarga("");
    try {
      const imagen = await toPng(ticketRef.current, { pixelRatio: 2, cacheBust: true });
      const enlace = document.createElement("a");
      enlace.href = imagen;
      enlace.download = `entrada-${entrada.codigo}.png`;
      enlace.click();
    } catch {
      setErrorDescarga("No pudimos generar la imagen. Probá de nuevo.");
    } finally {
      setDescargando(false);
    }
  };

  return (
    <div className="py-2 text-center">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="mx-auto h-16 w-16 text-green-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12.5l3 3 5-6" />
      </svg>
      <h2 className="mt-4 text-3xl font-extrabold">¡Listo, {comprador.nombre}!</h2>
      <p className="mt-3 text-lg text-(--rc-gray-on-white)">
        Pagaste {formatearPrecio(resumen.total)}. Te enviamos {cantidad === 1 ? "la entrada" : `las ${cantidad} entradas`} a{" "}
        <strong className="break-all text-(--rc-black)">{comprador.email}</strong>.
      </p>
      <p className="mt-1 text-sm text-(--rc-gray-on-white)">
        Código de compra: <strong className="font-mono text-(--rc-black)">{compra.codigo}</strong>
      </p>

      <div className="mt-8">
        <TicketEntrada ref={ticketRef} entrada={entrada} numero={indice + 1} cantidad={cantidad} comprador={comprador} />
      </div>

      {cantidad > 1 && (
        <div className="mx-auto mt-4 grid max-w-[360px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2">
          <button type="button" aria-label="Entrada anterior" disabled={indice === 0} onClick={() => setIndice(indice - 1)} className={FLECHA}>
            ←
          </button>
          <p aria-live="polite" className="font-extrabold">
            Entrada {indice + 1} de {cantidad}
          </p>
          <button type="button" aria-label="Entrada siguiente" disabled={indice === cantidad - 1} onClick={() => setIndice(indice + 1)} className={FLECHA}>
            →
          </button>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Boton onClick={descargar} disabled={descargando}>
          {descargando ? "Generando imagen…" : cantidad > 1 ? `Descargar entrada ${indice + 1}` : "Descargar entrada"}
        </Boton>
        <Boton variante="borde" onClick={onNuevaCompra}>
          Hacer otra compra
        </Boton>
      </div>
      {errorDescarga && (
        <p role="alert" className="mt-3 text-sm font-semibold text-(--rc-red)">
          {errorDescarga}
        </p>
      )}
      <p className="mt-4 text-sm text-(--rc-gray-on-white)">
        La entrada queda guardada en este navegador: podés volver a verla desde Compra segura.
      </p>
    </div>
  );
}
