import { useEffect, useState } from "react"
import { usePlataformasService } from "../../services/plataformas.service"
import { useRol } from "../../contexts/Session.context"
import { toast } from "react-toastify"

const Plataformas = () => {
    const [plataformas, setPlataformas] = useState([])
    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [editando, setEditando] = useState(null)
    const { getPlataformas, createPlataforma, updatePlataforma, deletePlataforma } = usePlataformasService()
    const rol = useRol()

    const fetchPlataformas = () => {
        getPlataformas()
            .then(data => setPlataformas(data))
            .catch(() => toast.error("Error al cargar plataformas"))
    }

    useEffect(() => {
        fetchPlataformas()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (editando) {
            updatePlataforma(nombre, descripcion, editando)
                .then(() => {
                    toast.success("Plataforma actualizada")
                    setEditando(null)
                    setNombre("")
                    setDescripcion("")
                    fetchPlataformas()
                })
                .catch(() => toast.error("Error al actualizar"))
        } else {
            createPlataforma(nombre, descripcion)
                .then(() => {
                    toast.success("Plataforma creada")
                    setNombre("")
                    setDescripcion("")
                    fetchPlataformas()
                })
                .catch(() => toast.error("Error al crear"))
        }
    }

    const handleEditar = (plt) => {
        setEditando(plt._id)
        setNombre(plt.nombre)
        setDescripcion(plt.descripcion || "")
    }

    const handleEliminar = (id) => {
        deletePlataforma(id)
            .then(() => {
                toast.success("Plataforma eliminada")
                fetchPlataformas()
            })
            .catch(() => toast.error("Error al eliminar"))
    }

    return (
        <div className="container">
            <h1 className="my-3">Gestion de Plataformas</h1>
            {rol >= 1 && (
                <form onSubmit={handleSubmit} className="card p-3 mb-3">
                    <h4>{editando ? "Editar plataforma" : "Nueva plataforma"}</h4>
                    <div className="mb-2">
                        <label className="form-label">Nombre</label>
                        <input className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} required />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Descripcion</label>
                        <textarea className="form-control" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
                    </div>
                    <div className="d-flex gap-2">
                        <button className="btn btn-primary" type="submit">{editando ? "Actualizar" : "Crear"}</button>
                        {editando && <button className="btn btn-secondary" type="button" onClick={() => { setEditando(null); setNombre(""); setDescripcion("") }}>Cancelar</button>}
                    </div>
                </form>
            )}
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        {rol >= 1 && <th>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {plataformas.map(plt => (
                        <tr key={plt._id}>
                            <td>{plt.nombre}</td>
                            <td>{plt.descripcion || "-"}</td>
                            {rol >= 1 && (
                                <td>
                                    <button className="btn btn-warning btn-sm me-1" onClick={() => handleEditar(plt)}>Editar</button>
                                    {rol >= 2 && <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(plt._id)}>Borrar</button>}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Plataformas
