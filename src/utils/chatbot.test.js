import { describe, expect, it } from "vitest";
import { RESPUESTAS } from "../data/faq";
import { CHARLAS } from "../data/talks";
import { CARGO_SERVICIO, ENTRADAS, FIN_EARLY_BIRD } from "../data/entradas";
import { coincide, detectarCompra, detectarSpeakers, distancia, responder, tipoDeCharla } from "./chatbot";

const contexto = (cambios = {}) => ({
  respuestas: RESPUESTAS,
  charlas: CHARLAS,
  entradas: ENTRADAS,
  ahora: new Date(2026, 9, 29, 12, 0),
  finEarlyBird: FIN_EARLY_BIRD,
  cargo: CARGO_SERVICIO,
  favoritos: [],
  compra: null,
  ...cambios,
});

const preguntar = (mensaje, cambios) => responder(mensaje, contexto(cambios));

describe("distancia y coincidencias", () => {
  it("calcula la distancia entre palabras", () => {
    expect(distancia("precio", "precio")).toBe(0);
    expect(distancia("presio", "precio")).toBe(1);
    expect(distancia("cuamdo", "cuando")).toBe(1);
  });

  it("acepta prefijos y errores de tipeo, pero no palabras distintas", () => {
    expect(coincide("precios", "precio")).toBe(2);
    expect(coincide("presio", "precio")).toBe(1);
    expect(coincide("casa", "precio")).toBe(0);
  });
});

describe("preguntas frecuentes", () => {
  it("entiende errores de tipeo", () => {
    expect(preguntar("cuanto presio").id).toBe("precios");
    expect(preguntar("cuamdo es?").id).toBe("fecha");
    expect(preguntar("dan certificao?").id).toBe("certificado");
  });

  it("ignora mayúsculas y acentos", () => {
    expect(preguntar("¿DÓNDE QUEDA?").id).toBe("ubicacion");
  });

  it("prioriza frases completas", () => {
    expect(preguntar("quiero ver mis entradas").id).toBe("mis-entradas");
    expect(preguntar("mostrame mi agenda").id).toBe("mi-agenda");
  });

  it("responde con precios y stock reales", () => {
    const { texto } = preguntar("cuanto sale");
    expect(texto).toContain("Early Bird: $25.000 · quedan 38");
    expect(texto).toContain("El Early Bird termina en 2 días");
  });

  it("cuenta los días que faltan para el evento", () => {
    expect(preguntar("cuando es").texto).toContain("Faltan 21 días");
  });

  it("muestra las charlas marcadas", () => {
    const { texto } = preguntar("mi agenda", { favoritos: ["git-y-github"] });
    expect(texto).toContain("Git y GitHub sin miedo (Mauro Coniglio)");
  });

  it("ofrece ver las entradas si hay una compra guardada", () => {
    const compra = { codigo: "RC-2026-ABC123", comprador: { nombre: "Lionel" }, entradas: [{}, {}] };
    const respuesta = preguntar("mis entradas", { compra });
    expect(respuesta.texto).toContain("2 entradas a nombre de Lionel");
    expect(respuesta.acciones[0].tipo).toBe("ver-entradas");
  });
});

describe("speakers", () => {
  it("encuentra la charla de un speaker", () => {
    const { texto, acciones } = preguntar("a que hora habla mauro?");
    expect(texto).toContain("Mauro Coniglio da «Git y GitHub sin miedo» a las 19.20 hs");
    expect(acciones.map((a) => a.tipo)).toEqual(["favorito", "preguntar"]);
  });

  it("si quiere preguntar, primero ofrece el formulario", () => {
    expect(preguntar("tengo una pregunta para daniela").acciones[0]).toMatchObject({ tipo: "preguntar", charla: "primer-dia" });
  });

  it("muestra todos cuando el nombre se repite", () => {
    expect(detectarSpeakers("que da tomas?", CHARLAS)).toHaveLength(2);
    expect(detectarSpeakers("tomas gomez", CHARLAS).map((c) => c.id)).toEqual(["primera-entrevista"]);
  });

  it("tolera errores en el nombre", () => {
    expect(detectarSpeakers("charla de cardoso", CHARLAS).map((c) => c.id)).toEqual(["primer-dia"]);
  });
});

describe("compras desde el chat", () => {
  it("detecta cantidad y tipo", () => {
    expect(detectarCompra("quiero 2 entradas virtuales")).toEqual({ id: "virtual", cantidad: 2 });
    expect(detectarCompra("dame tres presenciales")).toEqual({ id: "early", cantidad: 3 });
    expect(detectarCompra("dame tres presenciales", false)).toEqual({ id: "general", cantidad: 3 });
  });

  it("no confunde una pregunta con un pedido", () => {
    expect(detectarCompra("la virtual tiene grabacion?")).toBeNull();
  });

  it("respeta el stock disponible", () => {
    const respuesta = preguntar("quiero 100 early bird");
    expect(respuesta.acciones[0]).toMatchObject({ tipo: "cargar", entrada: "early", cantidad: 38 });
    expect(respuesta.texto).toContain("Solo quedan 38");
  });
});

describe("charla y respuestas de respaldo", () => {
  it("reconoce saludos, agradecimientos y despedidas", () => {
    expect(tipoDeCharla("hola!")).toBe("saludo");
    expect(tipoDeCharla("muchas gracias")).toBe("gracias");
    expect(tipoDeCharla("chau")).toBe("despedida");
    expect(tipoDeCharla("hola cuanto sale la entrada general")).toBeNull();
  });

  it("si no entiende, lo registra y sugiere preguntas", () => {
    const respuesta = preguntar("asdfgh");
    expect(respuesta.sinRespuesta).toBe(true);
    expect(respuesta.sugerencias.length).toBeGreaterThan(0);
  });
});

describe("¿quisiste decir?", () => {
  it("ofrece opciones cuando la pregunta es ambigua", () => {
    const respuesta = preguntar("ofrta direcion");
    expect(respuesta.texto).toContain("¿Quisiste preguntar");
    expect(respuesta.acciones.map((a) => a.respuesta).sort()).toEqual(["descuentos", "ubicacion"]);
  });
});