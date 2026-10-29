import { formatearPrecio } from "../../utils/formato";

export default function StepListo({ datos, cantidad, total }) {
  return (
    <div className="py-6 text-center">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="mx-auto h-16 w-16 text-green-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12.5l3 3 5-6" />
      </svg>
      <h2 className="mt-4 text-3xl font-extrabold">¡Listo, {datos.nombre.trim()}!</h2>
      <p className="mt-3 text-lg text-(--rc-gray-on-white)">
        Pagaste {formatearPrecio(total)}. Te enviamos {cantidad === 1 ? "la entrada" : `las ${cantidad} entradas`} a{" "}
        <strong className="break-all text-(--rc-black)">{datos.email}</strong>.
      </p>
      <a
        href="/"
        className="mt-8 inline-flex min-h-[52px] items-center rounded-full bg-(--rc-black) px-8 text-lg font-extrabold text-(--rc-white)"
      >
        Volver al inicio
      </a>
    </div>
  );
}