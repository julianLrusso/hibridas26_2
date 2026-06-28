import * as service from "../../services/categorias.service.js"

export function getCategorias(req, res) {
    return service.getCategorias()
        .then(categorias => res.status(200).json(categorias))
        .catch(err => res.status(500).json({ message: "No se pueden obtener las categorias" }))
}

export function getCategoriaById(req, res) {
    const id = req.params.id
    return service.getCategoriaById(id)
        .then(categoria => {
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria no encontrada' })
            }
            res.status(200).json({ data: categoria })
        })
        .catch(err => res.status(500).json({ message: "Error interno del servidor" }))
}

export function guardarCategoria(req, res) {
    const categoria = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    }
    service.saveCategoria(categoria)
        .then(categoria => res.status(201).json(categoria))
        .catch(err => res.status(500).json({ message: "Error al intentar guardar la categoria" }))
}

export function reemplazarCategoria(req, res) {
    const id = req.params.id
    const categoria = {
        _id: id,
        nombre: req.body?.nombre,
        descripcion: req.body?.descripcion
    }
    service.editCategoriaById(categoria)
        .then(categoria => {
            if (Object.keys(categoria) != 0) {
                res.status(202).json(categoria)
                return
            }
            res.status(404).json({ message: "No pude encontrar la categoria" })
        })
        .catch(err => res.status(500).json({ message: "No se puede reemplazar la categoria" }))
}

export function borrarCategoria(req, res) {
    const id = req.params.id
    service.deleteCategoria(id)
        .then((categoria) => {
            if (categoria.deletedCount > 0) {
                res.status(202).json({ message: "Categoria eliminada" })
                return
            }
            res.status(404).json({ message: "No se pudo encontrar la categoria" })
        })
        .catch(err => res.status(500).json({ message: "No se pudo borrar la categoria" }))
}
