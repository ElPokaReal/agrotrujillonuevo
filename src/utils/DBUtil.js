const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

function exportarDatabase() {
 return new Promise((resolve, reject) => {
    const fecha = new Date().toISOString().replace(/:/g, '-');
    const nombreArchivo = `backup-${fecha}.sql`;
    const rutaBackups = path.join(__dirname, '..', '..', 'backups');
    const rutaArchivo = path.join(rutaBackups, nombreArchivo);

    // Verificar si la carpeta "backups" existe, si no, crearla
    if (!fs.existsSync(rutaBackups)) {
      fs.mkdirSync(rutaBackups);
    }

    process.env.PGPASSWORD = process.env.DB_PASS;

    const comando = `D:\\PostgreSQL\\16\\bin\\pg_dump -U ${process.env.DB_USER} -p ${process.env.DB_PORT} -d ${process.env.DB_BD} > ${rutaArchivo}`;

    exec(comando, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al exportar la base de datos: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`Error al exportar la base de datos: ${stderr}`);
        reject(new Error(stderr));
        return;
      }
      console.log(`Base de datos exportada exitosamente: ${rutaArchivo}`);

      // Llamar a la función para modificar el archivo de volcado SQL
      modificarArchivoVolcado(rutaArchivo)
        .then(() => resolve(rutaArchivo))
        .catch(reject);
    });
 });
}

function modificarArchivoVolcado(rutaArchivo) {
  return new Promise((resolve, reject) => {
     fs.readFile(rutaArchivo, 'utf8', (err, data) => {
       if (err) {
         console.error('Error al leer el archivo:', err);
         reject(err);
         return;
       }
 
       // Modificar las declaraciones de creación de tablas y relaciones
       let modificado = data
       .replace(/CREATE TABLE (\w+)/g, 'CREATE TABLE IF NOT EXISTS $1')
       .replace(/INSERT INTO (\w+) \(/g, 'INSERT INTO $1 ( ON CONFLICT DO NOTHING')
       .replace(/CREATE SEQUENCE (\w+)/g, 'CREATE SEQUENCE IF NOT EXISTS $1')
       .replace(/CREATE INDEX (\w+)/g, 'CREATE INDEX IF NOT EXISTS $1')
       
       // Escribir el archivo modificado
       fs.writeFile(rutaArchivo, modificado, 'utf8', (err) => {
         if (err) {
           console.error('Error al escribir el archivo modificado:', err);
           reject(err);
           return;
         }
         console.log('Archivo de volcado SQL modificado exitosamente.');
         resolve();
       });
     });
  });
 }

function importarDatabase(rutaArchivo) {
    return new Promise((resolve, reject) => {
       // Establecer la variable de entorno PGPASSWORD
       process.env.PGPASSWORD = process.env.DB_PASS;
   
       const comando = `D:\\PostgreSQL\\16\\bin\\psql -U ${process.env.DB_USER} -d ${process.env.DB_BD} -f ${rutaArchivo}`;
       
       exec(comando, (error, stdout, stderr) => {
         if (error) {
           console.error(`Error al importar la base de datos: ${error.message}`);
           reject(error);
           return;
         }
         if (stderr) {
           console.error(`Error al importar la base de datos: ${stderr}`);
           reject(new Error(stderr));
           return;
         }
         console.log(`Base de datos importada exitosamente desde: ${rutaArchivo}`);
         resolve();
       });
    });
   }

module.exports = {
  exportarDatabase,
  importarDatabase,
};
