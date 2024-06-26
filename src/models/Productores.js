const pool = require('../db');

const Productor = {
    async create(productor){
        const query = 'INSERT INTO productores (nombres, apellidos, cedula_productor, numero_telefonico, id_municipio, id_parroquia, sector, nombre_granja, id_rubro, id_status, fecha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, now() AT TIME ZONE \'America/Caracas\') RETURNING *';
        const values = [productor.nombres, productor.apellidos, productor.cedula_productor, productor.numero_telefonico, productor.id_municipio, productor.id_parroquia, productor.sector, productor.nombre_granja, productor.id_rubro, productor.id_status]
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    async update(productor){
        const query = 'UPDATE productores SET nombres = $1, apellidos = $2, cedula_productor = $3, numero_telefonico = $4, id_municipio = $5, id_parroquia = $6, sector = $7, nombre_granja = $8, id_rubro = $9, id_status = $10 WHERE cedula_productor = $3 RETURNING *';
        const values = [productor.nombres, productor.apellidos, productor.cedula_productor, productor.numero_telefonico, productor.id_municipio, productor.id_parroquia, productor.sector, productor.nombre_granja, productor.id_rubro, productor.id_status]
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    async delete(cedula_productor){
        const query = 'DELETE FROM productores WHERE cedula_productor = $1';
        const values = [cedula_productor];
        const result = await pool.query(query, values);
        return result.rowCount;
    },

    async findByProductorCedula(cedula_productor){
        const query = `SELECT Pro.*, Ru.* FROM productores Pro INNER JOIN rubros Ru ON Pro.id_rubro = Ru.id_rubro WHERE Pro.cedula_productor LIKE $1`;
        const values = [cedula_productor];
        const result = await pool.query(query, values);
        return result.rows[0];
      },

      async getAllProductores() {
        const query = `
            SELECT Pro.*, Ru.*, Stat.*, Mun.*, Par.*
            FROM productores Pro
            INNER JOIN rubros Ru ON Pro.id_rubro = Ru.id_rubro
            INNER JOIN status Stat ON Pro.id_status = Stat.id_status
            INNER JOIN municipios Mun ON Pro.id_municipio = Mun.id_municipio
            INNER JOIN parroquias Par ON Pro.id_parroquia = Par.id_parroquia;
        `;
        const result = await pool.query(query);
        return result.rows;
    },

    async obtenerIdRubroPorNombre(nombre) {
        const query = 'SELECT id_rubro FROM rubros WHERE nombre_rubro = $1';
        const values = [nombre];
        const result = await pool.query(query, values);
        if (!result.rows[0]) {
           throw new Error(`No se encontró ningún rubro con el nombre ${nombre}`);
        }
        return result.rows[0].id_rubro;
       },
       
       async findProductoresByRubro(tipo) {
        const id_rubro = await this.obtenerIdRubroPorNombre(tipo);
        const query = `
        SELECT Pro.*, Ru.*, Stat.*, Mun.*, Par.* FROM productores Pro 
        INNER JOIN rubros Ru ON Pro.id_rubro = Ru.id_rubro 
        INNER JOIN status Stat ON Pro.id_status = Stat.id_status 
        INNER JOIN municipios Mun ON Pro.id_municipio = Mun.id_municipio
        INNER JOIN parroquias Par ON Pro.id_parroquia = Par.id_parroquia
        WHERE Pro.id_rubro = $1;    
        `;
        const values = [id_rubro];
        const result = await pool.query(query, values);
        return result.rows;
       }
}

module.exports = Productor;
