import express from "express"
import VideojuegosRoutesApi from "./api/routes/videojuegos.routes.js"
import CategoriasRoutesApi from "./api/routes/categorias.routes.js"
import PlataformasRoutesApi from "./api/routes/plataformas.routes.js"
import UsuariosRoutesApi from "./api/routes/usuarios.routes.js"
import cors from 'cors'
import swaggerFile from "./swagger.json" with {type: "json"}
import swaggerUI from "swagger-ui-express"
import dotenv from "dotenv"
import { createServer } from 'node:http';
import { Server } from "socket.io";

dotenv.config();
const app = express();

app.use("/", express.static('public'));
app.use("/portadas", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use("/", VideojuegosRoutesApi);
app.use("/", CategoriasRoutesApi);
app.use("/", PlataformasRoutesApi);
app.use("/api/usuarios", UsuariosRoutesApi);

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    socket.on("nuevo-videojuego", () => {
        socket.broadcast.emit("nuevo-videojuego")
    })
})

server.listen(2026)