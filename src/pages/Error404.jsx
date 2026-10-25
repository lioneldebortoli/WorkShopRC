import { Link } from "react-router-dom";
import error404 from "../assets/error404/error404.png";

function IconoAdvertencia() {
  return (
    <svg
      viewBox="0 0 120 110"
      className="h-24 w-24 drop-shadow-[0_0_24px_rgba(229,36,43,0.6)] md:hidden"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="warn-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff4a50" />
          <stop offset="1" stopColor="#b3141a" />
        </linearGradient>
      </defs>
      <path
        d="M60 10 L110 98 H10 Z"
        fill="url(#warn-grad)"
        stroke="url(#warn-grad)"
        strokeWidth="14"
        strokeLinejoin="round"
      />
      <rect x="55" y="36" width="10" height="28" rx="5" fill="#fff" />
      <circle cx="60" cy="78" r="6" fill="#fff" />
    </svg>
  );
}

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-12 text-white">

      <div className="pointer-events-none absolute left-1/4 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e5242b]/30 blur-[120px]" />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-10 md:flex-row md:gap-16">
       
        <IconoAdvertencia />

        <img
          src={error404}
          alt="Ventana de navegador con una cruz roja y una alerta"
          className="hidden w-96 select-none md:block"
        />

        <div className="flex flex-col items-center text-center">
          <h1 className="text-8xl font-extrabold leading-none text-white drop-shadow-[0_6px_18px_rgba(229,36,43,0.55)] md:text-[10rem]">
            404
          </h1>

          <h2 className="mt-4 text-2xl font-bold md:text-3xl">
            Página <span className="text-[#e5242b]">no encontrada</span>
          </h2>

          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/80">
            Lo sentimos, la página que buscas no existe, fue eliminada o ocurrió
            un error.
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#e5242b] to-[#9b1117] px-8 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(229,36,43,0.4)] transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <span aria-hidden="true">←</span>
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}