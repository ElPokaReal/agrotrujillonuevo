import React, {useEffect} from "react";
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

const TablaHorticola = ({ datos = [] }) => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/creditos/horticola`, {
         credentials: 'include'
        });
        const data = await response.json();
        console.log(data);
        setDatos(data.creditos);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
 
    fetchData();
  });

 return (
    <StickyTableContainer component={Paper} className="mt-2">
      <Table sx={{ minWidth: 650 }} stickyHeader>
        <TableHead>
          <TableRow>
          <TableCell>Nombres</TableCell>
          <TableCell align="center">Apellidos</TableCell>
            <TableCell align="center">Cédula Productor</TableCell>
            <TableCell align="center">Fecha</TableCell>
            <TableCell align="center">Nº Hectareas</TableCell>
            <TableCell align="center">Nº Hectareas Sembradas</TableCell>
            <TableCell align="center">Rubros Establecidos</TableCell>
            <TableCell align="center">Tipo de Riego</TableCell>
            <TableCell align="center">Semillas</TableCell>
            <TableCell align="center">Insumos</TableCell>
            <TableCell align="center">Implementos</TableCell>
            <TableCell align="center">Factibilidad</TableCell>
            <TableCell align="center">Técnico Asignado</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  {datos && datos.length >  0 ? (
    datos.map((fila, indice) => (
      <TableRow key={indice}sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>      
              <TableCell style={{ padding: '10px' }} component="th" scope="row">{fila.nombres}</TableCell>
              <TableCell style={{ padding: '10px' }} align="center">{fila.apellidos}</TableCell>
              <TableCell style={{ padding: '10px' }} align="center">{fila.cedula_productor}</TableCell>
              <TableCell style={{ padding: '10px' }} align="center">{fila.fecha}</TableCell>
              <TableCell style={{ padding: '10px' }} align="center">{fila.n_hectareas}</TableCell>
              <TableCell style={{ padding: '10px' }} align="center">{fila.n_h_sembradas}</TableCell>
              <TableCell style={{ padding: '10px' }} align="center">{fila.rubros_est}</TableCell>
              <TableCell style={{ padding: '10px' }} align="center">{fila.tipo_riego}</TableCell>
              <TableCell style={{ padding: '10px' }} align="center">{fila.semillas}</TableCell>
              <TableCell style={{ padding: '10px' }} align="center">{fila.insumos}</TableCell>
              <TableCell style={{ padding: '10px' }} align="center">{fila.implementos}</TableCell>
              <TableCell style={{ padding: '10px' }} align="center">{fila.factibilidad}</TableCell>
              <TableCell style={{ padding: '10px' }} align="center">{fila.id_tec}</TableCell>
              <TableCell style={{ padding: '10px' }} align="center">
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
