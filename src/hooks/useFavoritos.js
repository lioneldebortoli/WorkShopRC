import { useLocalStorage } from "./useLocalStorage";

const SIN_FAVORITOS = [];

export function useFavoritos() {
  const [favoritos, setFavoritos] = useLocalStorage("rc-favoritos", SIN_FAVORITOS);

  const esFavorita = (id) => favoritos.includes(id);

  const alternar = (id) =>
    setFavoritos((actuales) => (actuales.includes(id) ? actuales.filter((favorito) => favorito !== id) : [...actuales, id]));

  return { favoritos, esFavorita, alternar };
}