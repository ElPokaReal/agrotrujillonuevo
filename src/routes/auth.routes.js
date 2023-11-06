import { Router } from "express";
import { register_post, register_get, login} from "../controllers/auth.controller.js"
import jwtAuth from "../middleware/jwtAuth.js";


const userAuth = Router();

//Rutas de Autenticación

userAuth.post("/login", login);

userAuth.get("/register", register_get);
userAuth.post("/register", register_post);

export default userAuth;