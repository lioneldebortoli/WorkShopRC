import { useState } from "react";
import Resumen from "./checkout/Resumen";
import StepEntrada from "./checkout/StepEntrada";
import StepDatos from "./checkout/StepDatos";
import StepPago from "./checkout/StepPago";
import StepListo from "./checkout/StepListo";
import { Reveal } from "./Reveal";
import { CARGO_SERVICIO, ENTRADAS } from "../data/entradas";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEvento } from "../hooks/useEvento";
import { EVENTOS } from "../utils/eventos";
import { baseDelCupon, buscarCupon, calcularDescuento, describirCupon } from "../utils/cupones";
import { generarCodigos } from "../utils/codigos";

const PASOS = ["Entrada", "Datos", "Pago", "Listo"];
const DATOS_VACIOS = { nombre: "", apellido: "", email: "", dni: "" };
const SIN_ENTRADAS = { early: 0, general: 0, virtual: 0 };
const SIN_COMPRA = null;

export const CompraSegura = ({ cantidades, setCantidades }) => {
  const [paso, setPaso] = useState(1);
  const [datos, setDatos] = useState(DATOS_VACIOS);
  const [codigoCupon, setCodigoCupon] = useState(null);
  const [compra, setCompra] = useLocalStorage("rc-ultima-compra", SIN_COMPRA);

  useEvento(EVENTOS.cargarEntradas, () => setPaso(1));
  useEvento(EVENTOS.verEntradas, () => {
    if (!compra) return;
    setPaso(4);
    document.getElementById("comprar").scrollIntoView({ behavior: "smooth" });
  });

  const lineas = ENTRADAS.filter((entrada) => cantidades[entrada.id] > 0).map((entrada) => ({
    id: entrada.id,
    nombre: entrada.nombre,
    cantidad: cantidades[entrada.id],
    subtotal: entrada.precio * cantidades[entrada.id],
  }));
  const cantidadTotal = lineas.reduce((suma, linea) => suma + linea.cantidad, 0);
  const subtotal = lineas.reduce((suma, linea) => suma + linea.subtotal, 0);
  const cupon = codigoCupon ? buscarCupon(codigoCupon).cupon : null;
  const descuento = calcularDescuento(cupon, lineas);
  const cargo = Math.round((subtotal - descuento) * CARGO_SERVICIO);
  const total = Math.max(0, subtotal - descuento + cargo);

  const resumenActual = {
    lineas,
    subtotal,
    cupon: cupon && { codigo: cupon.codigo, descripcion: describirCupon(cupon) },
    descuento,
    cargo,
    total,
  };
  const mostrandoCompra = paso === 4 && compra;
  const resumen = mostrandoCompra ? compra.resumen : resumenActual;

  const aplicarCupon = (codigo) => {
    if (lineas.length === 0) return "Elegí tus entradas antes de aplicar un cupón.";
    const { cupon: encontrado, error } = buscarCupon(codigo);
    if (error) return error;
    if (baseDelCupon(encontrado, lineas) === 0) return `El cupón ${encontrado.codigo} no aplica a las entradas que elegiste.`;
    setCodigoCupon(encontrado.codigo);
    return null;
  };

  const pagar = () => {
    const [codigoCompra, ...codigos] = generarCodigos(cantidadTotal + 1);
    let siguiente = 0;
    const entradas = lineas.flatMap((linea) =>
      Array.from({ length: linea.cantidad }, () => ({ codigo: codigos[siguiente++], id: linea.id, tipo: linea.nombre }))
    );
    setCompra({
      codigo: codigoCompra,
      fecha: new Date().toISOString(),
      comprador: { nombre: datos.nombre.trim(), apellido: datos.apellido.trim(), email: datos.email.trim() },
      entradas,
      resumen: resumenActual,
    });
    setPaso(4);
  };

  const nuevaCompra = () => {
    setCantidades(SIN_ENTRADAS);
    setDatos(DATOS_VACIOS);
    setCodigoCupon(null);
    setPaso(1);
  };

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

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] items-start gap-6 lg:grid-cols-[692fr_484fr]">
          <div className="min-w-0 rounded-[28px] bg-(--rc-white) p-5 text-(--rc-black) sm:p-8">
            {paso === 1 && compra && (
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-[18px] bg-(--rc-pink-soft) px-4 py-3">
                <p className="text-sm font-semibold">Ya compraste entradas desde este navegador.</p>
                <button
                  type="button"
                  onClick={() => setPaso(4)}
                  className="cursor-pointer text-sm font-extrabold text-(--rc-red) underline underline-offset-4"
                >
                  Ver mis entradas
                </button>
              </div>
            )}
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
                onPagar={pagar}
                onAtras={() => setPaso(2)}
              />
            )}
            {mostrandoCompra && <StepListo key={compra.codigo} compra={compra} onNuevaCompra={nuevaCompra} />}
            <p className="mt-5 text-sm text-(--rc-gray-on-white)">
              Pasarela de pago de ejemplo: no se procesan pagos ni se guardan
              datos.
            </p>
          </div>

          <Resumen
            {...resumen}
            editable={!mostrandoCompra}
            onAplicarCupon={aplicarCupon}
            onQuitarCupon={() => setCodigoCupon(null)}
          />
        </div>
      </Reveal>
    </section>
  );
};

export default CompraSegura;
