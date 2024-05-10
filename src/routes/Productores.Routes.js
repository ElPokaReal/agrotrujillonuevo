const { Router } = require ('express');
const { checkAuth } = require('../middlewares/AuthMiddleware');
const { getAllProductores, obtenerPorTipo ,getProductorByCedula, createProductor, deleteProductorByCedula, updateProductor } = require('../controllers/Productores.controller');

const Productores = Router();

//* Rutas especificas para productores

Productores.get('/productores', checkAuth, getAllProductores);

Productores.get('/productores/:cedula_productor', checkAuth, getProductorByCedula);

Productores.post('/productores', checkAuth, createProductor);

Productores.delete('/productores/:cedula_productor', checkAuth, deleteProductorByCedula);

Productores.put('/productores/:cedula_productor', checkAuth, updateProductor);

Productores.get('/productores/credito/:tipo', checkAuth, obtenerPorTipo);


module.exports = Productores;