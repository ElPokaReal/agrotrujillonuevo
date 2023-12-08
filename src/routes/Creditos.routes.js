const { Router } = require ('express');
const { checkAuth } = require('../middlewares/AuthMiddleware');
const { ObtenerPorTipo, ObtenerPorCedula, RegistrarCreditoPorTipo, EditarCreditoPorTipoYCedula, EliminarCreditoPorTipoYCedula } = require('../controllers/Creditos.controller');
const { verificarCreditoExistente, verificarHorticolaExistente } = require('../middlewares/CreditosMiddleware');

const Creditos = Router();

//* Rutas especificas para creditos

Creditos.get('/creditos/:tipo', checkAuth, ObtenerPorTipo);

Creditos.get('/creditos/:tipo/:cedula_productor', checkAuth, ObtenerPorCedula);

Creditos.post('/creditos/:tipo/', checkAuth, verificarCreditoExistente, RegistrarCreditoPorTipo);

Creditos.post('/creditos/horticola/', checkAuth, verificarHorticolaExistente, RegistrarCreditoPorTipo);

Creditos.delete('/creditos/:cedula_productor', checkAuth, EliminarCreditoPorTipoYCedula);

Creditos.put('/creditos/:cedula_productor', checkAuth, EditarCreditoPorTipoYCedula)

module.exports = Creditos;