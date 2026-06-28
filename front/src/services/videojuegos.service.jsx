import { useApi } from "./api.service";

export function useVideojuegosService() {
    const { call } = useApi()

    const getVideojuegos = () => call("/videojuegos")
    const getVideojuegoById = (idVideojuego) => call("/videojuegos/" + idVideojuego)
    const deleteVideojuego = (idVideojuego) => call("/videojuegos/" + idVideojuego, "DELETE")

    return { getVideojuegos, getVideojuegoById, deleteVideojuego }
}
