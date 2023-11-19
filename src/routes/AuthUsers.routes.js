const { Router } = require('express');
const { UserLogin_get, UserLogin_post, UserSignup_get, UserSignup_post, UserLogout, UserGetusers } = require('../controllers/AuthUsers.controller');

const AuthUsers = Router();

//Metodo Login
AuthUsers.get('/login', UserLogin_get);
AuthUsers.post('/login', UserLogin_post);

//Metodo Signup
AuthUsers.get('/register', UserSignup_get);
AuthUsers.post('/register', UserSignup_post);

//Metodo Logout
AuthUsers.get('/logout', UserLogout);

//Obtener usuarios
AuthUsers.get('/users', UserGetusers);

//Exportar Modulo
module.exports = AuthUsers;