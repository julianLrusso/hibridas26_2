import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useVideojuegosService } from "../../services/videojuegos.service"

const DeleteVideojuego = () => {
    const [videojuego, setVideojuego] = useState(null)
    const { idVideojuego } = useParams()
    const { getVideojuegoById, deleteVideojuego } = useVideojuegosService()

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        deleteVideojuego(idVideojuego)
            .then(() => navigate("/"))
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getVideojuegoById(idVideojuego)
            .then(data => setVideojuego(data.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="d-flex justify-content-center align-items-center flex-column">
            <p className="fs-1">Desea borrar <b>{videojuego?.titulo}</b>?</p>
            <form onSubmit={handleSubmit} className="d-flex gap-2">
                <button type="submit" className="btn btn-danger">Si</button>
                <Link className="btn btn-primary" to="/">No</Link>
            </form>
        </div>
    )
}

export default DeleteVideojuego
