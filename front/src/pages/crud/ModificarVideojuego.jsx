import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useVideojuego } from "../../hooks/useVideojuego"
import { useToken } from "../../contexts/Session.context"
import { useCategoriasService } from "../../services/categorias.service"
import { usePlataformasService } from "../../services/plataformas.service"

const ModificarVideojuego = () => {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const { idVideojuego } = useParams()
    const { videojuego, loading } = useVideojuego(idVideojuego)
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

    useEffect(() => {
        if (videojuego) {
            setSelectedCategorias(videojuego?.categorias?.filter(Boolean).map(c => c._id ?? c) || [])
            setSelectedPlataformas(videojuego?.plataformas?.filter(Boolean).map(p => p._id ?? p) || [])
        }
    }, [videojuego])

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

        fetch("http://localhost:2026/api/videojuegos/" + idVideojuego, {
            method: "PUT",
            body: data,
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
            .then(res => {
                if (!res.ok) throw new Error("Error al modificar el videojuego")
                return res.json()
            })
            .then(() => navigate("/"))
            .catch(err => toast.error(err.message))
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
            {loading != true && <div className="card mt-3 p-3">
                <p className="h1 mb-3 text-center">Editar videojuego</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">Titulo</label>
                        <input className="form-control" type="text" {...register("titulo")} defaultValue={videojuego?.titulo} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Desarrollador</label>
                        <input className="form-control" type="text" {...register("desarrollador")} defaultValue={videojuego?.desarrollador} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Genero</label>
                        <input className="form-control" type="text" {...register("genero")} defaultValue={videojuego?.genero} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha de lanzamiento</label>
                        <input className="form-control" type="text" {...register("fecha_lanzamiento")} defaultValue={videojuego?.fecha_lanzamiento} />
                    </div>
                    <div className="mb-3">
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
                        </div>
                    </div>
                    <div className="mb-3">
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
                        </div>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Portada Anterior:</label>
                        {
                            videojuego?.portada
                                ? <img width="100px" src={`http://localhost:2026/portadas/${videojuego.portada}`} alt="" />
                                : "Sin portada"
                        }
                        <input className="form-control" accept="image/*" type="file" {...register("portada")} />
                    </div>
                    <button className="btn btn-primary" type="submit">Guardar</button>
                </form>
            </div>}
        </div>
    )
}

export default ModificarVideojuego
