const pool = require('../db');

const Productor = {
    create(productor){
        const query = 'INSERT INTO productores (nombres, apellidos, cedula_productor, numero_telefonico, municipio, parroquia, sector, nombre_granja) VALUES ($1, $2, $3, $4, $5, $6, $7, $8 RETURNING *';
        const values = [productor.nombres, productor.apellidos, productor.cedula_productor, productor.numero_telefonico, productor.municipio, productor.parroquia, productor.sector, productor.nombre_granja]
        
    }
}

module.exports = Productor;
