const Stats = require('../models/Stats');

const getCountProductores = async (req, res) => {
    try {
        const count = await Stats.countAllProductores();
        res.json ({count});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getCountCreditos = async (req, res) => {
    try {
        const count = await Stats.countAllCreditos();
        res.json ({count});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getCountTecnicos = async (req, res) => {
    try {
        const count = await Stats.countAllTecnicos();
        res.json ({count});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getCreditosStats = async (req, res) => {
  const { timeframe } = req.params;
  try {
      const result = await Stats.getCreditosStats(timeframe);
      res.json(result);
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener estadísticas de créditos' });
  }
};

const getProductoresStats = async (req, res) => {
  const { timeframe } = req.params;
  try {
      const result = await Stats.getProductoresStats(timeframe);
      res.json(result);
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener estadísticas de productores' });
  }
};

module.exports = {
    getCountCreditos,
    getCountProductores,
    getCountTecnicos,
    getCreditosStats,
    getProductoresStats
}