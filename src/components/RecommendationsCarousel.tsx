import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography, IconButton, LinearProgress } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import PlaceCard from "./PlaceCard";
import { usePulgarpediaContent } from "../hooks/usePulgarpediaContent";
import type { Place } from "../types/place";

type Props = {
  maxSlides?: number;
};

/**
 * Carrusel de recomendaciones responsivo.
 * - Usa Swiper para swipe en móvil y flechas en desktop
 * - Autoplay y lazy loading activados
 */
const RecommendationsCarousel: React.FC<Props> = ({ maxSlides = 6 }) => {
  const { places, isLoading, isReady } = usePulgarpediaContent();
  const [recommended, setRecommended] = useState<Place[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

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
    const picks = sampleRandom(places, maxSlides);
    setRecommended(picks);
    // regenerate only when places change (session-level uniqueness handled by state)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, places, maxSlides]);

  const slides = useMemo(() => recommended, [recommended]);

  // Navigate to specific slide (1 full card at a time)
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

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (!isReady || slides.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, slides.length, isReady, nextSlide]);

  if (isLoading || !isReady) {
    // simple placeholder while content loads
    return (
      <Box sx={{ my: 4 }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Lugares recomendados
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
        <Typography variant='h6'>Lugares recomendados</Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <IconButton
            aria-label='anterior'
            onClick={prevSlide}
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
            onClick={nextSlide}
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

      {/* Carousel container - 1 card per slide */}
      <Box sx={{ position: "relative" }}>
        <Box
          ref={containerRef}
          sx={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          {slides.map((place) => (
            <Box
              key={place.placeId}
              sx={{
                minWidth: "100%",
                width: "100%",
                flex: "0 0 100%",
                scrollSnapAlign: "start",
                px: { xs: 0.5, sm: 1 },
              }}
            >
              <PlaceCard place={place} variant={"vertical"} />
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
              onClick={() => goToSlide(index)}
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
