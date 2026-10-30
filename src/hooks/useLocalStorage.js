import { useCallback, useEffect, useState } from "react";

const EVENTO = "rc-local-storage";

const leer = (clave, inicial) => {
  try {
    const guardado = localStorage.getItem(clave);
    return guardado === null ? inicial : JSON.parse(guardado);
  } catch {
    return inicial;
  }
};

const escribir = (clave, valor) => {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch {
    return false;
  }
};

export function useLocalStorage(clave, inicial) {
  const [valor, setValor] = useState(() => leer(clave, inicial));

  useEffect(() => {
    const sincronizar = (e) => {
      if (e.key === clave || e.detail === clave) setValor(leer(clave, inicial));
    };
    window.addEventListener("storage", sincronizar);
    window.addEventListener(EVENTO, sincronizar);
    return () => {
      window.removeEventListener("storage", sincronizar);
      window.removeEventListener(EVENTO, sincronizar);
    };
  }, [clave, inicial]);

  const guardar = useCallback(
    (nuevo) => {
      const siguiente = typeof nuevo === "function" ? nuevo(leer(clave, inicial)) : nuevo;
      escribir(clave, siguiente);
      setValor(siguiente);
      window.dispatchEvent(new CustomEvent(EVENTO, { detail: clave }));
    },
    [clave, inicial]
  );

  return [valor, guardar];
}