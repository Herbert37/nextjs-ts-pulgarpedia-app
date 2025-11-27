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
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Función para navegar a una imagen específica con scroll suave
  const goToImage = React.useCallback((index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const slideWidth = el.clientWidth;
    el.scrollTo({
      left: slideWidth * index,
      behavior: "smooth",
    });
    setCurrentIndex(index);
  }, []);

  // Detectar el scroll manual para actualizar el índice
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container || !images || images.length === 0) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const slideWidth = container.clientWidth;
      const newIndex = Math.round(scrollLeft / slideWidth);
      if (
        newIndex !== currentIndex &&
        newIndex >= 0 &&
        newIndex < images.length
      ) {
        setCurrentIndex(newIndex);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [currentIndex, images]);

  // Precargar imágenes adyacentes cuando cambia el índice
  React.useEffect(() => {
    if (!images || images.length === 0) return;

    // Validar que el índice actual sea válido
    if (currentIndex >= images.length) return;

    // Precargar imagen siguiente (si existe)
    const nextIndex = (currentIndex + 1) % images.length;
    if (images[nextIndex] && images[nextIndex].imageUrl) {
      const nextImage = new window.Image();
      nextImage.src = images[nextIndex].imageUrl;
    }

    // Precargar imagen anterior (si existe)
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    if (images[prevIndex] && images[prevIndex].imageUrl) {
      const prevImage = new window.Image();
      prevImage.src = images[prevIndex].imageUrl;
    }
  }, [currentIndex, images]);

  // Resetear el índice cuando cambian las imágenes (cambio de lugar)
  React.useEffect(() => {
    if (!images || images.length === 0) return;

    // Si el índice actual excede el número de imágenes del nuevo lugar, resetear a 0
    if (currentIndex >= images.length) {
      setCurrentIndex(0);
      // También resetear el scroll del contenedor
      if (containerRef.current) {
        containerRef.current.scrollTo({
          left: 0,
          behavior: "auto", // Sin animación para cambios de página
        });
      }
    }
  }, [images, currentIndex]);

  // Si no hay imágenes, no renderizar nada
  if (!images || images.length === 0) return null;

  const handlePrevious = () => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    goToImage(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    goToImage(nextIndex);
  };

  const handleThumbnailClick = (index: number) => {
    goToImage(index);
  };

  const handleOpenLightbox = () => {
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
  };

  // Validar que el índice actual sea válido antes de acceder a la imagen
  const safeCurrentIndex = Math.min(currentIndex, images.length - 1);
  const currentImage = images[safeCurrentIndex];

  // Si por alguna razón no hay imagen actual, no renderizar
  if (!currentImage) return null;

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

      {/* Contenedor wrapper para posicionamiento de controles */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "300px", sm: "400px", md: "500px" },
          borderRadius: 2,
          mb: 2,
          "&:hover .gallery-controls": {
            opacity: 1,
          },
        }}
      >
        {/* Contenedor con scroll horizontal */}
        <Box
          ref={containerRef}
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 3,
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {/* Renderizar todas las imágenes en un carrusel */}
          {images.map((image, index) => (
            <Box
              key={index}
              sx={{
                minWidth: "100%",
                width: "100%",
                height: "100%",
                position: "relative",
                scrollSnapAlign: "start",
              }}
            >
              <Image
                src={image.imageUrl}
                alt={image.alt || `${placeName} - Imagen ${index + 1}`}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
                style={{
                  objectFit: "cover",
                }}
                // Prioridad para las primeras 5 imágenes
                priority={index < 5}
                // Carga eager para imágenes cercanas
                loading={index < 5 ? "eager" : "lazy"}
                quality={85}
                placeholder='blur'
                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
              />
            </Box>
          ))}
        </Box>

        {/* Controles del carrusel - fuera del contenedor de scroll */}
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
                zIndex: 1,
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
                zIndex: 1,
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
            zIndex: 1,
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
              zIndex: 1,
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
              quality={90}
              priority
              loading='eager'
              placeholder='blur'
              blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
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
