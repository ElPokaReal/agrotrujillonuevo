import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener el token del almacenamiento local
    const token = localStorage.getItem('token');

    if (!token) {
      // Si no hay token, no está autenticado
      setIsAuthenticated(false);
      return;
    }

    fetch('http://localhost:3000/isAuthenticated', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setIsAuthenticated(data.isAuthenticated);
        if (!data.isAuthenticated) {
          toast.error('Debes iniciar sesión para ver esta página', {
            toastId: 'error1'
          });
          navigate('/'); // Asegúrate de redirigir a la página de inicio de sesión correcta
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setIsAuthenticated(false);
      });
  }, [navigate]);

  if (isAuthenticated === false) {
    navigate('/'); // Asegúrate de redirigir a la página de inicio de sesión correcta
  }

  return isAuthenticated === null ? null : children;
}

export default ProtectedRoute;