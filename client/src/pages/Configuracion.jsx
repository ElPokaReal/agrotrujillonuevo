import React, { useState } from 'react';

function Configuracion() {
 const [archivoSubido, setArchivoSubido] = useState(null);

 const exportarBaseDeDatos = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.REACT_APP_CONFIG_URL}/exportar`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'backup.sql');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error al exportar la base de datos:', error);
    }
 };

 const manejarSubidaArchivo = (event) => {
    const archivo = event.target.files[0];
    setArchivoSubido(archivo);
 };

 const importarBaseDeDatos = async () => {
    if (!archivoSubido) {
      console.error('No se ha subido ningún archivo');
      return;
    }

    const formData = new FormData();
    const token = localStorage.getItem('token');
    formData.append('backup', archivoSubido);

    try {
      const response = await fetch(`${process.env.REACT_APP_CONFIG_URL}/importar`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        console.log('Base de datos importada exitosamente');
        setArchivoSubido(null); // Limpiar el archivo subido después de la importación
      } else {
        throw new Error('Error al importar la base de datos');
      }
    } catch (error) {
      console.error('Error al importar la base de datos:', error);
    }
 };

 return (
    <>
      <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-slate-200 mb-4">
        Configuración
      </h1>
      <div className="flex flex-col items-center space-y-4 mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={exportarBaseDeDatos}
        >
          Exportar Base de Datos
        </button>
        <input
          type="file"
          accept=".sql"
          onChange={manejarSubidaArchivo}
        />
        {archivoSubido && (
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={importarBaseDeDatos}
          >
            Cargar Backup
          </button>
        )}
      </div>
    </>
 );
}

export default Configuracion;