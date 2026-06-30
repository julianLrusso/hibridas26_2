import { Link } from 'react-router-dom'
import { useVideojuegos } from '../../hooks/useVideojuego'
import { useRol } from '../../contexts/Session.context'

const Home = () => {
  const { videojuegos, loading, error } = useVideojuegos()
  const rol = useRol()
  if (loading) return <div className='h1'>Cargando...</div>
  if (error) return <div className='h1'>No se pueden traer los videojuegos</div>

  return (
    <div className='container-fluid'>
      {rol >= 1 && <Link to="/nuevo-videojuego" className='btn btn-primary my-2'>Nuevo videojuego</Link>}
      <table className='table mt-3'>
        <thead>
          <tr>
            <th>#</th>
            <th>Titulo</th>
            <th>Desarrollador</th>
            <th>Genero</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            videojuegos.map(videojuego => (
              <tr key={videojuego._id}>
                <td>{
                  videojuego?.portada
                    ? <img width="100px" src={`http://localhost:2026/portadas/${videojuego.portada}`} alt={`Portada de ${videojuego.titulo}`} />
                    : "Sin portada"
                }</td>
                <td>{videojuego.titulo}</td>
                <td>{videojuego.desarrollador}</td>
                <td>{videojuego.genero}</td>
                <td>
                  <Link className='btn btn-info m-1' to={"/detalle/" + videojuego._id}>Ver</Link>
                  {rol >= 1 && <Link className='btn btn-warning m-1' to={"/modificar-videojuego/" + videojuego._id}>Editar</Link>}
                  {rol >= 2 && <Link className='btn btn-danger m-1' to={"/borrar-videojuego/" + videojuego._id}>Borrar</Link>}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Home
