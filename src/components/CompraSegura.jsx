import { useState } from "react";
import Resumen from "./checkout/Resumen";
import StepEntrada from "./checkout/StepEntrada";
import StepDatos from "./checkout/StepDatos";
import StepPago from "./checkout/StepPago";
import StepListo from "./checkout/StepListo";
import { Reveal } from "./Reveal";
import { CARGO_SERVICIO, ENTRADAS } from "../data/entradas";

const PASOS = ["Entrada", "Datos", "Pago", "Listo"];

export const CompraSegura = ({ cantidades, setCantidades }) => {
  const [paso, setPaso] = useState(1);
  const [datos, setDatos] = useState({ nombre: "", apellido: "", email: "", dni: "" });

  const lineas = ENTRADAS.filter((entrada) => cantidades[entrada.id] > 0).map((entrada) => ({
    id: entrada.id,
    nombre: entrada.nombre,
    cantidad: cantidades[entrada.id],
    subtotal: entrada.precio * cantidades[entrada.id],
  }));
  const cantidadTotal = lineas.reduce((suma, linea) => suma + linea.cantidad, 0);
  const subtotal = lineas.reduce((suma, linea) => suma + linea.subtotal, 0);
  const cargo = Math.round(subtotal * CARGO_SERVICIO);
  const total = subtotal + cargo;

  return (
    <section id="comprar" className="mt-14 px-6">
      <Reveal className="mx-auto max-w-328 rounded-[40px] bg-(image:--rc-gradient) px-6 py-14 text-(--rc-white) lg:px-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-base font-extrabold uppercase tracking-[3px]">
              Compra segura
            </p>
            <h2 className="mt-3 text-[clamp(40px,6vw,64px)] font-extrabold leading-[1.03] tracking-[-1px]">
              Finalizá tu compra
            </h2>
          </div>

          <ol className="flex flex-wrap gap-2">
            {PASOS.map((nombre, i) => (
              <li
                key={nombre}
                aria-current={paso === i + 1 ? "step" : undefined}
                className={`rounded-full border px-4 py-1.5 text-sm font-extrabold ${
                  paso === i + 1
                    ? "border-(--rc-black) bg-(--rc-black)"
                    : "border-white/60"
                }`}
              >
                {i + 1} {nombre}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[692fr_484fr]">
          <div className="min-w-0 rounded-[28px] bg-(--rc-white) p-5 text-(--rc-black) sm:p-8">
            {paso === 1 && (
              <StepEntrada
                entradas={ENTRADAS}
                cantidades={cantidades}
                setCantidades={setCantidades}
                cantidadTotal={cantidadTotal}
                onContinuar={() => setPaso(2)}
              />
            )}
            {paso === 2 && (
              <StepDatos
                datos={datos}
                setDatos={setDatos}
                onContinuar={() => setPaso(3)}
                onAtras={() => setPaso(1)}
              />
            )}
            {paso === 3 && (
              <StepPago
                total={total}
                onPagar={() => setPaso(4)}
                onAtras={() => setPaso(2)}
              />
            )}
            {paso === 4 && <StepListo datos={datos} cantidad={cantidadTotal} total={total} />}
            <p className="mt-5 text-sm text-(--rc-gray-on-white)">
              Pasarela de pago de ejemplo: no se procesan pagos ni se guardan
              datos.
            </p>
          </div>

          <Resumen lineas={lineas} subtotal={subtotal} cargo={cargo} total={total} />
        </div>
      </Reveal>
    </section>
  );
};

export default CompraSegura;
