import * as service from "../../services/plataformas.service.js"

export function getPlataformas(req, res) {
    return service.getPlataformas()
        .then(plataformas => res.status(200).json(plataformas))
        .catch(err => res.status(500).json({ message: "No se pueden obtener las plataformas" }))
}

export function getPlataformaById(req, res) {
    const id = req.params.id
    return service.getPlataformaById(id)
        .then(plataforma => {
            if (!plataforma) {
                return res.status(404).json({ message: 'Plataforma no encontrada' })
            }
            res.status(200).json({ data: plataforma })
        })
        .catch(err => res.status(500).json({ message: "Error interno del servidor" }))
}

export function guardarPlataforma(req, res) {
    const plataforma = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    }
    service.savePlataforma(plataforma)
        .then(plataforma => res.status(201).json(plataforma))
        .catch(err => res.status(500).json({ message: "Error al intentar guardar la plataforma" }))
}

export function reemplazarPlataforma(req, res) {
    const id = req.params.id
    const plataforma = {
        _id: id,
        nombre: req.body?.nombre,
        descripcion: req.body?.descripcion
    }
    service.editPlataformaById(plataforma)
        .then(plataforma => {
            if (Object.keys(plataforma) != 0) {
                res.status(202).json(plataforma)
                return
            }
            res.status(404).json({ message: "No pude encontrar la plataforma" })
        })
        .catch(err => res.status(500).json({ message: "No se puede reemplazar la plataforma" }))
}

export function borrarPlataforma(req, res) {
    const id = req.params.id
    service.deletePlataforma(id)
        .then((plataforma) => {
            if (plataforma.deletedCount > 0) {
                res.status(202).json({ message: "Plataforma eliminada" })
                return
            }
            res.status(404).json({ message: "No se pudo encontrar la plataforma" })
        })
        .catch(err => res.status(500).json({ message: "No se pudo borrar la plataforma" }))
}
