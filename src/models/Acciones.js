const pool = require('../db');

const Acciones = {
    async registrarAccion(tipo_accion, descripcion) {
        const query = 'INSERT INTO acciones (tipo_accion, descripcion) VALUES ($1, $2)';
        const values = [tipo_accion, descripcion];
        await pool.query(query, values);
    },
    async getHistorialAcciones() {
        const query = 'SELECT * FROM acciones ORDER BY fecha DESC LIMIT 10';
        const result = await pool.query(query);
        return result.rows; // Devuelve los resultados de la consulta
    }
};

module.exports = Acciones;