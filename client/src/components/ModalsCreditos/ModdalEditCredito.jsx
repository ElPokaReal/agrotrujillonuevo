import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from "moment";

function ModalEditCredito({ open, handleClose, editCredito, opcionSeleccionada, cedula_productor }) {

    const [credito, setCredito] = useState({});

    useEffect(() => {
        if (opcionSeleccionada && cedula_productor) {
           fetch(`${process.env.REACT_APP_CREDITOS_URL}/${opcionSeleccionada}/${cedula_productor}`, {
             headers: {
               'Authorization': `Bearer ${localStorage.getItem('token')}`,
             },
           })
           .then(response => response.json())
           .then(data => {
             if (Array.isArray(data) && data.length > 0) {
               // Formatear la fecha antes de establecerla en el estado
               const formattedCredito = {
                 ...data[0],
                 fecha: moment(data[0].fecha).format('DD/MM/YYYY'),
               };
               setCredito(formattedCredito);
             } else {
               console.error("No se encontraron datos del crédito");
             }
           })
           .catch(error => console.error("Error al cargar el crédito:", error));
        }
       }, [opcionSeleccionada, cedula_productor]);

   const handleUpdateCredito = (e) => {
    e.preventDefault();
    editCredito(credito);
    handleClose(); // Use handleClose instead of handleCloseEdit
   };

 return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
<Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Editar Crédito</DialogTitle>
            <DialogContent >
                <form onSubmit={handleUpdateCredito}>
                    <Box mb={2} mt={2}>
                        <TextField label="Fecha" value={credito.fecha || ''} onChange={(e) => setCredito({ ...credito, fecha: e.target.value })} fullWidth/>
                    </Box>
                    <Box mb={2}>
                        <TextField label="Dimensión del Galpón" value={credito.dimension_galpon || ''} onChange={(e) => setCredito({ ...credito, dimension_galpon: e.target.value })} fullWidth/>
                    </Box>
                    <Box mb={2}>
                        <TextField label="Cantidad de Semovientes" value={credito.cantidad_semovientes || ''} onChange={(e) => setCredito({ ...credito, cantidad_semovientes: e.target.value })} fullWidth/>
                    </Box>
                    <Box mb={2}>
                        <TextField label="Tipo de Alimentación" value={credito.alimentacion_tipo || ''} onChange={(e) => setCredito({ ...credito, alimentacion_tipo: e.target.value })} fullWidth/>
                    </Box>
                    <Box mb={2}>
                        <TextField label="Descripción" value={credito.descripcion || ''} onChange={(e) => setCredito({ ...credito, descripcion: e.target.value })} fullWidth/>
                    </Box>
                    <Box mb={2}>
                        <TextField label="Factibilidad" value={credito.factibilidad || ''} onChange={(e) => setCredito({ ...credito, factibilidad: e.target.value })} fullWidth/>
                    </Box>
                    <Box mb={2}>
                        <TextField label="Técnico Asignado" value={credito.id_tec || ''} onChange={(e) => setCredito({ ...credito, id_tec: e.target.value })} fullWidth/>
                    </Box>
                    <Button type="submit" variant="contained" color="success" fullWidth>Actualizar</Button>
                </form>
            </DialogContent>
            <DialogActions>
            <Button
 onClick={() => {
    handleClose(); // Use handleClose instead of handleCloseEdit
    setCredito({}); // Reset the credito state
 }}
 color="error"
 fullWidth
>
 Cancelar
</Button>
            </DialogActions>
        </Dialog>
    </LocalizationProvider>
);
}

export default ModalEditCredito;