import { useApi } from "./api.service";

export function useCategoriasService() {
    const { call } = useApi()

    const getCategorias = () => call("/categorias")
    const createCategoria = (nombre, descripcion) =>
        call("/categorias", "POST", { nombre: nombre, descripcion: descripcion })
    const updateCategoria = (nombre, descripcion, idCategoria) =>
        call("/categorias/" + idCategoria, "PUT", { nombre: nombre, descripcion: descripcion })
    const deleteCategoria = (idCategoria) => call("/categorias/" + idCategoria, "DELETE")

    return { getCategorias, createCategoria, updateCategoria, deleteCategoria }
}
