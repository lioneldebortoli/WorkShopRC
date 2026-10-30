const CARACTERES = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const generarCodigo = () => {
  const azar = crypto.getRandomValues(new Uint32Array(6));
  return `RC-2026-${[...azar].map((numero) => CARACTERES[numero % CARACTERES.length]).join("")}`;
};

export const generarCodigos = (cantidad) => {
  const codigos = new Set();
  while (codigos.size < cantidad) codigos.add(generarCodigo());
  return [...codigos];
};