import { useApi } from "./api.service";

export function usePlataformasService() {
    const { call } = useApi()

    const getPlataformas = () => call("/plataformas")
    const createPlataforma = (nombre, descripcion) =>
        call("/plataformas", "POST", { nombre: nombre, descripcion: descripcion })
    const updatePlataforma = (nombre, descripcion, idPlataforma) =>
        call("/plataformas/" + idPlataforma, "PUT", { nombre: nombre, descripcion: descripcion })
    const deletePlataforma = (idPlataforma) => call("/plataformas/" + idPlataforma, "DELETE")

    return { getPlataformas, createPlataforma, updatePlataforma, deletePlataforma }
}
