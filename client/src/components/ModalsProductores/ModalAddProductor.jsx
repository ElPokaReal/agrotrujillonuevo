import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function ModalAddProductor({ open, handleClose, addProductor }) {
 const [nombres, setNombres] = useState('');
 const [apellidos, setApellidos] = useState('');
 const [cedulaProductor, setCedulaProductor] = useState('');
 const [numeroTelefonico, setNumeroTelefonico] = useState('');
 const [municipio, setMunicipio] = useState('');
 const [parroquia, setParroquia] = useState('');
 const [sector, setSector] = useState('');
 const [nombreGranja, setNombreGranja] = useState('');
 const [tipoCredito, setTipoCredito] = useState('');
 const [idRubro, setIdRubro] = useState('')
 const [status] = useState('3')


 const tiposCredito = [
    { id: 1, nombre: 'BOVINO' },
    { id: 2, nombre: 'CABRA' },
    { id: 3, nombre: 'HORTICOLA' },
    { id: 4, nombre: 'POLLO' },
    { id: 5, nombre: 'GALLINA' },
    { id: 6, nombre: 'CERDO' },
];

const resetForm = () => {
    setNombres('');
    setApellidos('');
    setCedulaProductor('');
    setNumeroTelefonico('');
    setMunicipio('');
    setParroquia('');
    setSector('');
    setNombreGranja('');
    setTipoCredito('');
};

const handleAddProductor = (e) => {
    e.preventDefault();
    addProductor({
        nombres: nombres.toUpperCase(),
        apellidos: apellidos.toUpperCase(),
        cedula_productor: cedulaProductor.toUpperCase(),
        numero_telefonico: numeroTelefonico.toUpperCase(),
        municipio: municipio.toUpperCase(),
        parroquia: parroquia.toUpperCase(),
        sector: sector.toUpperCase(),
        nombre_granja: nombreGranja.toUpperCase(),
      id_rubro: tipoCredito,
      id_status: status,
    });
    handleClose();
    resetForm();
};


 return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Agregar Productor</DialogTitle>
      <DialogContent>
      <form onSubmit={handleAddProductor}>
          <Box mb={2}>
            <TextField label="Nombres" value={nombres} onChange={(e) => setNombres(e.target.value)} fullWidth />
          </Box>
          <Box mb={2}>
            <TextField label="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} fullWidth />
          </Box>
          <Box mb={2}>
            <TextField label="Cédula del productor" value={cedulaProductor} onChange={(e) => setCedulaProductor(e.target.value)} fullWidth />
          </Box>
          <Box mb={2}>
            <TextField label="Número de teléfono" value={numeroTelefonico} onChange={(e) => setNumeroTelefonico(e.target.value)} fullWidth />
          </Box>
          <Box mb={2}>
            <TextField label="Municipio" value={municipio} onChange={(e) => setMunicipio(e.target.value)} fullWidth />
          </Box>
          <Box mb={2}>
            <TextField label="Parroquia" value={parroquia} onChange={(e) => setParroquia(e.target.value)} fullWidth />
          </Box>
          <Box mb={2}>
            <TextField label="Sector" value={sector} onChange={(e) => setSector(e.target.value)} fullWidth />
          </Box>
          <Box mb={2}>
            <TextField label="Nombre de la granja" value={nombreGranja} onChange={(e) => setNombreGranja(e.target.value)} fullWidth />
          </Box>
          <Box mb={2}>
          <FormControl fullWidth>
 <InputLabel id="tipo-credito-label">Tipo de Crédito</InputLabel>
 <Select
    labelId="tipo-credito-label"
    value={tipoCredito}
    onChange={(e) => setTipoCredito(e.target.value)}
    fullWidth
 >
    {tiposCredito.map((tipoCredito) => (
      <MenuItem key={tipoCredito.id} value={tipoCredito.id}>
        {tipoCredito.nombre}
      </MenuItem>
    ))}
 </Select>
</FormControl>
</Box>
<Box mb={2}>
 <TextField
    label="Status"
    value="INACTIVO"
    InputProps={{ readOnly: true }}
    fullWidth
 />
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

export default ModalAddProductor;
