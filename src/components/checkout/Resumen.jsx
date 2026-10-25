import candado from "../../assets/iconos/candado.svg";

export default function Resumen({ ticket, cantidad, subtotal, cargo, total }) {
  return (
    <aside className="rounded-[28px] bg-(--rc-black) p-8 text-(--rc-white)">
      <p className="text-sm font-extrabold uppercase tracking-[3px] text-(--rc-red)">Tu pedido</p>
      <h2 className="mt-3 text-[22px] font-extrabold">Workshop Rolling Code School</h2>
      <p className="text-sm text-(--rc-text-mute)">Jueves 19/11 · 18.00 hs · Gral. Paz 576</p>

      <div className="mt-5 space-y-3 border-y border-(--rc-border) py-5 text-base">
        <div className="flex justify-between gap-4">
          <span>
            {cantidad} {cantidad === 1 ? "entrada" : "entradas"} {ticket.nombre}
          </span>
          <span>${subtotal.toLocaleString("de-DE")}</span>
        </div>
        <div className="flex justify-between gap-4 text-(--rc-text-soft)">
          <span>Cargo por servicio (5%)</span>
          <span>${cargo.toLocaleString("de-DE")}</span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-lg font-extrabold">Total</span>
        <span className="text-[40px] font-extrabold leading-none tracking-[-1px]">
          ${total.toLocaleString("de-DE")}
        </span>
      </div>

      <p className="mt-5 flex items-center gap-2 text-sm text-(--rc-text-soft)">
        <img src={candado} alt="" className="h-4 w-4" />
        Pago protegido. Recibís la entrada por email.
      </p>
    </aside>
  );
}