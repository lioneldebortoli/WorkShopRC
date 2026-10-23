import { useState } from "react";
import Resumen from "./checkout/Resumen";
import StepEntrada from "./checkout/StepEntrada";

const TICKETS = [
  { id: "early", nombre: "Early Bird", detalle: "Presencial · hasta el 31/10", precio: 25000 },
  { id: "general", nombre: "General", detalle: "Presencial · desde el 1/11", precio: 35000 },
  { id: "virtual", nombre: "Virtual", detalle: "Transmisión en vivo y grabación", precio: 15000 },
];

const PASOS = ["Entrada", "Datos", "Pago", "Listo"];

const CompraSegura = () => {

  const [paso, setPaso] = useState(1);

  const [ticketId, setTicketId] = useState("early");
  const [cantidad, setCantidad] = useState(1);

  const ticket = TICKETS.find((t) => t.id === ticketId);
  const subtotal = ticket.precio * cantidad;
  const cargo = Math.round(subtotal * 0.05);
  const total = subtotal + cargo;

  return (
    <section id="comprar" className="px-6">
      <div className="mx-auto max-w-\[1312px\] px-6 py-14 lg:px-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p>Compra segura</p>
            <h1>Finalizá tu compra</h1>
          </div>

          <ol className="flex flex-wrap gap-2">
            {PASOS.map((nombre, i) => (
              <li key={nombre}>
                {i + 1} {nombre}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[692fr_484fr]">
          <div className="p-8">
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

            <p>Pasarela de pago de ejemplo: no se procesan pagos ni se guardan datos.</p>
          </div>

          <Resumen ticket={ticket} cantidad={cantidad} subtotal={subtotal} cargo={cargo} total={total} />
        </div>
      </div>
    </section>
  );
};

export default CompraSegura;