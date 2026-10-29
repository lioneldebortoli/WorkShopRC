import { useState } from "react";
import candado from "../../assets/iconos/candado.svg";
import { formatearPrecio } from "../../utils/formato";

const Fila = ({ texto, valor, className = "" }) => (
  <div className={`flex flex-wrap justify-between gap-x-4 ${className}`}>
    <span>{texto}</span>
    <span className="whitespace-nowrap">{valor}</span>
  </div>
);

const FormularioCupon = ({ onAplicar }) => {
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");

  const aplicar = (e) => {
    e.preventDefault();
    const problema = onAplicar(codigo);
    setError(problema ?? "");
    if (!problema) setCodigo("");
  };

  return (
    <form onSubmit={aplicar} noValidate className="mt-5">
      <label htmlFor="cupon" className="text-sm font-semibold">
        ¿Tenés un cupón?
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="cupon"
          value={codigo}
          onChange={(e) => {
            setCodigo(e.target.value);
            setError("");
          }}
          placeholder="ROLLING10"
          autoComplete="off"
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? "cupon-error" : undefined}
          size={1}
          className={`h-11 min-w-0 flex-1 rounded-full border bg-(--rc-surface) px-4 uppercase outline-none placeholder:normal-case placeholder:text-(--rc-text-mute) focus:border-(--rc-red) ${
            error ? "border-[#ff4d55]" : "border-(--rc-chip-border)"
          }`}
        />
        <button
          type="submit"
          className="h-11 shrink-0 cursor-pointer rounded-full bg-(--rc-white) px-5 font-extrabold text-(--rc-black) transition hover:bg-(--rc-pink-soft)"
        >
          Aplicar
        </button>
      </div>
      {error && (
        <p id="cupon-error" role="alert" className="mt-2 text-sm font-semibold text-[#ff4d55]">
          {error}
        </p>
      )}
    </form>
  );
};

export default function Resumen({ lineas, subtotal, cupon, descuento, cargo, total, editable, onAplicarCupon, onQuitarCupon }) {
  const cuponSinEfecto = cupon && descuento === 0 && lineas.length > 0;

  return (
    <aside className="min-w-0 rounded-[28px] bg-(--rc-black) p-6 text-(--rc-white) sm:p-8">
      <p className="text-sm font-extrabold uppercase tracking-[3px] text-(--rc-red)">Tu pedido</p>
      <h2 className="mt-3 text-[22px] font-extrabold">Workshop Rolling Code School</h2>
      <p className="text-sm text-(--rc-text-mute)">Jueves 19/11 · 18.00 hs · Gral. Paz 576</p>

      <div className="mt-5 space-y-3 border-y border-(--rc-border) py-5 text-base">
        {lineas.length === 0 && <p className="text-(--rc-text-mute)">Todavía no elegiste entradas.</p>}
        {lineas.map((linea) => (
          <Fila key={linea.id} texto={`${linea.cantidad} × ${linea.nombre}`} valor={formatearPrecio(linea.subtotal)} />
        ))}
        {(lineas.length > 1 || descuento > 0) && (
          <Fila texto="Subtotal" valor={formatearPrecio(subtotal)} className="text-(--rc-text-soft)" />
        )}
        {descuento > 0 && (
          <Fila texto={`Cupón ${cupon.codigo}`} valor={`−${formatearPrecio(descuento)}`} className="font-semibold text-[#4ade80]" />
        )}
        <Fila texto="Cargo por servicio (5%)" valor={formatearPrecio(cargo)} className="text-(--rc-text-soft)" />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <span className="text-lg font-extrabold">Total</span>
        <span className="text-[clamp(28px,8vw,40px)] font-extrabold leading-none tracking-[-1px] whitespace-nowrap">
          {formatearPrecio(total)}
        </span>
      </div>

      {editable && cupon && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-[18px] border border-[#4ade80]/40 bg-[#4ade80]/10 px-4 py-3">
          <p role="status" className="text-sm font-semibold text-[#4ade80]">
            Cupón {cupon.codigo} aplicado: {cupon.descripcion}.
          </p>
          <button
            type="button"
            onClick={onQuitarCupon}
            className="cursor-pointer text-sm font-extrabold text-(--rc-white) underline underline-offset-4 hover:text-(--rc-pink-soft)"
          >
            Quitar
          </button>
          {cuponSinEfecto && (
            <p className="w-full text-sm font-semibold text-[#ff4d55]">
              Este cupón no aplica a las entradas que elegiste.
            </p>
          )}
        </div>
      )}
      {editable && !cupon && <FormularioCupon onAplicar={onAplicarCupon} />}

      <p className="mt-5 flex items-center gap-2 text-sm text-(--rc-text-soft)">
        <img src={candado} alt="" className="h-4 w-4" />
        Pago protegido. Recibís las entradas por email.
      </p>
    </aside>
  );
}
