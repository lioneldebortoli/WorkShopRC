import { useState } from "react";

const BOTON =
  "h-10 w-10 shrink-0 cursor-pointer rounded-full border-2 border-(--rc-input-border) text-lg font-extrabold disabled:cursor-not-allowed disabled:opacity-40";

export default function SelectorCantidad({ id, nombre, cantidad, stock, onCambiar, onAviso }) {
  const [texto, setTexto] = useState(String(cantidad));
  const [anterior, setAnterior] = useState(cantidad);

  if (cantidad !== anterior) {
    setAnterior(cantidad);
    setTexto(String(cantidad));
  }

  const fijar = (valor) => {
    const valida = Math.min(Math.max(valor, 0), stock);
    onCambiar(valida);
    setTexto(String(valida));
    onAviso(valor > stock ? `Solo quedan ${stock} entradas ${nombre}.` : "");
  };

  const escribir = (e) => {
    const limpio = e.target.value.replace(/\D/g, "").slice(0, 4);
    setTexto(limpio);
    if (limpio === "") return;
    const numero = Number(limpio);
    onCambiar(Math.min(numero, stock));
    onAviso(numero > stock ? `Solo quedan ${stock} entradas ${nombre}.` : "");
  };

  const salir = () => {
    if (texto === "") setTexto(String(cantidad));
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label={`Quitar una entrada ${nombre}`}
        disabled={cantidad === 0}
        onClick={() => fijar(cantidad - 1)}
        className={BOTON}
      >
        −
      </button>
      <input
        id={id}
        inputMode="numeric"
        aria-label={`Cantidad de entradas ${nombre}`}
        value={texto}
        onChange={escribir}
        onBlur={salir}
        onFocus={(e) => e.target.select()}
        className="h-10 w-16 rounded-[12px] border-2 border-(--rc-input-border) bg-(--rc-white) text-center text-lg font-extrabold text-(--rc-black) outline-none focus:border-(--rc-red)"
      />
      <button
        type="button"
        aria-label={`Agregar una entrada ${nombre}`}
        disabled={cantidad >= stock}
        onClick={() => fijar(cantidad + 1)}
        className={BOTON}
      >
        +
      </button>
    </div>
  );
}
