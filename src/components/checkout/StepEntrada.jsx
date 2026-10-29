import { useState } from "react";
import Boton from "./Boton";
import SelectorCantidad from "./SelectorCantidad";
import { formatearPrecio } from "../../utils/formato";

export default function StepEntrada({ entradas, cantidades, setCantidades, cantidadTotal, onContinuar }) {
  const [avisos, setAvisos] = useState({});
  const [error, setError] = useState("");

  const cambiar = (id, valor) => {
    setCantidades({ ...cantidades, [id]: valor });
    setError("");
  };

  const continuar = () => {
    if (cantidadTotal === 0) {
      setError("Elegí al menos una entrada para continuar.");
      return;
    }
    onContinuar();
  };

  return (
    <>
      <h2 className="text-2xl font-extrabold">Elegí tus entradas</h2>
      <p className="mt-1 text-sm text-(--rc-gray-on-white)">
        Podés combinar modalidades: por ejemplo 2 virtuales y 1 presencial.
      </p>

      <ul className="mt-5 space-y-3">
        {entradas.map((entrada) => {
          const cantidad = cantidades[entrada.id];
          return (
            <li
              key={entrada.id}
              className={`rounded-[18px] border-2 px-4 py-4 sm:px-5 ${
                cantidad > 0 ? "border-(--rc-black)" : "border-(--rc-input-border)"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
                <div className="min-w-0">
                  <p className="text-lg font-extrabold">
                    {entrada.nombre} · {formatearPrecio(entrada.precio)}
                  </p>
                  <p className="text-sm text-(--rc-gray-on-white)">{entrada.detalle}</p>
                  <p className="text-xs font-semibold text-(--rc-gray-on-white)">Quedan {entrada.stock}</p>
                </div>
                <SelectorCantidad
                  id={`cantidad-${entrada.id}`}
                  nombre={entrada.nombre}
                  cantidad={cantidad}
                  stock={entrada.stock}
                  onCambiar={(valor) => cambiar(entrada.id, valor)}
                  onAviso={(texto) => setAvisos({ ...avisos, [entrada.id]: texto })}
                />
              </div>
              {avisos[entrada.id] && (
                <p aria-live="polite" className="mt-2 text-sm font-semibold text-(--rc-red)">
                  {avisos[entrada.id]}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      {error && (
        <p role="alert" className="mt-4 text-sm font-semibold text-(--rc-red)">
          {error}
        </p>
      )}

      <Boton onClick={continuar} className="mt-6 w-full">
        Continuar
      </Boton>
    </>
  );
}