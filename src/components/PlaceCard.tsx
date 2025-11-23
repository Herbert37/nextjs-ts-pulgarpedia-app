import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Skeleton,
} from "@mui/material";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useRouter } from "next/router";
import { Place } from "../types/place";
import { categoryColors } from "../styles/theme";

interface PlaceCardProps {
  place: Place | null;
  variant?: "vertical" | "horizontal";
  loading?: boolean;
}

/**
 * Componente PlaceCard
 *
 * Muestra una tarjeta con información básica de un lugar turístico.
 * Se usa en la vista principal, carruseles y secciones de recomendaciones.
 *
 * @param place - Datos del lugar turístico
 * @param variant - Orientación de la card (vertical u horizontal)
 * @param loading - Estado de carga (muestra skeleton)
 */
const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  variant = "vertical",
  loading = false,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (place) {
      router.push(`/place/${place.placeId}`);
    }
  };

  // Obtener color de la categoría
  const categoryColor = place
    ? categoryColors[place.categoryId as keyof typeof categoryColors] ||
      "#9E9E9E"
    : "#9E9E9E";

  // Renderizar skeleton mientras carga o si no hay place
  if (loading || !place) {
    return (
      <Card sx={{ height: "100%", cursor: "default" }}>
        {variant === "vertical" ? (
          <>
            <Skeleton variant='rectangular' height={200} />
            <CardContent>
              <Skeleton variant='text' width='60%' height={32} />
              <Skeleton variant='text' width='40%' sx={{ mb: 1 }} />
              <Skeleton variant='text' width='100%' />
              <Skeleton variant='text' width='80%' />
            </CardContent>
          </>
        ) : (
          <Box sx={{ display: "flex", height: 200 }}>
            <Skeleton variant='rectangular' width={200} />
            <Box sx={{ flex: 1, p: 2 }}>
              <Skeleton variant='text' width='70%' height={32} />
              <Skeleton variant='text' width='50%' sx={{ mb: 1 }} />
              <Skeleton variant='text' width='100%' />
              <Skeleton variant='text' width='90%' />
            </Box>
          </Box>
        )}
      </Card>
    );
  }

  // Renderizar card vertical
  if (variant === "vertical") {
    return (
      <Card
        onClick={handleClick}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          "&:hover": {
            "& .place-image": {
              transform: "scale(1.05)",
            },
          },
        }}
      >
        {/* Imagen principal con next/image */}
        <Box
          sx={{
            position: "relative",
            paddingTop: "66.67%", // Ratio 3:2
            overflow: "hidden",
            backgroundColor: "grey.200",
          }}
        >
          <Box
            className='place-image'
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <Image
              src={place.header.mainImageURL}
              alt={place.header.title}
              fill
              sizes='(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw'
              style={{
                objectFit: "cover",
              }}
              priority={false}
              loading='lazy'
            />
          </Box>

          {/* Chip de categoría */}
          <Chip
            label={place.header.category}
            size='small'
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              backgroundColor: categoryColor,
              color: "white",
              fontWeight: 500,
              fontSize: "0.75rem",
              zIndex: 1,
            }}
          />
        </Box>

        {/* Contenido */}
        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          {/* Título */}
          <Typography
            variant='h6'
            component='h3'
            gutterBottom
            sx={{
              fontWeight: 600,
              lineHeight: 1.3,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              minHeight: "2.6em",
            }}
          >
            {place.header.title}
          </Typography>

          {/* Ubicación */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <LocationOnIcon
              sx={{ fontSize: 16, color: "text.secondary", mr: 0.5 }}
            />
            <Typography variant='caption' color='text.secondary'>
              {
                place.generalHistorySection.locationClimate.address.split(
                  ","
                )[0]
              }
            </Typography>
          </Box>

          {/* Descripción */}
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              lineHeight: 1.6,
            }}
          >
            {place.header.subtitle}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  // Renderizar card horizontal
  return (
    <Card
      onClick={handleClick}
      sx={{
        display: "flex",
        height: 200,
        cursor: "pointer",
        overflow: "hidden",
        flexDirection: { xs: "column", sm: "row" },
        "&:hover": {
          "& .place-image": {
            transform: "scale(1.05)",
          },
        },
      }}
    >
      {/* Imagen principal con next/image */}
      <Box
        sx={{
          position: "relative",
          width: { xs: "100%", sm: 250 },
          height: { xs: 150, sm: "100%" },
          overflow: "hidden",
          backgroundColor: "grey.200",
          flexShrink: 0,
        }}
      >
        <Box
          className='place-image'
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <Image
            src={place.header.mainImageURL}
            alt={place.header.title}
            fill
            sizes='(max-width: 600px) 100vw, 250px'
            style={{
              objectFit: "cover",
            }}
            priority={false}
            loading='lazy'
          />
        </Box>

        {/* Chip de categoría */}
        <Chip
          label={place.header.category}
          size='small'
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            backgroundColor: categoryColor,
            color: "white",
            fontWeight: 500,
            fontSize: "0.75rem",
            zIndex: 1,
          }}
        />
      </Box>

      {/* Contenido */}
      <CardContent sx={{ flex: 1, p: 2 }}>
        {/* Título */}
        <Typography
          variant='h6'
          component='h3'
          gutterBottom
          sx={{
            fontWeight: 600,
            lineHeight: 1.3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {place.header.title}
        </Typography>

        {/* Ubicación */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <LocationOnIcon
            sx={{ fontSize: 16, color: "text.secondary", mr: 0.5 }}
          />
          <Typography variant='caption' color='text.secondary'>
            {place.generalHistorySection.locationClimate.address.split(",")[0]}
          </Typography>
        </Box>

        {/* Descripción */}
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: { xs: 2, sm: 4 },
            WebkitBoxOrient: "vertical",
            lineHeight: 1.6,
          }}
        >
          {place.header.subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PlaceCard;
