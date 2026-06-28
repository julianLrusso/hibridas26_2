import express from 'express'
import * as controllers from "../controllers/plataformas.controllers.js"
import { plataformaValidate } from '../../middlewares/plataformas.validate.js'
import { validateRolAdmin, validateToken } from '../../middlewares/token.validate.js'

const router = express.Router()
router.get("/api/plataformas", [validateToken], controllers.getPlataformas)
router.get("/api/plataformas/:id", [validateToken], controllers.getPlataformaById)
router.post("/api/plataformas", [validateToken, validateRolAdmin, plataformaValidate], controllers.guardarPlataforma)
router.put("/api/plataformas/:id", [validateToken, validateRolAdmin, plataformaValidate], controllers.reemplazarPlataforma)
router.delete("/api/plataformas/:id", [validateToken, validateRolAdmin], controllers.borrarPlataforma)

export default router
