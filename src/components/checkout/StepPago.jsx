import { useState } from "react";
import Boton from "./Boton";
import Campo from "./Campo";

export default function StepPago({ total, onPagar, onAtras }) {
  const [tarjeta, setTarjeta] = useState({ titular: "", numero: "", vence: "", cvv: "" });
  const [errores, setErrores] = useState({});

  const cambiar = (e) => {
    const { name, value } = e.target;
    setTarjeta({ ...tarjeta, [name]: value });
    setErrores({ ...errores, [name]: "" });
  };

  const enviar = (e) => {
    e.preventDefault();

    const nuevos = {};

    if (!tarjeta.titular.trim()) nuevos.titular = "Completá el nombre que figura en la tarjeta.";

    if (!tarjeta.numero.trim()) nuevos.numero = "Completá el número de tarjeta.";
    else if (!/^\d{16}$/.test(tarjeta.numero.replace(/\s/g, ""))) nuevos.numero = "Ingresá los 16 números de la tarjeta, sin letras.";

    if (!tarjeta.vence.trim()) nuevos.vence = "Completá el vencimiento.";
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(tarjeta.vence.trim())) nuevos.vence = "Usá el formato MM/AA. Ejemplo: 08/28";

    if (!tarjeta.cvv.trim()) nuevos.cvv = "Completá el código de seguridad.";
    else if (!/^\d{3,4}$/.test(tarjeta.cvv.trim())) nuevos.cvv = "El código tiene 3 o 4 números.";

    setErrores(nuevos);
    if (Object.keys(nuevos).length === 0) onPagar();
  };

  return (
    <form onSubmit={enviar} noValidate className="space-y-4">
      <h2 className="text-2xl font-extrabold">Pago con tarjeta</h2>

      <Campo label="Nombre en la tarjeta" name="titular" autoComplete="cc-name" value={tarjeta.titular} onChange={cambiar} error={errores.titular} />
      <Campo label="Número de tarjeta" name="numero" inputMode="numeric" autoComplete="cc-number" maxLength={19} placeholder="0000 0000 0000 0000" value={tarjeta.numero} onChange={cambiar} error={errores.numero} />

      <div className="grid grid-cols-2 gap-3">
        <Campo label="Vencimiento" name="vence" autoComplete="cc-exp" maxLength={5} placeholder="MM/AA" value={tarjeta.vence} onChange={cambiar} error={errores.vence} />
        <Campo label="Código de seguridad" name="cvv" inputMode="numeric" autoComplete="cc-csc" maxLength={4} placeholder="CVV" value={tarjeta.cvv} onChange={cambiar} error={errores.cvv} />
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