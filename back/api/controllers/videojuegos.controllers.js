import * as service from "../../services/videojuegos.service.js"
import * as categoriasService from "../../services/categorias.service.js"
import * as plataformasService from "../../services/plataformas.service.js"

export function getVideojuegos(req, res) {
    const filter = req.query
    return service.getVideojuegos(filter)
        .then(videojuegos => res.status(200).json(videojuegos))
        .catch(err => res.status(500).json({ message: "No se pueden obtener los videojuegos" }))
}

export function getVideojuegoById(req, res) {
    const id = req.params.id;
    return service.getVideojuegoById(id)
        .then(videojuego => {
            if (!videojuego) {
                return res.status(404).json({ message: 'Videojuego no encontrado' });
            }
            res.status(200).json({ data: videojuego });
        })
        .catch(err => res.status(500).json({ message: "Error interno del servidor" }))
}

async function resolverObjetos(items, serviceFn) {
    if (!Array.isArray(items) || items.length === 0) return []
    if (typeof items[0] === "object") return items
    const resultados = await Promise.all(items.map(id => serviceFn(id)))
    return resultados.filter(Boolean)
}

export async function guardarVideojuego(req, res) {
    try {
        let categorias = req.body.categorias || []
        let plataformas = req.body.plataformas || []
        if (typeof categorias === "string") try { categorias = JSON.parse(categorias) } catch { categorias = [] }
        if (typeof plataformas === "string") try { plataformas = JSON.parse(plataformas) } catch { plataformas = [] }

        const cats = await resolverObjetos(categorias, categoriasService.getCategoriaById)
        const plats = await resolverObjetos(plataformas, plataformasService.getPlataformaById)

        const videojuego = {
            "titulo": req.body.titulo,
            "desarrollador": req.body.desarrollador,
            "genero": req.body.genero,
            "fecha_lanzamiento": req.body.fecha_lanzamiento,
            "categorias": cats,
            "plataformas": plats,
            "portada": req.file?.filename
        }
        const result = await service.saveVideojuego(videojuego)
        res.status(201).json(result)
    } catch (err) {
        res.status(500).json({ message: "Error al intentar guardar el videojuego" })
    }
}

export function borrarVideojuego(req, res) {
    const id = req.params.id
    service.deleteVideojuego(id)
        .then((videojuego) => {
            if (Object.keys(videojuego).length != 0) {
                res.status(202).json(videojuego)
                return
            }
            res.status(404).json({ message: "No se pudo encontrar el videojuego" })
        })
        .catch(err => res.status(500).json({ message: "No se pudo borrar el videojuego" }))
}

export async function reemplazarVideojuego(req, res) {
    try {
        const id = req.params?.id
        let categorias = req.body?.categorias || []
        let plataformas = req.body?.plataformas || []
        if (typeof categorias === "string") try { categorias = JSON.parse(categorias) } catch { categorias = [] }
        if (typeof plataformas === "string") try { plataformas = JSON.parse(plataformas) } catch { plataformas = [] }

        const cats = await resolverObjetos(categorias, categoriasService.getCategoriaById)
        const plats = await resolverObjetos(plataformas, plataformasService.getPlataformaById)

        const videojuego = {
            "_id": id,
            "titulo": req.body?.titulo,
            "desarrollador": req.body?.desarrollador,
            "genero": req.body?.genero,
            "fecha_lanzamiento": req.body?.fecha_lanzamiento,
            "categorias": cats,
            "plataformas": plats,
        }
        if (req.file) {
            videojuego.portada = req.file.filename
        }
        const result = await service.editVideojuegoById(videojuego)
        if (Object.keys(result) != 0) {
            res.status(202).json(result)
            return
        }
        res.status(404).json({ message: "No pude encontrar el videojuego" })
    } catch (err) {
        res.status(500).json({ message: "No se puede reemplazar el videojuego" })
    }
}

export async function actualizarVideojuego(req, res) {
    try {
        const id = req.params.id
        const videojuegoAntiguo = await service.getVideojuegoById(id)

        let cats = videojuegoAntiguo.categorias || []
        if (req.body?.categorias !== undefined) {
            let categorias = req.body.categorias
            if (typeof categorias === "string") try { categorias = JSON.parse(categorias) } catch { categorias = [] }
            cats = await resolverObjetos(categorias, categoriasService.getCategoriaById)
        }

        let plats = videojuegoAntiguo.plataformas || []
        if (req.body?.plataformas !== undefined) {
            let plataformas = req.body.plataformas
            if (typeof plataformas === "string") try { plataformas = JSON.parse(plataformas) } catch { plataformas = [] }
            plats = await resolverObjetos(plataformas, plataformasService.getPlataformaById)
        }

        const videojuego = {
            "_id": id,
            "titulo": req.body?.titulo || videojuegoAntiguo.titulo,
            "desarrollador": req.body?.desarrollador || videojuegoAntiguo.desarrollador,
            "genero": req.body?.genero || videojuegoAntiguo.genero,
            "fecha_lanzamiento": req.body?.fecha_lanzamiento || videojuegoAntiguo.fecha_lanzamiento,
            "categorias": cats,
            "plataformas": plats,
            "portada": req.file?.filename || videojuegoAntiguo.portada
        }
        const producto = await service.editVideojuegoById(videojuego)
        if (Object.keys(producto) != 0) {
            res.status(202).json(producto)
            return
        }
        res.status(404).json({ message: "No pude encontrar el videojuego" })
    } catch (err) {
        res.status(500).json({ message: "No se puede reemplazar el videojuego" })
    }
}

export function asignarCategoria(req, res) {
    const idVideojuego = req.params.id
    const idCategoria = req.body.idCategoria
    return service.asignarCategoria(idVideojuego, idCategoria)
        .then(respuesta => res.status(201).json(respuesta))
        .catch(err => res.status(500).json({ message: "No se puede asignar la categoria" }))
}

export function asignarPlataforma(req, res) {
    const idVideojuego = req.params.id
    const idPlataforma = req.body.idPlataforma
    return service.asignarPlataforma(idVideojuego, idPlataforma)
        .then(respuesta => res.status(201).json(respuesta))
        .catch(err => res.status(500).json({ message: "No se puede asignar la plataforma" }))
}
