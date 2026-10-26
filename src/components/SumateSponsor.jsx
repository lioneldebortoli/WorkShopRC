import { useId, useRef, useState } from "react";
import { Reveal } from "./Reveal";

const TIPOS = [
  { valor: "main", texto: "Main Partner · Tier Diamante" },
  { valor: "gold", texto: "Gold Tier · Nivel Oro" },
  { valor: "bronze", texto: "Bronze Tier · Nivel Bronce" },
];

const FORMATOS = ["image/png", "image/svg+xml", "image/jpeg", "image/webp"];
const PESO_MAXIMO = 5 * 1024 * 1024;
const MENSAJE_MAXIMO = 500;
const EMAILS_PERSONALES = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "live.com", "icloud.com"];

const VACIO = { nombre: "", apellido: "", empresa: "", email: "", tipo: "", mensaje: "" };

const ESTILO_CAMPO =
  "w-full rounded-[14px] border bg-(--rc-black) px-4 text-(--rc-white) outline-none transition placeholder:text-[#71717a] focus:border-(--rc-red)";

const Etiqueta = ({ htmlFor, children, requerido }) => (
  <label htmlFor={htmlFor} className="mb-2 block text-xs font-extrabold tracking-[1.5px] uppercase">
    {children}
    {requerido && (
      <span className="text-(--rc-red)" aria-hidden="true">
        {" "}*
      </span>
    )}
  </label>
);

const MensajeError = ({ id, children }) =>
  children ? (
    <p id={id} className="mt-1.5 text-sm font-semibold text-[#ff4d55]">
      {children}
    </p>
  ) : null;

const formatearPeso = (bytes) =>
  bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

export const SumateSponsor = () => {
  const id = useId();
  const inputArchivo = useRef(null);
  const [datos, setDatos] = useState(VACIO);
  const [logo, setLogo] = useState(null);
  const [arrastrando, setArrastrando] = useState(false);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(null);

  const campo = (nombre) => ({
    id: `${id}-${nombre}`,
    name: nombre,
    value: datos[nombre],
    onChange: (e) => {
      setDatos({ ...datos, [nombre]: e.target.value });
      setErrores({ ...errores, [nombre]: "" });
    },
    "aria-invalid": errores[nombre] ? "true" : undefined,
    "aria-describedby": errores[nombre] ? `${id}-${nombre}-error` : undefined,
  });

  const borde = (nombre) => (errores[nombre] ? "border-[#ff4d55]" : "border-(--rc-chip-border)");

  const elegirLogo = (archivo) => {
    if (!archivo) return;
    let error = "";
    if (!FORMATOS.includes(archivo.type)) error = "El logo tiene que ser PNG, SVG, JPG o WEBP.";
    else if (archivo.size > PESO_MAXIMO) error = "El logo no puede pesar más de 5 MB.";
    setLogo(error ? null : archivo);
    setErrores({ ...errores, logo: error });
  };

  const soltar = (e) => {
    e.preventDefault();
    setArrastrando(false);
    elegirLogo(e.dataTransfer.files[0]);
  };

  const enviar = (e) => {
    e.preventDefault();
    const nuevos = {};
    const soloLetras = /^[a-záéíóúüñ' ]+$/i;
    const email = datos.email.trim().toLowerCase();

    if (!datos.nombre.trim()) nuevos.nombre = "Completá tu nombre.";
    else if (!soloLetras.test(datos.nombre.trim())) nuevos.nombre = "El nombre solo puede tener letras.";

    if (!datos.apellido.trim()) nuevos.apellido = "Completá tu apellido.";
    else if (!soloLetras.test(datos.apellido.trim())) nuevos.apellido = "El apellido solo puede tener letras.";

    if (!datos.empresa.trim()) nuevos.empresa = "Completá el nombre de la empresa.";
    else if (datos.empresa.trim().length < 2) nuevos.empresa = "El nombre de la empresa es muy corto.";

    if (!email) nuevos.email = "Completá tu email corporativo.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) nuevos.email = "El email no es válido. Ejemplo: martin@acme.com";
    else if (EMAILS_PERSONALES.includes(email.split("@")[1])) nuevos.email = "Usá el email de tu empresa, no uno personal.";

    if (!datos.tipo) nuevos.tipo = "Elegí un nivel de sponsoreo.";

    if (errores.logo) nuevos.logo = errores.logo;

    if (datos.mensaje.length > MENSAJE_MAXIMO) nuevos.mensaje = `El mensaje puede tener hasta ${MENSAJE_MAXIMO} caracteres.`;

    setErrores(nuevos);
    if (Object.keys(nuevos).length === 0) {
      setEnviado({ nombre: datos.nombre.trim(), empresa: datos.empresa.trim() });
    }
  };

  const reiniciar = () => {
    setDatos(VACIO);
    setLogo(null);
    setErrores({});
    setEnviado(null);
  };

  return (
    <section id="sumate-sponsor" className="mx-auto mt-24 max-w-[1248px] px-6 text-(--rc-white)">
      <Reveal className="mx-auto max-w-[760px] text-center">
        <h2 className="text-[clamp(34px,4.5vw,56px)] leading-[1.05] font-extrabold tracking-[-1px]">
          Sumate como Sponsor
        </h2>
        <p className="mt-4 text-lg leading-[1.55] text-(--rc-text-soft)">
          Conectá tu marca con más de 120 talentos IT, programadores junior, semi-seniors y líderes tecnológicos
          del norte argentino. Completá el formulario y nos contactaremos en menos de 24 horas hábiles.
        </p>
      </Reveal>

      <Reveal
        retraso={100}
        className="relative mx-auto mt-10 max-w-[900px] overflow-hidden rounded-[32px] border border-(--rc-border) bg-[linear-gradient(160deg,#18181b,var(--rc-surface)_60%,#1c0c0d)] p-6 md:p-10"
      >
        {enviado ? (
          <div className="py-10 text-center" role="status">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-(--rc-red)">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </span>
            <h3 className="mt-5 text-3xl font-extrabold">¡Gracias, {enviado.nombre}!</h3>
            <p className="mx-auto mt-3 max-w-[460px] text-lg text-(--rc-text-soft)">
              Recibimos la postulación de <strong className="text-(--rc-white)">{enviado.empresa}</strong>. Te
              contactamos en menos de 24 horas hábiles.
            </p>
            <button
              type="button"
              onClick={reiniciar}
              className="mt-8 inline-flex min-h-[52px] cursor-pointer items-center rounded-full border-2 border-(--rc-white) px-8 text-lg font-extrabold transition hover:bg-(--rc-white) hover:text-(--rc-black)"
            >
              Enviar otra postulación
            </button>
          </div>
        ) : (
          <form onSubmit={enviar} noValidate className="grid gap-x-6 gap-y-5 md:grid-cols-2">
            <div>
              <Etiqueta htmlFor={`${id}-nombre`} requerido>Nombre</Etiqueta>
              <input {...campo("nombre")} autoComplete="given-name" placeholder="Ej. Martín" className={`${ESTILO_CAMPO} h-12 ${borde("nombre")}`} />
              <MensajeError id={`${id}-nombre-error`}>{errores.nombre}</MensajeError>
            </div>

            <div>
              <Etiqueta htmlFor={`${id}-apellido`} requerido>Apellido</Etiqueta>
              <input {...campo("apellido")} autoComplete="family-name" placeholder="Ej. González" className={`${ESTILO_CAMPO} h-12 ${borde("apellido")}`} />
              <MensajeError id={`${id}-apellido-error`}>{errores.apellido}</MensajeError>
            </div>

            <div>
              <Etiqueta htmlFor={`${id}-empresa`} requerido>Empresa</Etiqueta>
              <input {...campo("empresa")} autoComplete="organization" placeholder="Ej. Acme Technologies" className={`${ESTILO_CAMPO} h-12 ${borde("empresa")}`} />
              <MensajeError id={`${id}-empresa-error`}>{errores.empresa}</MensajeError>
            </div>

            <div>
              <Etiqueta htmlFor={`${id}-email`} requerido>Email corporativo</Etiqueta>
              <input {...campo("email")} type="email" autoComplete="email" placeholder="martin@acme.com" className={`${ESTILO_CAMPO} h-12 ${borde("email")}`} />
              <MensajeError id={`${id}-email-error`}>{errores.email}</MensajeError>
            </div>

            <div className="md:col-span-2">
              <Etiqueta htmlFor={`${id}-tipo`} requerido>Tipo de sponsor</Etiqueta>
              <div className="relative">
                <select {...campo("tipo")} className={`${ESTILO_CAMPO} h-12 cursor-pointer appearance-none pr-12 ${borde("tipo")} ${datos.tipo ? "" : "text-[#71717a]"}`}>
                  <option value="" disabled>
                    Seleccioná un nivel
                  </option>
                  {TIPOS.map((tipo) => (
                    <option key={tipo.valor} value={tipo.valor} className="text-(--rc-white)">
                      {tipo.texto}
                    </option>
                  ))}
                </select>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-(--rc-text-mute)" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
              <MensajeError id={`${id}-tipo-error`}>{errores.tipo}</MensajeError>
            </div>

            <div className="md:col-span-2">
              <Etiqueta htmlFor={`${id}-logo`}>Logo de la empresa</Etiqueta>
              <input
                ref={inputArchivo}
                id={`${id}-logo`}
                type="file"
                accept=".png,.svg,.jpg,.jpeg,.webp"
                className="sr-only"
                onChange={(e) => elegirLogo(e.target.files[0])}
                aria-describedby={errores.logo ? `${id}-logo-error` : undefined}
              />
              <div
                role="button"
                tabIndex={0}
                aria-label="Adjuntar logo de la empresa"
                onClick={() => inputArchivo.current.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    inputArchivo.current.click();
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setArrastrando(true);
                }}
                onDragLeave={() => setArrastrando(false)}
                onDrop={soltar}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-[18px] border-2 border-dashed px-4 py-8 text-center transition ${
                  arrastrando
                    ? "border-(--rc-red) bg-(--rc-red)/10"
                    : errores.logo
                      ? "border-[#ff4d55] bg-(--rc-black)"
                      : "border-(--rc-chip-border) bg-(--rc-black) hover:border-(--rc-text-mute)"
                }`}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--rc-surface-2)">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 16V4M7 9l5-5 5 5M5 20h14" />
                  </svg>
                </span>
                {logo ? (
                  <>
                    <p className="mt-3 font-extrabold break-all">{logo.name}</p>
                    <p className="mt-1 text-sm text-(--rc-text-mute)">
                      {formatearPeso(logo.size)} · Hacé clic para cambiarlo
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mt-3 font-extrabold">Hacé clic para adjuntar tu logo o arrastralo aquí</p>
                    <p className="mt-1 text-sm text-(--rc-text-mute)">
                      Archivos aceptados: PNG, SVG, JPG o WEBP (fondo transparente recomendado, máx. 5 MB)
                    </p>
                  </>
                )}
              </div>
              <MensajeError id={`${id}-logo-error`}>{errores.logo}</MensajeError>
            </div>

            <div className="md:col-span-2">
              <Etiqueta htmlFor={`${id}-mensaje`}>Mensaje opcional</Etiqueta>
              <textarea
                {...campo("mensaje")}
                rows={4}
                placeholder="Contanos sobre tu empresa y por qué buscás ser sponsor del evento"
                className={`${ESTILO_CAMPO} resize-y py-3 ${borde("mensaje")}`}
              />
              <div className="flex justify-between gap-4">
                <MensajeError id={`${id}-mensaje-error`}>{errores.mensaje}</MensajeError>
                <p
                  className={`mt-1.5 ml-auto text-sm tabular-nums ${
                    datos.mensaje.length > MENSAJE_MAXIMO ? "text-[#ff4d55]" : "text-(--rc-text-mute)"
                  }`}
                >
                  {datos.mensaje.length}/{MENSAJE_MAXIMO}
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="flex min-h-[56px] cursor-pointer items-center justify-center gap-2 rounded-full bg-(--rc-red) px-4 text-[15px] font-extrabold sm:gap-3 sm:text-lg transition duration-300 hover:-translate-y-0.5 hover:bg-[#ff2d3a] hover:shadow-[0_12px_30px_rgba(224,32,42,0.45)] md:col-span-2"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 3 10 14M21 3l-7 18-4-7-7-4z" />
              </svg>
              Enviar postulación<span className="hidden sm:inline"> de Sponsor</span>
            </button>
          </form>
        )}
      </Reveal>
    </section>
  );
};