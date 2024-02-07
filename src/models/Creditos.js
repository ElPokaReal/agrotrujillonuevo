const pool = require('../db');

const Creditos = {
  async obtenerCreditosProductores() {
    const query = `
      SELECT Pro.*, Cre.*, Ru.* 
      FROM productores Pro 
      INNER JOIN creditos Cre ON Pro.cedula_productor = Cre.cedula_productor
      INNER JOIN rubros Ru ON Pro.id_rubro = Ru.id_rubro
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  async agregarCreditoAProductor(credito) {
    const query = `
      INSERT INTO creditos(cedula_productor, fecha, dimension_galpon, cantidad_semovientes, alimentacion_tipo, descripcion, factibilidad, id_tec)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
    `;
    const values = [credito.cedula_productor, credito.fecha, credito.dimension_galpon, credito.cantidad_semovientes, credito.alimentacion_tipo, credito.descripcion, credito.factibilidad, credito.id_tec];
    return pool.query(query, values);
  },

  async editarCreditoDeProductor(credito) {
    const query = `
      UPDATE creditos
      SET fecha = $1, dimension_galpon = $2, cantidad_semovientes = $3, alimentacion_tipo = $4, descripcion = $5, factibilidad = $6, id_tec = $7 WHERE cedula_productor = $8 RETURNING *
    `;
    const values = [credito.fecha, credito.dimension_galpon, credito.cantidad_semovientes, credito.alimentacion_tipo, credito.descripcion, credito.factibilidad, credito.id_tec, credito.cedula_productor];
    return pool.query(query, values);
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
   
  
  async filtrarCreditosPorTipo(tipo) {
    const id_rubro = await this.obtenerIdRubroPorNombre(tipo);
    const query = `
    SELECT Ru.*, Pro.*, Cr.* 
    FROM rubros Ru 
    INNER JOIN productores Pro ON Pro.id_rubro = Ru.id_rubro
    INNER JOIN creditos Cr ON Cr.cedula_productor = Pro.cedula_productor
    WHERE Pro.id_rubro = $1
    `;
    const values = [id_rubro];
    const result = await pool.query(query, values);
    return result.rows;
  },

  async obtenerHorticolasProductores() {
    const query = `
      SELECT Pro.*, Hor.*, Ru.* 
      FROM productores Pro 
      INNER JOIN horticola Hor ON Pro.cedula_productor = Hor.cedula_productor
      INNER JOIN rubros Ru ON Pro.id_rubro = 3
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  async agregarHorticolaAProductor(horticola) {
    const query = `
      INSERT INTO horticola(cedula_productor, fecha, n_hectareas, n_h_sembradas, rubros_est, tipo_riego, semillas, insumos, implementos, factibilidad, id_tec)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *
    `;
    const values = [horticola.cedula_productor, horticola.fecha, horticola.n_hectareas, horticola.n_h_sembradas, horticola.rubros_est, horticola.tipo_riego, horticola.semillas, horticola.insumos, horticola.implementos, horticola.factibilidad, horticola.id_tec];
    return pool.query(query, values);
  },

  async editarHorticolaDeProductor(horticola) {
    const query = `
      UPDATE horticola
      SET fecha = $1, n_hectareas = $2, n_h_sembradas = $3, rubros_est = $4, tipo_riego = $5, semillas = $6, insumos = $7, implementos = $8, factibilidad = $9, id_tec = $10
      WHERE cedula_productor = $11 RETURNING *
    `;
    const values = [horticola.fecha, horticola.n_hectareas, horticola.n_h_sembradas, horticola.rubros_est, horticola.tipo_riego, horticola.semillas, horticola.insumos, horticola.implementos, horticola.factibilidad, horticola.id_tec, horticola.cedula_productor];
    return pool.query(query, values);
  },

  async eliminarDatosDeCredito(cedula_productor) {
    const query = `
      DELETE FROM creditos
      WHERE cedula_productor = $1
    `;
    const values = [cedula_productor];
    return pool.query(query, values);
  },

  async eliminarDatosDeHorticola(cedula_productor) {
    const query = `
      DELETE FROM horticola
      WHERE cedula_productor = $1
    `;
    const values = [cedula_productor];
    return pool.query(query, values);
  },

  async ObtenerCreditoCedula(tipo, cedula_productor) {
    const query = `SELECT * FROM creditos INNER JOIN productores ON creditos.cedula_productor = productores.cedula_productor
                   INNER JOIN rubros ON productores.id_rubro = rubros.id_rubro WHERE rubros.id_rubro = $1 AND creditos.cedula_productor = $2`;
    const values = [tipo, cedula_productor];
    return pool.query(query, values);
   },

  async ObtenerHorticolaCedula(cedula_productor) {
    const query = `SELECT * FROM horticola INNER JOIN productores ON horticola.cedula_productor = productores.cedula_productor WHERE horticola.cedula_productor = $1`;
    const values = [cedula_productor];
    return pool.query(query, values);
  },
}
module.exports = Creditos;