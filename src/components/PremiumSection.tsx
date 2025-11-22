import React from "react";
import { Box, Typography, Button, Paper, Chip, alpha } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import StarIcon from "@mui/icons-material/Star";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import type { PremiumSection as PremiumSectionType } from "../types/place";

interface PremiumSectionProps {
  premiumData: PremiumSectionType;
}

/**
 * Componente que muestra contenido premium bloqueado
 * - Badge "Premium" destacado
 * - Contenido con efecto blur
 * - Lock icon y mensaje motivacional
 * - CTA button para upgrade
 * - Diseño responsive
 */
const PremiumSection: React.FC<PremiumSectionProps> = ({ premiumData }) => {
  // No mostrar si no está bloqueado (por si en el futuro hay contenido premium desbloqueado)
  if (!premiumData.isLocked) return null;

  return (
    <Box sx={{ mb: 6 }}>
      {/* Título de la sección con badge Premium */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <EmojiEventsIcon
            sx={{
              fontSize: 32,
              color: "warning.main",
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
            {premiumData.title}
          </Typography>
        </Box>

        {/* Badge Premium */}
        <Chip
          icon={<StarIcon />}
          label='PREMIUM'
          color='warning'
          sx={{
            fontWeight: 700,
            fontSize: "0.875rem",
            px: 1,
            height: 36,
            animation: "pulse 2s infinite",
            "@keyframes pulse": {
              "0%, 100%": { transform: "scale(1)" },
              "50%": { transform: "scale(1.05)" },
            },
          }}
        />
      </Box>

      {/* Paper con contenido bloqueado */}
      <Paper
        elevation={3}
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 2,
          border: (theme) => `2px solid ${theme.palette.warning.main}`,
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(
              theme.palette.warning.light,
              0.1
            )} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
        }}
      >
        {/* Contenido con blur */}
        <Box
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            filter: "blur(4px)",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {/* Título premium */}
          <Typography
            variant='h6'
            sx={{
              fontWeight: 600,
              mb: 2,
              color: "text.primary",
            }}
          >
            {premiumData.premiumTitle}
          </Typography>

          {/* Snippet de contenido */}
          <Typography
            variant='body1'
            sx={{
              color: "text.secondary",
              lineHeight: 1.8,
            }}
          >
            {premiumData.contentSnippet}
          </Typography>

          {/* Mock de recomendaciones (solo para efecto visual) */}
          <Box sx={{ mt: 3 }}>
            {[1, 2, 3].map((i) => (
              <Box
                key={i}
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 1,
                  bgcolor: alpha("#000", 0.03),
                  borderLeft: (theme) =>
                    `4px solid ${theme.palette.warning.main}`,
                }}
              >
                <Typography variant='subtitle2' sx={{ mb: 1 }}>
                  Tip exclusivo #{i}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam voluptates...
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Overlay con lock y CTA */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: (theme) =>
              `linear-gradient(180deg, ${alpha(
                theme.palette.background.paper,
                0.7
              )} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
            backdropFilter: "blur(2px)",
            p: { xs: 3, sm: 4 },
            textAlign: "center",
          }}
        >
          {/* Lock icon animado */}
          <Box
            sx={{
              width: { xs: 80, sm: 100 },
              height: { xs: 80, sm: 100 },
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: (theme) => alpha(theme.palette.warning.main, 0.1),
              border: (theme) => `3px solid ${theme.palette.warning.main}`,
              mb: 3,
              animation: "lockPulse 2s infinite",
              "@keyframes lockPulse": {
                "0%, 100%": {
                  transform: "scale(1)",
                  boxShadow: "0 0 0 0 rgba(255, 152, 0, 0.4)",
                },
                "50%": {
                  transform: "scale(1.05)",
                  boxShadow: "0 0 0 15px rgba(255, 152, 0, 0)",
                },
              },
            }}
          >
            <LockIcon
              sx={{
                fontSize: { xs: 40, sm: 50 },
                color: "warning.main",
              }}
            />
          </Box>

          {/* Mensaje motivacional */}
          <Typography
            variant='h6'
            sx={{
              fontWeight: 600,
              mb: 2,
              color: "text.primary",
              maxWidth: 500,
            }}
          >
            Contenido Exclusivo para Miembros Premium
          </Typography>

          <Typography
            variant='body1'
            sx={{
              mb: 4,
              color: "text.secondary",
              maxWidth: 600,
            }}
          >
            {premiumData.callToAction}
          </Typography>

          {/* CTA Button */}
          <Button
            variant='contained'
            color='warning'
            size='large'
            startIcon={<StarIcon />}
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1rem", sm: "1.1rem" },
              px: { xs: 3, sm: 5 },
              py: { xs: 1.5, sm: 2 },
              borderRadius: 3,
              textTransform: "none",
              boxShadow: (theme) =>
                `0 8px 24px ${alpha(theme.palette.warning.main, 0.3)}`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: (theme) =>
                  `0 12px 32px ${alpha(theme.palette.warning.main, 0.4)}`,
              },
            }}
            onClick={() => {
              // TODO: Implementar lógica de navegación a página de premium
              console.log("Navegar a página de Premium");
            }}
          >
            Obtener Acceso Premium
          </Button>

          {/* Beneficios rápidos */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
              justifyContent: "center",
              mt: 3,
            }}
          >
            {[
              "Guías exclusivas",
              "Consejos locales",
              "Rutas secretas",
              "Sin anuncios",
            ].map((benefit) => (
              <Chip
                key={benefit}
                label={benefit}
                size='small'
                sx={{
                  bgcolor: (theme) => alpha(theme.palette.warning.main, 0.1),
                  color: "warning.dark",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                }}
              />
            ))}
          </Box>
        </Box>
      </Paper>

      {/* Mensaje adicional debajo */}
      <Box
        sx={{
          textAlign: "center",
          mt: 2,
        }}
      >
        <Typography
          variant='caption'
          sx={{
            fontSize: "1rem",
            color: "text.secondary",
          }}
        >
          ✨ Únete a miles de viajeros que ya disfrutan del contenido premium
        </Typography>
      </Box>
    </Box>
  );
};

export default PremiumSection;
