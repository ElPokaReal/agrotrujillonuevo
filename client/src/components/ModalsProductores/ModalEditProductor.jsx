import React, { useState, useEffect } from 'react';
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

function ModalEditProductor({ open, handleClose, editProductor, productorToEdit }) {
  const [productor, setProductor] = useState(null);
    

    const tiposCredito = [
        { id: 1, nombre: 'BOVINO' },
        { id: 2, nombre: 'CABRA' },
        { id: 3, nombre: 'HORTICOLA' },
        { id: 4, nombre: 'POLLO' },
        { id: 5, nombre: 'GALLINA' },
        { id: 6, nombre: 'CERDO' },
    ];

    const status = [
        { id: 1, name: 'ACTIVO' },
        { id: 2, name: 'PENDIENTE' },
        { id: 3, name: 'INACTIVO' },
    ];

    const handleUpdateProductor = (e) => {
        e.preventDefault();
        editProductor(productor);
        handleClose();
    };

    useEffect(() => {
      if (productorToEdit) {
        fetch(`${process.env.REACT_APP_PRODUCTORES_URL}/${productorToEdit.cedula_productor}`, {
          credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            setProductor(data);
        })
        .catch(error => {
            console.error("Hubo un error obteniendo los datos del productor", error);
        });
}
}, [productorToEdit]);

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Editar Productor</DialogTitle>
            <DialogContent>
                <form onSubmit={handleUpdateProductor}>
                    <Box mb={2}>
                    <TextField label="Nombres" value={productor ? productor.nombres : ""} onChange={(e) => setProductor({ ...productor, nombres: e.target.value })} fullWidth />
                    </Box>
                    <Box mb={2}>
                    <TextField label="Apellidos" value={productor && productor.apellidos ? productor.apellidos : ""} onChange={(e) => setProductor({ ...productor, apellidos: e.target.value })} fullWidth />
                    </Box>
                    <Box mb={2}>
                    <TextField label="Cédula del productor" value={productor && productor.cedula_productor ? productor.cedula_productor : ""} onChange={(e) => setProductor({ ...productor, cedula_productor: e.target.value })} fullWidth />
                    </Box>
                    <Box mb={2}>
                    <TextField label="Número de teléfono" value={productor && productor.numero_telefonico ? productor.numero_telefonico : ""} onChange={(e) => setProductor({ ...productor, numero_telefonico: e.target.value })} fullWidth />
                    </Box>
                    <Box mb={2}>
                    <TextField label="Municipio" value={productor && productor.municipio ? productor.municipio : ""} onChange={(e) => setProductor({ ...productor, municipio: e.target.value })} fullWidth />
                    </Box>
                    <Box mb={2}>
                    <TextField label="Parroquia" value={productor && productor.parroquia ? productor.parroquia : ""} onChange={(e) => setProductor({ ...productor, parroquia: e.target.value })} fullWidth />
                    </Box>
                    <Box mb={2}>
                    <TextField label="Sector" value={productor && productor.sector ? productor.sector : ""} onChange={(e) => setProductor({ ...productor, sector: e.target.value })} fullWidth />
                    </Box>
                    <Box mb={2}>
                    <TextField label="Nombre de la granja" value={productor && productor.nombre_granja ? productor.nombre_granja : ""} onChange={(e) => setProductor({ ...productor, nombre_granja: e.target.value })} fullWidth />
                    </Box>
                    <Box mb={2}>
                        <FormControl fullWidth>
                            <InputLabel id="tipo-credito-label">Tipo de Crédito</InputLabel>
                            <Select
    labelId="tipo-credito-label"
    value={productor && productor.id_rubro ? productor.id_rubro : ""}
    onChange={(e) => setProductor({ ...productor, id_rubro: e.target.value })}
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
                        <FormControl fullWidth>
                            <InputLabel id="status-label">Status</InputLabel>
                            <Select
    labelId="status-label"
    value={productor && productor.id_status ? productor.id_status : ""}
    onChange={(e) => setProductor({ ...productor, id_status: e.target.value })}
    fullWidth
>
    {status.map((statu) => (
        <MenuItem key={statu.id} value={statu.id}>
            {statu.name}
        </MenuItem>
    ))}
</Select>
                            </FormControl>
                    </Box>
                    <Button type="submit" variant="contained" color="success" fullWidth>Actualizar</Button>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()} color="error" fullWidth>Cancelar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalEditProductor;

