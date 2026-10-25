import { useState } from "react";
import Boton from "./Boton";
import Campo from "./Campo";

export default function StepDatos({ datos, setDatos, onContinuar, onAtras }) {
  const [errores, setErrores] = useState({});

  const cambiar = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
    setErrores({ ...errores, [name]: "" }); 
  };

  const enviar = (e) => {
    e.preventDefault();

    const nuevos = {};

    if (!datos.nombre.trim()) nuevos.nombre = "Completá tu nombre y apellido.";
    else if (!datos.nombre.trim().includes(" ")) nuevos.nombre = "Escribí nombre y apellido.";

    if (!datos.email.trim()) nuevos.email = "Completá tu email.";
    else if (!/^\S+@\S+\.\S+$/.test(datos.email.trim())) nuevos.email = "El email no es válido. Ejemplo: nombre@mail.com";

    if (!datos.dni.trim()) nuevos.dni = "Completá tu DNI.";
    else if (!/^\d{7,8}$/.test(datos.dni.trim())) nuevos.dni = "El DNI tiene 7 u 8 números, sin puntos.";

    setErrores(nuevos);
    if (Object.keys(nuevos).length === 0) onContinuar();
  };

  return (
    <form onSubmit={enviar} noValidate className="space-y-4">
      <h2 className="text-2xl font-extrabold">Tus datos</h2>
      <p className="text-sm text-(--rc-gray-on-white)">Te enviamos la entrada a este email.</p>

      <Campo label="Nombre y apellido" name="nombre" autoComplete="name" value={datos.nombre} onChange={cambiar} error={errores.nombre} />
      <Campo label="Email" name="email" type="email" autoComplete="email" value={datos.email} onChange={cambiar} error={errores.email} />
      <Campo label="DNI" name="dni" inputMode="numeric" value={datos.dni} onChange={cambiar} error={errores.dni} />

      <div className="flex gap-3 pt-2">
        <Boton type="button" variante="borde" onClick={onAtras}>
          Atrás
        </Boton>
        <Boton type="submit" className="flex-1">
          Continuar
        </Boton>
      </div>
    </form>
  );
}