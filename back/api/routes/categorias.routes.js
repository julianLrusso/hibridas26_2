import express from 'express'
import * as controllers from "../controllers/categorias.controllers.js"
import { categoriaValidate } from '../../middlewares/categorias.validate.js'
import { validateRolAdmin, validateToken } from '../../middlewares/token.validate.js'

const router = express.Router()
router.get("/api/categorias", [validateToken], controllers.getCategorias)
router.get("/api/categorias/:id", [validateToken], controllers.getCategoriaById)
router.post("/api/categorias", [validateToken, validateRolAdmin, categoriaValidate], controllers.guardarCategoria)
router.put("/api/categorias/:id", [validateToken, validateRolAdmin, categoriaValidate], controllers.reemplazarCategoria)
router.delete("/api/categorias/:id", [validateToken, validateRolAdmin], controllers.borrarCategoria)

export default router
