import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import MainPage from "./pages/MainPage";
import Dashboard from "./pages/Dashboard";
import Creditos from "./pages/Creditos";
import Productores from "./pages/Productores";
import Tecnicos from "./pages/Tecnicos";
import { ToastContainer } from "react-toastify";
import DashboardLayout from "./layouts/DashboardLayout";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {

  const [isAuthenticated, setIsAuthenticated] = React.useState(null);

  React.useEffect(() => {
    // Obtener el token del almacenamiento local
    const token = localStorage.getItem('token');
  
    // Verificar si el token existe antes de hacer la solicitud
    if (token) {
      fetch('http://localhost:3000/isAuthenticated', {
        headers: {
          'Authorization': `Bearer ${token}` // Enviar el token en el encabezado Authorization
        }
      })
      .then(response => response.json())
      .then(data => {
        setIsAuthenticated(data.isAuthenticated);
      })
      .catch(error => {
        console.error('Error al verificar la autenticación:', error);
      });
    } else {
      // Si no hay token, asumir que el usuario no está autenticado
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ToastContainer closeOnClick limit={1} theme="colored"/>
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <MainPage /> }  />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout setIsAuthenticated={setIsAuthenticated}><Dashboard /></DashboardLayout></ProtectedRoute>} />
          <Route path="/productores" element={<ProtectedRoute><DashboardLayout setIsAuthenticated={setIsAuthenticated}><Productores /></DashboardLayout></ProtectedRoute>} />
          <Route path="/creditos" element={<ProtectedRoute><DashboardLayout setIsAuthenticated={setIsAuthenticated}><Creditos /></DashboardLayout></ProtectedRoute>} />
          <Route path="/tecnicos" element={<ProtectedRoute><DashboardLayout setIsAuthenticated={setIsAuthenticated}><Tecnicos /></DashboardLayout></ProtectedRoute>} />
        </Routes>
      </Router>
      </LocalizationProvider>
    </>
 );
}

export default App;
