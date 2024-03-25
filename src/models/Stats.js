const pool = require('../db');

const Stats = {
    async countAllProductores() {
        const result = await pool.query('SELECT COUNT(*) FROM productores');
        return result.rows[0].count;
      },

      async countAllCreditos() {
        const result = await pool.query(`SELECT SUM(counts) AS TotalCreditos
        FROM (
            SELECT COUNT(*) AS counts FROM creditos
            UNION ALL
            SELECT COUNT(*) AS counts FROM horticola
        ) AS CombinedCounts;`);
        return result.rows[0].totalcreditos;
      },
      async countAllTecnicos() {
        const result = await pool.query('SELECT COUNT(*) FROM tecnicos');
        return result.rows[0].count;
      },
      async getCreditosStats(timeframe) {
        let query = '';
        switch (timeframe) {
            case 'dia':
                query = 'SELECT DATE(fecha) AS date, COUNT(*) AS count FROM creditos GROUP BY DATE(fecha)';
                break;
            case 'mes':
                query = 'SELECT TO_CHAR(fecha, \'YYYY-MM\') AS date, COUNT(*) AS count FROM creditos GROUP BY TO_CHAR(fecha, \'YYYY-MM\')';
                break;
            case 'semana':
                query = 'SELECT EXTRACT(WEEK FROM fecha) AS date, COUNT(*) AS count FROM creditos GROUP BY EXTRACT(WEEK FROM fecha)';
                break;
            default:
                throw new Error('Marco de tiempo no válido');
        }
        const result = await pool.query(query);
        return result.rows;
    },
    async getProductoresStats(timeframe) {
        let query = '';
        switch (timeframe) {
            case 'dia':
                query = 'SELECT DATE(fecha) AS date, COUNT(*) AS count FROM productores GROUP BY DATE(fecha)';
                break;
            case 'mes':
                query = 'SELECT TO_CHAR(fecha, \'YYYY-MM\') AS date, COUNT(*) AS count FROM productores GROUP BY TO_CHAR(fecha, \'YYYY-MM\')';
                break;
            case 'semana':
                query = 'SELECT EXTRACT(WEEK FROM fecha) AS date, COUNT(*) AS count FROM productores GROUP BY EXTRACT(WEEK FROM fecha)';
                break;
            default:
                throw new Error('Marco de tiempo no válido');
        }
        const result = await pool.query(query);
        return result.rows;
    }
};

module.exports = Stats;