import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useVideojuegosService } from "../../services/videojuegos.service"

const Detalle = () => {
    const [videojuego, setVideojuego] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { idVideojuego } = useParams()

    const { getVideojuegoById } = useVideojuegosService()

    useEffect(() => {
        getVideojuegoById(idVideojuego)
            .then(data => setVideojuego(data.data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <div className="h1">Cargando..</div>
    if (error) return <div className="h1">No se encontro el videojuego</div>

    return (
        <div className="card mb-3 p-3 border-0">
            <div className="row g-0">
                <div className="col-md-4">
                    {videojuego?.portada
                        ? <img width="100%" src={`http://localhost:2026/portadas/${videojuego.portada}`} alt="" />
                        : "Sin portada"}
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{videojuego.titulo}</h5>
                        <p className="card-text">Desarrollador: {videojuego.desarrollador}</p>
                        <p className="card-text">Genero: {videojuego.genero}</p>
                        <p className="card-text">Fecha de lanzamiento: {videojuego.fecha_lanzamiento}</p>
                        <p className="card-text">
                            Categorias: {videojuego?.categorias?.filter(Boolean).map(c => c.nombre ?? c).join(", ") || "Sin categorias"}
                        </p>
                        <p className="card-text">
                            Plataformas: {videojuego?.plataformas?.filter(Boolean).map(p => p.nombre ?? p).join(", ") || "Sin plataformas"}
                        </p>
                    </div>
                    <div>
                        <Link className="btn btn-info" to="/">Volver</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detalle
