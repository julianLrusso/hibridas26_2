import { Activity } from "react"
import { Link } from "react-router-dom"
import { useEmail, useRol } from "../contexts/Session.context"

const NavBar = () => {
    const email = useEmail()
    const rol = useRol()
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Videojuegos</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link" to="/">Home</Link>
                        <Activity mode={!email ? "visible" : "hidden"}>
                            <Link className="nav-link" to="/login">Login</Link>
                            <Link className="nav-link" to="/register">Registro</Link>
                        </Activity>
                        <Activity mode={email ? "visible" : "hidden"}>
                            {rol >= 1 && <Link className="nav-link" to="/categorias">Categorias</Link>}
                            {rol >= 1 && <Link className="nav-link" to="/plataformas">Plataformas</Link>}
                            {rol >= 2 && <Link className="nav-link" to="/usuarios">Usuarios</Link>}
                            <Link className="nav-link" to="/logout">Salir</Link>
                        </Activity>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
