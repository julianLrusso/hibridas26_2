import { categoriaSchema } from "../schemas/categorias.js";

export function categoriaValidate(req, res, next) {
    categoriaSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then(() => next())
        .catch(err => res.status(400).json({ message: err.errors }))
}
