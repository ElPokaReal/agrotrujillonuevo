import { Router } from "express";
import { register } from "../controllers/auth.controller.js"

const userAuth = Router();

//Rutas de Autenticación

userAuth.post("/login");

userAuth.post("/register", register);

userAuth.get("/verify");

userAuth.post("/logout");

export default userAuth;