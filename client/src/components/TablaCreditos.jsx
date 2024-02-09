import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from '@mui/system';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import moment from 'moment';

const StickyTableContainer = styled(TableContainer)(({ theme }) => ({
 maxHeight: 'calc(100vh - 200px)',
 overflow: 'auto',
}));

const TablaCreditos = ({ tipo }) => {
  const [datos, setDatos] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/creditos/${tipo}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        const data = await response.json();
        console.log(data);
        setDatos(data.creditos);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
  
    fetchData();
  }, [tipo]);

 return (
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
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
 {datos && datos.length > 0 ? (
    datos.map((fila, indice) => (
      <TableRow key={indice}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell style={{ padding: '10px' }} component="th" scope="row">
          {fila.nombres.toUpperCase()}</TableCell>
        <TableCell style={{ padding: '10px' }} align="center">{fila.apellidos.toUpperCase()}</TableCell>
        <TableCell style={{ padding: '10px' }} align="center">{fila.cedula_productor.toUpperCase()}</TableCell>
        <TableCell style={{ padding: '10px' }} align="center">{moment(fila.fecha).format('DD/MM/YYYY')}</TableCell>
        <TableCell style={{ padding: '10px' }} align="center">{fila.dimension_galpon.toUpperCase()}</TableCell>
        <TableCell style={{ padding: '10px' }} align="center">{fila.cantidad_semovientes.toUpperCase()}</TableCell>
        <TableCell style={{ padding: '10px' }} align="center">{fila.alimentacion_tipo.toUpperCase()}</TableCell>
        <TableCell style={{ padding: '10px' }} align="center">{fila.descripcion.toUpperCase()}</TableCell>
        <TableCell style={{ padding: '10px' }} align="center">{fila.factibilidad.toUpperCase()}</TableCell>
               <TableCell style={{ padding: '10px' }} align="center">
               <IconButton aria-label="edit">
                    <EditIcon />
                 </IconButton>
                 <IconButton
                    aria-label="delete"
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
 );
};

export default TablaCreditos;
