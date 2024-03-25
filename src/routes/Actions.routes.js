const { Router } = require ('express');
const AccionesController = require('../controllers/AccionesController');

const Actions = Router();

Actions.get('/actions/history', AccionesController.getHistorialAcciones);

module.exports = Actions;
