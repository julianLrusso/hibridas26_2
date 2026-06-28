import { plataformaSchema } from "../schemas/plataformas.js";

export function plataformaValidate(req, res, next) {
    plataformaSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then(() => next())
        .catch(err => res.status(400).json({ message: err.errors }))
}
