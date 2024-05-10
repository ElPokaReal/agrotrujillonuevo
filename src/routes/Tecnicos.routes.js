const { Router } = require('express');
const { checkAuth } = require('../middlewares/AuthMiddleware');
const { getAllTecnicos, createTecnico, updateTecnico, deleteTecnico, getTecnicoByID } = require('../controllers/TecnicosController');

const Tecnicos = Router();

Tecnicos.get('/tecnicos', checkAuth, getAllTecnicos);

Tecnicos.get('/tecnicos/:id_tec', checkAuth, getTecnicoByID);

Tecnicos.post('/tecnicos', checkAuth, createTecnico);

Tecnicos.put('/tecnicos/:id_tec', checkAuth, updateTecnico);

Tecnicos.delete('/tecnicos/:id_tec', checkAuth, deleteTecnico);

module.exports = Tecnicos;