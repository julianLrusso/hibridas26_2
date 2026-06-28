import yup from "yup"

export const videojuegoSchema = yup.object({
    _id: yup.string().optional().matches(/^[0-9a-fA-F]{24}$/, "No se pudo encontrar el _id"),
    titulo: yup.string().required("El campo titulo es requerido"),
    desarrollador: yup.string().required("El campo desarrollador es requerido"),
    genero: yup.string().required("El campo genero es requerido"),
    fecha_lanzamiento: yup.string().required("El campo fecha_lanzamiento es requerido"),
    categorias: yup.array().optional(),
    plataformas: yup.array().optional()
})
