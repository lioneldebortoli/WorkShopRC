import { useEnPantalla } from "../hooks/useEnPantalla";

const ORIGEN = {
  abajo: "translate-y-8",
  izquierda: "-translate-x-16",
  derecha: "translate-x-16",
};

export const Reveal = ({
  as: Etiqueta = "div",
  desde = "abajo",
  retraso = 0,
  className = "",
  children,
}) => {
  const [ref, visible] = useEnPantalla();

  return (
    <Etiqueta
      ref={ref}
      style={{ transitionDelay: `${retraso}ms` }}
      className={`transition-all duration-800 ease-[cubic-bezier(0.22,0.8,0.3,1)] motion-reduce:transition-none ${
        visible ? "translate-x-0 translate-y-0 opacity-100" : `${ORIGEN[desde]} opacity-0`
      } ${className}`}
    >
      {children}
    </Etiqueta>
  );
};