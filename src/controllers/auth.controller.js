import { jwtSecretAg } from "../config.js";
import  jwt  from "jsonwebtoken";
import { pool } from "../db.js";
import { registerQuery, isRegistered } from "../database/auth.query.js";
import bcrypt from 'bcryptjs';

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, jwtSecretAg, {
    expiresIn: maxAge
  });
};

export const register_get = (req, res) =>{
    res.render('register');
}

export const register_post = async (req, res, next) => {
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

        const token = createToken(user)

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

        res.json({
            status: true,
            token,
            message: "Usuario registrado satisfactoriamente"
        });
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res) => {
    try {
      const { user_email, user_password } = req.body;
  
      const user = await pool.query(isRegistered, [user_email]);
  
      if (user.rows.length === 0) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
  
      const validPassword = await bcrypt.compare(user_password, user.rows[0].user_password);
  
      if (!validPassword) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
  
      const token = jwt.sign({ user_id: user.rows[0].user_id }, jwtSecretAg, { expiresIn: '1hr' });
  
      res.json({ 
        message: "Iniciaste sesión correctamente",
        token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  };
