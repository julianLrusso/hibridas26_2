import yup from "yup"

export const plataformaSchema = yup.object({
    _id: yup.string().optional().matches(/^[0-9a-fA-F]{24}$/, "No se pudo encontrar el _id"),
    nombre: yup.string().required("El campo nombre es requerido"),
    descripcion: yup.string().optional()
})
