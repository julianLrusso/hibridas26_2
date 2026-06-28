import { Navigate } from "react-router-dom"
import { useRol } from "../contexts/Session.context"

const ProtectedRoute = ({element, rol}) => {
    const session = JSON.parse( localStorage.getItem("session") )
    const rolUser = useRol()
    
    if( !session ) return <Navigate to="/login" /> 
    
    if( !(rolUser >= rol) ) return <Navigate to="/" />
            
    return element
}

export default ProtectedRoute