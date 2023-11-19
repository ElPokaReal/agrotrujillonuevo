const Productor = require('../models/Productores');

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
    const cedula = req.body.cedula_productor; //* Suponiendo que el número de cédula está en el cuerpo de la solicitud
  
    try {
      const existingProductor = await Productor.findByProductorCedula(cedula);
      if (existingProductor) {
        return res.status(400).json({ message: 'El productor ya está registrado con este número de cédula' });
      }
  
      //! Si el productor no está registrado con este número de cédula, continuar con la creación
      const productor = Productor.create(req.body);
      res.json(productor);
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
      res.json({updatedProductor});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = {
    getAllProductores,
    getProductorByCedula,
    createProductor,
    deleteProductorByCedula,
    updateProductor
  };