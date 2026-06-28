import express from 'express'
import * as controllers from "../controllers/videojuegos.controllers.js"
import { videojuegoValidate } from '../../middlewares/videojuegos.validate.js'
import { validateRolAdmin, validateToken } from '../../middlewares/token.validate.js'
import upload from '../../middlewares/imagenes.upload.js'

const router = express.Router()
router.get("/api/videojuegos", [validateToken], controllers.getVideojuegos)
router.get("/api/videojuegos/:id", [validateToken], controllers.getVideojuegoById)
router.post("/api/videojuegos", [upload.single("file"), validateToken, validateRolAdmin, videojuegoValidate], controllers.guardarVideojuego)
router.post("/api/videojuegos/:id/categoria", [validateToken], controllers.asignarCategoria)
router.post("/api/videojuegos/:id/plataforma", [validateToken], controllers.asignarPlataforma)
router.delete("/api/videojuegos/:id", [validateToken, validateRolAdmin], controllers.borrarVideojuego)
router.patch("/api/videojuegos/:id", [upload.single("file"), validateToken, validateRolAdmin], controllers.actualizarVideojuego)
router.put("/api/videojuegos/:id", [upload.single("file"), validateToken, validateRolAdmin, videojuegoValidate], controllers.reemplazarVideojuego)

export default router
