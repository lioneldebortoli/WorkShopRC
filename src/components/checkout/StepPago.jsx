import { useState } from "react";
import Boton from "./Boton";
import Campo from "./Campo";

const LOGOS = {
  visa: (
    <span className="rounded-md bg-[#1a1f71] px-2 py-1 text-xs font-extrabold text-white italic">VISA</span>
  ),
  mastercard: (
    <span className="flex items-center rounded-md bg-(--rc-black) px-1.5 py-1.5" aria-label="Mastercard">
      <span className="h-4 w-4 rounded-full bg-[#eb001b]" />
      <span className="-ml-1.5 h-4 w-4 rounded-full bg-[#f79e1b]/90" />
    </span>
  ),
};

const formatearNumero = (valor) =>
  valor.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");

const formatearVencimiento = (valor) => {
  const numeros = valor.replace(/\D/g, "").slice(0, 4);
  return numeros.length > 2 ? `${numeros.slice(0, 2)}/${numeros.slice(2)}` : numeros;
};

const detectarMarca = (numero) => {
  const n = numero.replace(/\s/g, "");
  if (/^4/.test(n)) return "visa";
  if (/^5[1-5]/.test(n)) return "mastercard";
  const cuatro = Number(n.slice(0, 4));
  if (n.length >= 4 && cuatro >= 2221 && cuatro <= 2720) return "mastercard";
  return null;
};

const pasaLuhn = (numero) => {
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

const estaVencida = (vence) => {
  const [mes, anio] = vence.split("/").map(Number);
  const hoy = new Date();
  const anioActual = hoy.getFullYear() % 100;
  const mesActual = hoy.getMonth() + 1;
  return anio < anioActual || (anio === anioActual && mes < mesActual);
};

export default function StepPago({ total, onPagar, onAtras }) {
  const [tarjeta, setTarjeta] = useState({ titular: "", numero: "", vence: "", cvv: "" });
  const [errores, setErrores] = useState({});

  const marca = detectarMarca(tarjeta.numero);

  const cambiar = (e) => {
    const { name, value } = e.target;
    let limpio = value;
    if (name === "numero") limpio = formatearNumero(value);
    if (name === "vence") limpio = formatearVencimiento(value);
    if (name === "cvv") limpio = value.replace(/\D/g, "").slice(0, 3);
    setTarjeta({ ...tarjeta, [name]: limpio });
    setErrores({ ...errores, [name]: "" });
  };

  const enviar = (e) => {
    e.preventDefault();

    const nuevos = {};
    const numero = tarjeta.numero.replace(/\s/g, "");

    if (!tarjeta.titular.trim()) nuevos.titular = "Completá el nombre que figura en la tarjeta.";
    else if (!/^[a-záéíóúüñ' ]+$/i.test(tarjeta.titular.trim())) nuevos.titular = "El nombre solo puede tener letras.";

    if (!numero) nuevos.numero = "Completá el número de tarjeta.";
    else if (numero.length !== 16) nuevos.numero = "La tarjeta tiene 16 números.";
    else if (!marca) nuevos.numero = "Solo aceptamos Visa o Mastercard.";
    else if (!pasaLuhn(numero)) nuevos.numero = "El número de tarjeta no es válido. Revisalo.";

    if (!tarjeta.vence) nuevos.vence = "Completá el vencimiento.";
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(tarjeta.vence)) nuevos.vence = "Usá el formato MM/AA. Ejemplo: 08/28";
    else if (estaVencida(tarjeta.vence)) nuevos.vence = "La tarjeta está vencida.";

    if (!tarjeta.cvv) nuevos.cvv = "Completá el código de seguridad.";
    else if (tarjeta.cvv.length !== 3) nuevos.cvv = "El código tiene 3 números.";

    setErrores(nuevos);
    if (Object.keys(nuevos).length === 0) onPagar();
  };

  return (
    <form onSubmit={enviar} noValidate className="space-y-4">
      <h2 className="text-2xl font-extrabold">Pago con tarjeta</h2>

      <Campo
        label="Nombre en la tarjeta"
        name="titular"
        autoComplete="cc-name"
        value={tarjeta.titular}
        onChange={cambiar}
        error={errores.titular}
      />
      <Campo
        label="Número de tarjeta"
        name="numero"
        inputMode="numeric"
        autoComplete="cc-number"
        placeholder="0000 0000 0000 0000"
        value={tarjeta.numero}
        onChange={cambiar}
        error={errores.numero}
        adorno={marca && LOGOS[marca]}
      />

      <div className="grid grid-cols-2 gap-3">
        <Campo
          label="Vencimiento"
          name="vence"
          inputMode="numeric"
          autoComplete="cc-exp"
          placeholder="MM/AA"
          value={tarjeta.vence}
          onChange={cambiar}
          error={errores.vence}
        />
        <Campo
          label="CVV"
          name="cvv"
          inputMode="numeric"
          autoComplete="cc-csc"
          placeholder="123"
          value={tarjeta.cvv}
          onChange={cambiar}
          error={errores.cvv}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Boton type="button" variante="borde" onClick={onAtras}>
          Atrás
        </Boton>
        <Boton type="submit" className="flex-1">
          Pagar ${total.toLocaleString("de-DE")}
        </Boton>
      </div>
    </form>
  );
}