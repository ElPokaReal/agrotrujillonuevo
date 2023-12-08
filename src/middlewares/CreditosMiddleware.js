const Creditos = require('../models/Creditos');

const verificarCreditoExistente = async (req, res, next) => {
    const tipo_credito = req.params.tipo;
    const cedula_productor = req.params.cedula_productor;
    const id_rubro = await Creditos.obtenerIdRubroPorNombre(tipo_credito);

    const credito = await Creditos.ObtenerCreditoCedula(id_rubro, cedula_productor);

    if (credito.rowCount > 0) {
        return res.status(400).json({ error: 'Este productor ya tiene un crédito registrado' });
    }


    next();
}

const verificarHorticolaExistente = async (req, res, next) => {
    const cedula_productor = req.params.cedula_productor;

    const horticola = await Creditos.ObtenerHorticolaCedula(cedula_productor);

    if (horticola.rowCount > 0) {
        return res.status(400).json({ error: 'Este productor ya tiene un hortícola registrado' });
    }

    next();
}

module.exports = { verificarCreditoExistente, verificarHorticolaExistente };