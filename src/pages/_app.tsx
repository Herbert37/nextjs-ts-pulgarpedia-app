import React, { useEffect } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { Box, CircularProgress } from "@mui/material";
import theme from "../styles/theme";
import "../styles/styles.css";
import createEmotionCache from "../utils/createEmotionCache";
import { useContentStore } from "../stores/contentStore";
import ErrorModal from "../components/ErrorModal";
import Menu from "../components/Menu";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { content, isLoading, error, loadContent, retryLoad } =
    useContentStore();

  // Cargar contenido al iniciar la aplicación
  useEffect(() => {
    if (!content && !isLoading && !error) {
      loadContent();
    }
  }, [content, isLoading, error, loadContent]);

  // Mostrar spinner mientras carga por primera vez
  if (isLoading && !content) {
    return (
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
          <title>Pulgarpedia - Cargando...</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            minHeight='100vh'
            gap={2}
          >
            <CircularProgress size={60} />
            <Box sx={{ color: "text.secondary", fontSize: "1.1rem" }}>
              Cargando lugares chivos...
            </Box>
          </Box>
        </ThemeProvider>
      </CacheProvider>
    );
  }

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />

        {/* Modal de error cuando falla la carga del contenido */}
        <ErrorModal
          open={!!error && !content}
          message={error || ""}
          isLoading={isLoading}
          onRetry={retryLoad}
        />

        {/* Renderizar Menu siempre (necesario para estructura HTML correcta) */}
        <Menu />

        {/* Renderizar la página (Component se renderiza siempre, pero con contenido condicional) */}
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
