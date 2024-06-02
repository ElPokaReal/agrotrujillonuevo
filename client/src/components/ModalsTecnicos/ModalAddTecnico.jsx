import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'; // Importa Typography

function ModalAddTecnico({ open, handleClose, addTecnico }) {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [cedulaTecnico, setCedulaTecnico] = useState('');
  const [errors, setErrors] = useState({ nombres: '', apellidos: '', cedula: '' }); // Estado para errores

  const resetForm = () => {
    setNombres('');
    setApellidos('');
    setCedulaTecnico('');
    setErrors({ nombres: '', apellidos: '', cedula: '' }); // Resetea los errores
  };

  const validateFields = () => {
    const regexLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]+$/;
    const regexNumeros = /^\d{0,8}$/;

    let errors = {};

    if (!regexLetras.test(nombres || nombres.length > 5)) {
      errors.nombres = 'Por favor ingrese solo letras y debe contener al menos 5 carácteres.';
    }
    if (!regexLetras.test(apellidos || apellidos.length > 5)) {
      errors.apellidos = 'Por favor ingrese solo letras y debe contener al menos 5 carácteres.';
    }
    if (!regexNumeros.test(cedulaTecnico) || cedulaTecnico.length > 8) {
      errors.cedula = 'La cédula debe contener solo números y tener un máximo de 8 dígitos.';
    }

    setErrors(errors); // Actualiza el estado de errores
    return Object.keys(errors).length === 0; // Retorna true si no hay errores
  };

  const handleAddTecnico = (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    addTecnico({
      nombres: nombres.toUpperCase(),
      apellidos: apellidos.toUpperCase(),
      cedula: cedulaTecnico.toUpperCase(),
    });

    handleClose();
    resetForm();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Agregar Técnico</DialogTitle>
      <DialogContent>
        <form onSubmit={handleAddTecnico}>
          <Box mb={2} mt={2}>
            <TextField label="Nombres" value={nombres} onChange={(e) => setNombres(e.target.value)} fullWidth required />
            {errors.nombres && <Typography color="error">{errors.nombres}</Typography>} {/* Muestra el mensaje de error */}
          </Box>
          <Box mb={2}>
            <TextField label="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} fullWidth required/>
            {errors.apellidos && <Typography color="error">{errors.apellidos}</Typography>} {/* Muestra el mensaje de error */}
          </Box>
          <Box mb={2}>
            <TextField label="Cédula del productor" value={cedulaTecnico} onChange={(e) => setCedulaTecnico(e.target.value)} fullWidth required />
            {errors.cedula && <Typography color="error">{errors.cedula}</Typography>} {/* Muestra el mensaje de error */}
          </Box>
          <Button type="submit" variant="contained" color="success" fullWidth>Agregar</Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {handleClose(); resetForm();}} color="error" fullWidth>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalAddTecnico;