import check from "../../assets/iconos/check-circulo.svg";

export default function StepListo({ datos, total }) {
  return (
    <div className="py-6 text-center">
      <img src={check} alt="" className="mx-auto h-16 w-16" />
      <h2 className="mt-4 text-3xl font-extrabold">¡Listo, {datos.nombre.trim().split(" ")[0]}!</h2>
      <p className="mt-3 text-lg text-(--rc-gray-on-white)">
        Pagaste ${total.toLocaleString("de-DE")}. Te enviamos la entrada a{" "}
        <strong className="text-(--rc-black)">{datos.email}</strong>.
      </p>
      <a
        href="/"
        className="mt-8 inline-flex min-h-\[52px\] items-center rounded-full bg-(--rc-black) px-8 text-lg font-extrabold text-(--rc-white)"
      >
        Volver al inicio
      </a>
    </div>
  );
}