const estadisticas = [
  { valor: "120", etiqueta: "lugares presenciales" },
  { valor: "10", etiqueta: "charlas de speakers" },
  { valor: "3 h 40", etiqueta: "de 18.00 a 21.40 hs" },
  { valor: "2", etiqueta: "modalidades: presencial y virtual" },
];

export default function Estadisticas() {
  return (
    <section className="flex justify-center px-4 py-6">
      <ul className="grid w-full max-w-xl grid-cols-2 gap-6 rounded-[20px] border border-white/15 bg-white/[0.03] p-5 sm:grid-cols-4 sm:px-8">
        {estadisticas.map (({ valor, etiqueta }) => (
          <li key={etiqueta} className="flex flex-col gap-1">
            <span className="text-2xl font-bold leading-none text-[#e5242b]">
              {valor}
            </span>
            <span className="text-[10px] leading-snug text-white">
              {etiqueta}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}