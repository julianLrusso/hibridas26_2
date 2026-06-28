import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useToken } from "../../contexts/Session.context"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { socket } from "../../services/socket.service"
import { useCategoriasService } from "../../services/categorias.service"
import { usePlataformasService } from "../../services/plataformas.service"

const NuevoVideojuego = () => {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const token = useToken()
    const [categorias, setCategorias] = useState([])
    const [plataformas, setPlataformas] = useState([])
    const [selectedCategorias, setSelectedCategorias] = useState([])
    const [selectedPlataformas, setSelectedPlataformas] = useState([])

    const { getCategorias } = useCategoriasService()
    const { getPlataformas } = usePlataformasService()

    useEffect(() => {
        getCategorias().then(data => setCategorias(data)).catch(() => {})
        getPlataformas().then(data => setPlataformas(data)).catch(() => {})
    }, [])

    const onSubmit = (formData) => {
        const data = new FormData()
        data.append("titulo", formData.titulo)
        data.append("desarrollador", formData.desarrollador)
        data.append("genero", formData.genero)
        data.append("fecha_lanzamiento", formData.fecha_lanzamiento)
        data.append("categorias", JSON.stringify(selectedCategorias))
        data.append("plataformas", JSON.stringify(selectedPlataformas))

        if (formData.portada?.[0]) {
            data.append("file", formData.portada[0])
        }

        fetch("http://localhost:2026/api/videojuegos", {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
            },
            body: data
        })
            .then(res => {
                if (res.ok) return res.json()
                throw new Error("Exploto!")
            })
            .then(() => {
                socket.emit("nuevo-videojuego")
                navigate("/")
            })
            .catch(err => toast.error("Error al agregar un videojuego"))
    }

    const toggleCategoria = (id) => {
        setSelectedCategorias(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        )
    }

    const togglePlataforma = (id) => {
        setSelectedPlataformas(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        )
    }

    return (
        <div className="container">
            <div className="card mt-3 p-3">
                <p className="h1 mb-3 text-center">Nuevo videojuego</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-2">
                        <label className="form-label">Titulo</label>
                        <input className="form-control" type="text" {...register("titulo")} />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Desarrollador</label>
                        <input className="form-control" type="text" {...register("desarrollador")} />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Genero</label>
                        <input className="form-control" type="text" {...register("genero")} />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Fecha de lanzamiento</label>
                        <input className="form-control" type="date" {...register("fecha_lanzamiento")} />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Categorias</label>
                        <div className="border rounded p-2">
                            {categorias.map(cat => (
                                <div key={cat._id} className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox"
                                        checked={selectedCategorias.includes(cat._id)}
                                        onChange={() => toggleCategoria(cat._id)} />
                                    <label className="form-check-label">{cat.nombre}</label>
                                </div>
                            ))}
                            {categorias.length === 0 && <p className="text-muted">No hay categorias disponibles</p>}
                        </div>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Plataformas</label>
                        <div className="border rounded p-2">
                            {plataformas.map(plt => (
                                <div key={plt._id} className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox"
                                        checked={selectedPlataformas.includes(plt._id)}
                                        onChange={() => togglePlataforma(plt._id)} />
                                    <label className="form-check-label">{plt.nombre}</label>
                                </div>
                            ))}
                            {plataformas.length === 0 && <p className="text-muted">No hay plataformas disponibles</p>}
                        </div>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Portada:</label>
                        <input className="form-control" accept="image/*" type="file" {...register("portada")} />
                    </div>
                    <button className="btn btn-primary" type="submit">Guardar</button>
                </form>
            </div>
        </div>
    )
}

export default NuevoVideojuego
