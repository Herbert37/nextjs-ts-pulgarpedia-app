import React from "react";
import { useRouter } from "next/router";
import { Typography, Breadcrumbs as MUIBreadcrumbs, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Componente de navegación breadcrumbs
 * Muestra la ruta de navegación: Home > Categoría > Lugar
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const router = useRouter();

  const handleClick = (href?: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    if (href) {
      router.push(href);
    }
  };

  return (
    <MUIBreadcrumbs
      separator={<NavigateNextIcon fontSize='small' />}
      aria-label='breadcrumb'
      sx={{
        "& .MuiBreadcrumbs-separator": {
          color: "rgba(255, 255, 255, 0.7)",
        },
      }}
    >
      {/* Home link con icono */}
      <Link
        component='button'
        onClick={handleClick("/")}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          color: "rgba(255, 255, 255, 0.9)",
          textDecoration: "none",
          fontSize: "0.875rem",
          fontWeight: 500,
          transition: "color 0.2s ease",
          "&:hover": {
            color: "white",
            textDecoration: "underline",
          },
          cursor: "pointer",
          border: "none",
          background: "transparent",
          padding: 0,
        }}
      >
        <HomeIcon sx={{ fontSize: "1.125rem" }} />
        Inicio
      </Link>

      {/* Resto de breadcrumbs */}
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        if (isLast) {
          // Último elemento (actual) - no clickeable
          return (
            <Typography
              key={index}
              sx={{
                color: "white",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              {item.label}
            </Typography>
          );
        }

        // Elementos intermedios - clickeables
        return (
          <Link
            key={index}
            component='button'
            onClick={handleClick(item.href)}
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: 500,
              transition: "color 0.2s ease",
              "&:hover": {
                color: "white",
                textDecoration: "underline",
              },
              cursor: "pointer",
              border: "none",
              background: "transparent",
              padding: 0,
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
