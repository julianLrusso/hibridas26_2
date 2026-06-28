import { useState, useEffect } from "react";
import { useVideojuegosService } from "../services/videojuegos.service";
import { socket } from "../services/socket.service"

export const useVideojuego = (idVideojuego) => {
    const [videojuego, setVideojuego] = useState(null)
    const [loading, setLoading] = useState(true)

    const { getVideojuegoById } = useVideojuegosService()

    useEffect(() => {
        getVideojuegoById(idVideojuego)
            .then(data => {
                setVideojuego(data.data)
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [])

    return { videojuego, loading }
}

export const useVideojuegos = () => {
    const [videojuegos, setVideojuegos] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { getVideojuegos } = useVideojuegosService()

    const fetchVideojuegos = () => {
        getVideojuegos()
            .then(data => {
                setVideojuegos(data)
            })
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        socket.on("nuevo-videojuego", fetchVideojuegos)
        fetchVideojuegos()
    }, [])

    return { videojuegos, loading, error }
}
