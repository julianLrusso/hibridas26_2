import { useEffect, useState } from 'react'
import { useUsuariosService } from '../../services/usuarios.service'

const Usuarios = () => {

  const [users, setUsers] = useState([])
  const [rol, setRol] = useState([])

  const { usuarios, asignarRol } = useUsuariosService()

  useEffect(() => {
    usuarios()
      .then((users) => setUsers(users))
      .catch(err => console.log(err))
  }, [])


  const handleAsignar = (idUsuario) => {
    asignarRol(idUsuario, {rol: rol})
      .then(data => console.log(data))
      .catch(err => console.log(err))
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
              <td>{user?.rol}</td>
              <td>
                <div className='d-flex g-2' >
                  <select className='form-select' onChange={(e) => setRol(e.target.value)} >
                    <option value="" disabled></option>
                    <option value="0">USER</option>
                    <option value="1">ADMIN</option>
                    <option value="2">SUPERDAMIN</option>
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