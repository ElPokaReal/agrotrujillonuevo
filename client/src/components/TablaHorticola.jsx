import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/system";
import moment from "moment";

const StickyTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: "calc(100vh - 200px)",
  overflow: "auto",
}));

const TablaHorticola = ({ datos = [] }) => {
  // Define el estado para los datos
  const [datosHorticola, setDatosHorticola] = useState([]);

  const getHorticola = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3000/creditos/horticola`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        // Actualiza el estado con los datos obtenidos
        setDatosHorticola(data.datosHorticola);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    useEffect(() => {
      getHorticola();
    }, []);

  return (
    <StickyTableContainer component={Paper} className="mt-2">
      <Table sx={{ minWidth: 650 }} stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Nombres</TableCell>
            <TableCell align="center">Apellidos</TableCell>
            <TableCell align="center">Cédula</TableCell>
            <TableCell align="center">Fecha</TableCell>
            <TableCell align="center">Hectareas</TableCell>
            <TableCell align="center">Hectareas Sembradas</TableCell>
            <TableCell align="center">Rubros</TableCell>
            <TableCell align="center">Riego</TableCell>
            <TableCell align="center">Semillas</TableCell>
            <TableCell align="center">Insumos</TableCell>
            <TableCell align="center">Implementos</TableCell>
            <TableCell align="center">Factibilidad</TableCell>
            <TableCell align="center">Técnico Asignado</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datosHorticola && datosHorticola.length > 0 ? (
            datosHorticola.map((fila, indice) => (
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
                <TableCell style={{ padding: "5px" }} align="center">
                  {fila.apellidos.toUpperCase()}
                </TableCell>
                <TableCell style={{ padding: "5px" }} align="center">
                  {fila.cedula_productor.toUpperCase()}
                </TableCell>
                <TableCell style={{ padding: "5px" }} align="center">
                  {moment(fila.fecha).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell style={{ padding: "5px" }} align="center">
                  {fila.n_hectareas.toUpperCase()}
                </TableCell>
                <TableCell style={{ padding: "5px" }} align="center">
                  {fila.n_h_sembradas.toUpperCase()}
                </TableCell>
                <TableCell style={{ padding: "5px" }} align="center">
                  {fila.rubros_est.toUpperCase()}
                </TableCell>
                <TableCell style={{ padding: "5px" }} align="center">
                  {fila.tipo_riego.toUpperCase()}
                </TableCell>
                <TableCell style={{ padding: "5px" }} align="center">
                  {fila.semillas.toUpperCase()}
                </TableCell>
                <TableCell style={{ padding: "5px" }} align="center">
                  {fila.insumos.toUpperCase()}
                </TableCell>
                <TableCell style={{ padding: "5px" }} align="center">
                  {fila.implementos.toUpperCase()}
                </TableCell>
                <TableCell style={{ padding: "5px" }} align="center">
                  {fila.factibilidad.toUpperCase()}
                </TableCell>
                <TableCell style={{ padding: "5px" }} align="center">
                  {fila.tecnico_asignado}
                </TableCell>
                <TableCell style={{ padding: "5px" }} align="center">
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete">
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
  );
};

export default TablaHorticola;
