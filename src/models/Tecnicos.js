const pool = require('../db');

const Tecnicos = {
    
    async getTecnicos(){
        const query = 'SELECT * FROM tecnicos';
        const result = await pool.query(query);
        return result.rows;
    },

    async findByTecnicoId(id_tec){
        const query = `SELECT * FROM tecnicos WHERE id_tec = $1`;
        const values = [id_tec];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    async findByTecnicoCedula(cedula){
        const query = `SELECT * FROM tecnicos WHERE cedula = $1`;
        const values = [cedula];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    async create(tecnico){
        const query = 'INSERT INTO tecnicos (nombres, apellidos, cedula) VALUES ($1, $2, $3) RETURNING *';
        const values = [tecnico.nombres, tecnico.apellidos, tecnico.cedula];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    async update(tecnico){
        const query = 'UPDATE tecnicos SET nombres = $1, apellidos = $2, cedula = $3 WHERE id_tec = $4 RETURNING *';
        const values = [tecnico.nombres, tecnico.apellidos, tecnico.cedula, tecnico.id_tec];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    async delete(id_tec){
        const query = 'DELETE FROM tecnicos WHERE id_tec = $1';
        const values = [id_tec];
        const result = await pool.query(query, values);
        return result.rowCount;
    },
}

module.exports = Tecnicos;