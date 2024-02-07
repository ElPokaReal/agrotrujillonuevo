import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
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
import ModalDelete from "../components/ModalsProductores/ModalDelete";
import ModalAddProductor from "../components/ModalsProductores/ModalAddProductor";
import ModalEditProductor from "../components/ModalsProductores/ModalEditProductor";
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { styled } from '@mui/system';

export default function Productores() {
 const [productores, setProductores] = useState([]);
 const [searchTerm, setSearchTerm] = useState("");
 const [open, setOpen] = useState(false);
 const [deletingProducerId, setDeletingProducerId] = useState(null);
 const [openAddProductorModal, setOpenAddProductorModal] = useState(false);
 const [openEditProductorModal, setOpenEditProductorModal] = useState(false);
const [productorToEdit, setProducerToEdit] = useState(null);

const StickyTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: 'calc(100vh - 200px)',
  overflow: 'auto',
 }));

 const getProductores = async () => {
   try {
      const response = await fetch(`${process.env.REACT_APP_PRODUCTORES_URL}`, {
        credentials: 'include'
      });
      const data = await response.json();
      setProductores(data);
   } catch (error) {
      console.error("Error al obtener los productores:", error);
   }
 };

 useEffect(() => {
   getProductores();
 }, []);

 const handleSearch = (event) => {
    setSearchTerm(event.target.value);
 };

 const handleDelete = (cedula_productor) => {
    fetch(`${process.env.REACT_APP_PRODUCTORES_URL}/${cedula_productor}`, {
      method: 'DELETE',
      credentials: 'include'
     })
      .then((response) => response.json())
      .then((data) => {
        setProductores(
          productores.filter(
            (productor) => productor.cedula_productor !== cedula_productor
          )
        );
        toast.success("El productor fue eliminado exitosamente.");
        handleClose(); 
      })
      .catch((error) => {
        console.error("Error al eliminar el productor:", error);
      });
 };

 const handleAddProductor = async (productorData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_PRODUCTORES_URL}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productorData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        console.log('Success:', await response.json());
        handleClose();
        toast.success('Productor añadido exitosamente!');
        getProductores();
      }
    } catch (error) {
      console.error('Error:', error);
    }
 };

 const handleEditProductor = async (updatedProductor) => {
  try {
     const response = await fetch(`${process.env.REACT_APP_PRODUCTORES_URL}/${updatedProductor.cedula_productor}`, {
       method: 'PUT',
       credentials: 'include',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(updatedProductor),
     });
 
     if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`);
     } else {
       console.log('Success:', await response.json());
       handleCloseEdit();
       toast.success('Productor actualizado exitosamente!');
       getProductores();
     }
  } catch (error) {
     console.error('Error:', error);
  }
 };
 
 const handleCloseEdit = () => {
  setOpenEditProductorModal(false);
 };
 
 const handleEdit = (cedula_productor) => {
  const productor = productores.find(productor => productor.cedula_productor === cedula_productor);
  setProducerToEdit(productor);
  setOpenEditProductorModal(true);
 };

 const handleClickOpen = (id) => {
    setDeletingProducerId(id);
    setOpen(true);
 };

 const handleClose = () => {
    setOpen(false);
 };

  return (
    <>
       <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-slate-200">
         Listado de Productores
       </h1>
       <div className="mt-2">
         <div className="flex items-center space-x-3">
<input
  type="text"
  placeholder="Buscar productor"
  value={searchTerm}
  onChange={handleSearch}
  className="block w-full px-5 py-3 text-base text-gray-900 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:max-w-xs sm:text-sm"
/>
<Button
  variant="contained"
  color="primary"
  startIcon={<AddCircleOutlineIcon />}
  onClick={() => setOpenAddProductorModal(true)}
> Agregar
</Button>
</div>
    </div>
    <StickyTableContainer component={Paper} className="mt-2">
      <Table sx={{ minWidth: 650 }} stickyHeader>
 <TableHead>
      <TableRow>
        <TableCell>Nombres</TableCell>
        <TableCell align="center">Apellidos</TableCell>
        <TableCell align="center">Cédula</TableCell>
        <TableCell align="center">Teléfono</TableCell>
        <TableCell align="center">Municipio</TableCell>
        <TableCell align="center">Parroquia</TableCell>
        <TableCell align="center">Sector</TableCell>
        <TableCell align="center">Granja</TableCell>
        <TableCell align="center">Tipo de Crédito</TableCell>
        <TableCell align="center">Status</TableCell>
        <TableCell align="center">Acciones</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
 {productores.length > 0 ? (
   productores
     .filter((productor) =>
       productor.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
       productor.cedula_productor.toString().includes(searchTerm)
     )
     .map((productor) => ({
      ...productor,
      nombres: productor.nombres.toUpperCase(),
      apellidos: productor.apellidos.toUpperCase(),
      cedula_productor: productor.cedula_productor.toString().toUpperCase(),
      numero_telefonico: productor.numero_telefonico.toUpperCase(),
      municipio: productor.municipio.toUpperCase(),
      parroquia: productor.parroquia.toUpperCase(),
      sector: productor.sector.toUpperCase(),
      nombre_granja: productor.nombre_granja.toUpperCase(),
      nombre_rubro: productor.nombre_rubro.toUpperCase(),
      nombre_status: productor.nombre_status.toUpperCase(),
   }))
   .map((productor) => (
       <TableRow
         key={productor.cedula_productor}
         sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
       >  
                <TableCell style={{ padding: '10px' }} component="th" scope="row">
                 {productor.nombres}
                </TableCell>
                <TableCell style={{ padding: '10px' }} align="center">{productor.apellidos}</TableCell>
                <TableCell style={{ padding: '10px' }} align="center">
                 {productor.cedula_productor}
                </TableCell>
                <TableCell style={{ padding: '10px' }} align="center">
                 {productor.numero_telefonico}
                </TableCell>
                <TableCell style={{ padding: '10px' }} align="center">{productor.municipio}</TableCell>
                <TableCell style={{ padding: '10px' }} align="center">{productor.parroquia}</TableCell>
                <TableCell style={{ padding: '10px' }} align="center">{productor.sector}</TableCell>
                <TableCell style={{ padding: '10px' }} align="center">{productor.nombre_granja}</TableCell>
                <TableCell style={{ padding: '10px' }} align="center">{productor.nombre_rubro}</TableCell>
                <TableCell style={{ padding: '10px' }} align="center">{productor.nombre_status}</TableCell>
                <TableCell style={{ padding: '10px' }} align="center">
                 <IconButton aria-label="edit" onClick={() => handleEdit(productor.cedula_productor)}>
                    <EditIcon />
                 </IconButton>
                 <IconButton
                    aria-label="delete"
                    onClick={() => handleClickOpen(productor.cedula_productor)}
                 >
                    <DeleteIcon />
                 </IconButton>
                </TableCell>
              </TableRow>
            ))) : (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  No se han encontrado productores registrados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </StickyTableContainer>
      <ModalAddProductor
        open={openAddProductorModal}
        handleClose={() => setOpenAddProductorModal(false)}
        addProductor={handleAddProductor}
      />
      <ModalDelete
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
        deletingProducerId={deletingProducerId}
      />
      <ModalEditProductor
        open={openEditProductorModal}
        handleClose={handleCloseEdit}
        editProductor={handleEditProductor}
        productorToEdit={productorToEdit}
      />
      </>
 );
}