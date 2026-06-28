import { createPage } from "../page/utils.js"
import * as service from "../services/videojuegos.service.js"
import * as view from "../views/videojuegos.views.js"

export function getVideojuegos(req, res) {
    const filter = req.query
    service.getVideojuegos(filter)
        .then(videojuegos => res.send(view.createVideojuegoList(videojuegos)))
        .catch(err => res.send("No se pudo leer el archivo"))
}
