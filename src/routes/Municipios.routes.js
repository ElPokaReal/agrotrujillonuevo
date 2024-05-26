const { Router } = require ('express');
const Municipios = require('../controllers/Municipios.controller');

const Municipio = Router();

Municipio.get('/parroquias/:municipioId', Municipios.getParroquiasByMunicipio);

Municipio.get('/municipios', Municipios.getAllMunicipios);

module.exports = Municipio;