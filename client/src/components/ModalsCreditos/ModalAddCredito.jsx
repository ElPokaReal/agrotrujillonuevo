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


function ModalAddCredito({ open, handleClose, addCredito, showHorticolaForm }) {
  // States for main form fields
  const [cedula_productor, setCedula_productor] = useState("");
  const [fecha, setFecha] = useState("");
  const [dimension_galpon, setDimension_galpon] = useState("");
  const [cantidad_semovientes, setCantidad_Semovientes] = useState("");
  const [alimentacion_tipo, setAlimentacion_tipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [factibilidad, setFactibilidad] = useState("");
  const [id_tec, setId_tec] = useState("");

  // States for horticola form fields
  const [n_hectareas, setNum_Hectareas] = useState("");
  const [n_h_sembradas, setNum_Hectareas_Sembradas] = useState("");
  const [rubros_est, setRubros_Establecidos] = useState("");
  const [tipo_riego, setTipo_Riego] = useState("");
  const [semillas, setSemillas] = useState("");
  const [insumos, setInsumos] = useState("");
  const [implementos, setImplementos] = useState("");

  const resetForm = () => {
      // Reset main form fields
      setCedula_productor('');
      setFecha('');
      setDimension_galpon('');
      setCantidad_Semovientes('');
      setAlimentacion_tipo('');
      setDescripcion('');
      setFactibilidad('');
      setId_tec('');

      // Reset horticola form fields
      setNum_Hectareas('');
      setNum_Hectareas_Sembradas('');
      setRubros_Establecidos('');
      setTipo_Riego('');
      setSemillas('');
      setInsumos('');
      setImplementos('');
  };

  const handleAddCredito = (e) => {
      e.preventDefault();

      const payload = {
          cedula_productor,
          fecha,
          dimension_galpon,
          cantidad_semovientes,
          alimentacion_tipo,
          descripcion,
          factibilidad,
          id_tec,
          ...(showHorticolaForm && {
              n_hectareas,
              n_h_sembradas,
              rubros_est,
              tipo_riego,
              semillas,
              insumos,
              implementos
          })
      };

      addCredito(payload);
      handleClose();
      resetForm();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Agregar Productor</DialogTitle>
            <DialogContent>
                <form onSubmit={handleAddCredito}>
                    <Box mt={2} mb={2}>
                        <TextField label="Cédula del Productor" value={cedula_productor} onChange={(e) => setCedula_productor(e.target.value)} fullWidth/>
                    </Box>
                    <Box mb={2}>
                        <TextField label="Fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} fullWidth/>
                    </Box>
                    {!showHorticolaForm && (
                        <>
                            <Box mb={2}>
                                <TextField label="Dimensión del Galpón" value={dimension_galpon} onChange={(e) => setDimension_galpon(e.target.value)} fullWidth/>
                            </Box>
                            <Box mb={2}>
                                <TextField label="Cantidad de Semovientes" value={cantidad_semovientes} onChange={(e) => setCantidad_Semovientes(e.target.value)} fullWidth/>
                            </Box>
                            <Box mb={2}>
                                <TextField label="Tipo de Alimentación" value={alimentacion_tipo} onChange={(e) => setAlimentacion_tipo(e.target.value)} fullWidth/>
                            </Box>
                            <Box mb={2}>
                                <TextField label="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} fullWidth/>
                            </Box>
                        </>
                    )}
                    {showHorticolaForm && (
                        <>
                            <Box mb={2}>
                                <TextField label="Nº Hectareas" value={n_hectareas} onChange={(e) => setNum_Hectareas(e.target.value)} fullWidth/>
                            </Box>
                            <Box mb={2}>
                                <TextField label="Nº Hectareas Sembradas" value={n_h_sembradas} onChange={(e) => setNum_Hectareas_Sembradas(e.target.value)} fullWidth/>
                            </Box>
                            <Box mb={2}>
                                <TextField label="Rubros Establecidos" value={rubros_est} onChange={(e) => setRubros_Establecidos(e.target.value)} fullWidth/>
                            </Box>
                            <Box mb={2}>
                                <TextField label="Tipo de Riego" value={tipo_riego} onChange={(e) => setTipo_Riego(e.target.value)} fullWidth/>
                            </Box>
                            <Box mb={2}>
                                <TextField label="Semillas" value={semillas} onChange={(e) => setSemillas(e.target.value)} fullWidth/>
                            </Box>
                            <Box mb={2}>
                                <TextField label="Insumos" value={insumos} onChange={(e) => setInsumos(e.target.value)} fullWidth/>
                            </Box>
                            <Box mb={2}>
                                <TextField label="Implementos" value={implementos} onChange={(e) => setImplementos(e.target.value)} fullWidth/>
                            </Box>
                        </>
                    )}
                            <Box mb={2}>
                                <TextField label="Factibilidad" value={factibilidad} onChange={(e) => setFactibilidad(e.target.value)} fullWidth/>
                            </Box>
                            <Box mb={2}>
                                <TextField label="Técnico Asignado" value={id_tec} onChange={(e) => setId_tec(e.target.value)} fullWidth/>
                            </Box>

                    <Button type="submit" variant="contained" color="success" fullWidth>Agregar</Button>
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        handleClose();
                        resetForm();
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

export default ModalAddCredito;
