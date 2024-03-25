const Acciones = require('../models/Acciones')

const getHistorialAcciones = async (req, res) => {
    try {
        const result = await Acciones.getHistorialAcciones();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el historial de acciones' });
    }
};

module.exports = {
    getHistorialAcciones
}