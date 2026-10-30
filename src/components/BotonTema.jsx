const Sol = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

const Luna = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
  </svg>
);

export const BotonTema = ({ tema, onCambiar, conTexto = false, className = "" }) => {
  const claro = tema === "claro";
  const accion = claro ? "Activar modo oscuro" : "Activar modo claro";

  return (
    <button
      type="button"
      onClick={onCambiar}
      aria-label={conTexto ? undefined : accion}
      title={accion}
      className={`flex cursor-pointer items-center justify-center gap-3 rounded-full border border-(--rc-border) text-(--rc-white) transition hover:border-(--rc-red) hover:text-(--rc-red) ${
        conTexto ? "min-h-12 w-full px-5 font-extrabold" : "h-11 w-11"
      } ${className}`}
    >
      {claro ? <Luna /> : <Sol />}
      {conTexto && accion}
    </button>
  );
};
