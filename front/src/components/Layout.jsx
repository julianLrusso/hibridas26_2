import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import { toast, ToastContainer } from "react-toastify"
import { socket } from "../services/socket.service"
import { useEffect } from "react"

const Layout = () => {
    useEffect(() => {
        socket.on("nuevo-videojuego", () => {
            toast.success("Nuevo videojuego agregado!!")
        })
    }, [])

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
            />
            <NavBar />
            <Outlet />
        </>
    )
}

export default Layout
