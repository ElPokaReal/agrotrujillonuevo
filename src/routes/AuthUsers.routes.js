const { Router } = require('express');
const { UserLogin_post, UserSignup_post, UserLogout, UserGetusers, UserByID, checkIsAuthenticated, UserLoggedIn, refreshToken, testToken } = require('../controllers/AuthUsers.controller');
const { checkAuth } = require('../middlewares/AuthMiddleware');

const AuthUsers = Router();

//Metodo Login
AuthUsers.post('/login', UserLogin_post);

//Metodo Signup
AuthUsers.post('/register', UserSignup_post);

//Metodo Logout
AuthUsers.get('/logout', UserLogout);

//Obtener usuarios
AuthUsers.get('/users', UserGetusers);

//Obtener usuario por id
AuthUsers.get('/users/:id', UserByID);

//Metodo para verificar si el usuario esta autenticado
AuthUsers.get('/isAuthenticated', checkIsAuthenticated);

//Metodo para obtener el usuario logueado
AuthUsers.get('/loggedInUser', UserLoggedIn);

AuthUsers.post('/refresh-token', checkAuth, refreshToken)

//Eliminar luego...
AuthUsers.post('/test-token', checkAuth, testToken)

//Exportar Modulo
module.exports = AuthUsers;