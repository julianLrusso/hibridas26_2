import express from "express"
import * as controllers from "../controllers/usuarios.controllers.js"
import { validateLogin, validateRegister } from "../../middlewares/usuarios.validate.js"
import { validateToken } from "../../middlewares/token.validate.js"
import { validateRolSuperAdmin } from "../../middlewares/token.validate.js"

const router = express.Router()

router.post("/",[validateRegister], controllers.createUser)
router.post("/login",[validateLogin], controllers.login)
router.get("/",[validateToken, validateRolSuperAdmin], controllers.getUsuarios)
router.patch("/:idUsuario/rol",[validateToken, validateRolSuperAdmin], controllers.asignarRol)

export default router