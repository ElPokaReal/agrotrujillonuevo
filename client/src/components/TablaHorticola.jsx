import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from '@mui/system';

const StickyTableContainer = styled(TableContainer)(({ theme }) => ({
 maxHeight: 'calc(100vh - 200px)',
 overflow: 'auto',
}));

const TablaHorticola = ({ datos }) => {
 return (
    <StickyTableContainer component={Paper} className="mt-2">
      <Table sx={{ minWidth: 650 }} stickyHeader>
        <TableHead>
          <TableRow>
          <TableCell>Nombres</TableCell>
          <TableCell>Apellidos</TableCell>
            <TableCell>Cedula Productor</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Nº Hectareas</TableCell>
            <TableCell>Nº Hectareas Sembradas</TableCell>
            <TableCell>Rubros Establecidos</TableCell>
            <TableCell>Tipo de Riego</TableCell>
            <TableCell>Semillas</TableCell>
            <TableCell>Insumos</TableCell>
            <TableCell>Implementos</TableCell>
            <TableCell>Factibilidad</TableCell>
            <TableCell>Técnico Asignado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datos.map((fila, indice) => (
            <TableRow key={indice}>
                                              <TableCell>{fila.nombres}</TableCell>
                              <TableCell>{fila.apellidos}</TableCell>
              <TableCell>{fila.cedula_productor}</TableCell>
              <TableCell>{fila.fecha}</TableCell>
              <TableCell>{fila.n_hectareas}</TableCell>
              <TableCell>{fila.n_h_sembradas}</TableCell>
              <TableCell>{fila.rubros_est}</TableCell>
              <TableCell>{fila.tipo_riego}</TableCell>
              <TableCell>{fila.semillas}</TableCell>
              <TableCell>{fila.insumos}</TableCell>
              <TableCell>{fila.implementos}</TableCell>
              <TableCell>{fila.factibilidad}</TableCell>
              <TableCell>{fila.id_tec}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StickyTableContainer>
 );
};

export default TablaHorticola;
