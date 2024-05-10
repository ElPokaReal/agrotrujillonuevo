const Productor = require('../models/Productores');
const Acciones = require('../models/Acciones');

const getAllProductores = async (req, res) => {
    try {
      const productores = await Productor.getAllProductores();
      res.json(productores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getProductorByCedula = async (req, res) => {
    try {
      console.log(req.params.cedula_productor); // Agrega esta línea para depurar
      const productor = await Productor.findByProductorCedula(req.params.cedula_productor);
      if (!productor) {
        res.status(404).json({ message: 'Productor no encontrado' });
        return;
      }
      res.json(productor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const createProductor = async (req, res) => {
    const cedula = req.body.cedula_productor;
  
    try {
      const existingProductor = await Productor.findByProductorCedula(cedula);
      if (existingProductor) {
        return res.status(400).json({ message: 'El productor ya está registrado con este número de cédula' });
      }
  
      //* Si el productor no está registrado con este número de cédula, continuar con la creación
      const productor = await Productor.create(req.body);
      await Acciones.registrarAccion('Productor Registrado', `Se ha registrado un productor con cédula ${cedula}`);
      res.json(productor); // Envía la respuesta después de registrar la acción
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const deleteProductorByCedula = async (req, res) => {
    const cedula = req.params.cedula_productor;
  
    try {
      const result = await Productor.delete(cedula);
      if (result === 0) {
        res.status(404).json({ message: 'El productor no fue encontrado o no se pudo eliminar' });
        return;
      }
      await Acciones.registrarAccion('Productor Eliminado', `Se ha eliminado el productor con cédula ${cedula}`);
      res.json({ message: 'Productor eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const updateProductor = async (req, res) => {
    const cedula = req.body.cedula_productor;
  
    try {
      const existingProductor = await Productor.findByProductorCedula(cedula);
      if (!existingProductor) {
        res.status(404).json({ message: 'El productor no fue encontrado' });
        return;
      }
  
      const updatedProductor = await Productor.update(req.body);
      await Acciones.registrarAccion('Productor Actualizado', `Se ha actualizado el productor con cédula ${cedula}`);
      res.json({updatedProductor});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const obtenerPorTipo = async (req, res, next) => {
    try {
       const tipo = req.params.tipo;
       const productores = await Productor.findProductoresByRubro(tipo);
       if (productores.length === 0) {
         return res.json({ message: 'No hay productores registrados para este tipo' });
       }
       res.json({ productores });
    } catch (error) {
       res.status(500).json({ error: error.message });
    }
   };

  module.exports = {
    obtenerPorTipo,
    getAllProductores,
    getProductorByCedula,
    createProductor,
    deleteProductorByCedula,
    updateProductor
  };