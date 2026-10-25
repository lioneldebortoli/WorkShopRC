import { useState } from "react";
import Resumen from "./checkout/Resumen";
import StepEntrada from "./checkout/StepEntrada";
import StepDatos from "./checkout/StepDatos";
import StepPago from "./checkout/StepPago";
import StepListo from "./checkout/StepListo";

const TICKETS = [
  {
    id: "early",
    nombre: "Early Bird",
    detalle: "Presencial · hasta el 31/10",
    precio: 25000,
  },
  {
    id: "general",
    nombre: "General",
    detalle: "Presencial · desde el 1/11",
    precio: 35000,
  },
  {
    id: "virtual",
    nombre: "Virtual",
    detalle: "Transmisión en vivo y grabación",
    precio: 15000,
  },
];

const PASOS = ["Entrada", "Datos", "Pago", "Listo"];

export const CompraSegura = () => {
  const [paso, setPaso] = useState(1);

  const [ticketId, setTicketId] = useState("early");
  const [cantidad, setCantidad] = useState(1);
  const [datos, setDatos] = useState({ nombre: "", email: "", dni: "" });

  const ticket = TICKETS.find((t) => t.id === ticketId);
  const subtotal = ticket.precio * cantidad;
  const cargo = Math.round(subtotal * 0.05);
  const total = subtotal + cargo;

  return (
    <section
      id="comprar"
      className="px-6 font-(family-name:--bs-body-font-family) mt-20"
    >
      <div className="mx-auto max-w-\[1312px\] rounded-[40px] bg-(image:--rc-gradient) px-6 py-14 text-(--rc-white) lg:px-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-base font-extrabold uppercase tracking-[3px]">
              Compra segura
            </p>
            <h1 className="mt-3 text-[clamp(40px,6vw,64px)] font-extrabold leading-[1.03] tracking-[-1px]">
              Finalizá tu compra
            </h1>
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
          <div className="rounded-[28px] bg-(--rc-white) p-8 text-(--rc-black)">
            {paso === 1 && (
              <StepEntrada
                tickets={TICKETS}
                ticketId={ticketId}
                setTicketId={setTicketId}
                cantidad={cantidad}
                setCantidad={setCantidad}
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
            {paso === 4 && <StepListo datos={datos} total={total} />}
            <p className="mt-5 text-sm text-(--rc-gray-on-white)">
              Pasarela de pago de ejemplo: no se procesan pagos ni se guardan
              datos.
            </p>
          </div>

          <Resumen
            ticket={ticket}
            cantidad={cantidad}
            subtotal={subtotal}
            cargo={cargo}
            total={total}
          />
        </div>
      </div>
    </section>
  );
};

export default CompraSegura;
