import { MongoClient, ObjectId } from "mongodb"
import { createToken } from "./token.service.js"
import bcrypt from "bcryptjs"
import "dotenv/config"

const client = new MongoClient(process.env.MONGO_URI)
const db = client.db("dwn4av")

const USER = 0
const ADMIN = 1
const SUPERADMIN = 2

export async function createUser(usuario) {
    await client.connect()

    const existe = await db.collection("usuarios").findOne({ email: usuario.email })
    if (existe) throw new Error("No se pudo registrar")

    usuario.password = await bcrypt.hash(usuario.password, 11)

    await db.collection("usuarios").insertOne({ ...usuario, passwordConfirm: undefined, rol: USER })

    return { ...usuario, password: undefined, passwordConfirm: undefined }
}

export async function login(usuario) {
    await client.connect()
    const existe = await db.collection("usuarios").findOne({ email: usuario.email })

    if (!existe) throw new Error("No se pudo ingresar")

    const esValido = await bcrypt.compare(usuario.password, existe.password)

    if (!esValido) throw new Error("No se pudo ingresar")

    if (!existe?.rol) existe.rol = USER

    console.log(existe)

    const token = createToken(existe)

    return { ...existe, password: undefined, _id: undefined, token: token }
}

export async function getUsuarios() {
    await client.connect()

    const usuarios = await db.collection("usuarios").find().toArray()

    return usuarios.map(user => {
        return { ...user, password: undefined, passwordConfirm: undefined }
    })
}

export async function asignarRol(idUsuario, rol) {
    await client.connect()
    return await db.collection("usuarios").updateOne(
        { _id: new ObjectId(idUsuario) },
        {
            $set: { rol: rol }
        }
    )
}