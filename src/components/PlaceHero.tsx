import React from "react";
import { useRouter } from "next/router";
import { Box, Container, Typography, Chip, Button } from "@mui/material";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Breadcrumbs from "./Breadcrumbs";
import { categoryColors } from "../styles/theme";
import type { Place } from "../types/place";

interface PlaceHeroProps {
  place: Place;
  categoryName: string;
}

/**
 * Componente Hero para la página de detalle de lugar
 * Incluye: imagen de fondo, overlay gradient, título, subtítulo, breadcrumbs, badge de categoría
 */
const PlaceHero: React.FC<PlaceHeroProps> = ({ place, categoryName }) => {
  const router = useRouter();

  // Obtener el color de la categoría
  const categoryColor =
    categoryColors[place.categoryId as keyof typeof categoryColors] ||
    categoryColors["nature-adventure"];

  // Construir breadcrumbs
  const breadcrumbItems = [
    {
      label: categoryName,
      href: `/?category=${place.categoryId}`,
    },
    {
      label: place.header.title,
    },
  ];

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: {
          xs: "373px",
          sm: "335px",
        },
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        mb: 4,
      }}
    >
      {/* Imagen de fondo con next/image */}
      <Image
        src={place.header.mainImageURL}
        alt={place.header.title}
        fill
        priority
        sizes='100vw'
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
        quality={90}
      />

      {/* Overlay gradient */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0.5) 50%,
            rgba(0, 0, 0, 0.8) 100%
          )`,
        }}
      />

      {/* Contenido superpuesto */}
      <Container
        maxWidth='lg'
        sx={{
          position: "relative",
          zIndex: 2,
          pb: { xs: 3, md: 4 },
          pt: { xs: 2, md: 3 },
        }}
      >
        {/* Botón Volver arriba */}
        <Button
          variant='text'
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push("/")}
          sx={{
            color: "white",
            mb: { xs: 0, sm: 2 },
            textTransform: "none",
            fontSize: "0.875rem",
            fontWeight: 500,
            padding: "6px 12px",
            borderRadius: "8px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(8px)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              transform: "translateX(-4px)",
            },
            "& .MuiButton-startIcon": {
              marginRight: "6px",
            },
          }}
        >
          Volver a la página principal
        </Button>

        {/* Breadcrumbs - Oculto en mobile */}
        <Box sx={{ mb: 2, display: { xs: "none", sm: "block" } }}>
          <Breadcrumbs items={breadcrumbItems} />
        </Box>

        {/* Badge de categoría */}
        <Box sx={{ mb: 2, display: { xs: "block", sm: "none" } }} />
        <Chip
          label={place.header.category}
          sx={{
            backgroundColor: categoryColor,
            color: "white",
            fontWeight: 600,
            fontSize: "0.875rem",
            height: "32px",
            mb: 2,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
          }}
        />

        {/* Título del lugar */}
        <Typography
          variant='h1'
          sx={{
            color: "white",
            fontWeight: 700,
            fontSize: {
              xs: "2rem",
              sm: "2.5rem",
              md: "3rem",
              lg: "3.5rem",
            },
            lineHeight: 1.2,
            mb: 1,
            textShadow: "0 2px 16px rgba(0, 0, 0, 0.5)",
          }}
        >
          {place.header.title}
        </Typography>

        {/* Subtítulo */}
        <Typography
          variant='h5'
          sx={{
            color: "rgba(255, 255, 255, 0.95)",
            fontWeight: 400,
            fontSize: {
              xs: "1rem",
              sm: "1.25rem",
              md: "1.5rem",
            },
            lineHeight: 1.4,
            maxWidth: "800px",
            textShadow: "0 1px 8px rgba(0, 0, 0, 0.4)",
          }}
        >
          {place.header.subtitle}
        </Typography>
      </Container>
    </Box>
  );
};

export default PlaceHero;
