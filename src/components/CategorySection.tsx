import React from "react";
import { Box, Card, CardContent, Typography, Chip } from "@mui/material";
import { categoryColors } from "../styles/theme";
import type { CategoryInfo } from "../types/place";

interface CategorySectionProps {
  categories: CategoryInfo[];
  placeCounts: Record<string, number>;
  onCategoryClick: (categoryId: string) => void;
}

/**
 * Componente que muestra las categorías disponibles como cards informativas
 * Permite navegar a la búsqueda filtrada por categoría
 */
const CategorySection: React.FC<CategorySectionProps> = ({
  categories,
  placeCounts,
  onCategoryClick,
}) => {
  return (
    <Box sx={{ my: 6 }}>
      {/* Título de la sección */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography
          variant='h4'
          component='h2'
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          Explora por Categorías
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Descubre los mejores lugares de El Salvador organizados por temática
        </Typography>
      </Box>

      {/* Grid de categorías */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {categories.map((category) => {
          const count = placeCounts[category.id] || 0;
          const color =
            (categoryColors as Record<string, string>)[category.id] ||
            categoryColors["nature-adventure"];

          return (
            <Card
              key={category.id}
              component='button'
              role='button'
              tabIndex={0}
              aria-label={`Explorar ${category.name} - ${count} ${
                count === 1 ? "lugar" : "lugares"
              }`}
              sx={{
                cursor: "pointer",
                transition: "all 0.3s ease",
                border: "none",
                textAlign: "left",
                background: "inherit",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 6,
                },
                "&:active": {
                  transform: "translateY(-4px)",
                },
                "&:focus": {
                  outline: `3px solid ${color}`,
                  outlineOffset: "2px",
                },
                "&:focus:not(:focus-visible)": {
                  outline: "none",
                },
                borderTop: `4px solid ${color}`,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
              onClick={() => onCategoryClick(category.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onCategoryClick(category.id);
                }
              }}
            >
              <CardContent
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  p: 3,
                }}
              >
                {/* Header con icon y chip de count */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant='h1'
                    sx={{
                      fontSize: "3rem",
                      lineHeight: 1,
                    }}
                  >
                    {category.icon}
                  </Typography>
                  <Chip
                    label={`${count} ${count === 1 ? "lugar" : "lugares"}`}
                    size='small'
                    sx={{
                      bgcolor: color,
                      color: "white",
                      fontWeight: 600,
                    }}
                  />
                </Box>

                {/* Nombre de la categoría */}
                <Typography
                  variant='h6'
                  component='h3'
                  sx={{
                    fontWeight: 600,
                    color: color,
                  }}
                >
                  {category.name}
                </Typography>

                {/* Descripción */}
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{
                    flex: 1,
                    lineHeight: 1.6,
                  }}
                >
                  {category.description}
                </Typography>

                {/* CTA */}
                <Typography
                  variant='body2'
                  sx={{
                    color: color,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mt: "auto",
                  }}
                >
                  Ver lugares
                  <span style={{ fontSize: "1.2rem" }}>→</span>
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default CategorySection;
