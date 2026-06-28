import { Navigate } from "react-router-dom"
import { useLogout } from "../../contexts/Session.context"
import { useEffect } from "react"

const Logout = () => {
    const logout = useLogout()

    useEffect( () => {
        logout()
    }, [] )
    
    return <Navigate to="/login" />
}

export default Logout