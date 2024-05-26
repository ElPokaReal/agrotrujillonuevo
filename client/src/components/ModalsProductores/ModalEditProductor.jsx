import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

function ModalEditProductor({
  open,
  handleClose,
  editProductor,
  productorToEdit,
}) {
  const [productor, setProductor] = useState(null);
  const [municipios, setMunicipios] = useState([]);
  const [parroquias, setParroquias] = useState([]);
  const [selectedMunicipio, setSelectedMunicipio] = useState("");
  const [selectedParroquia, setSelectedParroquia] = useState("");

  const tiposCredito = [
    { id: 1, nombre: "BOVINO" },
    { id: 2, nombre: "CABRA" },
    { id: 3, nombre: "HORTICOLA" },
    { id: 4, nombre: "POLLO" },
    { id: 5, nombre: "GALLINA" },
    { id: 6, nombre: "CERDO" },
  ];

  const status = [
    { id: 1, name: "ACTIVO" },
    { id: 2, name: "PENDIENTE" },
    { id: 3, name: "INACTIVO" },
  ];

  const handleUpdateProductor = (e) => {
    e.preventDefault();
    editProductor(productor);
    handleClose();
  };

  useEffect(() => {
    if (productorToEdit) {
      const token = localStorage.getItem("token");
      fetch(`${process.env.REACT_APP_PRODUCTORES_URL}/${productorToEdit.cedula_productor}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
       .then((response) => {
          if (!response.ok) {
            throw new Error("Respuesta no autorizada");
          }
          return response.json();
        })
       .then((data) => {
          setProductor(data);
          // Aquí es donde actualizas el estado productor con los nuevos valores
          loadMunicipios().then(() => {
            setSelectedMunicipio(data.id_municipio);
            if (data.id_municipio) {
              loadParroquias(data.id_municipio).then(() => {
                setSelectedParroquia(data.id_parroquia);
              });
            }
          });
        })
       .catch((error) => {
          console.error("Hubo un error obteniendo los datos del productor", error);
        });
    }
  }, [productorToEdit]);

  const loadMunicipios = async () => {
    try {
      const response = await fetch("http://localhost:3000/municipios");
      if (response.ok) {
        const data = await response.json();
        setMunicipios(data);
      } else {
        throw new Error("Error al cargar los municipios");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadParroquias = async (municipioId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/parroquias/${municipioId}`
      );
      if (response.ok) {
        const data = await response.json();
        setParroquias(data);
      } else {
        throw new Error("Error al cargar las parroquias");
      }
    } catch (error) {
      console.error(error);
    }
  };

// Ejemplo de cómo actualizar solo el campo id_municipio y/o id_parroquia
const handleMunicipioChange = (e) => {
    const selectedMunicipioId = e.target.value;
    setSelectedMunicipio(selectedMunicipioId);
    loadParroquias(selectedMunicipioId);
  
    // Solo actualiza el campo id_municipio si ya existe en el estado productor
    if (productor) {
      setProductor(prevProductor => ({
       ...prevProductor,
        id_municipio: selectedMunicipioId,
      }));
    }
  };
  
  const handleParroquiaChange = (e) => {
    const selectedParroquiaId = e.target.value;
    setSelectedParroquia(selectedParroquiaId);
  
    // Similarmente, solo actualiza el campo id_parroquia si ya existe en el estado productor
    if (productor) {
      setProductor(prevProductor => ({
       ...prevProductor,
        id_parroquia: selectedParroquiaId,
      }));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Editar Productor</DialogTitle>
      <DialogContent>
        <form onSubmit={handleUpdateProductor}>
          <Box mb={2}>
            <TextField
              label="Nombres"
              value={productor ? productor.nombres : ""}
              onChange={(e) =>
                setProductor({ ...productor, nombres: e.target.value })
              }
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Apellidos"
              value={
                productor && productor.apellidos ? productor.apellidos : ""
              }
              onChange={(e) =>
                setProductor({ ...productor, apellidos: e.target.value })
              }
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Cédula del productor"
              value={
                productor && productor.cedula_productor
                  ? productor.cedula_productor
                  : ""
              }
              onChange={(e) =>
                setProductor({ ...productor, cedula_productor: e.target.value })
              }
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Número de teléfono"
              value={
                productor && productor.numero_telefonico
                  ? productor.numero_telefonico
                  : ""
              }
              onChange={(e) =>
                setProductor({
                  ...productor,
                  numero_telefonico: e.target.value,
                })
              }
              fullWidth
            />
          </Box>
          <Box mb={2}>
  <FormControl fullWidth>
    <InputLabel id="municipio-label">Municipio</InputLabel>
    <Select
      labelId="municipio-label"
      value={selectedMunicipio}
      onChange={handleMunicipioChange} // Usa el manejador ajustado
      required
    >
      {municipios.map((municipio) => (
        <MenuItem
          key={municipio.id_municipio}
          value={municipio.id_municipio}
        >
          {municipio.nombre_municipio}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Box>
<Box mb={2}>
  <FormControl fullWidth>
    <InputLabel id="parroquia-label">Parroquia</InputLabel>
    <Select
      labelId="parroquia-label"
      value={selectedParroquia}
      onChange={handleParroquiaChange} // Usa el manejador ajustado
      required
    >
      {parroquias.map((parroquia) => (
        <MenuItem
          key={parroquia.id_parroquia}
          value={parroquia.id_parroquia}
        >
          {parroquia.nombre_parroquia}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Box>
          <Box mb={2}>
            <TextField
              label="Sector"
              value={productor && productor.sector ? productor.sector : ""}
              onChange={(e) =>
                setProductor({ ...productor, sector: e.target.value })
              }
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Nombre de la granja"
              value={
                productor && productor.nombre_granja
                  ? productor.nombre_granja
                  : ""
              }
              onChange={(e) =>
                setProductor({ ...productor, nombre_granja: e.target.value })
              }
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="tipo-credito-label">Tipo de Crédito</InputLabel>
              <Select
                labelId="tipo-credito-label"
                value={
                  productor && productor.id_rubro ? productor.id_rubro : ""
                }
                onChange={(e) =>
                  setProductor({ ...productor, id_rubro: e.target.value })
                }
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
                value={
                  productor && productor.id_status ? productor.id_status : ""
                }
                onChange={(e) =>
                  setProductor({ ...productor, id_status: e.target.value })
                }
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

export default ModalEditProductor;
