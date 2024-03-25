const { Router } = require ('express');
const StatsController = require('../controllers/Stats.controller')

const Stats = Router();

//* Stats 

Stats.get('/stats/productores', StatsController.getCountProductores);

Stats.get('/stats/creditos', StatsController.getCountCreditos);

Stats.get('/stats/tecnicos', StatsController.getCountTecnicos);

Stats.get('/stats/creditos/:timeframe', StatsController.getCreditosStats)

Stats.get('/stats/productores/:timeframe', StatsController.getProductoresStats)

module.exports = Stats;
