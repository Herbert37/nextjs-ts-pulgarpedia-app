import React, { useState } from "react";
import {
  Box,
  IconButton,
  Dialog,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import type { GalleryImage } from "../types/place";

interface PlaceGalleryProps {
  images: GalleryImage[];
  placeName: string;
}

/**
 * Componente de galería de imágenes para lugares turísticos
 * - Carrusel principal con navegación
 * - Thumbnails clickeables
 * - Lightbox/fullscreen view
 * - Lazy loading de imágenes
 * - Responsive
 */
const PlaceGallery: React.FC<PlaceGalleryProps> = ({ images, placeName }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Si no hay imágenes, no renderizar nada
  if (!images || images.length === 0) return null;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleOpenLightbox = () => {
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
  };

  const currentImage = images[currentIndex];

  return (
    <Box sx={{ mb: 6 }}>
      {/* Título de la sección */}
      <Typography
        variant='h5'
        component='h2'
        sx={{
          mb: 3,
          fontWeight: 600,
          color: "text.primary",
        }}
      >
        Galería de imágenes
      </Typography>

      {/* Imagen principal */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "300px", sm: "400px", md: "500px" },
          borderRadius: 2,
          overflow: "hidden",
          mb: 2,
          boxShadow: 3,
          "&:hover .gallery-controls": {
            opacity: 1,
          },
        }}
      >
        {/* Imagen con next/image */}
        <Image
          src={currentImage.imageUrl}
          alt={currentImage.alt || `${placeName} - Imagen ${currentIndex + 1}`}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
          style={{
            objectFit: "cover",
          }}
          priority={currentIndex === 0}
          quality={85}
        />

        {/* Controles del carrusel */}
        {images.length > 1 && (
          <>
            {/* Botón anterior */}
            <IconButton
              className='gallery-controls'
              onClick={handlePrevious}
              sx={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(0, 0, 0, 0.6)",
                color: "white",
                opacity: { xs: 1, md: 0 },
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "rgba(0, 0, 0, 0.8)",
                  transform: "translateY(-50%) scale(1.1)",
                },
              }}
              aria-label='Imagen anterior'
            >
              <ChevronLeftIcon />
            </IconButton>

            {/* Botón siguiente */}
            <IconButton
              className='gallery-controls'
              onClick={handleNext}
              sx={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(0, 0, 0, 0.6)",
                color: "white",
                opacity: { xs: 1, md: 0 },
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "rgba(0, 0, 0, 0.8)",
                  transform: "translateY(-50%) scale(1.1)",
                },
              }}
              aria-label='Imagen siguiente'
            >
              <ChevronRightIcon />
            </IconButton>
          </>
        )}

        {/* Botón fullscreen */}
        <IconButton
          className='gallery-controls'
          onClick={handleOpenLightbox}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            bgcolor: "rgba(0, 0, 0, 0.6)",
            color: "white",
            opacity: { xs: 1, md: 0 },
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.8)",
              transform: "scale(1.1)",
            },
          }}
          aria-label='Ver en pantalla completa'
        >
          <FullscreenIcon />
        </IconButton>

        {/* Contador de imágenes */}
        {images.length > 1 && (
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              bgcolor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              px: 2,
              py: 0.5,
              borderRadius: 2,
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          >
            {currentIndex + 1} / {images.length}
          </Box>
        )}
      </Box>

      {/* Thumbnails */}
      {images.length > 1 && (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            overflowX: "auto",
            pb: 1,
            "&::-webkit-scrollbar": {
              height: 8,
            },
            "&::-webkit-scrollbar-track": {
              bgcolor: "action.hover",
              borderRadius: 1,
            },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "action.selected",
              borderRadius: 1,
              "&:hover": {
                bgcolor: "action.active",
              },
            },
          }}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              onClick={() => handleThumbnailClick(index)}
              sx={{
                minWidth: { xs: 80, sm: 100, md: 120 },
                height: { xs: 60, sm: 75, md: 90 },
                borderRadius: 1,
                overflow: "hidden",
                cursor: "pointer",
                border: 3,
                borderColor:
                  index === currentIndex ? "primary.main" : "transparent",
                transition: "all 0.3s ease",
                opacity: index === currentIndex ? 1 : 0.6,
                "&:hover": {
                  opacity: 1,
                  transform: "scale(1.05)",
                },
              }}
            >
              <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
                <Image
                  src={image.imageUrl}
                  alt={image.alt || `Thumbnail ${index + 1}`}
                  fill
                  sizes='120px'
                  style={{
                    objectFit: "cover",
                  }}
                  quality={60}
                />
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {/* Lightbox Dialog */}
      <Dialog
        open={lightboxOpen}
        onClose={handleCloseLightbox}
        maxWidth={false}
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            bgcolor: "rgba(0, 0, 0, 0.95)",
            boxShadow: "none",
            m: 0,
            maxWidth: "100vw",
            maxHeight: "100vh",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Botón cerrar */}
          <IconButton
            onClick={handleCloseLightbox}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "white",
              bgcolor: "rgba(255, 255, 255, 0.1)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.2)",
              },
              zIndex: 2,
            }}
            aria-label='Cerrar'
          >
            <CloseIcon />
          </IconButton>

          {/* Controles de navegación en lightbox */}
          {images.length > 1 && (
            <>
              <IconButton
                onClick={handlePrevious}
                sx={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "white",
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                  },
                  zIndex: 2,
                }}
                aria-label='Imagen anterior'
              >
                <ChevronLeftIcon fontSize='large' />
              </IconButton>

              <IconButton
                onClick={handleNext}
                sx={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "white",
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                  },
                  zIndex: 2,
                }}
                aria-label='Imagen siguiente'
              >
                <ChevronRightIcon fontSize='large' />
              </IconButton>
            </>
          )}

          {/* Imagen fullscreen con next/image */}
          <Box
            sx={{
              position: "relative",
              width: "95%",
              height: "95%",
            }}
          >
            <Image
              src={currentImage.imageUrl}
              alt={
                currentImage.alt || `${placeName} - Imagen ${currentIndex + 1}`
              }
              fill
              sizes='95vw'
              style={{
                objectFit: "contain",
              }}
              quality={95}
              priority
            />
          </Box>

          {/* Info en lightbox */}
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              color: "white",
              zIndex: 2,
            }}
          >
            {currentImage.alt && (
              <Typography variant='body1' sx={{ mb: 1 }}>
                {currentImage.alt}
              </Typography>
            )}
            {images.length > 1 && (
              <Typography variant='body2' sx={{ opacity: 0.8 }}>
                {currentIndex + 1} / {images.length}
              </Typography>
            )}
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default PlaceGallery;
