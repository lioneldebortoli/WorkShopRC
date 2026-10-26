import { useEffect, useState } from "react";
import logo from "../assets/logo/logo-rolling-blanco.png";

const NAV_LINKS = [
  { label: "Speakers", href: "/#speakers" },
  { label: "Agenda", href: "/#agenda" },
  { label: "Como llegar", href: "/#como-llegar" },
];

const BUY_LINK = { label: "Comprar entrada", href: "/#comprar" };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <nav className="navbar__container" aria-label="Navegación principal">
        <a href="/#inicio" className="navbar__logo" onClick={closeMenu}>
          <img
            src={logo}
            alt="Rolling Code School"
            className="navbar__logo-img"
          />
        </a>

        <button
          type="button"
          className={`navbar__toggle ${menuOpen ? "is-open" : ""}`}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="navbar-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        ></button>

        <ul
          id="navbar-menu"
          className={`navbar__menu ${menuOpen ? "navbar__menu--open" : ""}`}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className="navbar__link" onClick={closeMenu}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href={BUY_LINK.href} className="navbar__cta" onClick={closeMenu}>
              {BUY_LINK.label}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}