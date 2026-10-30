const EMAILS_PERSONALES = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "live.com", "icloud.com"];

export const esEmail = (texto) => /^\S+@\S+\.\S+$/.test(texto.trim());

export const esSoloLetras = (texto) => /^[a-záéíóúüñ' ]+$/i.test(texto.trim());

export const esDni = (texto) => /^\d{7,8}$/.test(texto.trim());

export const esEmailPersonal = (email) =>
  EMAILS_PERSONALES.includes(email.trim().toLowerCase().split("@")[1]);