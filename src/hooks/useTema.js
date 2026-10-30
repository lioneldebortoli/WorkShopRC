import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

const SIN_ELECCION = null;

export function useTema() {
  const [eleccion, setEleccion] = useLocalStorage("rc-tema", SIN_ELECCION);
  const tema = eleccion ?? "oscuro";

  useEffect(() => {
    if (tema === "claro") document.documentElement.dataset.tema = "claro";
    else document.documentElement.removeAttribute("data-tema");
  }, [tema]);

  const alternarTema = () => setEleccion(tema === "claro" ? "oscuro" : "claro");

  return { tema, alternarTema };
}
