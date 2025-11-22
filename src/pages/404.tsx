import React from "react";
import Head from "next/head";
import { Box, Container, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HomeIcon from "@mui/icons-material/Home";
import Header from "../components/Header";

/**
 * Página 404 personalizada
 * Se muestra cuando el usuario intenta acceder a una ruta que no existe
 * Menu ya se renderiza en _app.tsx, no es necesario incluirlo aquí
 */
const Custom404: React.FC = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>404 - Página no encontrada | Pulgarpedia</title>
        <meta name='robots' content='noindex, follow' />
      </Head>
      <Header />
      <Container maxWidth='sm'>
        <Box
          sx={{
            minHeight: "calc(100vh - 64px)", // Restamos la altura del Menu
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            py: 4,
          }}
        >
          {/* Icono animado */}
          <Box
            sx={{
              fontSize: "6rem",
              mb: 3,
              animation: "bounce 2s ease-in-out infinite",
              "@keyframes bounce": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-20px)" },
              },
            }}
          >
            <ErrorOutlineIcon
              sx={{
                fontSize: "8rem",
                color: "error.main",
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
              }}
            />
          </Box>

          {/* Título */}
          <Typography
            variant='h1'
            sx={{
              fontSize: { xs: "3rem", sm: "4rem" },
              fontWeight: 700,
              color: "text.primary",
              mb: 2,
            }}
          >
            404
          </Typography>

          {/* Mensaje */}
          <Typography
            variant='h5'
            color='text.secondary'
            gutterBottom
            sx={{ mb: 1 }}
          >
            La página no existe
          </Typography>

          <Typography
            variant='body1'
            color='text.secondary'
            paragraph
            sx={{ mb: 4, maxWidth: 400 }}
          >
            Lo sentimos, la página que buscas no se encuentra disponible o ha
            sido removida.
          </Typography>

          {/* Botón de regreso */}
          <Button
            variant='contained'
            size='large'
            startIcon={<HomeIcon />}
            onClick={handleGoHome}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              textTransform: "none",
              boxShadow: 3,
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
              "&:active": {
                transform: "scale(0.98)",
              },
            }}
          >
            Volver al inicio
          </Button>

          {/* Texto adicional */}
          <Typography variant='body2' color='text.disabled' sx={{ mt: 4 }}>
            ¿Necesitas ayuda? Intenta buscar desde la página principal
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Custom404;
