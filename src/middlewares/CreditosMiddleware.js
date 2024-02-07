const Creditos = require('../models/Creditos');

const verificarCreditoExistente = async (req, res, next) => {
    const tipo_credito = req.params.tipo;
    const cedula_productor = req.body.cedula_productor;
    const id_rubro = await Creditos.obtenerIdRubroPorNombre(tipo_credito);
    console.log('Verificando crédito existente para id_rubro:', id_rubro, 'y cedula_productor:', cedula_productor);

    const credito = await Creditos.ObtenerCreditoCedula(cedula_productor, tipo_credito);

    console.log('Crédito existente:', credito);

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