const Productor = require('../models/Productores');
const Acciones = require('../models/Acciones');
const fs = require("fs");
const path = require('path');
const PDFDocument = require('pdfkit-table');
const moment = require('moment');

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

   const generarReporteProductores = async (req, res) => {
    try {
      const productores = await Productor.getAllProductores();
  
      const outputDirectory = path.join(__dirname, '..', '..', 'listado_productores');
      const currentDate = moment().format('DD_MM_YYYY');
      const outputFilename = `listado_productores_${currentDate}.pdf`;
      const outputPath = path.join(outputDirectory, outputFilename);
  
      // Crear el directorio de salida si no existe
      if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory, { recursive: true });
      }
  
      // Preparar el stream de escritura del archivo
      const stream = fs.createWriteStream(outputPath);
      const doc = new PDFDocument({ margin: 30, size: 'A4' });
      doc.pipe(stream);
  
      const headerImage = path.join(__dirname, '..', 'public', 'logo.jpg');
      doc.image(headerImage, {
        fit: [doc.page.width, 100], // Ajusta el tamaño de la imagen aquí
        align: 'left',
        valign: 'top',
        margin: { top: 0 } // Ajusta el margen superior si es necesario
      }).moveDown(6);

      // Título del documento
      doc.fontSize(16).text('LISTADO DE PRODUCTORES', { align: 'center' }).moveDown(2);
  
      // Crear la tabla
      const table = {
        headers: ['CEDULA', 'NOMBRES', 'APELLIDOS', 'TELÉFONO', 'MUNICIPIO', 'PARROQUIA', 'SECTOR', 'GRANJA', 'TIPO DE CRÉDITO', 'STATUS'],
        rows: productores.map(productor => [
          productor.cedula_productor.toUpperCase(),
          productor.nombres.toUpperCase(),
          productor.apellidos.toUpperCase(),
          productor.numero_telefonico.toUpperCase(),
          productor.nombre_municipio.toUpperCase(),
          productor.nombre_parroquia.toUpperCase(),
          productor.sector.toUpperCase(),
          productor.nombre_granja.toUpperCase(),
          productor.nombre_rubro.toUpperCase(),
          productor.nombre_status.toUpperCase(),
        ]),
        widths: [100, 200, 200, 150, 150, 150, 150, 150, 150], // Ajusta los anchos de las columnas según sea necesario
      };
  
      // Agregar la tabla al documento
      doc.table(table, {
        prepareHeader: () => doc.fontSize(8),
        prepareRow: (row, i) => doc.fontSize(8)
      });
  
      // Finalizar el documento
      doc.end();
  
      // Enviar el archivo cuando se termine de escribir
      stream.on('finish', function () {
        res.status(200).sendFile(outputPath);
      });
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
    updateProductor,
    generarReporteProductores
  };