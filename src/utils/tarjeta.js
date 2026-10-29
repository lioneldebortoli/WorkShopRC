export const formatearNumero = (valor) =>
  valor.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");

export const formatearVencimiento = (valor) => {
  const numeros = valor.replace(/\D/g, "").slice(0, 4);
  return numeros.length > 2 ? `${numeros.slice(0, 2)}/${numeros.slice(2)}` : numeros;
};

export const detectarMarca = (numero) => {
  const n = numero.replace(/\s/g, "");
  if (/^4/.test(n)) return "visa";
  if (/^5[1-5]/.test(n)) return "mastercard";
  const cuatro = Number(n.slice(0, 4));
  if (n.length >= 4 && cuatro >= 2221 && cuatro <= 2720) return "mastercard";
  return null;
};

export const pasaLuhn = (numero) => {
  let suma = 0;
  [...numero].reverse().forEach((caracter, i) => {
    let digito = Number(caracter);
    if (i % 2 === 1) {
      digito *= 2;
      if (digito > 9) digito -= 9;
    }
    suma += digito;
  });
  return suma % 10 === 0;
};

export const estaVencida = (vence) => {
  const [mes, anio] = vence.split("/").map(Number);
  const hoy = new Date();
  const anioActual = hoy.getFullYear() % 100;
  const mesActual = hoy.getMonth() + 1;
  return anio < anioActual || (anio === anioActual && mes < mesActual);
};