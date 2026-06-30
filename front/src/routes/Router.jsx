import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/crud/Home";
import Login from "../pages/auth/Login";
import Layout from "../components/Layout";
import Detalle from "../pages/crud/Detalle";
import ProtectedRoute from "../components/ProtectedRoute";
import Logout from "../pages/auth/Logout";
import Register from "../pages/auth/Register";
import NuevoVideojuego from "../pages/crud/NuevoVideojuego";
import ModificarVideojuego from "../pages/crud/ModificarVideojuego";
import DeleteVideojuego from "../pages/crud/DeleteVideojuego";
import Categorias from "../pages/crud/Categorias";
import Plataformas from "../pages/crud/Plataformas";
import Usuarios from "../pages/auth/usuarios";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute element={<Home />} rol={0} />,
      },
      {
        path: "/detalle/:idVideojuego",
        element: <ProtectedRoute element={<Detalle />} rol={0} />
      },
      {
        path: "/nuevo-videojuego",
        element: <ProtectedRoute element={<NuevoVideojuego />} rol={1} />
      },
      {
        path: "/modificar-videojuego/:idVideojuego",
        element: <ProtectedRoute element={<ModificarVideojuego />} rol={1} />
      },
      {
        path: "/borrar-videojuego/:idVideojuego",
        element: <ProtectedRoute element={<DeleteVideojuego />} rol={2} />
      },
      {
        path: "/categorias",
        element: <ProtectedRoute element={<Categorias />} rol={1} />
      },
      {
        path: "/plataformas",
        element: <ProtectedRoute element={<Plataformas />} rol={1} />
      },
      {
        path: "/usuarios",
        element: <ProtectedRoute element={<Usuarios />} rol={2} />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/logout",
        element: <Logout />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);

export default router
