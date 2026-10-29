import { useEffect, useState } from "react";
import { useEmpujeFooter } from "../hooks/useEmpujeFooter";

export const BotonArriba = () => {
  const [visible, setVisible] = useState(false);
  const empuje = useEmpujeFooter();

  useEffect(() => {
    const actualizar = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", actualizar, { passive: true });
    return () => window.removeEventListener("scroll", actualizar);
  }, []);

  return (
    <button
      type="button"
      aria-label="Volver arriba"
      inert={!visible}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{ marginBottom: empuje }}
      className={`fixed right-5 bottom-24 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-(--rc-chip-border) bg-(--rc-surface-2) text-(--rc-white) shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-0.5 hover:border-(--rc-red) hover:bg-(--rc-red) motion-reduce:transition-none md:right-8 md:bottom-28 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          d="M12 19V5M5 12l7-7 7 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};