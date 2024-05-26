const Municipios = require('../models/Municipios')

exports.getAllMunicipios = async (req, res) => {
    try {
        const municipios = await Municipios.getMunicipios();
        res.status(200).json(municipios);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

exports.getParroquiasByMunicipio = async (req, res) => {
    try {
        const { municipioId } = req.params;
        const parroquias = await Municipios.getParroquiasFromMunicipio(municipioId);
        res.status(200).json(parroquias);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    };
};