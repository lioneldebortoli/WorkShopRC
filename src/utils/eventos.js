export const EVENTOS = {
  cargarEntradas: "rc-cargar-entradas",
  verEntradas: "rc-ver-entradas",
  preguntar: "rc-preguntar",
};

export const emitir = (nombre, detalle) => window.dispatchEvent(new CustomEvent(nombre, { detail: detalle }));
