import { MongoClient, ObjectId } from "mongodb"
import "dotenv/config"

const client = new MongoClient(process.env.MONGO_URI)
const db = client.db("dwn4av")

export async function getPlataformas() {
    try {
        await client.connect()
        return db.collection("plataformas").find().toArray()
    } catch (error) {
        return []
    }
}

export async function getPlataformaById(id) {
    try {
        await client.connect()
        return db.collection("plataformas").findOne({ _id: new ObjectId(id) })
    } catch (error) {
        throw new Error(error)
    }
}

export async function savePlataforma(plataforma) {
    try {
        await client.connect()
        return db.collection("plataformas").insertOne(plataforma)
    } catch (error) {
        throw new Error(error)
    }
}

export async function editPlataformaById(plataforma) {
    try {
        await client.connect()
        const { _id, ...plataformaSinId } = plataforma
        return db.collection("plataformas").updateOne(
            { _id: new ObjectId(_id) },
            { $set: plataformaSinId }
        )
    } catch (error) {
        throw new Error(error)
    }
}

export async function deletePlataforma(id) {
    try {
        await client.connect()
        return db.collection("plataformas").deleteOne({ _id: new ObjectId(id) })
    } catch (error) {
        throw new Error(error)
    }
}
