import logo from "../assets/logo/logo-rolling-blanco.png";
import instagramIcon from "../assets/iconos/instagram.svg";
import facebookIcon from "../assets/iconos/facebook.svg";
import linkedinIcon from "../assets/iconos/linkedin.svg";
import youtubeIcon from "../assets/iconos/youtube.svg";
import x from "../assets/iconos/x.svg";
import github from "../assets/iconos/github.svg";

const redesSociales = [
  { nombre: "Instagram", url: "https://www.instagram.com/rollingcodeschool", 
    icono: instagramIcon, colorHover: "hover:bg-[#E4405F] hover:border-[#E4405F]" },
  { nombre: "Facebook", url: "https://www.facebook.com/RollingCodeSchool", 
    icono: facebookIcon, colorHover: "hover:bg-[#1877F2] hover:border-[#1877F2]" },
  { nombre: "LinkedIn", url: "https://ar.linkedin.com/school/rollingcodeschool", 
    icono: linkedinIcon, colorHover: "hover:bg-[#0A66C2] hover:border-[#0A66C2]" },
  { nombre: "YouTube", url: "https://www.youtube.com/@rollingcode7175", 
    icono: youtubeIcon, colorHover: "hover:bg-[#FF0000] hover:border-[#FF0000]" },
  { nombre: "x", url: "https://x.com/rollingcodeok", 
    icono: x, colorHover: "hover:bg-white hover:border-white" },
  { nombre: "GitHub", url: "https://github.com/RollingCodeSchool", 
    icono: github, colorHover: "hover:bg-[#f0f6fc] hover:border-[#f0f6fc]" },
];

export const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <a href="/" className="flex items-center gap-3" aria-label="Inicio">
          <img src={logo} alt="Rolling Code logo" className="h-10 w-auto" />
        </a>

        <nav aria-label="Redes sociales" className="flex items-center gap-2">
          {redesSociales.map(({ nombre, icono, url, colorHover }) => (
            <a
              key={nombre}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={nombre}
              title={nombre}
              className={`group relative flex h-7 w-7 items-center justify-center rounded-full 
                border border-white/10 text-neutral-400 transition ${colorHover}`}
            >
              <img
                src={icono}
                alt={nombre}
                className={`h-4 w-4 object-contain ${nombre === "x" || nombre === "GitHub" ? 
                  "transition group-hover:invert" : ""}`}
              />
              <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 
              -translate-x-1/2 whitespace-nowrap rounded bg-white px-2 py-1 text-xs font-medium 
              text-black opacity-0 shadow transition-opacity group-hover:opacity-100 
              group-focus-visible:opacity-100">
                {nombre}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};
