import { useEffect, useRef, useState } from "react";

export function useEnPantalla(umbral = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: umbral }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [umbral]);

  return [ref, visible];
}