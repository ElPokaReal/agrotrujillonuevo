const { Router } = require('express');
const { checkAuth } = require('../middlewares/AuthMiddleware');
const DatabaseController = require('../controllers/Config.controller');
const multer = require('multer');

const Config = Router();

const upload = multer({ dest: 'uploads/' }); // Configura el directorio de destino para los archivos subidos

Config.get('/config/exportar', checkAuth, DatabaseController.exportarBaseDeDatos);

Config.post('/config/importar', checkAuth, upload.single('backup'),DatabaseController.importarBaseDeDatos);

module.exports = Config;