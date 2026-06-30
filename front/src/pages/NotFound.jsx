import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='container d-flex justify-content-center align-items-center' style={{ minHeight: 'calc(100vh - 80px)' }}>
      <div className='text-center'>
        <div className='display-1 fw-bold' style={{ color: 'var(--accent)', textShadow: '0 0 40px var(--accent-glow)', fontSize: '8rem' }}>
          404
        </div>
        <div className='display-6 mb-3' style={{ color: 'var(--text-secondary)' }}>
          Página no encontrada
        </div>
        <p className='mb-4' style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
          La página que estás buscando no existe o ha sido movida.
        </p>
        <Link to="/" className='btn btn-primary'>
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}

export default NotFound
