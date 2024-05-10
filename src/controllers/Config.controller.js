const { exportarDatabase, importarDatabase } = require('../utils/DBUtil');

exports.exportarBaseDeDatos = async (req, res) => {
 try {
    const rutaArchivo = await exportarDatabase();
    res.download(rutaArchivo);
 } catch (error) {
    console.error('Error al exportar la base de datos:', error);
    res.status(500).json({ error: 'Error al exportar la base de datos' });
 }
};

exports.importarBaseDeDatos = async (req, res) => {
    try {
       if (!req.file) {
         res.status(400).json({ error: 'No se proporcionó ningún archivo' });
         return;
       }
   
       const rutaArchivo = req.file.path; // Usa la ruta del archivo subido
   
       await importarDatabase(rutaArchivo);
   
       res.json({ message: 'Base de datos importada exitosamente' });
    } catch (error) {
       console.error('Error al importar la base de datos:', error);
       res.status(500).json({ error: 'Error al importar la base de datos' });
    }
   };