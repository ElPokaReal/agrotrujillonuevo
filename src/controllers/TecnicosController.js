const Tecnicos = require("../models/Tecnicos");

const getAllTecnicos = async (req, res) => {
  try {
    const getTecnicos = await Tecnicos.getTecnicos();
    res.json(getTecnicos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTecnico = async (req, res) => {
    const cedula = req.body.cedula;
  
    try {
        const existingTecnico = await Tecnicos.findByTecnicoCedula(cedula);
        if (existingTecnico) {
            res.status(400).json({ message: 'El tecnico ya se encuentra registrado' });
            return;
        }

        const tecnico = await Tecnicos.create(req.body);
        res.json(tecnico);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTecnico = async (req, res) => {
  const id_tec = req.params.id_tec;

  try {
      const existingTecnico = await Tecnicos.findByTecnicoId(id_tec);
      if (!existingTecnico) {
          res.status(404).json({ message: 'El tecnico no fue encontrado' });
          return;
      }

      const tecnicoData = { ...req.body, id_tec };
      const updatedTecnico = await Tecnicos.update(tecnicoData);
      if (updatedTecnico) {
          console.log(updatedTecnico);
          res.status(202).json(updatedTecnico);
      } else {
          res.status(404).json({ message: 'No se pudo actualizar el técnico' });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


const deleteTecnico = async (req, res) => {
  const id_tec  = req.params.id_tec ;

  try {
    const result = await Tecnicos.delete(id_tec);
    if (result === 0) {
      res
        .status(404)
        .json({
          message: "El tecnico no fue encontrado o no se pudo eliminar",
        });
      return;
    }
    res.json({ message: "Tecnico eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTecnicos,
  createTecnico,
  deleteTecnico,
  updateTecnico
};
