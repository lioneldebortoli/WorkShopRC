import candado from "../../assets/iconos/candado.svg";
import { formatearPrecio } from "../../utils/formato";

export default function Resumen({ lineas, subtotal, cargo, total }) {
  return (
    <aside className="rounded-[28px] bg-(--rc-black) p-6 text-(--rc-white) sm:p-8">
      <p className="text-sm font-extrabold uppercase tracking-[3px] text-(--rc-red)">Tu pedido</p>
      <h2 className="mt-3 text-[22px] font-extrabold">Workshop Rolling Code School</h2>
      <p className="text-sm text-(--rc-text-mute)">Jueves 19/11 · 18.00 hs · Gral. Paz 576</p>

      <div className="mt-5 space-y-3 border-y border-(--rc-border) py-5 text-base">
        {lineas.length === 0 && <p className="text-(--rc-text-mute)">Todavía no elegiste entradas.</p>}
        {lineas.map((linea) => (
          <div key={linea.id} className="flex flex-wrap justify-between gap-x-4">
            <span>
              {linea.cantidad} × {linea.nombre}
            </span>
            <span className="whitespace-nowrap">{formatearPrecio(linea.subtotal)}</span>
          </div>
        ))}
        {lineas.length > 1 && (
          <div className="flex flex-wrap justify-between gap-x-4 text-(--rc-text-soft)">
            <span>Subtotal</span>
            <span className="whitespace-nowrap">{formatearPrecio(subtotal)}</span>
          </div>
        )}
        <div className="flex flex-wrap justify-between gap-x-4 text-(--rc-text-soft)">
          <span>Cargo por servicio (5%)</span>
          <span className="whitespace-nowrap">{formatearPrecio(cargo)}</span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <span className="text-lg font-extrabold">Total</span>
        <span className="text-[clamp(28px,8vw,40px)] font-extrabold leading-none tracking-[-1px] whitespace-nowrap">
          {formatearPrecio(total)}
        </span>
      </div>

      <p className="mt-5 flex items-center gap-2 text-sm text-(--rc-text-soft)">
        <img src={candado} alt="" className="h-4 w-4" />
        Pago protegido. Recibís las entradas por email.
      </p>
    </aside>
  );
}
