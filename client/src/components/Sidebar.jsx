import React, { useState } from "react";
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaPerson, FaMoneyCheckDollar } from "react-icons/fa6";
import { MdDashboard, MdEngineering } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

const Sidebar = ({setIsAuthenticated}) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  
    // Usar un callback con navigate para asegurar que se ejecute después de actualizar el estado
    setTimeout(() => {
      navigate("/");
    }, 100); // Un pequeño retraso puede ayudar a asegurar que el estado se actualice correctamente antes de la navegación
  
    toast.success('Cierre de Sesión exitoso');
  };

  const Menus = [
    { title: "Menú Principal", path: "/dashboard", src: <MdDashboard /> },
    { title: "Productores", path: "/productores", src: <FaPerson /> },
    { title: "Créditos", path: "/creditos", src: <FaMoneyCheckDollar /> },
    { title: "Técnicos", path: "/tecnicos", src: <MdEngineering /> },
    {
      title: "Cerrar Sesión",
      src: <IoLogOut />,
      onClick: handleLogout,
      gap: "true",
    },
  ];

  return (
    <>
      <div
        className={`${
          open ? "w-60" : "w-fit"
        } sm:block relative h-screen duration-200 bg-gray-100 p-5 dark:bg-[#1d1d1d] `}
      >
        <div className="absolute text-3xl fill-slate-800 cursor-pointer top-3 right-7 dark:fill-gray-600 dark:text-white duration-200">
          {open ? (
            <FiX onClick={() => setOpen(!open)} className="" />
          ) : (
            <FiMenu onClick={() => setOpen(!open)} />
          )}
        </div>

        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <Link to={menu.path} key={index}>
              <li
                key={index}
                className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700
                ${menu.gap ? "mt-9" : "mt-2"} ${
                  location.pathname === menu.path &&
                  "bg-gray-200 dark:bg-gray-700"
                }`}
                onClick={menu.onClick}
              >
                <span className="text-2xl">{menu.src}</span>
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-300 hover:block`}
                >
                  {menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
