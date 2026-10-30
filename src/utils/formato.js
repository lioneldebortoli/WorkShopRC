export const formatearPrecio = (numero) => `$${numero.toLocaleString("de-DE")}`;

export const formatearPeso = (bytes) =>
  bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

export const normalizarTexto = (texto) =>
  texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");