import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DatePicker from "react-datepicker";

function ModalAddCredito({
  open,
  handleClose,
  addCredito,
  showHorticolaForm,
  opcionSeleccionada,
}) {
  // States for main form fields
  const [cedula_productor, setCedula_productor] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [dimension_galpon, setDimension_galpon] = useState("");
  const [cantidad_semovientes, setCantidad_Semovientes] = useState("");
  const [alimentacion_tipo, setAlimentacion_tipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [factibilidad, setFactibilidad] = useState("");
  const [id_tec, setId_tec] = useState("");
  const [productores, setProductores] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [cedulaProductorSeleccionado, setCedulaProductorSeleccionado] = useState("");

  // States for horticola form fields
  const [n_hectareas, setNum_Hectareas] = useState("");
  const [n_h_sembradas, setNum_Hectareas_Sembradas] = useState("");
  const [rubros_est, setRubros_Establecidos] = useState("");
  const [tipo_riego, setTipo_Riego] = useState("");
  const [semillas, setSemillas] = useState("");
  const [insumos, setInsumos] = useState("");
  const [implementos, setImplementos] = useState("");

  useEffect(() => {
    const cargarProductores = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_PRODUCTORES_URL}/credito/${opcionSeleccionada}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response);
        const data = await response.json();
        setProductores(data.productores);
      } catch (error) {
        console.error("Error al cargar los productores:", error);
      }
    };

    if (opcionSeleccionada) {
      cargarProductores();
    }
  }, [opcionSeleccionada]);

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

  const resetForm = () => {
    // Reset main form fields
    setCedula_productor("");
    setFecha("");
    setDimension_galpon("");
    setCantidad_Semovientes("");
    setAlimentacion_tipo("");
    setDescripcion("");
    setFactibilidad("");
    setId_tec("");

    // Reset horticola form fields
    setNum_Hectareas("");
    setNum_Hectareas_Sembradas("");
    setRubros_Establecidos("");
    setTipo_Riego("");
    setSemillas("");
    setInsumos("");
    setImplementos("");
  };

  const handleAddCredito = (e) => {
    e.preventDefault();

    const payload = {
      cedula_productor: cedulaProductorSeleccionado,
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
        implementos,
      }),
    };

    addCredito(payload);
    handleClose();
    resetForm();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Asignar Crédito</DialogTitle>
        <DialogContent>
          <form onSubmit={handleAddCredito}>
          <Box mt={2} mb={2}>
 <TextField
    select
    label="Seleccione al productor"
    value={cedulaProductorSeleccionado}
    onChange={(e) => setCedulaProductorSeleccionado(e.target.value)}
    fullWidth
    required
    SelectProps={{
      native: true,
    }}
 >
    <option value=""></option>
    {productores && productores.length > 0 ? (
      productores.map((productor) => (
        <option
          key={productor.cedula_productor}
          value={productor.cedula_productor}
        >
          {productor.nombres.toUpperCase()} {productor.apellidos.toUpperCase()}
        </option>
      ))
    ) : (
      <option disabled>No hay productores...</option>
    )}
 </TextField>
</Box>


            <Box mb={2}>
              <DatePicker
                selected={fecha}
                onChange={(date) => setFecha(date)}
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                customInput={
                  <TextField value={fecha} fullWidth label="Fecha" required />
                }
                popperClassName="custom-datepicker-popper"
                p
              />
            </Box>
            {!showHorticolaForm && (
              <>
                <Box mb={2}>
                  <TextField
                    label="Dimensión del Galpón"
                    value={dimension_galpon}
                    onChange={(e) => setDimension_galpon(e.target.value)}
                    fullWidth
                    required
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    label="Cantidad de Semovientes"
                    value={cantidad_semovientes}
                    onChange={(e) => setCantidad_Semovientes(e.target.value)}
                    fullWidth
                    required
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    label="Tipo de Alimentación"
                    value={alimentacion_tipo}
                    onChange={(e) => setAlimentacion_tipo(e.target.value)}
                    fullWidth
                    required
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    label="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    fullWidth
                    required
                  />
                </Box>
              </>
            )}
            {showHorticolaForm && (
              <>
                <Box mb={2}>
                  <TextField
                    label="Nº Hectareas"
                    value={n_hectareas}
                    onChange={(e) => setNum_Hectareas(e.target.value)}
                    fullWidth
                    required
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    label="Nº Hectareas Sembradas"
                    value={n_h_sembradas}
                    onChange={(e) => setNum_Hectareas_Sembradas(e.target.value)}
                    fullWidth
                    required
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    label="Rubros Establecidos"
                    value={rubros_est}
                    onChange={(e) => setRubros_Establecidos(e.target.value)}
                    fullWidth
                    required
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    label="Tipo de Riego"
                    value={tipo_riego}
                    onChange={(e) => setTipo_Riego(e.target.value)}
                    fullWidth
                    required
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    label="Semillas"
                    value={semillas}
                    onChange={(e) => setSemillas(e.target.value)}
                    fullWidth
                    required
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    label="Insumos"
                    value={insumos}
                    onChange={(e) => setInsumos(e.target.value)}
                    fullWidth
                    required
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    label="Implementos"
                    value={implementos}
                    onChange={(e) => setImplementos(e.target.value)}
                    fullWidth
                    required
                  />
                </Box>
              </>
            )}
                        <Box mb={2}>
              <TextField
                label="Factibilidad"
                value={factibilidad}
                onChange={(e) => setFactibilidad(e.target.value)}
                fullWidth
                required
              />
            </Box>
            <Box mb={2}>
            <TextField
 select
 label="Seleccione al técnico"
 value={id_tec}
 onChange={(e) => setId_tec(e.target.value)}
 fullWidth
 required
 SelectProps={{
    native: true,
 }}
>
 <option value=""></option>
 {tecnicos && tecnicos.length > 0 ? (
    tecnicos.map((tecnicos) => (
      <option
        key={tecnicos.id_tec}
        value={tecnicos.id_tec}
      >
        {tecnicos.nombres.toUpperCase()} {tecnicos.apellidos.toUpperCase()}
      </option>
    ))
 ) : (
    <option disabled>No hay técnicos...</option>
 )}
</TextField>
</Box>

            <Button type="submit" variant="contained" color="success" fullWidth>
              Agregar
            </Button>
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
    </>
  );
}

export default ModalAddCredito;
