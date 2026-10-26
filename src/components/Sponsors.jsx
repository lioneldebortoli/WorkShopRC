import { Reveal } from "./Reveal";
import mercadoLibre from "../assets/sponsors/mercado-libre-logo.png";
import microsoft from "../assets/sponsors/Microsoft_Logo_256px.png";
import globant from "../assets/sponsors/globant_icono_256x256.png";

const ICONOS = "https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons";

const NIVELES = [
  {
    id: "main",
    titulo: "Main Partners",
    insignia: "Tier Diamante",
    texto: "Presencia estelar en conferencias, stands experienciales y becas formativas",
    color: "#e0202a",
    empresas: [
      {
        nombre: "Google Cloud",
        icono: "googlecloud",
        colorLogo: "#4285F4",
        etiqueta: "Lead Cloud Partner",
        descripcion: "Infraestructura global ultra-escalable, Gemini AI APIs y programas de formación profesional para devs.",
        rubro: "Cloud & AI",
        destaque: "100% Verified",
        color: "#e0202a",
      },
      {
        nombre: "Amazon Web Services",
        icono: "amazonwebservices",
        colorLogo: "#FF9900",
        etiqueta: "Infrastructure Partner",
        descripcion: "Servicios de nube, arquitecturas serverless y vouchers para certificaciones oficiales para la comunidad.",
        rubro: "Cloud Hosting",
        destaque: "Global Leader",
        color: "#d9822b",
      },
      {
        nombre: "Mercado Libre",
        imagen: mercadoLibre,
        tamanoImagen: "h-4/5 w-4/5",
        etiqueta: "Fintech & E-commerce",
        descripcion: "El mayor ecosistema tech de Latinoamérica impulsando becas, hackathons y pasantías directas de empleo.",
        rubro: "Fintech Scale",
        destaque: "Unicorn LATAM",
        color: "#e8c547",
      },
    ],
  },
  {
    id: "gold",
    titulo: "Gold Tier",
    insignia: "Nivel Oro",
    texto: "Líderes de producto, frameworks y transformación digital global",
    color: "#e8c547",
    empresas: [
      { nombre: "Microsoft", imagen: microsoft, detalle: "Azure & Dev Tools", etiqueta: "Enterprise" },
      { nombre: "GitHub", icono: "github", colorLogo: "#FFFFFF", detalle: "Open Source & Copilot", etiqueta: "Community" },
      { nombre: "Globant", imagen: globant, detalle: "Tech Reinvention", etiqueta: "Global Talent" },
      { nombre: "Auth0", icono: "auth0", colorLogo: "#EB5424", detalle: "Identity & Security", etiqueta: "Security" },
      { nombre: "Vercel", icono: "vercel", colorLogo: "#FFFFFF", detalle: "Frontend Cloud & Next", etiqueta: "Deployment" },
    ],
  },
  {
    id: "bronze",
    titulo: "Bronze Tier",
    insignia: "Nivel Bronce",
    texto: "Herramientas y plataformas predilectas de la comunidad de desarrolladores",
    color: "#d9822b",
    empresas: [
      { nombre: "Supabase", icono: "supabase", colorLogo: "#3FCF8E", detalle: "Open-source DB" },
      { nombre: "DigitalOcean", icono: "digitalocean", colorLogo: "#0080FF", detalle: "Cloud VPS" },
      { nombre: "Cloudflare", icono: "cloudflare", colorLogo: "#F38020", detalle: "Edge & DNS" },
      { nombre: "MongoDB", icono: "mongodb", colorLogo: "#47A248", detalle: "Document DB" },
      { nombre: "Docker", icono: "docker", colorLogo: "#2496ED", detalle: "Containers" },
      { nombre: "Stripe", icono: "stripe", colorLogo: "#635BFF", detalle: "Payments API" },
      { nombre: "Postman", icono: "postman", colorLogo: "#FF6C37", detalle: "API Platform" },
    ],
  },
];

const Logo = ({ empresa, tamano }) => {
  const caja = `flex shrink-0 items-center justify-center rounded-2xl border border-(--rc-border) bg-(--rc-black) ${tamano}`;

  if (empresa.imagen) {
    return (
      <span className={caja} aria-hidden="true">
        <img
          src={empresa.imagen}
          alt=""
          loading="lazy"
          className={`object-contain ${empresa.tamanoImagen ?? "h-3/5 w-3/5"}`}
        />
      </span>
    );
  }

  return (
    <span className={caja} aria-hidden="true">
      <span
        className="h-1/2 w-1/2 [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
        style={{ backgroundColor: empresa.colorLogo, maskImage: `url(${ICONOS}/${empresa.icono}.svg)` }}
      />
    </span>
  );
};

const EncabezadoNivel = ({ nivel }) => (
  <Reveal className="flex items-start gap-3">
    <span
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
      style={{ color: nivel.color, borderColor: `${nivel.color}66`, backgroundColor: `${nivel.color}14` }}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z" />
      </svg>
    </span>
    <div>
      <div className="flex flex-wrap items-center gap-2.5">
        <h3 className="text-lg font-extrabold tracking-[2px] uppercase" style={{ color: nivel.color }}>
          {nivel.titulo}
        </h3>
        <span
          className="rounded-md border px-2 py-0.5 text-xs font-extrabold tracking-[1.5px] uppercase"
          style={{ color: nivel.color, borderColor: `${nivel.color}80`, backgroundColor: `${nivel.color}14` }}
        >
          {nivel.insignia}
        </span>
      </div>
      <p className="mt-1 text-sm text-(--rc-text-mute)">{nivel.texto}</p>
    </div>
  </Reveal>
);

const TarjetaPrincipal = ({ empresa }) => (
  <a
    href="#sumate-sponsor"
    className="group flex h-full flex-col rounded-[28px] border-2 bg-[linear-gradient(180deg,#18181b,var(--rc-surface))] p-6 text-center transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_50px_var(--brillo)] md:p-7"
    style={{ borderColor: `${empresa.color}b3`, "--brillo": `${empresa.color}40` }}
  >
    <span className="flex items-center justify-between">
      <span
        className="rounded-full border px-3 py-1 text-[11px] font-extrabold tracking-[1.5px] uppercase"
        style={{ color: empresa.color, borderColor: `${empresa.color}66`, backgroundColor: `${empresa.color}14` }}
      >
        {empresa.etiqueta}
      </span>
      <span
        aria-hidden="true"
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-(--rc-border) text-(--rc-text-mute) transition group-hover:border-(--rc-white) group-hover:text-(--rc-white)"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </span>
    </span>

    <span className="mx-auto mt-6">
      <Logo empresa={empresa} tamano="h-20 w-20 text-2xl" />
    </span>
    <h4 className="mt-5 text-[26px] leading-tight font-extrabold">{empresa.nombre}</h4>
    <p className="mt-3 mb-6 text-sm leading-[1.55] text-(--rc-text-mute)">{empresa.descripcion}</p>

    <span className="mt-auto flex items-center justify-between gap-3 border-t border-(--rc-border) pt-5 text-sm">
      <span className="font-semibold text-(--rc-text-soft)">{empresa.rubro}</span>
      <b className="font-mono text-xs tracking-wide" style={{ color: empresa.color }}>
        {empresa.destaque}
      </b>
    </span>
  </a>
);

const TarjetaChica = ({ empresa, color, grande }) => (
  <div className="flex h-full flex-col items-center rounded-[20px] border border-(--rc-border) bg-(--rc-surface) px-3 py-5 text-center transition duration-300 hover:-translate-y-1 hover:border-(--rc-chip-border) hover:bg-[#161618]">
    <Logo empresa={empresa} tamano={grande ? "h-14 w-14 text-lg" : "h-11 w-11 text-sm"} />
    <p className={`mt-3 font-extrabold ${grande ? "text-lg" : "text-[15px]"}`}>{empresa.nombre}</p>
    <p className="mt-0.5 text-xs text-(--rc-text-mute)">{empresa.detalle}</p>
    {empresa.etiqueta && (
      <span
        className="mt-3 rounded-md border px-2 py-0.5 text-[11px] font-bold"
        style={{ color, borderColor: `${color}66`, backgroundColor: `${color}14` }}
      >
        {empresa.etiqueta}
      </span>
    )}
  </div>
);

export const Sponsors = () => {
  const [principal, oro, bronce] = NIVELES;

  return (
    <section id="sponsors" className="mx-auto mt-24 max-w-[1248px] px-6 text-(--rc-white)">
      <Reveal>
        <p className="text-base font-extrabold tracking-[3px] text-(--rc-red) uppercase">Sponsors</p>
        <h2 className="mt-3 text-[clamp(34px,4.5vw,56px)] leading-[1.05] font-extrabold tracking-[-1px]">
          Empresas que impulsan el talento IT
        </h2>
      </Reveal>

      <div className="mt-12 space-y-14">
        <div>
          <EncabezadoNivel nivel={principal} />
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {principal.empresas.map((empresa, i) => (
              <Reveal as="li" key={empresa.nombre} retraso={i * 100}>
                <TarjetaPrincipal empresa={empresa} />
              </Reveal>
            ))}
          </ul>
        </div>

        <div>
          <EncabezadoNivel nivel={oro} />
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {oro.empresas.map((empresa, i) => (
              <Reveal as="li" key={empresa.nombre} retraso={i * 70}>
                <TarjetaChica empresa={empresa} color={oro.color} grande />
              </Reveal>
            ))}
          </ul>
        </div>

        <div>
          <EncabezadoNivel nivel={bronce} />
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {bronce.empresas.map((empresa, i) => (
              <Reveal as="li" key={empresa.nombre} retraso={i * 50}>
                <TarjetaChica empresa={empresa} color={bronce.color} />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};