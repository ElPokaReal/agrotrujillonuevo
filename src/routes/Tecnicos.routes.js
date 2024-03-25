const { Router } = require('express');
const { checkAuth } = require('../middlewares/AuthMiddleware');
const { getAllTecnicos, createTecnico, updateTecnico, deleteTecnico } = require('../controllers/TecnicosController');

const Tecnicos = Router();

Tecnicos.get('/tecnicos', checkAuth, getAllTecnicos);

Tecnicos.post('/tecnicos', checkAuth, createTecnico);

Tecnicos.put('/tecnicos/:id_tec', checkAuth, updateTecnico);

Tecnicos.delete('/tecnicos/:id_tec', checkAuth, deleteTecnico);

module.exports = Tecnicos;