import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import ModalDeleteCredito from "../components/ModalsCreditos/ModalDeleteCredito";
import { toast } from "react-toastify";

const StickyTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: "calc(100vh - 200px)",
  overflow: "auto",
}));

const TablaCreditos = ({ tipo, opcionSeleccionada, searchTerm }) => {
  const [datos, setDatos] = useState([]);
  const [open, setOpen] = useState(false);
  const [cedulaProductor, setCedulaProductor] = useState(null);

  
  const getCreditos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/creditos/${tipo}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setDatos(data.creditos);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getCreditos();
  }, [tipo, opcionSeleccionada]);

  const handleDeleteCredito = (cedula_productor) => {
    const token = localStorage.getItem("token");
    fetch(
      `${process.env.REACT_APP_CREDITOS_URL}/${opcionSeleccionada}/${cedula_productor}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar el crédito");
        }
        getCreditos();
        toast.success("Datos de Crédito eliminados");
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    };

    const handleOpenDeleteModal = (cedula) => {
    console.log("handleOpenDeleteModal called with cedula:", cedula);
    setCedulaProductor(cedula);
    setOpen(true);
  };

  const datosFiltrados = datos ? datos.filter(dato =>
  dato.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dato.cedula_productor.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <StickyTableContainer component={Paper} className="mt-2">
        <Table sx={{ minWidth: 650 }} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Nombres</TableCell>
              <TableCell align="center">Apellidos</TableCell>
              <TableCell align="center">Cédula</TableCell>
              <TableCell align="center">Fecha</TableCell>
              <TableCell align="center">Dimensión Galpon</TableCell>
              <TableCell align="center">Nº Semovientes</TableCell>
              <TableCell align="center">Alimentación</TableCell>
              <TableCell align="center">Descripción</TableCell>
              <TableCell align="center">Factibilidad</TableCell>
              <TableCell align="center">Técnico Asignado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {datosFiltrados && datosFiltrados.length >  0 ? (
  datosFiltrados.map((fila, indice) => (
                <TableRow
                  key={indice}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    style={{ padding: "10px" }}
                    component="th"
                    scope="row"
                  >
                    {fila.nombres.toUpperCase()}
                  </TableCell>
                  <TableCell style={{ padding: "10px" }} align="center">
                    {fila.apellidos.toUpperCase()}
                  </TableCell>
                  <TableCell style={{ padding: "10px" }} align="center">
                    {fila.cedula_productor.toUpperCase()}
                  </TableCell>
                  <TableCell style={{ padding: "10px" }} align="center">
                    {moment(fila.fecha).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell style={{ padding: "10px" }} align="center">
                    {fila.dimension_galpon.toUpperCase()}
                  </TableCell>
                  <TableCell style={{ padding: "10px" }} align="center">
                    {fila.cantidad_semovientes.toUpperCase()}
                  </TableCell>
                  <TableCell style={{ padding: "10px" }} align="center">
                    {fila.alimentacion_tipo.toUpperCase()}
                  </TableCell>
                  <TableCell style={{ padding: "10px" }} align="center">
                    {fila.descripcion.toUpperCase()}
                  </TableCell>
                  <TableCell style={{ padding: "10px" }} align="center">
                    {fila.factibilidad.toUpperCase()}
                  </TableCell>
                  <TableCell style={{ padding: "10px" }} align="center">
                    {fila.tecnico_asignado}
                  </TableCell>
                  <TableCell style={{ padding: "10px" }} align="center">
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() =>
                        handleOpenDeleteModal(fila.cedula_productor)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  No se han encontrado datos registrados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StickyTableContainer>
      <ModalDeleteCredito
        open={open}
        handleClose={handleClose}
        handleDeleteCredito={handleDeleteCredito}
        cedula_productor={cedulaProductor}
      />
    </>
  );
};

export default TablaCreditos;
