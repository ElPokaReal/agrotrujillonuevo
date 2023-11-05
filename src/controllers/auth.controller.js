import { jwtSecretAg, jwtReSecretAg } from "../config.js";
import  jwt  from "jsonwebtoken";
import { pool } from "../db.js";
import { registerQuery, isRegistered } from "../database/auth.query.js";
import bcrypt from 'bcryptjs';

export const register = async (req, res, next) => {
    try {
        const { user_name ,user_email, user_password } = req.body;

        //Verifica si el usuario está registrado
        const userRegistered = await pool.query(isRegistered, [user_email])
        if(userRegistered.rows.length > 0){
            return res.status(400).json({message: "Ya un usuario se encuentra registrado con este correo, intenta con otro."})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user_password, salt);
        const user = await pool.query(registerQuery, [user_name, user_email, hashedPassword])

        // Genera el Access Token
        const accessToken = jwt.sign({ user_id: user.rows[0].id }, jwtSecretAg, { expiresIn: '1h' });

        // Genera el Refresh Token
        const refreshToken = jwt.sign({ user_id: user.rows[0].id }, jwtReSecretAg);

        res.json({
            datos: user.rows,
            status: true,
            message: "Usuario registrado satisfactoriamente",
            accessToken,
            refreshToken });
    } catch (error) {
        next(error);
    }
}
