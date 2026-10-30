import logo from "../assets/logo/logo-rolling-blanco.png";
import logoNegro from "../assets/logo/logo-rolling-negro.png";
import instagramIcon from "../assets/iconos/instagram.svg";
import facebookIcon from "../assets/iconos/facebook.svg";
import linkedinIcon from "../assets/iconos/linkedin.svg";
import youtubeIcon from "../assets/iconos/youtube.svg";
import x from "../assets/iconos/x.svg";
import github from "../assets/iconos/github.svg";

const redesSociales = [
  { nombre: "Instagram", url: "https://www.instagram.com/rollingcodeschool", icono: instagramIcon },
  { nombre: "Facebook", url: "https://www.facebook.com/RollingCodeSchool", icono: facebookIcon },
  { nombre: "LinkedIn", url: "https://ar.linkedin.com/school/rollingcodeschool", icono: linkedinIcon },
  { nombre: "YouTube", url: "https://www.youtube.com/@rollingcode7175", icono: youtubeIcon },
  { nombre: "X", url: "https://x.com/rollingcodeok", icono: x },
  { nombre: "GitHub", url: "https://github.com/RollingCodeSchool", icono: github },
];

export const Footer = () => {
  return (
    <footer className="mt-24 border-t border-(--rc-border)">
      <div className="mx-auto flex max-w-[1248px] flex-col items-center justify-between gap-6 px-6 py-8 sm:flex-row">
        <a href="/#inicio" aria-label="Volver al inicio">
          <img src={logo} alt="Rolling Code School" className="h-10 w-auto claro:hidden" />
          <img src={logoNegro} alt="Rolling Code School" className="hidden h-10 w-auto claro:block" />
        </a>

        <ul aria-label="Redes sociales" className="flex flex-wrap items-center justify-center gap-2.5">
          {redesSociales.map(({ nombre, icono, url }) => (
            <li key={nombre}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${nombre} (se abre en otra pestaña)`}
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-(--rc-chip-border) bg-(--rc-surface-2) transition duration-300 hover:-translate-y-0.5 hover:border-(--rc-red) hover:bg-(--rc-red) motion-reduce:transition-none"
              >
                <img src={icono} alt="" className="h-5 w-5 claro:invert claro:group-hover:invert-0" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}