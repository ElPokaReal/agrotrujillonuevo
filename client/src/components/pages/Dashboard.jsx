import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

function Dashboard({children}) {
  const [users, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/loggedInUser', { credentials: 'include' })
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleLogout = async () => {
    await fetch('http://localhost:3000/logout', { method: 'GET', credentials: 'include' });
    navigate('/');
  };

  if (!users) {
    return <div>Cargando...</div>;
  }

  return (
    <>
    <div className='flex flex-row h-screen'>
        <Sidebar/>
        <div className='grow'>
            <Navbar />
            <div className='m-5'>
              <h1>Holaaa</h1>
            </div>
        </div>
    </div>
</>
  );
}

export default Dashboard;