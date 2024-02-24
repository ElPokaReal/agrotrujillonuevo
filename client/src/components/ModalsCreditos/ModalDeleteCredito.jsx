import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function ModalDeleteCredito({ open, handleClose, handleDeleteCredito, cedula_productor }) {
  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{"¿Estás seguro de que quieres eliminar los datos de este crédito?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Una vez eliminado, no podrás recuperarlo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Button onClick={handleClose} variant="outlined" color="primary">
              Cancelar
            </Button>
            <Button onClick={() => handleDeleteCredito(cedula_productor)} variant="contained" color="error">
              Eliminar
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
   );
}
