import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs"
import "dotenv/config"

const uri = process.env.MONGO_URI || "mongodb://localhost:27017"
const client = new MongoClient(uri)
const db = client.db("dwn4av")

async function seed() {
    await client.connect()
    console.log("Conectado a MongoDB")

    // ─── CATEGORIAS ───
    const categorias = [
        { nombre: "Acción", descripcion: "Juegos de acción y aventura" },
        { nombre: "RPG", descripcion: "Juegos de rol" },
        { nombre: "Deportes", descripcion: "Juegos deportivos" },
        { nombre: "Estrategia", descripcion: "Juegos de estrategia" },
        { nombre: "Terror", descripcion: "Juegos de terror y suspenso" },
    ]
    await db.collection("categorias").deleteMany({})
    const { insertedIds: catIds } = await db.collection("categorias").insertMany(categorias)
    console.log("Categorías insertadas")

    // ─── PLATAFORMAS ───
    const plataformas = [
        { nombre: "PlayStation 5", descripcion: "Sony PlayStation 5" },
        { nombre: "Xbox Series X", descripcion: "Microsoft Xbox Series X" },
        { nombre: "Nintendo Switch", descripcion: "Nintendo Switch" },
        { nombre: "PC", descripcion: "Microsoft Windows" },
    ]
    await db.collection("plataformas").deleteMany({})
    const { insertedIds: platIds } = await db.collection("plataformas").insertMany(plataformas)
    console.log("Plataformas insertadas")

    // ─── VIDEOJUEGOS ───
    const videojuegos = [
        {
            titulo: "The Legend of Zelda: Tears of the Kingdom",
            desarrollador: "Nintendo",
            genero: "Aventura",
            fecha_lanzamiento: "2023-05-12",
            categorias: [
                { ...categorias[0], _id: catIds["0"] },
                { ...categorias[1], _id: catIds["1"] },
            ],
            plataformas: [
                { ...plataformas[2], _id: platIds["2"] },
            ],
            eliminado: false,
        },
        {
            titulo: "Elden Ring",
            desarrollador: "FromSoftware",
            genero: "Action RPG",
            fecha_lanzamiento: "2022-02-25",
            categorias: [
                { ...categorias[0], _id: catIds["0"] },
                { ...categorias[1], _id: catIds["1"] },
            ],
            plataformas: [
                { ...plataformas[0], _id: platIds["0"] },
                { ...plataformas[1], _id: platIds["1"] },
                { ...plataformas[3], _id: platIds["3"] },
            ],
            eliminado: false,
        },
        {
            titulo: "FIFA 24",
            desarrollador: "EA Sports",
            genero: "Deportes",
            fecha_lanzamiento: "2024-09-29",
            categorias: [
                { ...categorias[2], _id: catIds["2"] },
            ],
            plataformas: [
                { ...plataformas[0], _id: platIds["0"] },
                { ...plataformas[1], _id: platIds["1"] },
                { ...plataformas[3], _id: platIds["3"] },
            ],
            eliminado: false,
        },
    ]
    await db.collection("videojuegos").deleteMany({})
    await db.collection("videojuegos").insertMany(videojuegos)
    console.log("Videojuegos insertados")

    // ─── USUARIOS ───
    const usuarios = [
        {
            email: "bart@simpson.com",
            password: await bcrypt.hash("asdASD123@", 11),
            age: 10,
            rol: 2,
        },
        {
            email: "admin@test.com",
            password: await bcrypt.hash("Admin123@", 11),
            age: 25,
            rol: 1,
        },
        {
            email: "user@test.com",
            password: await bcrypt.hash("User123@", 11),
            age: 20,
            rol: 0,
        },
    ]
    await db.collection("usuarios").deleteMany({})
    await db.collection("usuarios").insertMany(usuarios)
    console.log("Usuarios insertados")

    console.log("\n✓ Seed completado exitosamente")
    console.log("  Usuario SUPERADMIN: bart@simpson.com / asdASD123@")
    console.log("  Usuario ADMIN:      admin@test.com / Admin123@")
    console.log("  Usuario USER:       user@test.com / User123@")

    await client.close()
}

seed().catch((err) => {
    console.error("Error en seed:", err)
    process.exit(1)
})
