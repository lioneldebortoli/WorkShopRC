import { CUPONES } from "../data/coupons";
import { formatearPrecio } from "./formato";

const aplicaA = (cupon, idEntrada) => cupon.aplicaA === "todas" || cupon.aplicaA.includes(idEntrada);

export const buscarCupon = (codigo, hoy = new Date()) => {
  const limpio = codigo.trim().toUpperCase();
  if (!limpio) return { error: "Escribí un código de cupón." };

  const cupon = CUPONES.find((c) => c.codigo === limpio);
  if (!cupon) return { error: "El cupón no existe. Revisá que esté bien escrito." };
  if (cupon.vence && new Date(`${cupon.vence}T23:59:59`) < hoy) return { error: "El cupón está vencido." };

  return { cupon };
};

export const baseDelCupon = (cupon, lineas) =>
  lineas.filter((linea) => aplicaA(cupon, linea.id)).reduce((suma, linea) => suma + linea.subtotal, 0);

export const calcularDescuento = (cupon, lineas) => {
  if (!cupon) return 0;
  const base = baseDelCupon(cupon, lineas);
  const descuento = cupon.tipo === "porcentaje" ? Math.round((base * cupon.valor) / 100) : cupon.valor;
  return Math.min(descuento, base);
};

export const describirCupon = (cupon) =>
  cupon.tipo === "porcentaje" ? `${cupon.valor}% de descuento` : `${formatearPrecio(cupon.valor)} de descuento`;