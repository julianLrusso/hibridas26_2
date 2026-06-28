import { videojuegoSchema } from "../schemas/videojuegos.js";

export function videojuegoValidate(req, res, next) {
    let categorias = req.body.categorias || []
    let plataformas = req.body.plataformas || []
    if (typeof categorias === "string") try { categorias = JSON.parse(categorias) } catch { categorias = [] }
    if (typeof plataformas === "string") try { plataformas = JSON.parse(plataformas) } catch { plataformas = [] }

    const videojuego = {
        "titulo": req.body.titulo,
        "desarrollador": req.body.desarrollador,
        "genero": req.body.genero,
        "fecha_lanzamiento": req.body.fecha_lanzamiento,
        "categorias": categorias,
        "plataformas": plataformas,
        "portada": req.file?.filename
    }
    videojuegoSchema.validate(videojuego, { abortEarly: false, stripUnknown: true })
        .then(() => next())
        .catch(err => res.status(400).json({ message: err.errors }))
}
