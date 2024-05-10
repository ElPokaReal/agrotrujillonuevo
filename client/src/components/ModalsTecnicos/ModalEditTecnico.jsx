import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DatePicker from "react-datepicker";

function ModalEditTecnico({
  open,
  handleClose,
  editTecnico,
  tecnicoToEdit,
}) {
  const [tecnico, setTecnico] = useState(null);

  const handleUpdateTecnico = (e) => {
    e.preventDefault();
    editTecnico(tecnico);
    handleClose();
  };

  useEffect(() => {
    if (tecnicoToEdit) {
      const token = localStorage.getItem("token");
      fetch(
        `${process.env.REACT_APP_TECNICOS_URL}/${tecnicoToEdit.id_tec}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Respuesta no autorizada");
          }
          return response.json();
        })
        .then((data) => {
          setTecnico(data);
        })
        .catch((error) => {
          console.error(
            "Hubo un error obteniendo los datos del productor",
            error
          );
        });
    }
  }, [tecnicoToEdit]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Editar Técnico</DialogTitle>
      <DialogContent>
        <form onSubmit={handleUpdateTecnico}>
          <Box mb={2}>
            <TextField
              label="Nombres"
              value={tecnico ? tecnico.nombres : ""}
              onChange={(e) =>
                setTecnico({ ...tecnico, nombres: e.target.value })
              }
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Apellidos"
              value={
                tecnico && tecnico.apellidos ? tecnico.apellidos : ""
              }
              onChange={(e) =>
                setTecnico({ ...tecnico, apellidos: e.target.value })
              }
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Cédula del técnico"
              value={
                tecnico && tecnico.cedula
                  ? tecnico.cedula
                  : ""
              }
              onChange={(e) =>
                setTecnico({ ...tecnico, cedula: e.target.value })
              }
              fullWidth
            />
          </Box>
          <Button type="submit" variant="contained" color="success" fullWidth>
            Actualizar
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()} color="error" fullWidth>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalEditTecnico;
