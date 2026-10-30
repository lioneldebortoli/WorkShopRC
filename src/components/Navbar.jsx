import { useEffect, useState } from "react";
import logo from "../assets/logo/logo-rolling-blanco.png";
import logoNegro from "../assets/logo/logo-rolling-negro.png";
import { BotonTema } from "./BotonTema";
import { useTema } from "../hooks/useTema";

const LINKS = [
  { id: "speakers", texto: "Speakers" },
  { id: "agenda", texto: "Agenda" },
  { id: "preguntas", texto: "Preguntas" },
  { id: "sponsors", texto: "Sponsors" },
  { id: "como-llegar", texto: "Cómo llegar" },
];

const EASE = "ease-[cubic-bezier(0.22,0.8,0.3,1)]";

const BOTON_ROJO =
  "inline-flex items-center justify-center rounded-full bg-(--rc-red) font-extrabold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-(--rc-red-hover) hover:shadow-[0_12px_30px_rgba(224,32,42,0.45)] active:scale-[0.98]";

export default function Navbar() {
  const [conScroll, setConScroll] = useState(() => window.scrollY > 8);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [activa, setActiva] = useState(null);
  const { tema, alternarTema } = useTema();

  useEffect(() => {
    const actualizar = () => setConScroll(window.scrollY > 8);
    window.addEventListener("scroll", actualizar, { passive: true });
    return () => window.removeEventListener("scroll", actualizar);
  }, []);

  useEffect(() => {
    const secciones = LINKS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    if (!secciones.length) return;

    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) setActiva(entrada.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    secciones.forEach((seccion) => observer.observe(seccion));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuAbierto) return;
    document.body.style.overflow = "hidden";
    const cerrarConEscape = (e) => {
      if (e.key === "Escape") setMenuAbierto(false);
    };
    window.addEventListener("keydown", cerrarConEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", cerrarConEscape);
    };
  }, [menuAbierto]);

  const irA = (evento, id) => {
    setMenuAbierto(false);
    const destino = document.getElementById(id);
    if (!destino) return;
    evento.preventDefault();
    document.body.style.overflow = "";
    destino.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-(--rc-nav) transition-[box-shadow,border-color,background-color] duration-300 lg:bg-(--rc-nav-blur) lg:backdrop-blur-md ${
        conScroll
          ? "border-(--rc-border) shadow-[0_10px_30px_var(--rc-sombra)]"
          : "border-transparent"
      }`}
    >
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-[1248px] items-center justify-between gap-4 px-6 py-3"
      >
        <a href="/#inicio" onClick={(e) => irA(e, "inicio")}>
          <img src={logo} alt="Rolling Code School" className="h-11 w-auto claro:hidden lg:h-13" />
          <img src={logoNegro} alt="Rolling Code School" className="hidden h-11 w-auto claro:block lg:h-13" />
        </a>

        <ul className="hidden items-center gap-6 lg:flex xl:gap-7">
          {LINKS.map(({ id, texto }) => (
            <li key={id}>
              <a
                href={`/#${id}`}
                onClick={(e) => irA(e, id)}
                aria-current={activa === id ? "true" : undefined}
                className={`relative flex min-h-11 items-center font-semibold transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-1.5 after:h-0.5 after:origin-left after:rounded-full after:bg-(--rc-red) after:transition-transform after:duration-350 after:ease-[cubic-bezier(0.22,0.8,0.3,1)] hover:text-(--rc-white) hover:after:scale-x-100 ${
                  activa === id
                    ? "text-(--rc-white) after:scale-x-100"
                    : "text-(--rc-text-soft) after:scale-x-0"
                }`}
              >
                {texto}
              </a>
            </li>
          ))}
          <li>
            <BotonTema tema={tema} onCambiar={alternarTema} />
          </li>
          <li>
            <a
              href="/#entradas"
              onClick={(e) => irA(e, "entradas")}
              className={`${BOTON_ROJO} min-h-[52px] px-8 text-[17px]`}
            >
              Comprar entrada
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="/#entradas"
            onClick={(e) => irA(e, "entradas")}
            className={`${BOTON_ROJO} min-h-11 px-5 text-base`}
          >
            Comprar
          </a>
          <button
            type="button"
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuAbierto}
            aria-controls="menu-movil"
            onClick={() => setMenuAbierto((abierto) => !abierto)}
            className="relative z-[60] h-11 w-11 cursor-pointer rounded-md border border-(--rc-border)"
          >
            <span
              className={`absolute left-3 h-0.5 w-[18px] bg-(--rc-white) transition duration-160 ${
                menuAbierto ? "top-[21px] rotate-45 shadow-none" : "top-4 shadow-[0_6px_0_var(--rc-white)]"
              }`}
            />
            <span
              className={`absolute left-3 h-0.5 w-[18px] bg-(--rc-white) transition duration-160 ${
                menuAbierto ? "top-[21px] -rotate-45" : "top-7"
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        aria-hidden="true"
        onClick={() => setMenuAbierto(false)}
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 lg:hidden ${
          menuAbierto ? "opacity-45" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        id="menu-movil"
        inert={!menuAbierto}
        className={`fixed inset-y-0 right-0 z-50 w-[min(84vw,340px)] border-l border-(--rc-border) bg-(--rc-panel) backdrop-blur-xl transition-transform duration-450 ${EASE} lg:hidden ${
          menuAbierto ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex h-full flex-col px-6 pt-24 pb-8">
          {[...LINKS, { id: "entradas", texto: "Comprar entrada", boton: true }].map(
            ({ id, texto, boton }, i) => (
              <li
                key={id}
                style={{ transitionDelay: menuAbierto ? `${i * 60}ms` : "0ms" }}
                className={`transition duration-400 ${EASE} ${boton ? "pt-6" : ""} ${
                  menuAbierto ? "translate-x-0 opacity-100" : "translate-x-5 opacity-0"
                }`}
              >
                {boton ? (
                  <a
                    href={`/#${id}`}
                    onClick={(e) => irA(e, id)}
                    className={`${BOTON_ROJO} min-h-[52px] w-full text-[17px]`}
                  >
                    {texto}
                  </a>
                ) : (
                  <a
                    href={`/#${id}`}
                    onClick={(e) => irA(e, id)}
                    aria-current={activa === id ? "true" : undefined}
                    className="flex min-h-14 items-center border-b border-(--rc-border) py-3.5 text-2xl font-extrabold"
                  >
                    {texto}
                  </a>
                )}
              </li>
            )
          )}
          <li
            style={{ transitionDelay: menuAbierto ? `${(LINKS.length + 1) * 60}ms` : "0ms" }}
            className={`pt-3 transition duration-400 ${EASE} ${menuAbierto ? "translate-x-0 opacity-100" : "translate-x-5 opacity-0"}`}
          >
            <BotonTema tema={tema} onCambiar={alternarTema} conTexto />
          </li>
        </ul>
      </div>
    </header>
  );
}