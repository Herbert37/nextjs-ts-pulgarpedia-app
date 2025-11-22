import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

/**
 * Colores por categoría de Pulgarpedia
 * Cada categoría tiene un color principal para identificación visual
 */
export const categoryColors = {
  "nature-adventure": "#4CAF50", // Verde - Naturaleza
  "beaches-coast": "#03A9F4", // Azul - Playas
  "cities-towns": "#FF9800", // Naranja - Pueblos
  gastronomy: "#F44336", // Rojo - Gastronomía
  "festivals-events": "#9C27B0", // Púrpura - Festividades
} as const;

/**
 * Sistema de espaciados consistente
 * Basado en escala de 8px
 */
export const spacing = {
  xs: 4, // 4px
  sm: 8, // 8px
  md: 16, // 16px
  lg: 24, // 24px
  xl: 32, // 32px
  xxl: 48, // 48px
} as const;

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#fff",
    },
    secondary: {
      main: "#dc004e",
      light: "#ff5983",
      dark: "#9a0036",
      contrastText: "#fff",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    // Títulos principales de página
    h1: {
      fontSize: "3rem", // 48px
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.01562em",
      "@media (max-width:600px)": {
        fontSize: "2.5rem", // 40px en mobile
      },
    },
    // Títulos de sección
    h2: {
      fontSize: "2.5rem", // 40px
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: "-0.00833em",
      "@media (max-width:600px)": {
        fontSize: "2rem", // 32px en mobile
      },
    },
    // Subtítulos importantes
    h3: {
      fontSize: "2rem", // 32px
      fontWeight: 600,
      lineHeight: 1.4,
      "@media (max-width:600px)": {
        fontSize: "1.75rem", // 28px en mobile
      },
    },
    // Títulos de cards y componentes
    h4: {
      fontSize: "1.5rem", // 24px
      fontWeight: 500,
      lineHeight: 1.4,
      "@media (max-width:600px)": {
        fontSize: "1.25rem", // 20px en mobile
      },
    },
    // Subtítulos de cards
    h5: {
      fontSize: "1.25rem", // 20px
      fontWeight: 500,
      lineHeight: 1.5,
    },
    // Textos pequeños destacados
    h6: {
      fontSize: "1rem", // 16px
      fontWeight: 500,
      lineHeight: 1.6,
    },
    // Texto principal del cuerpo
    body1: {
      fontSize: "1rem", // 16px
      fontWeight: 400,
      lineHeight: 1.7,
      letterSpacing: "0.00938em",
    },
    // Texto secundario más pequeño
    body2: {
      fontSize: "0.875rem", // 14px
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: "0.01071em",
    },
    // Botones
    button: {
      fontSize: "0.875rem", // 14px
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: "0.02857em",
      textTransform: "none", // No uppercase por defecto
    },
    // Texto muy pequeño (captions, metadata)
    caption: {
      fontSize: "0.75rem", // 12px
      fontWeight: 400,
      lineHeight: 1.66,
      letterSpacing: "0.03333em",
    },
    // Overline (labels pequeños)
    overline: {
      fontSize: "0.75rem", // 12px
      fontWeight: 500,
      lineHeight: 2.66,
      letterSpacing: "0.08333em",
      textTransform: "uppercase",
    },
  },
  // Sistema de espaciados base: 1 = 8px
  spacing: 8,

  // Breakpoints responsive
  breakpoints: {
    values: {
      xs: 0, // Mobile
      sm: 600, // Tablet portrait
      md: 960, // Tablet landscape
      lg: 1280, // Desktop
      xl: 1920, // Large desktop
    },
  },

  // Bordes y sombras consistentes
  shape: {
    borderRadius: 8, // 8px por defecto
  },

  shadows: [
    "none",
    "0px 2px 4px rgba(0,0,0,0.1)",
    "0px 4px 8px rgba(0,0,0,0.12)",
    "0px 8px 16px rgba(0,0,0,0.14)",
    "0px 12px 24px rgba(0,0,0,0.16)",
    "0px 16px 32px rgba(0,0,0,0.18)",
    "0px 20px 40px rgba(0,0,0,0.20)",
    "0px 24px 48px rgba(0,0,0,0.22)",
    "0px 24px 48px rgba(0,0,0,0.22)",
    "0px 24px 48px rgba(0,0,0,0.22)",
    "0px 24px 48px rgba(0,0,0,0.22)",
    "0px 24px 48px rgba(0,0,0,0.22)",
    "0px 24px 48px rgba(0,0,0,0.22)",
    "0px 24px 48px rgba(0,0,0,0.22)",
    "0px 24px 48px rgba(0,0,0,0.22)",
    "0px 24px 48px rgba(0,0,0,0.22)",
    "0px 24px 48px rgba(0,0,0,0.22)",
    "0px 24px 48px rgba(0,0,0,0.22)",
    "0px 24px 48px rgba(0,0,0,0.22)",
    "0px 24px 48px rgba(0,0,0,0.22)",
    "0px 24px 48px rgba(0,0,0,0.22)",
    "0px 24px 48px rgba(0,0,0,0.22)",
    "0px 24px 48px rgba(0,0,0,0.22)",
    "0px 24px 48px rgba(0,0,0,0.22)",
    "0px 24px 48px rgba(0,0,0,0.22)",
  ],

  // Componentes personalizados
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
          fontSize: "0.875rem",
          fontWeight: 500,
        },
        sizeLarge: {
          padding: "12px 32px",
          fontSize: "1rem",
        },
        sizeSmall: {
          padding: "6px 16px",
          fontSize: "0.8125rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0px 8px 24px rgba(0,0,0,0.15)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

export default theme;
