import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function ModalEditTecnico({
  open,
  handleClose,
  editTecnico,
  tecnicoToEdit,
}) {
  const [tecnico, setTecnico] = useState(null);
  const [errors, setErrors] = useState({ nombres: '', apellidos: '', cedula: '' }); // Estado para errores

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
            "Hubo un error obteniendo los datos del técnico",
            error
          );
        });
    }
  }, [tecnicoToEdit]);

  const validateFields = () => {
    const regexLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]+$/;
    const regexNumeros = /^\d{0,8}$/;

    let newErrors = {};

    if (!regexLetras.test(tecnico.nombres) || tecnico.nombres.length < 5) {
      newErrors.nombres = 'Por favor ingrese solo letras y debe contener al menos 5 caracteres.';
    }
    if (!regexLetras.test(tecnico.apellidos) || tecnico.apellidos.length < 5) {
      newErrors.apellidos = 'Por favor ingrese solo letras y debe contener al menos 5 caracteres.';
    }
    if (!regexNumeros.test(tecnico.cedula) || tecnico.cedula.length > 8) {
      newErrors.cedula = 'La cédula debe contener solo números y tener un máximo de 8 dígitos.';
    }

    setErrors(newErrors); // Actualiza el estado de errores
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  const handleUpdateTecnico = (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    editTecnico({
      ...tecnico,
      nombres: tecnico.nombres.toUpperCase(),
      apellidos: tecnico.apellidos.toUpperCase(),
      cedula: tecnico.cedula.toUpperCase(),
    });

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Editar Técnico</DialogTitle>
      <DialogContent>
        <form onSubmit={handleUpdateTecnico}>
          <Box mb={2}>
            <TextField
              label="Nombres"
              value={tecnico ? tecnico.nombres : ""}
              onChange={(e) => setTecnico({ ...tecnico, nombres: e.target.value })}
              fullWidth
              required
              error={!!errors.nombres}
              helperText={errors.nombres}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Apellidos"
              value={tecnico && tecnico.apellidos ? tecnico.apellidos : ""}
              onChange={(e) => setTecnico({ ...tecnico, apellidos: e.target.value })}
              fullWidth
              required
              error={!!errors.apellidos}
              helperText={errors.apellidos}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Cédula del técnico"
              value={tecnico && tecnico.cedula ? tecnico.cedula : ""}
              onChange={(e) => setTecnico({ ...tecnico, cedula: e.target.value })}
              fullWidth
              required
              error={!!errors.cedula}
              helperText={errors.cedula}
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
