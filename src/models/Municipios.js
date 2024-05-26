const pool = require('../db');

const Municipios = {
    async getMunicipios() {
        const query = 'SELECT * FROM municipios';
        const result = await pool.query(query);
        return result.rows;
    },

async getParroquiasFromMunicipio(municipioId) {
    const query = 'SELECT p.* FROM parroquias p INNER JOIN municipios m ON p.municipio_id = m.id_municipio WHERE m.id_municipio = $1';
    const result = await pool.query(query, [municipioId]);
    return result.rows;
},

}

module.exports = Municipios;