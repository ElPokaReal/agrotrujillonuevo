import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';

const SessionTimer = ({ sessionDuration }) => {
 const [showModal, setShowModal] = useState(false);

 useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, sessionDuration - 2 * 60 * 1000); // 2 minutos en milisegundos

    return () => clearTimeout(timer);
 }, [sessionDuration]);

 const handleExtendSession = async () => {
    const response = await fetch('http://localhost:3000/refresh-token', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    localStorage.setItem('token', data.token); 
    setShowModal(false);
 };

 return (
    <Dialog open={showModal} onClose={() => setShowModal(false)}>
      <DialogTitle>La sesión está por expirar</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tu sesión está por expirar. ¿Deseas extender la sesión?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleExtendSession} color="primary">
          Extender Sesión
        </Button>
      </DialogActions>
    </Dialog>
 );
};

export default SessionTimer;