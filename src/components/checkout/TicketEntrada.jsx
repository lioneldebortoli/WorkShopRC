import { QRCodeSVG } from "qrcode.react";
import logo from "../../assets/logo/logo-rolling-blanco.png";

const Dato = ({ titulo, children }) => (
  <div className="min-w-0">
    <p className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#71717a]">{titulo}</p>
    <p className="mt-0.5 font-semibold">{children}</p>
  </div>
);

export default function TicketEntrada({ entrada, numero, cantidad, comprador, ref }) {
  const titular = `${comprador.nombre} ${comprador.apellido}`;
  const virtual = entrada.id === "virtual";
  const datosQr = JSON.stringify({
    codigo: entrada.codigo,
    evento: "Workshop Rolling Code School - 19/11/2026",
    entrada: entrada.tipo,
    titular,
  });

  return (
    <article ref={ref} className="mx-auto w-full max-w-[560px] overflow-hidden rounded-[24px] bg-(--rc-white) text-left text-(--rc-black) ring-1 ring-black/10">
      <div className="flex flex-col-reverse items-start gap-2 bg-(image:--rc-gradient) px-5 py-4 text-(--rc-white) min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between min-[420px]:gap-4 sm:px-6">
        <div className="min-w-0">
          <p className="text-[11px] font-extrabold uppercase tracking-[2px] text-(--rc-pink-soft)">Workshop</p>
          <p className="text-lg leading-tight font-extrabold sm:text-xl">¿Por dónde empiezo a programar?</p>
        </div>
        <img src={logo} alt="" className="h-8 w-auto shrink-0" />
      </div>

      <div className="flex flex-col sm:flex-row">
        <div className="grid flex-1 grid-cols-1 gap-x-4 gap-y-3 p-5 min-[360px]:grid-cols-2 sm:p-6">
          <Dato titulo="Entrada">
            <span className="inline-block rounded-full bg-(--rc-black) px-2.5 py-0.5 text-sm whitespace-nowrap text-(--rc-white)">{entrada.tipo}</span>
          </Dato>
          <Dato titulo="Número">
            {numero} de {cantidad}
          </Dato>
          <Dato titulo="Fecha">Jueves 19/11/2026</Dato>
          <Dato titulo="Hora">18.00 hs</Dato>
          <div className="min-[360px]:col-span-2">
            <Dato titulo={virtual ? "Modalidad" : "Lugar"}>
              {virtual ? "Transmisión en vivo · el link llega por email" : "Rolling Code School · Gral. Paz 576, Entrepiso, San Miguel de Tucumán"}
            </Dato>
          </div>
          <div className="min-[360px]:col-span-2">
            <Dato titulo="Titular">{titular}</Dato>
            <p className="mt-0.5 text-sm break-all text-[#52525b]">{comprador.email}</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 border-t-2 border-dashed border-[#d4d4d8] p-5 sm:border-t-0 sm:border-l-2">
          <QRCodeSVG value={datosQr} size={132} level="M" marginSize={0} title={`Código QR de la entrada ${entrada.codigo}`} />
          <p className="font-mono text-sm font-bold tracking-wide">{entrada.codigo}</p>
        </div>
      </div>

      <p className="bg-[#f4f4f5] px-5 py-2.5 text-center text-xs font-semibold text-[#52525b]">
        Entrada de demostración: no tiene validez real.
      </p>
    </article>
  );
}
