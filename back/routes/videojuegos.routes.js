import express from "express"
import * as controller from "../controllers/videojuegos.controllers.js"

const route = express.Router()

route.get("/videojuegos", controller.getVideojuegos)

export default route
