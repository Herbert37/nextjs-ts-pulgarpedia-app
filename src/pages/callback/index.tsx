import React, { useEffect } from 'react';
import { Container, Grid, Typography, Paper } from '@mui/material';

const Callback: React.FC = () => {

  // useEffect(() => {
  //   if (typeof window === "undefined") return;
    
  //   if (window.opener) {
  //     window.opener.postMessage(
  //       { type: "lm-login-redirect", url: window.location.href }
  //     );
  //   }
  // }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    console.log("CallbackLoaded: esperando a lmCompleteLogin...");

    const waitForLogin = setInterval(() => {
      if (typeof window.lmCompleteLogin === "function") {
        console.log("lmCompleteLogin detectado. Ejecutando...");
        window.lmCompleteLogin();
        clearInterval(waitForLogin);
      } else {
        console.log("lmCompleteLogin aún no disponible...");
      }
    }, 100);

    // Cleanup
    return () => clearInterval(waitForLogin);
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Loading...
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Callback;