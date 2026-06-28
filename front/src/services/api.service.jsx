import { useNavigate } from "react-router-dom";
import { useToken } from "../contexts/Session.context";

export function useApi() {

    const token = useToken()
    const navigate = useNavigate()

    const call = (uri, method, body) => {
        return fetch("http://localhost:2026/api" + uri, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
            .then(res => {
                if (res.ok) return res.json()
                if (res.status == 401) navigate("/login")
                throw new Error("Error al traer los datos")
            })
    }

    return { call }
}