const Creditos = require('../models/Creditos');
const Acciones = require('../models/Acciones');

const obtenerCreditosPorTipo = async (req, res) => {
  try {
     const tipo = req.params.tipo;
     const creditos = await Creditos.filtrarCreditosPorTipo(tipo);
     if (creditos.length === 0) {
       return res.json({ message: 'No hay creditos registrados para este tipo' });
     }
     res.json({creditos});
  } catch (error) {
     res.status(500).json({ error: error.message });
  }
 };

const agregarCreditoAProductor = async (req, res) => {
    try {
        const nuevoCredito = await Creditos.agregarCreditoAProductor(req.body);
        await Acciones.registrarAccion('Credito Creado', `Crédito para ${req.body.cedula_productor} registrado`);
        res.json({
            message: 'Productor registrado exitosamente',
            data: nuevoCredito.rows[0]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const editarCreditoDeProductor = async (req, res) => {
  try {
       const {tipo, cedula_productor} = req.params;
       const credito = req.body;
       console.log(`Editando crédito para tipo: ${tipo} y cédula: ${cedula_productor}`);
       const updatedCredito = await Creditos.editarCreditoDeProductor(cedula_productor, credito);
 
       if (updatedCredito.rowCount > 0) {
        await Acciones.registrarAccion('Credito Editado', `Crédito para ${cedula_productor} editado`);

           res.json({
               message: 'Productor actualizado exitosamente',
               data: updatedCredito.rows[0]
           });
       } else {
           res.json({
               message: 'No se encontró un productor con esa cédula para actualizar',
           });
       }
  } catch (error) {
       console.error(`Error al editar crédito: ${error.message}`);
       res.status(500).json({ error: error.message });
  }
 };
  
  const eliminarDatosDeCredito = async (req, res) => {
    try {
      const cedula_productor = req.params.cedula_productor;
      await Creditos.eliminarDatosDeCredito(cedula_productor);

      await Acciones.registrarAccion('Credito Eliminado', `Crédito para ${cedula_productor} eliminado`);

      res.json({ message: 'Credito eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //* HORTICOLA

  const agregarHorticolaAProductor = async (req, res) => {
    try {
      const nuevoDato = await Creditos.agregarHorticolaAProductor(req.body);

      await Acciones.registrarAccion('Credito Creado', `Crédito para ${req.body.cedula_productor} registrado`);
  res.json(nuevoDato.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const editarHorticolaDeProductor = async (req, res) => {
    try {
      const cedula_productor = req.params.cedula_productor;
      const datosActualizados = req.body;
      const updatedDato = await Creditos.editarHorticolaDeProductor(cedula_productor, datosActualizados);
      await Acciones.registrarAccion('Credito Editado', `Crédito para ${cedula_productor} editado`);
      res.json(updatedDato.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const eliminarDatosDeHorticola = async (req, res) => {
    try {
      const cedula_productor = req.params.cedula_productor;
      await Creditos.eliminarDatosDeHorticola(cedula_productor);
      await Acciones.registrarAccion('Credito Eliminado', `Crédito para ${cedula_productor} eliminado`);

      res.json({ message: 'Dato horticola eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const obtenerHorticolasProductores = async (req, res) => {
    try {
      const tipo = req.params.horticola;
      const datosHorticola = await Creditos.obtenerHorticolasProductores(tipo);
      if (datosHorticola.length === 0) {
        return res.json({ message: 'No hay creditos registrados para este horticola' });
      }
      res.json({datosHorticola});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
    

const ObtenerPorTipo = async (req, res, next) => {
  if (req.params.tipo === 'horticola') {
    return obtenerHorticolasProductores(req, res);
  } else {
    return obtenerCreditosPorTipo(req, res);
  }
};

const ObtenerHorticolaCedula = async (req, res, next) => {
    try {
      const cedula_productor = req.params.cedula_productor;
      const datos = await Creditos.ObtenerHorticolaCedula(cedula_productor);
      if (datos.rowCount === 0) {
        return res.json({ message: 'Aún no hay un productor con este crédito asignado' });
      }
      res.json(datos.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

const ObtenerCreditoCedula = async (req, res, next) => {
    try {
        const tipo_credito = req.params.tipo;
        const cedula_productor = req.params.cedula_productor;

        // Obtén el id_rubro correspondiente al tipo_credito
        const id_rubro = await Creditos.obtenerIdRubroPorNombre(tipo_credito);

        const datos = await Creditos.ObtenerCreditoCedula(id_rubro, cedula_productor);
        if (datos.rowCount === 0) {
            return res.json({ message: 'Aún no hay un productor con este crédito asignado' });
        }
        
        res.json(datos.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const ObtenerPorCedula = async (req, res, next) => {
    if (req.params.tipo === 'horticola') {
        return ObtenerHorticolaCedula(req, res);
    } else {
        return ObtenerCreditoCedula(req, res);
    }
};

const RegistrarCreditoPorTipo = async (req, res, next) => {
    if (req.params.tipo === 'horticola') {
        return agregarHorticolaAProductor(req, res);
    } else {
        return agregarCreditoAProductor(req, res);
    }
};

const EditarCreditoPorTipoYCedula = async (req, res, next) => {
    if (req.params.tipo === 'horticola') {
        return editarHorticolaDeProductor(req, res);
    } else {
        return editarCreditoDeProductor(req, res);
    }
};

const EliminarCreditoPorTipoYCedula = async (req, res, next) => {
    if (req.params.tipo === 'horticola') {
        return eliminarDatosDeHorticola(req, res);
    } else {
        return eliminarDatosDeCredito(req, res);
    }
};

module.exports = {
    ObtenerPorTipo,
    ObtenerPorCedula,
    RegistrarCreditoPorTipo,
    EditarCreditoPorTipoYCedula,
    EliminarCreditoPorTipoYCedula
};