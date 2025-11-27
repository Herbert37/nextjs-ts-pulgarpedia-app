import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import PlaceCard from "./PlaceCard";
import { usePulgarpediaContent } from "../hooks/usePulgarpediaContent";
import type { Place } from "../types/place";

type Props = {
  maxSlides?: number;
  categoryId?: string; // Nuevo: filtrar por categoría
};

/**
 * Carrusel de recomendaciones responsivo.
 * - Muestra 2 cards por slide en desktop/tablet, 1 en móvil
 * - 4 slides en total (8 lugares)
 * - Autoplay y lazy loading activados
 * - Si se proporciona categoryId, muestra solo lugares de esa categoría
 */
const RecommendationsCarousel: React.FC<Props> = ({
  maxSlides = 4,
  categoryId,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { places, isLoading, isReady } = usePulgarpediaContent();
  const [recommended, setRecommended] = useState<Place[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const autoplayTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Helper: mezclar y seleccionar n elementos únicos
  const sampleRandom = (items: Place[], n: number) => {
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, Math.min(n, arr.length));
  };

  useEffect(() => {
    if (!isReady) return;

    // Filtrar por categoría solo si se proporciona un categoryId válido
    const filteredPlaces = categoryId
      ? places.filter((place) => place.categoryId === categoryId)
      : places;

    // Obtener 8 lugares (2 por slide × 4 slides)
    const totalPlaces = maxSlides * 2;
    const picks = sampleRandom(filteredPlaces, totalPlaces);
    setRecommended(picks);
    // regenerate only when places change (session-level uniqueness handled by state)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, places, maxSlides, categoryId]);

  // Agrupar lugares en slides según el dispositivo
  // Desktop: 2 cards por slide (4 slides)
  // Mobile: 1 card por slide (8 slides)
  const slides = useMemo(() => {
    if (isMobile) {
      // Mobile: 1 card por slide
      return recommended.map((place) => [place]);
    } else {
      // Desktop: grupos de 2 cards por slide
      const grouped: Place[][] = [];
      for (let i = 0; i < recommended.length; i += 2) {
        grouped.push(recommended.slice(i, i + 2));
      }
      return grouped;
    }
  }, [recommended, isMobile]);

  // Reset slide cuando cambia el tamaño de pantalla
  useEffect(() => {
    setCurrentSlide(0);
  }, [isMobile]);

  // Detectar scroll manual para pausar autoplay
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      // Pausar autoplay cuando el usuario hace scroll
      if (!isScrolling) {
        setIsUserInteracting(true);
        isScrolling = true;
      }

      // Limpiar timeout anterior
      clearTimeout(scrollTimeout);

      // Reanudar autoplay 3 segundos después de que el usuario deje de hacer scroll
      scrollTimeout = setTimeout(() => {
        setIsUserInteracting(false);
        isScrolling = false;
      }, 3000);
    };

    const handleTouchStart = () => {
      setIsUserInteracting(true);
    };

    const handleTouchEnd = () => {
      // Reanudar autoplay 3 segundos después del touch
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
      autoplayTimeoutRef.current = setTimeout(() => {
        setIsUserInteracting(false);
      }, 3000);
    };

    container.addEventListener("scroll", handleScroll);
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      clearTimeout(scrollTimeout);
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, []);

  // Navigate to specific slide
  const goToSlide = React.useCallback((index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const slideWidth = el.clientWidth;
    el.scrollTo({
      left: slideWidth * index,
      behavior: "smooth",
    });
    setCurrentSlide(index);
  }, []);

  const nextSlide = React.useCallback(() => {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }, [currentSlide, slides.length, goToSlide]);

  const prevSlide = React.useCallback(() => {
    const prev = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    goToSlide(prev);
  }, [currentSlide, slides.length, goToSlide]);

  // Pausar autoplay cuando el usuario usa los botones de navegación
  const handleManualNavigation = (direction: "next" | "prev") => {
    setIsUserInteracting(true);
    if (direction === "next") {
      nextSlide();
    } else {
      prevSlide();
    }
    // Reanudar autoplay después de 5 segundos
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
    }
    autoplayTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 5000);
  };

  // Auto-advance every 5 seconds (pausado durante interacción manual)
  useEffect(() => {
    if (!isReady || slides.length === 0 || isUserInteracting) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, slides.length, isReady, isUserInteracting, nextSlide]);

  if (isLoading || !isReady) {
    // simple placeholder while content loads
    return (
      <Box sx={{ my: 4 }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Recomendaciones
        </Typography>
        <Box sx={{ height: 400 }}>
          <PlaceCard place={null} loading />
        </Box>
      </Box>
    );
  }

  if (!slides || slides.length === 0) return null;

  return (
    <Box sx={{ my: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant='h6'>Recomendaciones</Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <IconButton
            aria-label='anterior'
            onClick={() => handleManualNavigation("prev")}
            size='small'
            sx={{
              bgcolor: "background.paper",
              boxShadow: 1,
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            aria-label='siguiente'
            onClick={() => handleManualNavigation("next")}
            size='small'
            sx={{
              bgcolor: "background.paper",
              boxShadow: 1,
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Carousel container - 2 cards per slide */}
      <Box sx={{ position: "relative" }}>
        <Box
          ref={containerRef}
          sx={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
            pt: 2,
            pb: 3,
          }}
        >
          {slides.map((slideGroup, slideIndex) => (
            <Box
              key={`slide-${slideIndex}`}
              sx={{
                minWidth: "100%",
                width: "100%",
                flex: "0 0 100%",
                scrollSnapAlign: "start",
                px: { xs: 0.5, sm: 1 },
                ...(isMobile
                  ? {
                      // Mobile: 1 card centrada
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }
                  : {
                      // Desktop: grid de 2 columnas
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: 2,
                    }),
              }}
            >
              {slideGroup.map((place) => (
                <PlaceCard
                  key={place.placeId}
                  place={place}
                  variant={"vertical"}
                />
              ))}
            </Box>
          ))}
        </Box>

        {/* Progress bar indicator */}
        <Box sx={{ mt: 2 }}>
          <LinearProgress
            variant='determinate'
            value={((currentSlide + 1) / slides.length) * 100}
            sx={{ height: 4, borderRadius: 2 }}
          />
        </Box>

        {/* Dot indicators */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            mt: 2,
          }}
        >
          {slides.map((_, index) => (
            <IconButton
              key={index}
              size='small'
              onClick={() => {
                setIsUserInteracting(true);
                goToSlide(index);
                // Reanudar autoplay después de 5 segundos
                if (autoplayTimeoutRef.current) {
                  clearTimeout(autoplayTimeoutRef.current);
                }
                autoplayTimeoutRef.current = setTimeout(() => {
                  setIsUserInteracting(false);
                }, 5000);
              }}
              sx={{ p: 0.5 }}
              aria-label={`Ir a slide ${index + 1}`}
            >
              <FiberManualRecordIcon
                sx={{
                  fontSize: 10,
                  color:
                    currentSlide === index ? "primary.main" : "action.disabled",
                  transition: "color 0.3s",
                }}
              />
            </IconButton>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default RecommendationsCarousel;
