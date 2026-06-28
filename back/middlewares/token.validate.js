import { validateToken as validarToken } from "../services/token.service.js"

export function validateToken(req, res, next) {
    try {
        const auth = req.headers.authorization
        const [bearer, token] = auth.split(" ")

        if (bearer != "Bearer" || !token) return res.status(401).json({ message: "token invalido" })

        const usuario = validarToken(token)

        req.usuario = usuario
        next()
    } catch (error) {
        res.status(401).json({ message: "token invalido" })
    }
}

export function validateRolAdmin(req, res, next) {
    const rol = req?.usuario?.rol
    if( rol >= 1 ) return next()
    return res.status(401).json({ message: "Usuario no autorizado" })
}

export function validateRolSuperAdmin(req, res, next) {
    const rol = req.usuario.rol

    if( rol >= 2 ) return next()
    return res.status(401).json({ message: "Usuario no autorizado" })
}