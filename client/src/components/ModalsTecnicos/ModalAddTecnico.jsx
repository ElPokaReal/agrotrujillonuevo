import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function ModalAddTecnico({ open, handleClose, addTecnico }) {
 const [nombres, setNombres] = useState('');
 const [apellidos, setApellidos] = useState('');
 const [cedulaTecnico, setCedulaTecnico] = useState('');

const resetForm = () => {
    setNombres('');
    setApellidos('');
    setCedulaTecnico('');
};

const handleAddTecnico = (e) => {
    e.preventDefault();
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
          </Box>
          <Box mb={2}>
            <TextField label="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} fullWidth required/>
          </Box>
          <Box mb={2}>
            <TextField label="Cédula del productor" value={cedulaTecnico} onChange={(e) => setCedulaTecnico(e.target.value)} fullWidth required />
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
