import { useEffect } from "react";

const DURACION = 3500;

export const Toast = ({ mensaje, onCerrar }) => {
  useEffect(() => {
    if (!mensaje) return;
    const id = setTimeout(onCerrar, DURACION);
    return () => clearTimeout(id);
  }, [mensaje, onCerrar]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-24 left-1/2 z-[70] w-[min(calc(100vw-40px),420px)] -translate-x-1/2 transition duration-300 motion-reduce:transition-none ${
        mensaje ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {mensaje && (
        <div className="flex items-center gap-3 rounded-[18px] border border-[#4ade80]/40 bg-(--rc-surface-2) px-5 py-4 text-(--rc-white) shadow-[0_18px_40px_rgba(0,0,0,0.5)]">
          <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-600 font-extrabold">
            ✓
          </span>
          <p className="font-semibold">{mensaje}</p>
        </div>
      )}
    </div>
  );
};