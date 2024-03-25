import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TablaCreditos from "../components/TablaCreditos";
import TablaHorticola from "../components/TablaHorticola";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import ModalAddCredito from "../components/ModalsCreditos/ModalAddCredito";
import { toast } from 'react-toastify';

export default function Creditos() {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("bovino");
  const [openAddCreditoModal, setOpenAddCreditoModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cedula_productor, setCedulaProductor] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedOpcionSeleccionada = localStorage.getItem('opcionSeleccionada');
    if (savedOpcionSeleccionada) {
      setOpcionSeleccionada(savedOpcionSeleccionada);
    }
 }, []);

 const handleOpcionSeleccionadaChange = (event) => {
  const newOpcionSeleccionada = event.target.value;
  setOpcionSeleccionada(newOpcionSeleccionada);
  localStorage.setItem('opcionSeleccionada', newOpcionSeleccionada);
};

  const handleAddCredito = async (creditoData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_CREDITOS_URL}/${opcionSeleccionada}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(creditoData),
      });
  
      if (!response.ok) {
        throw new Error('Error al agregar crédito');
      }
  
      const data = await response.json();
      toast.success('Productor añadido exitosamente!');
      console.log('Crédito agregado exitosamente:', data);
      handleClose();
    } catch (error) {
      toast.warning('Ha ocurrido un error!');
      console.error('Error al agregar crédito:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
 };

 const handleSearch = (event) => {
  setSearchTerm(event.target.value);
};

const TablaCreditosTipo = () => <TablaCreditos tipo={opcionSeleccionada} opcionSeleccionada={opcionSeleccionada} searchTerm={searchTerm} />;

  const tablas = {
    bovino: <TablaCreditosTipo />,
    cabra: <TablaCreditosTipo />,
    pollo: <TablaCreditosTipo />,
    cerdo: <TablaCreditosTipo />,
    gallina: <TablaCreditosTipo />,
    horticola: <TablaHorticola />,
  };

  return (
    <>
      <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-slate-200">
        Listado de Créditos
      </h1>
      <div className="mt-2">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Buscar estado de Crédito"
            className="block w-full px-5 py-3 text-base text-gray-900 placeholder-gray-500 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:max-w-xs sm:text-sm"
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => setOpenAddCreditoModal(true)}
          >
            Agregar
          </Button>
          <Select
        value={opcionSeleccionada}
        onChange={handleOpcionSeleccionadaChange}
        className="bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-md shadow-sm text-base text-slate-700 dark:text-white h-10 "
      >
            <MenuItem value="bovino">Bovino</MenuItem>
            <MenuItem value="cabra">Cabra</MenuItem>
            <MenuItem value="pollo">Pollo</MenuItem>
            <MenuItem value="cerdo">Cerdo</MenuItem>
            <MenuItem value="gallina">Gallina</MenuItem>
            <MenuItem value="horticola">Horticola</MenuItem>
          </Select>
        </div>

        {tablas[opcionSeleccionada]}
      </div>
      <ModalAddCredito
        open={openAddCreditoModal}
        handleClose={() => setOpenAddCreditoModal(false)}
        addCredito={handleAddCredito}
        showHorticolaForm={opcionSeleccionada === 'horticola'}
      />
    </>
  );
}
