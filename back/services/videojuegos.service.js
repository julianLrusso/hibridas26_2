import { MongoClient, ObjectId } from "mongodb"
import fs from "fs/promises"
import "dotenv/config"
const client = new MongoClient(process.env.MONGO_URI)
const db = client.db("dwn4av")

export async function getVideojuegos(filter = {}) {
    const filterMongo = { eliminado: { $ne: true } }
    if (filter?.titulo) filterMongo.$text = { $search: filter.titulo }
    if (filter?.desarrollador) filterMongo.desarrollador = filter.desarrollador
    if (filter?.eliminado) filterMongo.eliminado = true
    return db.collection("videojuegos").find(filterMongo).toArray()
}

export async function getVideojuegoById(id) {
    try {
        await client.connect()
        return db.collection("videojuegos").findOne({ _id: new ObjectId(id) })
    } catch (error) {
        throw new Error(error)
    }
}

export async function deleteVideojuego(id) {
    await client.connect()
    const videojuego = await getVideojuegoById(id)
    const respuesta = await db.collection("videojuegos").updateOne(
        { _id: new ObjectId(id) },
        { $set: { eliminado: true } }
    )
    if (videojuego?.portada) await fs.unlink("uploads/" + videojuego.portada)
    return respuesta
}

export async function saveVideojuego(videojuego) {
    try {
        await client.connect()
        return db.collection("videojuegos").insertOne(videojuego)
    } catch (error) {
        throw new Error(error)
    }
}

export async function editVideojuegoById(videojuego) {
    const videojuegoAnterior = await getVideojuegoById(videojuego._id)
    try {
        await client.connect()
        const { _id, ...videojuegoSinId } = videojuego
        await db.collection("videojuegos").updateOne({ _id: new ObjectId(_id) }, {
            $set: videojuegoSinId
        })
        if (videojuego?.portada) {
            await fs.unlink("uploads/" + videojuegoAnterior.portada)
        }
        return videojuego._id
    } catch (error) {
        throw new Error(error)
    }
}

export async function asignarCategoria(idVideojuego, idCategoria) {
    try {
        await client.connect()
        const categoria = await db.collection("categorias").findOne({ _id: new ObjectId(idCategoria) })
        return await db.collection("videojuegos").updateOne(
            { _id: new ObjectId(idVideojuego) },
            { $addToSet: { categorias: { ...categoria } } }
        )
    } catch (error) {
        throw new Error(error)
    }
}

export async function asignarPlataforma(idVideojuego, idPlataforma) {
    try {
        await client.connect()
        const plataforma = await db.collection("plataformas").findOne({ _id: new ObjectId(idPlataforma) })
        return await db.collection("videojuegos").updateOne(
            { _id: new ObjectId(idVideojuego) },
            { $addToSet: { plataformas: { ...plataforma } } }
        )
    } catch (error) {
        throw new Error(error)
    }
}
