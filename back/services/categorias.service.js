import { MongoClient, ObjectId } from "mongodb"
import "dotenv/config"

const client = new MongoClient(process.env.MONGO_URI)
const db = client.db("dwn4av")

export async function getCategorias() {
    try {
        await client.connect()
        return db.collection("categorias").find().toArray()
    } catch (error) {
        return []
    }
}

export async function getCategoriaById(id) {
    try {
        await client.connect()
        return db.collection("categorias").findOne({ _id: new ObjectId(id) })
    } catch (error) {
        throw new Error(error)
    }
}

export async function saveCategoria(categoria) {
    try {
        await client.connect()
        return db.collection("categorias").insertOne(categoria)
    } catch (error) {
        throw new Error(error)
    }
}

export async function editCategoriaById(categoria) {
    try {
        await client.connect()
        const { _id, ...categoriaSinId } = categoria
        return db.collection("categorias").updateOne(
            { _id: new ObjectId(_id) },
            { $set: categoriaSinId }
        )
    } catch (error) {
        throw new Error(error)
    }
}

export async function deleteCategoria(id) {
    try {
        await client.connect()
        return db.collection("categorias").deleteOne({ _id: new ObjectId(id) })
    } catch (error) {
        throw new Error(error)
    }
}
