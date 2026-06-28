import jwt from "jsonwebtoken"

export function createToken(usuario){
    const token = jwt.sign({ ...usuario, password: undefined, _id: undefined }, process.env.SECRET_PASSWORD, { expiresIn: "2h" })
    return token
}

export function validateToken(token){
    const payload = jwt.verify(token, process.env.SECRET_PASSWORD)
    return payload
}