import { createPage } from "../page/utils.js"

export function createVideojuegoList(videojuegos) {
    let html = ""
    html += "<h1>Listado de videojuegos</h1>"
    html += "<ul>"
    videojuegos.forEach(videojuego => html += "<li>" + videojuego.titulo + "</li>")
    html += "</ul>"
    return createPage(html)
}
