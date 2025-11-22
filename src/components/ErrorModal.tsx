import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh";

interface ErrorModalProps {
  open: boolean;
  message: string;
  isLoading?: boolean;
  onRetry: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  open,
  message,
  isLoading = false,
  onRetry,
}) => {
  return (
    <Dialog
      open={open}
      disableEscapeKeyDown
      aria-labelledby='error-dialog-title'
      maxWidth='sm'
      fullWidth
    >
      <DialogTitle id='error-dialog-title'>
        <Box display='flex' alignItems='center' gap={1}>
          <ErrorOutlineIcon color='error' fontSize='large' />
          <Typography variant='h6' component='span'>
            Error de Conexión
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography variant='body1' color='text.secondary' gutterBottom>
          {message}
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mt: 2 }}>
          Por favor, verifica tu conexión a internet e intenta nuevamente.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onRetry}
          variant='contained'
          color='primary'
          disabled={isLoading}
          startIcon={
            isLoading ? <CircularProgress size={20} /> : <RefreshIcon />
          }
          fullWidth
        >
          {isLoading ? "Cargando..." : "Recargar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal;
