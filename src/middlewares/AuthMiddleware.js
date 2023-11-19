const jwt = require('jsonwebtoken');
const User = require('../models/User')
const {config} = require('dotenv')
config();

//* Chequeo de autenticación de Usuarios
const checkAuth = (req, res, next) => {

    const token = req.cookies.MyToken;

    if (token){
        jwt.verify(token, process.env.AGRO_TOKEN, (err, decodedToken) =>{
            if(err){
                console.log(err.message);
                res.redirect('/login')
            } else {
                console.log(decodedToken);
                next();                
            }
        });
    } else {
        res.redirect('/login');
    }
};

//* Chequeo de usuario
const checkUser = (req, res, next) => {
    const token = req.cookies.MyToken;
    if (token){
      jwt.verify(token, process.env.AGRO_TOKEN, async (err, decodedToken) => {
        if (err){
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