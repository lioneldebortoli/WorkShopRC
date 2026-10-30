import { Link } from "react-router";
import Navbar from "../components/Navbar.jsx";
import { Footer } from "../components/Footer";
import ilustracion from "../assets/error404/error404.webp";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="relative overflow-hidden px-6 pt-10 pb-4 text-center text-(--rc-white) md:pt-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-(--rc-red)/40 blur-[120px]"
        />

        <img
          src={ilustracion}
          alt="Error 404: archivo de código roto delante de un gran 404 en rojo"
          className="mx-auto w-full max-w-[1000px] select-none [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]"
        />

        <h1 className="relative mt-4 text-[clamp(40px,6vw,72px)] font-extrabold leading-[1.05] tracking-[-1.5px]">
          Página <span className="text-(--rc-red)">no encontrada</span>
        </h1>

        <p className="relative mx-auto mt-5 max-w-[520px] text-lg leading-[1.55] text-(--rc-text-soft) md:text-xl">
          No encontramos la dirección que buscás. Volvé al inicio y conocé el
          workshop.
        </p>

        <div className="relative mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          <Link
            to="/"
            className="inline-flex min-h-[60px] items-center gap-3 rounded-full bg-(image:--rc-gradient) px-10 text-lg font-extrabold text-white shadow-[0_12px_32px_rgba(224,32,42,0.35)] transition hover:brightness-110"
          >
            <span aria-hidden="true">←</span>
            Volver al inicio
          </Link>
          <a
            href="/#speakers"
            className="group inline-flex items-center gap-2 text-lg font-semibold"
          >
            <span className="border-b-2 border-(--rc-white) pb-1">Ver speakers</span>
            <span aria-hidden="true" className="text-(--rc-red) transition group-hover:translate-x-1">→</span>
          </a>
        </div>
      </main>

      <Footer />
    </>
  );
}