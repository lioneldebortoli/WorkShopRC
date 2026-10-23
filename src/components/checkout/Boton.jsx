const base =
  "min-h-[52px] cursor-pointer rounded-full px-8 text-lg font-extrabold transition disabled:cursor-not-allowed disabled:opacity-60";

const variantes = {
  negro: "bg-(--rc-black) text-(--rc-white) hover:bg-(--rc-surface-2)",
  borde: "border-2 border-(--rc-input-border) text-(--rc-black) hover:bg-zinc-100",
};

export default function Boton({ variante = "negro", className = "", ...props }) {
  return <button className={`${base} ${variantes[variante]} ${className}`} {...props} />;
}