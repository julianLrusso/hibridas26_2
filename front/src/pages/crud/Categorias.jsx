import { useEffect, useState } from "react"
import { useCategoriasService } from "../../services/categorias.service"
import { useRol } from "../../contexts/Session.context"
import { toast } from "react-toastify"

const Categorias = () => {
    const [categorias, setCategorias] = useState([])
    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [editando, setEditando] = useState(null)
    const { getCategorias, createCategoria, updateCategoria, deleteCategoria } = useCategoriasService()
    const rol = useRol()

    const fetchCategorias = () => {
        getCategorias()
            .then(data => setCategorias(data))
            .catch(() => toast.error("Error al cargar categorias"))
    }

    useEffect(() => {
        fetchCategorias()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (editando) {
            updateCategoria(nombre, descripcion, editando)
                .then(() => {
                    toast.success("Categoria actualizada")
                    setEditando(null)
                    setNombre("")
                    setDescripcion("")
                    fetchCategorias()
                })
                .catch(() => toast.error("Error al actualizar"))
        } else {
            createCategoria(nombre, descripcion)
                .then(() => {
                    toast.success("Categoria creada")
                    setNombre("")
                    setDescripcion("")
                    fetchCategorias()
                })
                .catch(() => toast.error("Error al crear"))
        }
    }

    const handleEditar = (cat) => {
        setEditando(cat._id)
        setNombre(cat.nombre)
        setDescripcion(cat.descripcion || "")
    }

    const handleEliminar = (id) => {
        deleteCategoria(id)
            .then(() => {
                toast.success("Categoria eliminada")
                fetchCategorias()
            })
            .catch(() => toast.error("Error al eliminar"))
    }

    return (
        <div className="container">
            <h1 className="my-3">Gestion de Categorias</h1>
            {rol >= 1 && (
                <form onSubmit={handleSubmit} className="card p-3 mb-3">
                    <h4>{editando ? "Editar categoria" : "Nueva categoria"}</h4>
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
                    {categorias.map(cat => (
                        <tr key={cat._id}>
                            <td>{cat.nombre}</td>
                            <td>{cat.descripcion || "-"}</td>
                            {rol >= 1 && (
                                <td>
                                    <button className="btn btn-warning btn-sm me-1" onClick={() => handleEditar(cat)}>Editar</button>
                                    {rol >= 2 && <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(cat._id)}>Borrar</button>}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Categorias
