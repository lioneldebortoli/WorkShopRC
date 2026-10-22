import logo from "../assets/logo/logo-rolling-blanco.png";
import instagramIcon from "../assets/iconos/instagram.svg";
import facebookIcon from "../assets/iconos/facebook.svg";
import linkedinIcon from "../assets/iconos/linkedin.svg";
import youtubeIcon from "../assets/iconos/youtube.svg";

const redesSociales = [
  { nombre: "Instagram", url: "https://instagram.com", icono: instagramIcon },
  { nombre: "Facebook", url: "https://facebook.com", icono: facebookIcon },
  { nombre: "LinkedIn", url: "https://linkedin.com", icono: linkedinIcon },
  { nombre: "YouTube", url: "https://youtube.com", icono: youtubeIcon },
];

export const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <a href="/" className="flex items-center gap-3" aria-label="Inicio">
          <img src={logo} alt="Rolling Code logo" className="h-10 w-auto" />
        </a>

        <nav aria-label="Redes sociales" className="flex items-center gap-2">
          {redesSociales.map(({ nombre, icono, url }) => (
            <a
              key={nombre}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={nombre}
              title={nombre}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
            >
              <img src={icono} alt={nombre} className="h-4 w-4 object-contain" />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};
