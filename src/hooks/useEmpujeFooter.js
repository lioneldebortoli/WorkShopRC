import { useEffect, useState } from "react";

export function useEmpujeFooter() {
  const [empuje, setEmpuje] = useState(0);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const medir = () => setEmpuje(Math.max(0, Math.round(window.innerHeight - footer.getBoundingClientRect().top)));
    const escuchar = () => {
      window.addEventListener("scroll", medir, { passive: true });
      window.addEventListener("resize", medir);
    };
    const dejarDeEscuchar = () => {
      window.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
    };

    const observer = new IntersectionObserver(([entrada]) => {
      if (entrada.isIntersecting) {
        medir();
        escuchar();
      } else {
        setEmpuje(0);
        dejarDeEscuchar();
      }
    });
    observer.observe(footer);

    return () => {
      observer.disconnect();
      dejarDeEscuchar();
    };
  }, []);

  return empuje;
}