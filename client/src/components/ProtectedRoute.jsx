import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ProtectedRoute({ children }) {
 const [isAuthenticated, setIsAuthenticated] = useState(null);
 const navigate = useNavigate();

 useEffect(() => {
   fetch('http://localhost:3000/isAuthenticated', { credentials: 'include' })
     .then(response => response.json())
     .then(data => {
       setIsAuthenticated(data.isAuthenticated);
       if (!data.isAuthenticated) {
         toast.error('Debes iniciar sesión para ver esta página',{
          toastId: 'error1'
         });
       }
     })
     .catch(error => console.error('Error:', error));
 }, [navigate]);

 if (isAuthenticated === false) {
   navigate('/');
 }

 return isAuthenticated === null ? null : children;
}

export default ProtectedRoute;