import express from "express";
import {
    registro,
    confirmarMail,
    recuperarPassword,
    comprobarTokenPassword,
    crearNuevoPassword,
    loginUsuario,
    perfil,
    actualizarUsuario
} from "../controllers/usuario_controller.js";

import { verificarTokenJWT } from "../middlewares/JWT.js";

const router = express.Router();

// 🔵 Registro
router.post("/register", registro);

// 🔵 Confirmar Email
router.get("/confirmar/:token", confirmarMail);

// 🔵 Login
router.post("/login", loginUsuario);

// 🔵 Recuperar contraseña
router.post("/olvide-password", recuperarPassword);
router.get("/olvide-password/:token", comprobarTokenPassword);
router.post("/reset-password/:token", crearNuevoPassword);

// 🔵 Perfil protegido
router.get("/perfil", verificarTokenJWT, perfil);

// 🔵 Actualizar información
router.put("/actualizar", verificarTokenJWT, actualizarUsuario);

export default router;
