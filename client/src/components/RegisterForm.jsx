import React, { useState } from "react";
import { toast } from "react-toastify";

function RegisterForm({ setShowRegistration }) {
 const [user_name, setUserName] = useState("");
 const [user_email, setUserEmail] = useState("");
 const [user_password, setUserPassword] = useState("");

 const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name,
          user_email,
          user_password
        }),
        credentials: "include",
      });

      if (response.ok) {
        console.log("Registro exitoso");
        toast.success("Registro exitoso");
        setShowRegistration(false);
      } else {
        console.log("Error al registrarse");
        toast.error("Error al registrarse");
      }
    } catch (error) {
      console.log("Error al registrarse", error);
    }
 };

 return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Registro
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Regístrate en nuestra plataforma
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleRegisterSubmit}>
              <div>
                <label
                 htmlFor="user_name"
                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                 Nombre de Usuario
                </label>
                <input
                 onChange={(e) => setUserName(e.target.value)}
                 type="text"
                 name="user_name"
                 id="user_name"
                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 required=""
                />
              </div>
              <div>
              <label
                 htmlFor="user_email"
                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                 Email
                </label>
                <input
                 onChange={(e) => setUserEmail(e.target.value)}
                 type="email"
                 name="user_email"
                 id="user_email"
                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 required=""
                />
              </div>
              <div>
                <label
                 htmlFor="user_password"
                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                 Contraseña
                </label>
                <input
                 onChange={(e) => setUserPassword(e.target.value)}
                 type="password"
                 name="user_password"
                 id="user_password"
                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 required=""
                />
              </div>
              <button
                type="submit"
                disabled={!user_name || !user_email || !user_password}
                className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                 user_name && user_email && user_password
                    ? "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    : "bg-gray-400 pointer-events-none"
                }`}
              >
                Registrate
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
      ¿Ya tienes una cuenta?{" "}
      <button
        onClick={() => setShowRegistration(false)}
        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
      >
        Iniciar Sesión
      </button>
    </p>
            </form>
          </div>
        </div>
      </div>
    </section>
 );
}

export default RegisterForm;
