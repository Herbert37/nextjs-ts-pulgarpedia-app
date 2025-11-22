import React, { useMemo } from "react";
import { Box, Typography, Grid } from "@mui/material";
import RecommendIcon from "@mui/icons-material/Recommend";
import PlaceCard from "./PlaceCard";
import { usePulgarpediaContent } from "../hooks/usePulgarpediaContent";

interface RelatedPlacesProps {
  currentPlaceId: string;
  categoryId: string;
  maxPlaces?: number;
}

/**
 * Componente que muestra lugares relacionados
 * - Filtra por la misma categoría
 * - Excluye el lugar actual
 * - Selección aleatoria de 3-4 lugares
 * - Grid responsive
 */
const RelatedPlaces: React.FC<RelatedPlacesProps> = ({
  currentPlaceId,
  categoryId,
  maxPlaces = 4,
}) => {
  const { places, isReady } = usePulgarpediaContent();

  // Obtener lugares relacionados (misma categoría, excluyendo actual)
  const relatedPlaces = useMemo(() => {
    if (!isReady || !places || places.length === 0) return [];

    // Filtrar lugares de la misma categoría, excluyendo el actual
    const sameCategoryPlaces = places.filter(
      (place) =>
        place.categoryId === categoryId && place.placeId !== currentPlaceId
    );

    // Si hay pocos lugares o ninguno, retornar lo que hay
    if (sameCategoryPlaces.length <= maxPlaces) {
      return sameCategoryPlaces;
    }

    // Selección aleatoria (Fisher-Yates shuffle)
    const shuffled = [...sameCategoryPlaces];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, maxPlaces);
  }, [places, categoryId, currentPlaceId, maxPlaces, isReady]);

  // Si no hay lugares relacionados, no mostrar nada
  if (!isReady || relatedPlaces.length === 0) return null;

  return (
    <Box sx={{ mb: 6 }}>
      {/* Título de la sección */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
        }}
      >
        <RecommendIcon
          sx={{
            fontSize: 32,
            color: "primary.main",
            mr: 2,
          }}
        />
        <Typography
          variant='h5'
          component='h2'
          sx={{
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          También te puede interesar
        </Typography>
      </Box>

      <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
        Otros lugares de la misma categoría que podrían gustarte
      </Typography>

      {/* Grid de lugares relacionados */}
      <Grid
        container
        spacing={{ xs: 2, sm: 3 }}
        sx={{
          opacity: 0,
          animation: "fadeIn 0.6s ease-in-out forwards",
          "@keyframes fadeIn": {
            from: { opacity: 0, transform: "translateY(20px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        {relatedPlaces.map((place, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={relatedPlaces.length === 3 ? 4 : 3}
            key={place.placeId}
            sx={{
              opacity: 0,
              animation: `slideUp 0.4s ease-out forwards ${index * 0.1}s`,
              "@keyframes slideUp": {
                from: { opacity: 0, transform: "translateY(20px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            <PlaceCard place={place} />
          </Grid>
        ))}
      </Grid>

      {/* Indicador si hay más lugares en la categoría */}
      {places.filter(
        (p) => p.categoryId === categoryId && p.placeId !== currentPlaceId
      ).length > maxPlaces && (
        <Box
          sx={{
            textAlign: "center",
            mt: 3,
          }}
        >
          <Typography variant='body2' color='text.secondary'>
            ✨ Hay más lugares en esta categoría esperando por ti
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default RelatedPlaces;
