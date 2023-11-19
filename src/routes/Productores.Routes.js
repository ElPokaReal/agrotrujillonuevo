const { Router } = require ('express');
const { checkAuth } = require('../middlewares/AuthMiddleware');

const Productores = Router();

Productores.get('/productores', checkAuth);

// TODO: Agregar las demás rutas


module.exports = Productores;