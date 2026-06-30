import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useUsuariosService } from '../../services/usuarios.service'

const ROLES = { 0: "USER", 1: "ADMIN", 2: "SUPERADMIN" }

const Usuarios = () => {

  const [users, setUsers] = useState([])
  const [rolesSeleccionados, setRolesSeleccionados] = useState({})

  const { usuarios, asignarRol } = useUsuariosService()

  const cargarUsuarios = () => {
    usuarios()
      .then((users) => setUsers(users))
      .catch(() => toast.error("Error al cargar usuarios"))
  }

  useEffect(() => {
    cargarUsuarios()
  }, [])

  const handleAsignar = (idUsuario) => {
    const nuevoRol = rolesSeleccionados[idUsuario]
    if (!nuevoRol) return
    asignarRol(idUsuario, { rol: Number(nuevoRol) })
      .then(() => {
        toast.success("Rol actualizado")
        cargarUsuarios()
      })
      .catch(err => toast.error("Error al asignar el rol"))
  }

  return (
    <table className='table' >
      <thead>
        <tr>
          <th>email</th>
          <th>Rol</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map((user, indice) =>
            <tr key={indice} >
              <td>{user?.email}</td>
              <td>{ROLES[user?.rol] ?? "-"}</td>
              <td>
                <div className='d-flex gap-2' >
                  <select className='form-select' value={rolesSeleccionados[user._id] ?? ""} onChange={(e) => setRolesSeleccionados({ ...rolesSeleccionados, [user._id]: e.target.value })} >
                    <option value="" disabled>Seleccionar...</option>
                    <option value="0">USER</option>
                    <option value="1">ADMIN</option>
                    <option value="2">SUPERADMIN</option>
                  </select>
                  <button onClick={() => handleAsignar(user._id)} className='btn btn-danger' >Asignar</button>
                </div>
              </td>
            </tr>
          )
        }

      </tbody>
    </table>
  )
}

export default Usuarios