const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { config } = require('dotenv');
config();

//* Chequeo de autenticación de Usuarios
const checkAuth = (req, res, next) => {
    // Obtener el token del encabezado de autorización
    const tokenHeader = req.headers.authorization;
    const token = tokenHeader && tokenHeader.split(' ')[1]; // Extraer el token del encabezado

    if (token) {
        jwt.verify(token, process.env.AGRO_TOKEN, (err, decodedToken) => {
          if (err) {
            console.log("Error al verificar el token:", err);
            return res.status(401).json({ message: "No autorizado" }); // Cambiar a una respuesta JSON
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.status(401).json({ message: "No autorizado" }); // Cambiar a una respuesta JSON
    }
};

//* Chequeo de usuario
const checkUser = (req, res, next) => {
    const tokenHeader = req.headers.authorization;
    const token = tokenHeader && tokenHeader.split(' ')[1]; // Extraer el token del encabezado

    if (token) {
        jwt.verify(token, process.env.AGRO_TOKEN, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                try {
                    const user = await User.findByUserId(decodedToken.user_id);
                    res.locals.user = user;
                    next();
                } catch (error) {
                    // Manejar el error al buscar al usuario
                    res.locals.user = null;
                    next();
                }
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports = { checkAuth, checkUser };