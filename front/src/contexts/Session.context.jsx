import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Session = createContext()

function useSession() {
    return useContext(Session)
}

export function useEmail() {
    const { email } = useSession()
    return email
}

export function useLogin(){
    const { onLogin } = useSession()
    return onLogin
}

export function useLogout(){
    const { onLogout } = useSession()
    return onLogout
}

export function useToken(){
    const { token } = useSession()
    return token
}

export function useRol(){
    const token = useToken()
    try {
        const payload = jwtDecode(token)
        return payload?.rol || 0
    } catch (error) {
        return 0
    }
}

export function SessionProvider({ children }) {

    const [email, setEmail] = useState( JSON.parse( localStorage.getItem("session") ) )
    const [token, setToken] = useState(localStorage.getItem("token"))

    const onLogin = (jwt, usuario) => {
        localStorage.setItem("session", JSON.stringify({ usuario }))
        localStorage.setItem("token", jwt)
        setEmail(usuario)
        setToken(jwt)
    }

    const onLogout = () => {
        localStorage.clear()
        setEmail(null)
        setToken(null)
    }

    return (
        <Session.Provider value={{ email, token, onLogin, onLogout }} >
            {children}
        </Session.Provider>
    )
}