import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/system";
import ModalDelete from "../components/ModalsTecnicos/ModalDelete";
import { toast } from "react-toastify";
import ModalAddTecnico from "../components/ModalsTecnicos/ModalAddTecnico";
import ModalEditTecnico from "../components/ModalsTecnicos/ModalEditTecnico";

export default function Tecnicos() {
  const [tecnicos, setTecnicos] = useState([]);
  const [openAddTecnicoModal, setOpenAddTecnicoModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [deletingTecnicoId, setDeletingTecnicoId] = useState(null);
  const [openEditTecnicoModal, setOpenEditTecnicoModal] = useState(false);
  const [tecnicoToEdit, setTecnicoToEdit] = useState(null);

  const StickyTableContainer = styled(TableContainer)(({ theme }) => ({
    maxHeight: "calc(100vh - 200px)",
    overflow: "auto",
  }));

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

  const handleAddTecnico = async (tecnicoData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_TECNICOS_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tecnicoData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        console.log("Success:", await response.json());
        getTecnicos();
        handleClose();
        toast.success("Productor añadido exitosamente!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = (id_tec) => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_TECNICOS_URL}/${id_tec}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTecnicos(
          tecnicos.filter(
            (tecnico) => tecnico.id_tec !== id_tec
          )
        );
        getTecnicos();
        toast.success("El tecnico fue eliminado exitosamente.");
        handleClose();
      })
      .catch((error) => {
        console.error("Error al eliminar al tecnico:", error);
      });
  };

  const handleEditTecnico = async (updatedTecnico) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_TECNICOS_URL}/${updatedTecnico.id_tec}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedTecnico),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        console.log("Success:", await response.json());
        handleCloseEdit();
        toast.success("Técnico actualizado exitosamente!");
        getTecnicos();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCloseEdit = () => {
    setOpenEditTecnicoModal(false);
  };

  const handleEdit = (id_tec) => {
    const tecnicoToEdit = tecnicos.find(
      (tecnico) => tecnico.id_tec === id_tec
    );
    setTecnicoToEdit(tecnicoToEdit);
    setOpenEditTecnicoModal(true);
  };
  

  const handleClickOpen = (id_tec) => {
    setDeletingTecnicoId(id_tec);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-slate-200">
        Listado de Técnicos
      </h1>
      <div className="mt-2">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setOpenAddTecnicoModal(true)}
        >
          Agregar
        </Button>
      </div>
      <div className="overflow-x-auto">
        <StickyTableContainer component={Paper} className="mt-2">
          <Table sx={{ minWidth: 650 }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Nombres</TableCell>
                <TableCell align="center">Apellidos</TableCell>
                <TableCell align="center">Cédula</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tecnicos.length > 0 ? (
                tecnicos.map((tecnico) => (
                  <TableRow
                    key={tecnico.cedula}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {tecnico.nombres}
                    </TableCell>
                    <TableCell align="center">{tecnico.apellidos}</TableCell>
                    <TableCell align="center">{tecnico.cedula}</TableCell>
                    <TableCell style={{ padding: "10px" }} align="center">
                    <IconButton
                        aria-label="edit"
                        onClick={() => handleEdit(tecnico.id_tec)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() =>
                          handleClickOpen(tecnico.id_tec)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No se han encontrado técnicos registrados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </StickyTableContainer>
      </div>
      <ModalAddTecnico
        open={openAddTecnicoModal}
        handleClose={() => setOpenAddTecnicoModal(false)}
        addTecnico={handleAddTecnico}
      />
      <ModalDelete
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
        deletingTecnicoId={deletingTecnicoId}
      />
      <ModalEditTecnico
        open={openEditTecnicoModal}
        handleClose={handleCloseEdit}
        editTecnico={handleEditTecnico}
        tecnicoToEdit={tecnicoToEdit}
      />
    </>
  );
}
