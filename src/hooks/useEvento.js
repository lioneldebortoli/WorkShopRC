import { useEffect, useRef } from "react";

export function useEvento(nombre, manejador) {
  const manejadorRef = useRef(manejador);

  useEffect(() => {
    manejadorRef.current = manejador;
  });

  useEffect(() => {
    const escuchar = (e) => manejadorRef.current(e.detail);
    window.addEventListener(nombre, escuchar);
    return () => window.removeEventListener(nombre, escuchar);
  }, [nombre]);
}
