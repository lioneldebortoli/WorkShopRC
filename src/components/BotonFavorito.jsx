export const BotonFavorito = ({ activa, titulo, onClick, className = "" }) => (
  <button
    type="button"
    aria-pressed={activa}
    aria-label={activa ? `Quitar "${titulo}" de mi agenda` : `Agregar "${titulo}" a mi agenda`}
    title={activa ? "Quitar de mi agenda" : "Agregar a mi agenda"}
    onClick={onClick}
    className={`flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border transition duration-300 hover:scale-110 motion-reduce:transition-none ${
      activa
        ? "border-[#f5b301] bg-[#f5b301]/15 text-[#f5b301]"
        : "border-(--rc-chip-border) bg-(--rc-black)/70 text-(--rc-text-soft) hover:text-[#f5b301]"
    } ${className}`}
  >
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill={activa ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />
    </svg>
  </button>
);
