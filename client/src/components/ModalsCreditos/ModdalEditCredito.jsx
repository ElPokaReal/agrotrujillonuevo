import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DatePicker from "react-datepicker";

function ModalEditCredito({
  open,
  handleClose,
  editCredito,
  opcionSeleccionada,
  cedula_productor,
}) {
  const [credito, setCredito] = useState({});
  const [tecnicos, setTecnicos] = useState([]);

  const getTecnicos = async () => {
    try {
      const token = localStorage.getItem("token"); // Obtener el token del almacenamiento local
      const response = await fetch(`${process.env.REACT_APP_TECNICOS_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Agregar el token en el encabezado Authorization
        },
      });
      const data = await response.json();
      setTecnicos(data);
    } catch (error) {
      console.error("Error al obtener los tecnicos:", error);
    }
  };

  useEffect(() => {
    getTecnicos();
  }, []);


  useEffect(() => {
    if (opcionSeleccionada && cedula_productor) {
      fetch(
        `${process.env.REACT_APP_CREDITOS_URL}/${opcionSeleccionada}/${cedula_productor}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            const formattedCredito = {
              ...data[0],
              fecha: new Date(data[0].fecha),
            };
            setCredito(formattedCredito);
          } else {
            console.error("No se encontraron datos del crédito");
          }
        })
        .catch((error) => console.error("Error al cargar el crédito:", error));
    }
  }, [opcionSeleccionada, cedula_productor]);

  const handleUpdateCredito = (e) => {
    e.preventDefault();
    editCredito(credito);
    handleClose(); // Use handleClose instead of handleCloseEdit
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Editar Crédito</DialogTitle>
      <DialogContent>
        <form onSubmit={handleUpdateCredito}>
          <Box mb={2} mt={2}>
            <DatePicker
              selected={credito.fecha}
              onChange={(date) => setCredito({ ...credito, fecha: date })}
              dateFormat="dd/MM/yyyy"
              maxDate={new Date()}
              customInput={<TextField fullWidth label="Fecha" />}
              popperClassName="custom-datepicker-popper"
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Dimensión del Galpón"
              value={credito.dimension_galpon || ""}
              onChange={(e) =>
                setCredito({ ...credito, dimension_galpon: e.target.value })
              }
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Cantidad de Semovientes"
              value={credito.cantidad_semovientes || ""}
              onChange={(e) =>
                setCredito({ ...credito, cantidad_semovientes: e.target.value })
              }
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Tipo de Alimentación"
              value={credito.alimentacion_tipo || ""}
              onChange={(e) =>
                setCredito({ ...credito, alimentacion_tipo: e.target.value })
              }
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Descripción"
              value={credito.descripcion || ""}
              onChange={(e) =>
                setCredito({ ...credito, descripcion: e.target.value })
              }
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Factibilidad"
              value={credito.factibilidad || ""}
              onChange={(e) =>
                setCredito({ ...credito, factibilidad: e.target.value })
              }
              fullWidth
            />
          </Box>
          <Box mb={2}>
      <TextField
        select
        label="Técnico Asignado"
        value={credito.id_tec || ""}
        onChange={(e) => {
          const newIdTec = e.target.value;
          console.log("Nuevo ID Tec seleccionado:", newIdTec); // Depuración
          setCredito({...credito, id_tec: newIdTec});
        }}
        SelectProps={{
          native: true,
       }}
        fullWidth
      >
        {tecnicos && tecnicos.length > 0? (
          tecnicos.map((tecnico) => (
            <option key={tecnico.id_tec} value={tecnico.id_tec}>
              {tecnico.nombres.toUpperCase()} {tecnico.apellidos.toUpperCase()}
            </option>
          ))
        ) : (
          <option disabled>No hay técnicos disponibles</option>
        )}
      </TextField>
    </Box>  
          <Button type="submit" variant="contained" color="success" fullWidth>
            Actualizar
          </Button>
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
  );
}

export default ModalEditCredito;
